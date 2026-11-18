import math
import os
import json
import re
import asyncio
from datetime import datetime, timedelta
from typing import Optional, List, Dict, Any, Tuple
from dataclasses import dataclass, field
from core.exbo_api import exbo_client

@dataclass
class ShelfGapOpportunity:
    gap_type: str  # "gap_1" or "wall_2"
    jump_pct: int
    entry_unit_price: float
    target_unit_price: float
    total_cost: int
    net_profit: int
    margin_pct: int
    amount: int
    is_anomaly: bool = False
    tier_label: str = ""
    tier_avg: int = 0
    tier_ceil: int = 0
    lot_start_time: str = ""
    lot_buyer: str = ""
    lots_detail: List[Dict[str, Any]] = field(default_factory=list)

QLT_BADGES = {
    0: ("⚪ Обыч.", "⚪ Common"),
    1: ("🟢 Необыч.", "🟢 Uncom."),
    2: ("🔵 Особ.", "🔵 Special"),
    3: ("🟣 Редк.", "🟣 Rare"),
    4: ("🔴 Искл.", "🔴 Excep."),
    5: ("🟡 Легенд.", "🟡 Legend"),
}

BONUS_PROP_NAMES = {
    "BLEEDING_ACC": ("Кровь", "Bleed"),
    "STAMINA_BONUS": ("Выносл.", "Stamina"),
    "REGENERATION_BONUS": ("Реген", "Regen"),
    "HEALTH_BONUS": ("Живуч.", "Health"),
    "BULLET_RESISTANCE": ("Пулест.", "Armor"),
    "SPEED_BONUS": ("Скор.", "Speed"),
    "RADIATION_PROTECTION": ("Рад.", "Rad"),
    "BIO_PROTECTION": ("Био", "Bio"),
    "PSI_PROTECTION": ("Пси", "Psi"),
    "TEMPERATURE_PROTECTION": ("Термо", "Thermo"),
    "CARRYING_WEIGHT": ("Вес", "Weight"),
}

def format_lot_quality_badge(lot: dict, is_en: bool = False) -> str:
    parts = []
    qlt = lot.get("qlt")
    if qlt is not None and qlt in QLT_BADGES:
        parts.append(QLT_BADGES[qlt][1 if is_en else 0])
    
    stats_rnd = lot.get("stats_random")
    if stats_rnd is not None and isinstance(stats_rnd, (int, float)) and stats_rnd > 0:
        pct = round(stats_rnd * 100, 1)
        parts.append(f"{pct}%")
        
    ptn = lot.get("ptn", 0)
    if ptn and ptn > 0:
        parts.append(f"+{ptn}")
        
    bonus = lot.get("bonus_properties", [])
    if bonus and isinstance(bonus, list):
        b_names = [BONUS_PROP_NAMES.get(b, (b, b))[1 if is_en else 0] for b in bonus[:3]]
        parts.append("⚡" + "/".join(b_names))
        
    if parts:
        return "[" + " | ".join(parts) + "]"
    return ""

def get_ptn_bracket(ptn: Optional[int]) -> int:
    """
    Returns upgrade tier bracket:
    0: clean (+0)
    5: low/mid (+1 to +9)
    10: high (+10 to +14)
    15: max (+15)
    """
    if not ptn or ptn <= 0:
        return 0
    elif ptn < 10:
        return 5
    elif ptn < 15:
        return 10
    else:
        return 15

def get_tier_tuple(lot_or_hist: dict) -> Tuple[int, int]:
    if not isinstance(lot_or_hist, dict):
        return (0, 0)
    add = lot_or_hist.get("additional") or {}
    q = add.get("qlt") if add.get("qlt") is not None else lot_or_hist.get("qlt", 0)
    p = add.get("ptn") if add.get("ptn") is not None else lot_or_hist.get("ptn", 0)
    return (int(q or 0), get_ptn_bracket(int(p or 0)))

def format_tier_name(qlt: int, ptn_bracket: int = 0, is_en: bool = False, is_proto: bool = False) -> str:
    q_badge = QLT_BADGES.get(qlt, ("⚪ Обыч.", "⚪ Common"))[1 if is_en else 0]
    if is_proto or ptn_bracket is None or ptn_bracket < 0:
        return q_badge
    if ptn_bracket <= 0:
        p_str = "+0"
    elif ptn_bracket == 5:
        p_str = "+1..9"
    elif ptn_bracket == 10:
        p_str = "+10..14"
    else:
        p_str = "+15"
    return f"{q_badge} | {p_str}"

def parse_budget_input(text: str) -> int:
    """
    Parses user input string into integer rubles.
    Supports formats:
      - 5кк, 5kk, 5m, 5м, 5 млн, 2.5кк, 2,5kk
      - 500к, 500k, 500тыс
      - 15000000, 15.000.000, 15 000 000
      - 0, any, любой, все, all, без (unlimited = 0)
    Returns:
      int amount (>=0) if parsed successfully, or -1 if invalid.
    """
    if not text:
        return -1
    raw = text.strip().lower().replace(" ", "").replace("₽", "").replace("руб", "").replace("r", "").replace("+", "")
    if raw in ["0", "все", "всё", "любой", "all", "без", "нет", "none", "any"]:
        return 0
    # Match millions: 5kk, 5.5кк, 5m, 5млн
    m_match = re.match(r"^([\d.,]+)(кк|kk|m|м|млн)$", raw)
    if m_match:
        try:
            val = float(m_match.group(1).replace(",", "."))
            return int(val * 1_000_000)
        except Exception:
            return -1
    # Match thousands: 500k, 500к, 500тыс
    k_match = re.match(r"^([\d.,]+)(к|k|тыс)$", raw)
    if k_match:
        try:
            val = float(k_match.group(1).replace(",", "."))
            return int(val * 1_000)
        except Exception:
            return -1
    # Match raw digits with optional dots/commas
    clean_digits = raw.replace(".", "").replace(",", "")
    if clean_digits.isdigit():
        try:
            return int(clean_digits)
        except Exception:
            return -1
    return -1

def compute_price_stats(prices: List[float]) -> Dict[str, Any]:
    if not prices:
        return {"avg_price": 0, "median_price": 0, "min_price": 0, "max_price": 0, "ceiling": 0, "count": 0}
    sorted_u = sorted(prices)
    n = len(sorted_u)
    median = (sorted_u[n // 2 - 1] + sorted_u[n // 2]) / 2.0 if n % 2 == 0 else sorted_u[n // 2]
    clean_u = [p for p in sorted_u if (median * 0.25) <= p <= (median * 2.8)] if median > 0 else sorted_u
    if not clean_u:
        clean_u = sorted_u
    avg = round(sum(clean_u) / len(clean_u)) if clean_u else 0
    mi = round(min(clean_u)) if clean_u else 0
    ma = round(max(clean_u)) if clean_u else 0
    ceil = round(min(ma * 1.15, avg * 1.30)) if avg > 0 else 0
    return {
        "avg_price": avg,
        "median_price": round(median),
        "min_price": mi,
        "max_price": ma,
        "ceiling": ceil,
        "count": len(clean_u)
    }

def compute_tier_weekly_cycles(hist_items: List[dict], tier_avg: int) -> List[dict]:
    day_names = ["Пн", "Вт", "Ср", "Чт", "Пт", "Сб", "Вс"]
    day_full_names = ["Понедельник", "Вторник", "Среда", "Четверг", "Пятница", "Суббота", "Воскресенье"]
    cycle_coeffs = [0.976, 0.949, 1.038, 0.992, 1.021, 1.056, 1.012]

    days_map = {i: [] for i in range(7)}
    for h in hist_items:
        try:
            dt = datetime.fromisoformat(h["time"].replace("Z", "+00:00")) + timedelta(hours=3)
            w_day = dt.weekday()
            u = float(h["price"]) / max(1, float(h["amount"]))
            days_map[w_day].append(u)
        except Exception:
            pass

    cycles = []
    for d_idx, d_name in enumerate(day_names):
        arr = days_map.get(d_idx, [])
        baseline = round(tier_avg * cycle_coeffs[d_idx]) if tier_avg > 0 else 0
        if len(arr) >= 2:
            d_avg = round(sum(arr) / len(arr))
        elif len(arr) == 1:
            d_avg = round(0.6 * arr[0] + 0.4 * baseline)
        else:
            d_avg = baseline

        cycles.append({
            "day": d_name,
            "day_full": day_full_names[d_idx],
            "day_idx": d_idx,
            "avg": d_avg,
            "count": len(arr)
        })

    return cycles

def calculate_realistic_resell(
    analytics: Any,
    lot: dict,
    active_lots: Optional[List[dict]] = None
) -> Dict[str, Any]:
    """
    Рассчитывает честную и реалистичную цену перепродажи лота с учетом:
    1. 5% комиссии аукциона.
    2. Жесткого лимита 25 активных лотов в игре:
       - Нельзя купить пак 100 шт и продать 100 лотами по 1 шт по цене точечной розницы!
       - Большие паки (>25 шт) продаются только стеками (по 25, 50 шт) с оптовым дисконтом.
    3. Конкуренции в стакане:
       - Если на аукционе есть другие лоты сходного размера дешевле розничной средней,
         цена перепродажи НЕ МОЖЕТ превышать их!
    """
    amount = max(1, int(lot.get("amount", 1)))
    buyout = float(lot.get("buyout") or lot.get("buyoutPrice") or (float(lot.get("price", 0)) * amount))
    unit_buyout = buyout / amount

    # Базовая планка розничного рынка
    if getattr(analytics, "is_tiered", False):
        if lot.get("tier_avg", 0) > 0:
            base_market = float(lot["tier_avg"])
        elif getattr(analytics, "matched_tier_avg", 0) > 0:
            base_market = float(analytics.matched_tier_avg)
        else:
            base_market = 0.0  # Cannot compare unknown tier against blended average!
    else:
        base_market = float(getattr(analytics, "avg_price", 0))

    if base_market <= 0:
        base_market = unit_buyout

    lots_list = active_lots or getattr(analytics, "lots", []) or []
    is_tiered = getattr(analytics, "is_tiered", False)

    # Проверка оптовой конкуренции в стакане для расходников/стакаемых предметов
    if amount == 1:
        realistic_unit = base_market
        slots_needed = 1
        is_bulk = False
        batch_size = 1
    else:
        is_bulk = True
        lot_qlt = lot.get("qlt", 0) or 0
        lot_ptn = lot.get("ptn", 0) or 0
        lot_bracket = get_ptn_bracket(lot_ptn)

        def matches_lot_tier(other_l):
            if not is_tiered:
                return True
            o_add = other_l.get("additional") or {}
            o_qlt = other_l.get("qlt", o_add.get("qlt", 0) or 0)
            o_ptn = other_l.get("ptn", o_add.get("ptn", 0) or 0)
            return (o_qlt == lot_qlt and get_ptn_bracket(o_ptn) == lot_bracket)

        # Ищем конкурирующие паки от 10+ шт того же грейда, выставленные выше нашей цены выкупа
        competing_bulk = [
            float(l.get("price") or (float(l.get("buyoutPrice", 0)) / max(1, float(l.get("amount", 1)))))
            for l in lots_list
            if matches_lot_tier(l) and int(l.get("amount", 1)) >= min(amount, 10) and float(l.get("price") or (float(l.get("buyoutPrice", 0)) / max(1, float(l.get("amount", 1))))) > unit_buyout * 1.02
        ]
        competing_ceiling = min(competing_bulk) if competing_bulk else base_market

        # Оптовый дисконт и учет лимита 25 слотов аукциона:
        if amount <= 25:
            # Малый пак: можно продать за 1-5 лотов
            slots_needed = min(amount, 5)
            batch_size = (amount + slots_needed - 1) // slots_needed
            bulk_factor = 0.96  # -4% к рознице
        elif amount <= 100:
            # Средний пак (e.g. 50-100 шт): продается пачками по 25 шт (лимит 25 лотов не позволяет продавать по 1 шт!)
            batch_size = 25
            slots_needed = (amount + 24) // 25  # e.g. 100 шт = 4 слота
            bulk_factor = 0.90  # -10% оптовый дисконт к рознице
        else:
            # Крупный пак (200, 500, 1000): продается пачками по 50-100 шт
            batch_size = 50
            slots_needed = (amount + 49) // 50
            bulk_factor = 0.85  # -15% оптовый дисконт к рознице

        # Если конкурирующий лот позволяет сделать профит от 5% при подрезании на 1%:
        target_undercut = competing_ceiling * 0.99
        if (target_undercut * 0.95 - unit_buyout) / max(1.0, unit_buyout) >= 0.05:
            realistic_unit = min(target_undercut, base_market * bulk_factor)
        else:
            # Иначе ориентируемся на нормальную оптовую рыночную стоимость
            realistic_unit = base_market * bulk_factor

    # 5% налог аукциона
    gross_resell = round(realistic_unit * amount)
    net_resell = round(gross_resell * 0.95)
    tax_fee = gross_resell - net_resell
    net_profit = net_resell - round(buyout)
    margin_pct = round((net_profit / buyout) * 100) if buyout > 0 else 0

    return {
        "unit_buyout": round(unit_buyout),
        "total_buyout": round(buyout),
        "amount": amount,
        "base_market": round(base_market),
        "realistic_unit": round(realistic_unit),
        "gross_resell": gross_resell,
        "realistic_sell_price": gross_resell,
        "net_resell": net_resell,
        "tax_fee": tax_fee,
        "net_profit": net_profit,
        "margin_pct": margin_pct,
        "is_bulk": is_bulk,
        "slots_needed": slots_needed,
        "batch_size": batch_size if is_bulk else 1,
        "is_profitable": (net_profit >= 3000 and margin_pct >= 5)
    }

@dataclass
class MarketAnalytics:
    item_id: str
    item_name: str
    category: str
    region: str
    
    # Statistical Core
    avg_price: int
    median_price: int
    min_price: int
    max_price: int
    realistic_ceiling: int
    
    # Velocity / Liquidity
    sales_count: int
    days_span: float
    sales_per_day: float
    liquidity_tier: str  # "high", "medium", "low"
    liquidity_text: str
    
    # Order Book & Best Lot
    best_unit_price: int = 0
    best_amount: int = 0
    best_buyout: int = 0
    discount_pct: int = 0
    lots: List[Dict[str, Any]] = field(default_factory=list)
    history: List[Dict[str, Any]] = field(default_factory=list)
    weekly_cycles: List[Dict[str, Any]] = field(default_factory=list)
    
    # Active Opportunities
    gap_opportunity: Optional[ShelfGapOpportunity] = None
    discount_opportunities: List[Dict[str, Any]] = field(default_factory=list)

    # Tier-Aware fields (for artifacts, weapons, armor with quality/upgrades)
    is_tiered: bool = False
    matched_tier_label: str = ""
    matched_tier_avg: int = 0
    tier_stats_map: Dict[Tuple[int, int], Dict[str, Any]] = field(default_factory=dict)

class MarketAnalyzer:
    def __init__(self):
        self._cache: Dict[str, Dict[str, Any]] = {}
        self._raw_api_cache: Dict[str, Dict[str, Any]] = {}
        self._cache_ttl = 1800  # 30 minutes
        self._top_deals_cache: Dict[str, Any] = {}
        self._preload_static_cache()

    def _preload_static_cache(self):
        try:
            base_dir = os.path.dirname(os.path.dirname(__file__))
            static_dir = os.path.join(base_dir, "webapp", "static")
            now_ts = datetime.utcnow().timestamp()
            
            regions_files = [
                ("ru", os.path.join(static_dir, "data.json")),
                ("eu", os.path.join(static_dir, "data_eu.json")),
                ("na", os.path.join(static_dir, "data_na.json"))
            ]
            loaded_count = 0
            for reg, fpath in regions_files:
                if not os.path.exists(fpath):
                    continue
                try:
                    with open(fpath, "r", encoding="utf-8") as f:
                        data = json.load(f)
                        for it in data.get("items", []):
                            item_id = it.get("id")
                            if not item_id:
                                continue
                            category = it.get("category", "")
                            # DO NOT PRELOAD ARTIFACTS OR TIERED ITEMS FROM STATIC SNAPSHOT
                            # because static snapshot lacks 'additional' object (qlt, ptn, quality)!
                            # They must be analyzed dynamically with full EXBO history so rarity tiers are calculated correctly!
                            if category in ("Артефакты", "Протоартефакты") or "артефакт" in category.lower() or "_" in item_id:
                                continue
                            cache_key = f"{reg}:{item_id}"
                            self._cache[cache_key] = {
                                "timestamp": 0.0,  # Mark as initial baseline so live EXBO history is fetched
                                "avg_price": int(it.get("avgPrice", 0)),
                                "median_price": int(it.get("medianPrice", 0)),
                                "min_price": int(it.get("minPrice", 0)),
                                "max_price": int(it.get("maxPrice", 0)),
                                "ceiling": int(it.get("ceiling", 0)),
                                "sales_count": len(it.get("history", [])),
                                "days_span": 7.0,
                                "sales_per_day": float(it.get("salesPerDay", 0.0)),
                                "liq_tier": "high" if it.get("salesPerDay", 0) > 5 else ("medium" if it.get("salesPerDay", 0) > 1 else "low"),
                                "liq_text": it.get("liquidity", ""),
                                "history": it.get("history", []),
                                "cycles": it.get("weeklyCycles", []),
                                "is_tiered": it.get("isTiered", False),
                                "tier_stats_map": {}
                            }
                            loaded_count += 1
                except Exception as fe:
                    print(f"[MARKET] Error preloading static cache for {reg}: {fe}")
            print(f"[MARKET] Preloaded {loaded_count} items into memory cache from webapp snapshots.")
        except Exception as e:
            print(f"[MARKET] Preload static cache failed: {e}")

    async def analyze(self, region: str, item_id: str, item_name: str, category: str, gap_threshold: int = 25, force_fresh_history: bool = False) -> Optional[MarketAnalytics]:
        clean_item_name = item_name.split(' [')[0].strip()
        # Determine API item ID and optional target quality tier (e.g. dm6l2_1 -> api_id=dm6l2, qlt=1)
        api_item_id = item_id
        target_qlt = None
        if "_" in item_id:
            parts = item_id.split("_")
            api_item_id = parts[0]
            try:
                target_qlt = int(parts[1])
            except ValueError:
                pass

        is_proto = (category == "Протоартефакты" or item_id.startswith("dm6l2") or api_item_id.startswith("dm6l2"))
        is_artifact = (category in ("Артефакты", "Протоартефакты") or is_proto)

        cache_key = f"{region}:{item_id}"
        now_ts = datetime.utcnow().timestamp()

        # Check history cache first
        hist_cache = self._cache.get(cache_key)

        # Optimization: cache raw API responses for base item_id (e.g. dm6l2) for 120 seconds
        raw_cache_key = f"{region}:{api_item_id}"
        raw_cached = self._raw_api_cache.get(raw_cache_key)
        if raw_cached and (now_ts - raw_cached["timestamp"]) < 120.0:
            raw_lots = list(raw_cached["lots"])
            raw_hist = list(raw_cached["history"])
        else:
            lots_limit = 200
            # If we already have a fresh history cache (< 30 min), we ONLY need active lots (super fast!)
            need_history = force_fresh_history or (not hist_cache) or ((now_ts - hist_cache.get("timestamp", 0)) > self._cache_ttl)
            lots_task = exbo_client.get_lots(region, api_item_id, limit=lots_limit)
            if need_history:
                hist_limit = 80
                hist_task = exbo_client.get_history(region, api_item_id, limit=hist_limit)
                raw_lots, raw_hist = await asyncio.gather(lots_task, hist_task)
                if raw_hist:
                    try:
                        raw_hist.sort(key=lambda h: h["time"])
                    except Exception:
                        pass
            else:
                raw_lots = await lots_task
                raw_hist = list(raw_cached["history"]) if (raw_cached and raw_cached.get("history")) else list(hist_cache.get("history", []))
            self._raw_api_cache[raw_cache_key] = {
                "timestamp": now_ts,
                "lots": list(raw_lots or []),
                "history": list(raw_hist or [])
            }

        # Filter by quality tier if target_qlt is specified
        if target_qlt is not None:
            def match_qlt(add_data, exp_qlt):
                actual_qlt = add_data.get("qlt", 0) if isinstance(add_data, dict) else 0
                return actual_qlt == exp_qlt

            raw_lots = [l for l in raw_lots if match_qlt(l.get("additional"), target_qlt)]
            raw_hist = [h for h in raw_hist if match_qlt(h.get("additional"), target_qlt)]

        # If both lots and history are completely unavailable, return None
        if not raw_lots and not raw_hist:
            return None

        # Sort lots by unit buyout price if present
        sorted_lots = sorted(raw_lots, key=lambda l: float(l["buyoutPrice"]) / float(l["amount"])) if raw_lots else []

        if not hist_cache or (now_ts - hist_cache["timestamp"]) > self._cache_ttl:
            if not raw_hist and sorted_lots:
                # If no history, base purely on current active lots
                best_u = int(sorted_lots[0]["buyoutPrice"] / sorted_lots[0]["amount"])
                best_buyout = int(sorted_lots[0]["buyoutPrice"])
                formatted_lots = []
                for l in sorted_lots:
                    u = round(float(l["buyoutPrice"]) / float(l["amount"]))
                    add_dict = l.get("additional") or {}
                    formatted_lots.append({
                        "buyout": int(l.get("buyoutPrice", 0)),
                        "bid": int(l.get("currentPrice") or l.get("startPrice") or 0),
                        "price": u, "amount": int(l["amount"]),
                        "isGap": False, "gapPct": 0, "isAnomaly": False,
                        "qlt": add_dict.get("qlt", 0),
                        "ptn": add_dict.get("ptn", 0),
                        "stats_random": add_dict.get("stats_random"),
                        "bonus_properties": add_dict.get("bonus_properties", []),
                        "ndmg": add_dict.get("ndmg"),
                        "startTime": l.get("startTime", ""),
                        "endTime": l.get("endTime", ""),
                        "buyer": add_dict.get("buyer", "") or l.get("buyer", "")
                    })
                return MarketAnalytics(
                    item_id=item_id, item_name=clean_item_name, category=category, region=region,
                    avg_price=best_u, median_price=best_u, min_price=best_u, max_price=best_u,
                    realistic_ceiling=int(best_u * 1.3), sales_count=0, days_span=1.0,
                    sales_per_day=0.0, liquidity_tier="low", liquidity_text="⚪ Только текущие лоты",
                    best_unit_price=best_u, best_amount=sorted_lots[0]["amount"],
                    best_buyout=best_buyout, discount_pct=0,
                    lots=formatted_lots, history=[]
                )

            # Process history transactions
            prices_unit = []
            dates = []

            for h in raw_hist:
                u = float(h["price"]) / max(1, float(h["amount"]))
                prices_unit.append(u)
                try:
                    dt = datetime.fromisoformat(h["time"].replace("Z", "+00:00"))
                    dates.append(dt)
                except Exception:
                    pass

            # Calculate Median
            sorted_u = sorted(prices_unit) if prices_unit else [0]
            n = len(sorted_u)
            median = (sorted_u[n // 2 - 1] + sorted_u[n // 2]) / 2.0 if n % 2 == 0 else sorted_u[n // 2]

            # Filter RMT & troll spikes (0.25x to 2.8x median)
            clean_u = [p for p in sorted_u if (median * 0.25) <= p <= (median * 2.8)] if median > 0 else sorted_u
            if not clean_u:
                clean_u = sorted_u

            avg_price = round(sum(clean_u) / len(clean_u)) if clean_u else 0
            min_price = round(min(clean_u)) if clean_u else 0
            max_price = round(max(clean_u)) if clean_u else 0

            # Velocity / Liquidity
            days_span = 1.0
            if len(dates) >= 2:
                dates_sorted = sorted(dates)
                diff_days = (dates_sorted[-1] - dates_sorted[0]).total_seconds() / 86400.0
                if diff_days > 0.2:
                    days_span = diff_days

            sales_per_day = round(len(clean_u) / days_span, 1)
            if sales_per_day >= 5.0:
                liq_tier, liq_text = "high", f"🟢 Высокая ({sales_per_day} сд/день)"
            elif sales_per_day >= 1.0:
                liq_tier, liq_text = "medium", f"🟡 Средняя ({sales_per_day} сд/день)"
            else:
                liq_tier, liq_text = "low", f"🔴 Низкая ({sales_per_day} сд/день)"

            # Realistic Ceiling
            ceiling = round(min(max_price * 1.15, avg_price * 1.30)) if avg_price > 0 else 0

            # Weekly Cycles & Time-of-Day Distribution (MSK timezone UTC+3)
            # Days: 0=Пн, 1=Вт, 2=Ср, 3=Чт, 4=Пт, 5=Сб, 6=Вс
            # Slots: night (00-06), morning (06-12), day (12-18), evening (18-24)
            days_map = {
                i: {
                    "all": [],
                    "night": [],
                    "morning": [],
                    "day": [],
                    "evening": []
                }
                for i in range(7)
            }

            for h in raw_hist:
                u = float(h["price"]) / max(1, float(h["amount"]))
                if median > 0 and not ((median * 0.25) <= u <= (median * 2.8)):
                    continue
                try:
                    dt = datetime.fromisoformat(h["time"].replace("Z", "+00:00"))
                    dt_msk = dt + timedelta(hours=3)
                    w_day = dt_msk.weekday()
                    msk_hour = dt_msk.hour

                    if 0 <= msk_hour < 6:
                        slot = "night"
                    elif 6 <= msk_hour < 12:
                        slot = "morning"
                    elif 12 <= msk_hour < 18:
                        slot = "day"
                    else:
                        slot = "evening"

                    days_map[w_day]["all"].append(u)
                    days_map[w_day][slot].append(u)
                except Exception:
                    pass

            day_names = ["Пн", "Вт", "Ср", "Чт", "Пт", "Сб", "Вс"]
            day_full_names = ["Понедельник", "Вторник", "Среда", "Четверг", "Пятница", "Суббота", "Воскресенье"]
            slot_meta = {
                "night": ("🌙 Ночь", "00:00 - 06:00"),
                "morning": ("🌅 Утро", "06:00 - 12:00"),
                "day": ("☀️ День", "12:00 - 18:00"),
                "evening": ("🌆 Вечер", "18:00 - 24:00")
            }

            # Stalcraft weekly market coefficients (MSK cycle):
            # 0=Пн: -2.4% (post-weekend dumping)
            # 1=Вт: -5.1% (weekly bottom, minimum competition -> Best Buy)
            # 2=Ср: +3.8% (patch day / maintenance surge)
            # 3=Чт: -0.8% (mid-week stabilization)
            # 4=Пт: +2.1% (pre-weekend gathering)
            # 5=Сб: +5.6% (peak online, clan wars -> Peak Sell)
            # 6=Вс: +1.2% (weekend closure / evening trades)
            cycle_coeffs = [0.976, 0.949, 1.038, 0.992, 1.021, 1.056, 1.012]
            slot_coeffs = {
                "night": 0.962,    # 00-06 MSK: lowest online, snipers (-3.8%)
                "morning": 0.985,  # 06-12 MSK: calm morning (-1.5%)
                "day": 1.008,      # 12-18 MSK: active trading (+0.8%)
                "evening": 1.045   # 18-24 MSK: peak online, highest prices (+4.5%)
            }

            cycles_data = []
            for d_idx, d_name in enumerate(day_names):
                d_info = days_map.get(d_idx, {"all": [], "night": [], "morning": [], "day": [], "evening": []})
                arr = d_info["all"]
                baseline_day_price = round(avg_price * cycle_coeffs[d_idx]) if avg_price > 0 else 0

                if len(arr) >= 3:
                    d_avg = round(sum(arr) / len(arr))
                elif len(arr) > 0:
                    real_sub = sum(arr) / len(arr)
                    d_avg = round(0.5 * real_sub + 0.5 * baseline_day_price)
                else:
                    d_avg = baseline_day_price

                slots_dict = {}
                for sk in ["night", "morning", "day", "evening"]:
                    s_arr = d_info[sk]
                    base_slot_price = round(d_avg * slot_coeffs[sk]) if d_avg > 0 else 0
                    if len(s_arr) >= 2:
                        s_avg = round(sum(s_arr) / len(s_arr))
                    elif len(s_arr) == 1:
                        s_avg = round(0.5 * s_arr[0] + 0.5 * base_slot_price)
                    else:
                        s_avg = base_slot_price

                    diff_pct = round(((s_avg - d_avg) / d_avg) * 100) if d_avg > 0 else 0
                    slots_dict[sk] = {
                        "name": slot_meta[sk][0],
                        "time": slot_meta[sk][1],
                        "avg": s_avg,
                        "count": len(s_arr),
                        "diff_pct": diff_pct
                    }

                best_buy_slot = min(["night", "morning", "day", "evening"], key=lambda k: slots_dict[k]["avg"])
                peak_sell_slot = max(["night", "morning", "day", "evening"], key=lambda k: slots_dict[k]["avg"])

                cycles_data.append({
                    "day": d_name,
                    "day_full": day_full_names[d_idx],
                    "day_idx": d_idx,
                    "avg": d_avg,
                    "type": "normal",
                    "count": len(arr),
                    "best_buy_slot": best_buy_slot,
                    "best_buy_name": slots_dict[best_buy_slot]["name"],
                    "best_buy_time": slots_dict[best_buy_slot]["time"],
                    "best_buy_diff": slots_dict[best_buy_slot]["diff_pct"],
                    "peak_sell_slot": peak_sell_slot,
                    "peak_sell_name": slots_dict[peak_sell_slot]["name"],
                    "peak_sell_time": slots_dict[peak_sell_slot]["time"],
                    "peak_sell_diff": slots_dict[peak_sell_slot]["diff_pct"],
                    "slots": slots_dict
                })

            # Dynamically determine best buy (cheapest day) and peak sell (most expensive day)
            valid_days = [c for c in cycles_data if c["avg"] > 0]
            if len(valid_days) >= 2:
                min_avg = min(c["avg"] for c in valid_days)
                max_avg = max(c["avg"] for c in valid_days)
                if min_avg < max_avg:
                    for c in cycles_data:
                        if c["avg"] == min_avg:
                            c["type"] = "buy"
                        elif c["avg"] == max_avg:
                            c["type"] = "sell"

            # Tier-based statistics for artifacts and items with quality/sharpening
            is_tiered = (
                category in ("Артефакты", "Протоартефакты")
                or "артефакт" in category.lower()
                or is_proto
            )
            if not is_tiered:
                for l in (raw_lots or []):
                    add = l.get("additional") or {}
                    if add.get("qlt", 0) > 0 or add.get("ptn", 0) > 0:
                        is_tiered = True
                        break
            if not is_tiered:
                for h in (raw_hist or []):
                    add = h.get("additional") or {}
                    if add.get("qlt", 0) > 0 or add.get("ptn", 0) > 0:
                        is_tiered = True
                        break

            tier_stats_map = {}
            if is_tiered and raw_hist:
                tier_prices: Dict[Tuple[int, int], List[float]] = {}
                tier_raw: Dict[Tuple[int, int], List[dict]] = {}
                for h in raw_hist:
                    u = float(h["price"]) / max(1, float(h["amount"]))
                    t_key = get_tier_tuple(h)
                    tier_prices.setdefault(t_key, []).append(u)
                    tier_raw.setdefault(t_key, []).append(h)

                tier_stats_map = {}
                for k, v in tier_prices.items():
                    stats = compute_price_stats(v)
                    stats["weekly_cycles"] = compute_tier_weekly_cycles(tier_raw.get(k, []), stats["avg_price"])
                    tier_stats_map[k] = stats

            hist_cache = {
                "timestamp": now_ts,
                "avg_price": avg_price,
                "median_price": round(median),
                "min_price": min_price,
                "max_price": max_price,
                "ceiling": ceiling,
                "sales_count": len(clean_u),
                "days_span": round(days_span, 1),
                "sales_per_day": sales_per_day,
                "liq_tier": liq_tier,
                "liq_text": liq_text,
                "history": raw_hist,
                "cycles": cycles_data,
                "is_tiered": is_tiered,
                "tier_stats_map": tier_stats_map
            }
            self._cache[cache_key] = hist_cache

        # Best current lot & Tier Analysis
        avg_price = hist_cache["avg_price"]
        ceiling = hist_cache["ceiling"]
        is_tiered = hist_cache.get("is_tiered", False)
        tier_stats_map = hist_cache.get("tier_stats_map", {})

        best_u = 0
        best_amt = 0
        discount_pct = 0
        matched_tier_label = ""
        matched_tier_avg = 0
        opportunity: Optional[ShelfGapOpportunity] = None
        formatted_lots = []

        discount_opportunities: List[Dict[str, Any]] = []

        if sorted_lots:
            best_lot = sorted_lots[0]
            best_u = round(float(best_lot["buyoutPrice"]) / float(best_lot["amount"]))
            best_amt = int(best_lot["amount"])
            add_0 = best_lot.get("additional") or {}
            qlt_0 = add_0.get("qlt", 0) or 0
            ptn_0 = add_0.get("ptn", 0) or 0
            tier_0 = (int(qlt_0), get_ptn_bracket(ptn_0))

            if is_tiered:
                matched_tier_label = format_tier_name(qlt_0, get_ptn_bracket(ptn_0), is_proto=is_proto)
                st_0 = tier_stats_map.get(tier_0)
                if st_0 and st_0.get("avg_price", 0) > 0:
                    matched_tier_avg = st_0["avg_price"]
                else:
                    matched_tier_avg = 0
                benchmark_price = matched_tier_avg
            else:
                benchmark_price = avg_price

            if benchmark_price > 0 and best_u < benchmark_price:
                discount_pct = round(((benchmark_price - best_u) / benchmark_price) * 100)
            else:
                discount_pct = 0

            # 1. Снайпер выгодных лотов с дисконтом по всем грейдам и глубине стакана
            if is_tiered:
                lots_by_tier: Dict[Tuple[int, int], List[dict]] = {}
                for l in sorted_lots:
                    t_key = get_tier_tuple(l)
                    lots_by_tier.setdefault(t_key, []).append(l)

                for t_key, t_lots in lots_by_tier.items():
                    t_stat = tier_stats_map.get(t_key, {})
                    t_avg = t_stat.get("avg_price", 0)
                    t_count = t_stat.get("count", 0)
                    if t_avg <= 0 or not t_lots:
                        continue

                    # СТРОГИЙ ФИЛЬТР ЛИКВИДНОСТИ: Минимум 4 подтвержденные сделки в истории тира!
                    if t_count < 4:
                        continue

                    # Для артефактов: исключаем случайную промежуточную заточку (+1..+14),
                    # так как в ней свойства уникальны/рандомны (bonus_properties) и 1 сделка искажает рынок.
                    # Торгуем только чистыми (+0), максимальными (+15) либо при пуле от 8 сделок:
                    if is_artifact and 0 < t_key[1] < 15 and t_count < 8:
                        continue

                    first_t_lot = t_lots[0]
                    u = round(float(first_t_lot["buyoutPrice"]) / float(first_t_lot["amount"]))
                    if u < t_avg:
                        disc = round(((t_avg - u) / t_avg) * 100)
                        if disc >= 15:  # Минимум 15% реального дисконта!
                            lot_dict = {
                                "buyout": int(first_t_lot.get("buyoutPrice", 0)),
                                "bid": int(first_t_lot.get("currentPrice") or first_t_lot.get("startPrice") or 0),
                                "price": u,
                                "amount": int(first_t_lot["amount"]),
                                "qlt": t_key[0],
                                "ptn": (first_t_lot.get("additional") or {}).get("ptn", 0) or 0,
                                "tier_avg": t_avg,
                                "tier_label": format_tier_name(t_key[0], t_key[1], is_proto=is_proto),
                                "startTime": first_t_lot.get("startTime", ""),
                                "endTime": first_t_lot.get("endTime", ""),
                                "buyer": (first_t_lot.get("additional") or {}).get("buyer", "") or first_t_lot.get("buyer", "")
                            }
                            dummy_an = type('DummyAnalytics', (), {
                                'is_tiered': True,
                                'matched_tier_avg': t_avg,
                                'avg_price': avg_price,
                                'lots': sorted_lots
                            })()
                            calc = calculate_realistic_resell(dummy_an, lot_dict, sorted_lots)
                            if calc["is_profitable"]:
                                discount_opportunities.append({
                                    "lot": lot_dict,
                                    "tier_label": lot_dict["tier_label"],
                                    "tier_avg": t_avg,
                                    "unit_price": u,
                                    "amount": lot_dict["amount"],
                                    "buyout": lot_dict["buyout"],
                                    "discount_pct": disc,
                                    "resell": calc
                                })
            else:
                for l in sorted_lots[:5]:
                    u = round(float(l["buyoutPrice"]) / float(l["amount"]))
                    if avg_price > 0 and u < avg_price:
                        disc = round(((avg_price - u) / avg_price) * 100)
                        if disc >= 10:
                            add_dict = l.get("additional") or {}
                            lot_dict = {
                                "buyout": int(l.get("buyoutPrice", 0)),
                                "bid": int(l.get("currentPrice") or l.get("startPrice") or 0),
                                "price": u,
                                "amount": int(l["amount"]),
                                "qlt": add_dict.get("qlt", 0) or 0,
                                "ptn": add_dict.get("ptn", 0) or 0,
                                "tier_avg": avg_price,
                                "tier_label": "",
                                "startTime": l.get("startTime", ""),
                                "endTime": l.get("endTime", ""),
                                "buyer": add_dict.get("buyer", "") or l.get("buyer", "")
                            }
                            dummy_an = type('DummyAnalytics', (), {
                                'is_tiered': False,
                                'matched_tier_avg': 0,
                                'avg_price': avg_price,
                                'lots': sorted_lots
                            })()
                            calc = calculate_realistic_resell(dummy_an, lot_dict, sorted_lots)
                            if calc["is_profitable"]:
                                discount_opportunities.append({
                                    "lot": lot_dict,
                                    "tier_label": "",
                                    "tier_avg": avg_price,
                                    "unit_price": u,
                                    "amount": lot_dict["amount"],
                                    "buyout": lot_dict["buyout"],
                                    "discount_pct": disc,
                                    "resell": calc
                                })
                                break

            # При наличии выгодных предложений лучший дисконт проставляется в основные поля аналитики
            if discount_opportunities:
                best_opp = max(discount_opportunities, key=lambda o: (o["resell"]["net_profit"], o["discount_pct"]))
                discount_pct = best_opp["discount_pct"]
                best_u = best_opp["unit_price"]
                best_amt = best_opp["amount"]
                best_buyout = best_opp["buyout"]
                if best_opp.get("tier_label"):
                    matched_tier_label = best_opp["tier_label"]
                    matched_tier_avg = best_opp["tier_avg"]

            # Shelf Gap Scanner with Anti-Troll & Cross-Tier Competition Filtering
            if is_tiered:
                if 'lots_by_tier' not in locals():
                    lots_by_tier = {}
                    for l in sorted_lots:
                        t_key = get_tier_tuple(l)
                        lots_by_tier.setdefault(t_key, []).append(l)

                for t_key, t_lots in lots_by_tier.items():
                    if len(t_lots) < 2:
                        continue
                    t_stat = tier_stats_map.get(t_key, {})
                    t_avg = t_stat.get("avg_price", 0)
                    t_ceil = t_stat.get("ceiling", 0)
                    t_count = t_stat.get("count", 0)
                    if t_avg <= 0 or t_count < 4:
                        continue

                    # Для артефактов: разрывы полок имеют смысл только на чистых (+0) и максимальных (+15)
                    if is_artifact and 0 < t_key[1] < 15 and t_count < 8:
                        continue

                    p0 = float(t_lots[0]["buyoutPrice"]) / float(t_lots[0]["amount"])
                    p1 = float(t_lots[1]["buyoutPrice"]) / float(t_lots[1]["amount"])

                    # 1. Base jump between lot 0 and lot 1
                    raw_jump1 = round(((p1 - p0) / p0) * 100) if p0 > 0 else 0
                    if raw_jump1 >= gap_threshold and p0 <= (t_avg * 1.05):
                        target_resell = min(p1, t_ceil) if t_ceil > 0 else p1
                        cur_q = t_key[0]
                        cur_p = (t_lots[0].get("additional") or {}).get("ptn", 0) or 0

                        # АНАЛИЗ БЛИЗЛЕЖАЩИХ ЦЕН (Cross-tier competition):
                        # Проверяем весь стакан sorted_lots. Если между p0 и target_resell
                        # есть конкурирующий лот того же или более высокого грейда (+15 дешевле +10 и т.д.),
                        # он сбивает полку!
                        blocking_prices = []
                        for other_l in sorted_lots:
                            other_u = float(other_l["buyoutPrice"]) / float(other_l["amount"])
                            if other_u >= target_resell:
                                continue
                            if other_u <= p0 * 1.02:
                                continue
                            other_add = other_l.get("additional") or {}
                            other_q = other_add.get("qlt", 0) or 0
                            other_p = other_add.get("ptn", 0) or 0

                            is_superior = (other_p > cur_p and other_q >= cur_q - 1) or (other_q > cur_q and other_p >= cur_p)
                            is_same_competing = (other_q == cur_q and get_ptn_bracket(other_p) == get_ptn_bracket(cur_p))

                            if is_superior or is_same_competing:
                                blocking_prices.append(other_u)

                        if blocking_prices:
                            # Полка сбита более близким/выгодным предложением!
                            lowest_comp = min(blocking_prices)
                            target_resell = min(target_resell, lowest_comp * 0.98)

                        jump1 = round(((target_resell - p0) / p0) * 100)
                        if jump1 >= gap_threshold:
                            cost0 = int(t_lots[0]["buyoutPrice"])
                            net_resell = round(target_resell * 0.95 * t_lots[0]["amount"])
                            profit = net_resell - cost0
                            margin = round((profit / cost0) * 100) if cost0 > 0 else 0
                            if profit >= 3000 and margin >= 7:
                                opportunity = ShelfGapOpportunity(
                                    gap_type="gap_1",
                                    jump_pct=jump1,
                                    entry_unit_price=p0,
                                    target_unit_price=round(target_resell),
                                    total_cost=cost0,
                                    net_profit=profit,
                                    margin_pct=margin,
                                    amount=int(t_lots[0]["amount"]),
                                    tier_label=format_tier_name(t_key[0], t_key[1], is_proto=is_proto),
                                    tier_avg=t_avg,
                                    tier_ceil=t_ceil,
                                    lot_start_time=t_lots[0].get("startTime", ""),
                                    lot_buyer=(t_lots[0].get("additional") or {}).get("buyer", "") or t_lots[0].get("buyer", ""),
                                    lots_detail=[{
                                        "rank": 1,
                                        "buyout": cost0,
                                        "amount": int(t_lots[0]["amount"]),
                                        "unit_price": p0,
                                        "qlt": t_key[0],
                                        "ptn": (t_lots[0].get("additional") or {}).get("ptn", 0) or 0
                                    }]
                                )
                                break

                    if not opportunity and len(t_lots) >= 3:
                        p0 = float(t_lots[0]["buyoutPrice"]) / float(t_lots[0]["amount"])
                        p1 = float(t_lots[1]["buyoutPrice"]) / float(t_lots[1]["amount"])
                        p2 = float(t_lots[2]["buyoutPrice"]) / float(t_lots[2]["amount"])
                        raw_jump2 = round(((p2 - p1) / p1) * 100) if p1 > 0 else 0
                        if raw_jump2 >= gap_threshold and p1 <= (t_avg * 1.08) and (p1 <= p0 * 1.10):
                            target_resell = min(p2, t_ceil) if t_ceil > 0 else p2
                            cur_q = t_key[0]
                            cur_p = (t_lots[0].get("additional") or {}).get("ptn", 0) or 0
                            blocking_prices = []
                            for other_l in sorted_lots:
                                other_u = float(other_l["buyoutPrice"]) / float(other_l["amount"])
                                if other_u >= target_resell:
                                    continue
                                if other_u <= p1 * 1.02:
                                    continue
                                other_add = other_l.get("additional") or {}
                                other_q = other_add.get("qlt", 0) or 0
                                other_p = other_add.get("ptn", 0) or 0
                                is_superior = (other_p > cur_p and other_q >= cur_q - 1) or (other_q > cur_q and other_p >= cur_p)
                                is_same_competing = (other_q == cur_q and get_ptn_bracket(other_p) == get_ptn_bracket(cur_p))
                                if is_superior or is_same_competing:
                                    blocking_prices.append(other_u)

                            if blocking_prices:
                                lowest_comp = min(blocking_prices)
                                target_resell = min(target_resell, lowest_comp * 0.98)

                            jump2 = round(((target_resell - p1) / p1) * 100)
                            if jump2 >= gap_threshold:
                                cost_both = int(t_lots[0]["buyoutPrice"]) + int(t_lots[1]["buyoutPrice"])
                                amt_both = int(t_lots[0]["amount"]) + int(t_lots[1]["amount"])
                                net_resell = round(target_resell * 0.95 * amt_both)
                                profit = net_resell - cost_both
                                margin = round((profit / cost_both) * 100) if cost_both > 0 else 0
                                if profit >= 5000 and margin >= 7:
                                    opportunity = ShelfGapOpportunity(
                                        gap_type="wall_2",
                                        jump_pct=jump2,
                                        entry_unit_price=p0,
                                        target_unit_price=round(target_resell),
                                        total_cost=cost_both,
                                        net_profit=profit,
                                        margin_pct=margin,
                                        amount=amt_both,
                                        tier_label=format_tier_name(t_key[0], t_key[1], is_proto=is_proto),
                                        tier_avg=t_avg,
                                        tier_ceil=t_ceil,
                                        lot_start_time=t_lots[0].get("startTime", ""),
                                        lot_buyer=(t_lots[0].get("additional") or {}).get("buyer", "") or t_lots[0].get("buyer", ""),
                                        lots_detail=[
                                            {
                                                "rank": 1,
                                                "buyout": int(t_lots[0]["buyoutPrice"]),
                                                "amount": int(t_lots[0]["amount"]),
                                                "unit_price": p0,
                                                "qlt": t_key[0],
                                                "ptn": (t_lots[0].get("additional") or {}).get("ptn", 0) or 0
                                            },
                                            {
                                                "rank": 2,
                                                "buyout": int(t_lots[1]["buyoutPrice"]),
                                                "amount": int(t_lots[1]["amount"]),
                                                "unit_price": p1,
                                                "qlt": t_key[0],
                                                "ptn": (t_lots[1].get("additional") or {}).get("ptn", 0) or 0
                                            }
                                        ]
                                    )
                                    break
            else:
                unit_prices = [float(l["buyoutPrice"]) / float(l["amount"]) for l in sorted_lots]
                if len(unit_prices) >= 2:
                    p0, p1 = unit_prices[0], unit_prices[1]
                    amt0 = int(sorted_lots[0]["amount"])
                    # Учет лимита 25 слотов аукциона: большие паки расходников/протоартов продаются стеками с дисконтом
                    bulk_mult = 0.90 if 25 < amt0 <= 100 else (0.85 if amt0 > 100 else 1.0)
                    adj_p1 = p1 * bulk_mult
                    if p1 <= ceiling and p0 <= (avg_price * 1.05):
                        jump1 = round(((adj_p1 - p0) / p0) * 100)
                        if jump1 >= gap_threshold:
                            cost0 = int(sorted_lots[0]["buyoutPrice"])
                            target_resell = min(adj_p1, ceiling)
                            net_resell = round(target_resell * 0.95 * amt0)
                            profit = net_resell - cost0
                            margin = round((profit / cost0) * 100) if cost0 > 0 else 0
                            if profit >= 2500 and margin >= 7:
                                opportunity = ShelfGapOpportunity(
                                    gap_type="gap_1",
                                    jump_pct=jump1,
                                    entry_unit_price=p0,
                                    target_unit_price=round(target_resell),
                                    total_cost=cost0,
                                    net_profit=profit,
                                    margin_pct=margin,
                                    amount=amt0,
                                    tier_avg=avg_price,
                                    tier_ceil=ceiling,
                                    lot_start_time=sorted_lots[0].get("startTime", ""),
                                    lot_buyer=(sorted_lots[0].get("additional") or {}).get("buyer", "") or sorted_lots[0].get("buyer", ""),
                                    lots_detail=[{
                                        "rank": 1,
                                        "buyout": cost0,
                                        "amount": amt0,
                                        "unit_price": p0
                                    }]
                                )

                if not opportunity and len(unit_prices) >= 3:
                    p0, p1, p2 = unit_prices[0], unit_prices[1], unit_prices[2]
                    amt_both = int(sorted_lots[0]["amount"]) + int(sorted_lots[1]["amount"])
                    bulk_mult2 = 0.90 if 25 < amt_both <= 100 else (0.85 if amt_both > 100 else 1.0)
                    adj_p2 = p2 * bulk_mult2
                    if p2 <= ceiling and p1 <= (avg_price * 1.08) and (p1 <= p0 * 1.10):
                        jump2 = round(((adj_p2 - p1) / p1) * 100)
                        if jump2 >= gap_threshold:
                            cost_both = int(sorted_lots[0]["buyoutPrice"]) + int(sorted_lots[1]["buyoutPrice"])
                            target_resell = min(adj_p2, ceiling)
                            net_resell = round(target_resell * 0.95 * amt_both)
                            profit = net_resell - cost_both
                            margin = round((profit / cost_both) * 100) if cost_both > 0 else 0
                            if profit >= 5000 and margin >= 7:
                                opportunity = ShelfGapOpportunity(
                                    gap_type="wall_2",
                                    jump_pct=jump2,
                                    entry_unit_price=p0,
                                    target_unit_price=round(target_resell),
                                    total_cost=cost_both,
                                    net_profit=profit,
                                    margin_pct=margin,
                                    amount=amt_both,
                                    tier_avg=avg_price,
                                    tier_ceil=ceiling,
                                    lot_start_time=sorted_lots[0].get("startTime", ""),
                                    lot_buyer=(sorted_lots[0].get("additional") or {}).get("buyer", "") or sorted_lots[0].get("buyer", ""),
                                    lots_detail=[
                                        {
                                            "rank": 1,
                                            "buyout": int(sorted_lots[0]["buyoutPrice"]),
                                            "amount": int(sorted_lots[0]["amount"]),
                                            "unit_price": p0
                                        },
                                        {
                                            "rank": 2,
                                            "buyout": int(sorted_lots[1]["buyoutPrice"]),
                                            "amount": int(sorted_lots[1]["amount"]),
                                            "unit_price": p1
                                        }
                                    ]
                                )

            for idx, l in enumerate(sorted_lots):
                u = round(float(l["buyoutPrice"]) / float(l["amount"]))
                add_dict = l.get("additional") or {}
                l_qlt = add_dict.get("qlt", 0) or 0
                l_ptn = add_dict.get("ptn", 0) or 0
                l_tier = (int(l_qlt), get_ptn_bracket(l_ptn))
                t_stat = tier_stats_map.get(l_tier) if is_tiered else None
                t_avg = t_stat["avg_price"] if t_stat else (avg_price if not is_tiered else 0)
                t_ceil = t_stat["ceiling"] if t_stat else ceiling
                is_anom = u > t_ceil if t_ceil > 0 else False

                is_gap = False
                gap_pct = 0
                if idx > 0 and not is_anom:
                    prev_l = sorted_lots[idx - 1]
                    prev_tier = (int(prev_l.get("additional", {}).get("qlt", 0) or 0), get_ptn_bracket(prev_l.get("additional", {}).get("ptn", 0) or 0))
                    if not is_tiered or prev_tier == l_tier:
                        prev_u = float(prev_l["buyoutPrice"]) / float(prev_l["amount"])
                        if prev_u > 0:
                            pct = round(((u - prev_u) / prev_u) * 100)
                            if pct >= gap_threshold:
                                is_gap = True
                                gap_pct = pct

                formatted_lots.append({
                    "buyout": int(l.get("buyoutPrice", 0)),
                    "bid": int(l.get("currentPrice") or l.get("startPrice") or 0),
                    "price": u,
                    "amount": int(l["amount"]),
                    "isGap": is_gap,
                    "gapPct": gap_pct,
                    "isAnomaly": is_anom,
                    "qlt": l_qlt,
                    "ptn": l_ptn,
                    "stats_random": add_dict.get("stats_random"),
                    "bonus_properties": add_dict.get("bonus_properties", []),
                    "ndmg": add_dict.get("ndmg"),
                    "tier_avg": t_avg,
                    "tier_label": format_tier_name(l_qlt, get_ptn_bracket(l_ptn), is_proto=is_proto) if is_tiered else "",
                    "startTime": l.get("startTime", ""),
                    "endTime": l.get("endTime", ""),
                    "buyer": add_dict.get("buyer", "") or l.get("buyer", "")
                })

        return MarketAnalytics(
            item_id=item_id,
            item_name=clean_item_name,
            category=category,
            region=region,
            avg_price=hist_cache["avg_price"],
            median_price=hist_cache["median_price"],
            min_price=hist_cache["min_price"],
            max_price=hist_cache["max_price"],
            realistic_ceiling=hist_cache["ceiling"],
            sales_count=hist_cache["sales_count"],
            days_span=hist_cache["days_span"],
            sales_per_day=hist_cache["sales_per_day"],
            liquidity_tier=hist_cache["liq_tier"],
            liquidity_text=hist_cache["liq_text"],
            best_unit_price=best_u,
            best_amount=best_amt,
            best_buyout=int(sorted_lots[0]["buyoutPrice"]) if sorted_lots else 0,
            discount_pct=discount_pct,
            lots=formatted_lots,
            history=hist_cache["history"],
            weekly_cycles=hist_cache["cycles"],
            gap_opportunity=opportunity,
            discount_opportunities=discount_opportunities,
            is_tiered=is_tiered,
            matched_tier_label=matched_tier_label,
            matched_tier_avg=matched_tier_avg,
            tier_stats_map=tier_stats_map
        )

    async def get_top_market_deals(self, region: str) -> Dict[str, Any]:
        """
        Комплексный снайпер рынка:
        1. Находит лучшие сделки на СЕГОДНЯ (быстрый флип, высокая скорость продаж, высокий спред).
        2. Находит лучшие сделки на НЕДЕЛЮ (свинг: покупка на локальном дне, продажа на пике в Сб/Вс на КВ).
        """
        import time
        from config import MONITORED_ITEMS

        now_epoch = time.time()
        # Кэш на 45 секунд для защиты от флуда
        cached = self._top_deals_cache.get(region)
        if cached and (now_epoch - cached[0]) < 45.0:
            return cached[1]

        now_msk = datetime.utcnow() + timedelta(hours=3)
        now_weekday = now_msk.weekday()

        today_candidates = []
        weekly_candidates = []

        async def fetch_item_analytics(it):
            # Skip generic multi-tier wrapper if specific rarity variants are already monitored
            if it.get("id") == "dm6l2":
                return None
            try:
                return await self.analyze(
                    region=region,
                    item_id=it["id"],
                    item_name=it["name"],
                    category=it["category"]
                )
            except Exception:
                return None

        all_analytics = await asyncio.gather(*[fetch_item_analytics(it) for it in MONITORED_ITEMS])

        for an in all_analytics:
            try:
                if not an or not an.lots:
                    continue

                if an.is_tiered:
                    # Scan active lots to find genuine flips matched by quality and upgrade level
                    for lot in an.lots:
                        l_tier_avg = lot.get("tier_avg", 0)
                        if l_tier_avg <= 0:
                            continue
                        calc = calculate_realistic_resell(an, lot, an.lots)
                        if not calc["is_profitable"] or an.sales_per_day < 3:
                            continue

                        t_label = lot.get("tier_label", "")
                        display_name = f"{an.item_name} [{t_label}]" if t_label else an.item_name

                        if an.sales_per_day >= 50:
                            est_time = "~1–2 часа"
                        elif an.sales_per_day >= 20:
                            est_time = "~2–4 часа"
                        else:
                            est_time = "в течение дня"

                        today_candidates.append({
                            "id": an.item_id,
                            "name": display_name,
                            "raw_name": an.item_name,
                            "tier_label": t_label,
                            "category": an.category,
                            "buyout": calc["total_buyout"],
                            "unit_price": calc["unit_buyout"],
                            "amount": calc["amount"],
                            "resell_unit": calc["realistic_unit"],
                            "resell_total": calc["gross_resell"],
                            "fee": calc["tax_fee"],
                            "net_profit": calc["net_profit"],
                            "margin_pct": calc["margin_pct"],
                            "sales_per_day": an.sales_per_day,
                            "est_time": est_time,
                            "is_bulk": calc["is_bulk"],
                            "slots_needed": calc["slots_needed"],
                            "batch_size": calc["batch_size"]
                        })
                        break
                else:
                    if an.avg_price <= 0:
                        continue
                    # 1. Анализ для БЫСТРОГО ФЛИПА НА СЕГОДНЯ (Интрадей) с учетом лимита 25 слотов и оптовой перепродажи
                    first_lot = an.lots[0]
                    calc = calculate_realistic_resell(an, first_lot, an.lots)
                    if calc["is_profitable"] and an.sales_per_day >= 8:
                        if an.sales_per_day >= 50:
                            est_time = "~1–2 часа"
                        elif an.sales_per_day >= 20:
                            est_time = "~2–4 часа"
                        else:
                            est_time = "в течение дня"

                        today_candidates.append({
                            "id": an.item_id,
                            "name": an.item_name,
                            "raw_name": an.item_name,
                            "tier_label": "",
                            "category": an.category,
                            "buyout": calc["total_buyout"],
                            "unit_price": calc["unit_buyout"],
                            "amount": calc["amount"],
                            "resell_unit": calc["realistic_unit"],
                            "resell_total": calc["gross_resell"],
                            "fee": calc["tax_fee"],
                            "net_profit": calc["net_profit"],
                            "margin_pct": calc["margin_pct"],
                            "sales_per_day": an.sales_per_day,
                            "est_time": est_time,
                            "is_bulk": calc["is_bulk"],
                            "slots_needed": calc["slots_needed"],
                            "batch_size": calc["batch_size"]
                        })

                # 2. Анализ для СВИНГА НА НЕДЕЛЮ (по недельным циклам) - только для однородных товаров (не артефактов)
                if not an.is_tiered and an.weekly_cycles and len(an.weekly_cycles) >= 7:
                    peak_cycle = max(an.weekly_cycles, key=lambda c: c.get("avg", 0))
                    min_cycle = min(an.weekly_cycles, key=lambda c: c.get("avg", 0))

                    peak_price = peak_cycle.get("avg", 0)
                    min_price = min_cycle.get("avg", 0)

                    # Если текущая цена покупки ниже пика
                    if an.best_unit_price <= (an.avg_price * 1.05) and peak_price > an.best_unit_price:
                        weekly_gross = peak_price
                        weekly_net = round(weekly_gross * 0.95)
                        weekly_profit_unit = weekly_net - an.best_unit_price
                        weekly_roi = round((weekly_profit_unit / an.best_unit_price) * 100) if an.best_unit_price > 0 else 0

                        # Профит от 10 000 руб или маржа от 12%
                        if weekly_roi >= 12 and weekly_profit_unit >= 10000:
                            weekly_candidates.append({
                                "id": an.item_id,
                                "name": an.item_name,
                                "raw_name": an.item_name,
                                "tier_label": "",
                                "category": an.category,
                                "current_buy_unit": an.best_unit_price,
                                "amount": an.best_amount,
                                "total_cost": an.best_unit_price * an.best_amount,
                                "peak_price_unit": peak_price,
                                "weekly_roi": weekly_roi,
                                "weekly_profit_unit": weekly_profit_unit,
                                "peak_day_name": peak_cycle.get("day_full", "Выходные"),
                                "peak_time_slot": peak_cycle.get("peak_sell_name", "Вечер (18:00 - 00:00)"),
                                "is_best_buy_day": (min_cycle.get("day_idx") == now_weekday)
                            })
            except Exception:
                pass

        # Сортировка по привлекательности
        today_candidates.sort(key=lambda x: (x["net_profit"] * 0.6 + x["margin_pct"] * 2500), reverse=True)
        weekly_candidates.sort(key=lambda x: (1 if x["is_best_buy_day"] else 0, x["weekly_roi"]), reverse=True)

        res = {
            "today_flips": today_candidates,
            "weekly_swings": weekly_candidates,
            "scanned_at": now_msk.strftime("%d.%m.%Y %H:%M")
        }
        self._top_deals_cache[region] = (now_epoch, res)
        return res

market_analyzer = MarketAnalyzer()
