import asyncio
import json
import os
import sys
from datetime import datetime, timedelta, timezone

if sys.platform == "win32":
    try:
        sys.stdout.reconfigure(encoding="utf-8", errors="replace")
    except Exception:
        pass

ROOT_DIR = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
sys.path.insert(0, ROOT_DIR)

from config import MONITORED_ITEMS, SUPPORTED_REGIONS, settings
from core.exbo_api import exbo_client
from core.market_analyzer import market_analyzer

PUBLIC_DIR = os.path.join(ROOT_DIR, "public")


async def refresh_region(reg_code: str):
    reg_meta = SUPPORTED_REGIONS.get(reg_code, {"name": reg_code.upper(), "flag": "🌐"})
    file_name = "data.json" if reg_code == "ru" else f"data_{reg_code}.json"
    out_path = os.path.join(PUBLIC_DIR, file_name)

    print("=" * 60)
    print(f"  REFRESHING LIVE MARKET DATA: {reg_code.upper()} ({reg_meta['name']})")
    print("=" * 60)

    old_items_map = {}
    if os.path.exists(out_path):
        try:
            with open(out_path, "r", encoding="utf-8") as f:
                old_data = json.load(f)
                for it in old_data.get("items", []):
                    old_items_map[it["id"]] = it
        except Exception:
            pass

    sem = asyncio.Semaphore(15)

    async def fetch_single_item(item_info):
        item_id = item_info["id"]
        item_name = item_info["name"]
        cat = item_info["category"]

        async with sem:
            try:
                an = await market_analyzer.analyze(
                    region=reg_code,
                    item_id=item_id,
                    item_name=item_name,
                    category=cat,
                    force_fresh_history=True,
                )

                if not an:
                    return old_items_map.get(item_id)

                raw_hist = an.history or []
                live_points = []
                for h in raw_hist:
                    try:
                        dt = datetime.fromisoformat(h["time"].replace("Z", "+00:00")) + timedelta(hours=3)
                        dt_naive = dt.replace(tzinfo=None)
                        u_price = round(float(h["price"]) / max(1, float(h["amount"])))
                        live_points.append({
                            "dt": dt_naive,
                            "time": dt_naive.strftime("%d.%m %H:%M"),
                            "price": u_price,
                        })
                    except Exception:
                        pass

                old_points = []
                if item_id in old_items_map:
                    for h in old_items_map[item_id].get("history", []):
                        try:
                            t_str = h["time"]
                            year = datetime.now(timezone.utc).year
                            dt = datetime.strptime(f"{year}.{t_str}", "%Y.%d.%m %H:%M")
                            old_points.append({"dt": dt, "time": t_str, "price": h["price"]})
                        except Exception:
                            pass

                all_points = old_points + live_points
                all_points.sort(key=lambda p: p["dt"])

                seen_dict = {}
                for p in all_points:
                    seen_dict[p["time"]] = p
                deduped = list(seen_dict.values())
                deduped.sort(key=lambda p: p["dt"])

                target_count = 100
                if len(deduped) > target_count:
                    step = (len(deduped) - 1) / (target_count - 1)
                    sampled = [deduped[int(round(i * step))] for i in range(target_count)]
                    sampled[0] = deduped[0]
                    sampled[-1] = deduped[-1]
                else:
                    sampled = deduped

                final_history = [{"time": p["time"], "price": p["price"]} for p in sampled]

                return {
                    "id": an.item_id,
                    "name": an.item_name,
                    "category": an.category,
                    "bestPrice": an.best_unit_price,
                    "amount": an.best_amount,
                    "bestBuyout": an.best_buyout,
                    "avgPrice": an.avg_price,
                    "medianPrice": an.median_price,
                    "minPrice": an.min_price,
                    "maxPrice": an.max_price,
                    "ceiling": an.realistic_ceiling,
                    "discount": an.discount_pct,
                    "liquidity": an.liquidity_text,
                    "salesPerDay": an.sales_per_day,
                    "lots": an.lots,
                    "history": final_history,
                    "weeklyCycles": an.weekly_cycles,
                }
            except Exception as e:
                print(f"[WARN] {reg_code}/{item_id}: {e}")
                return old_items_map.get(item_id)

    tasks = [fetch_single_item(it) for it in MONITORED_ITEMS]
    results = await asyncio.gather(*tasks)
    updated_items = [r for r in results if r is not None]

    now_msk = datetime.now(timezone.utc) + timedelta(hours=3)
    export_obj = {
        "updatedAt": now_msk.strftime("%Y-%m-%d %H:%M:%S"),
        "updatedAtEpoch": int(datetime.now(timezone.utc).timestamp()),
        "region": reg_code,
        "regionName": reg_meta["name"],
        "regionFlag": reg_meta["flag"],
        "items": updated_items,
    }

    os.makedirs(PUBLIC_DIR, exist_ok=True)
    with open(out_path, "w", encoding="utf-8") as f:
        json.dump(export_obj, f, ensure_ascii=False, separators=(",", ":"))
    size_kb = os.path.getsize(out_path) / 1024
    print(f"[SAVED] {out_path} ({len(updated_items)} items, {size_kb:.1f} KB)")


async def refresh_all():
    if not settings.EXBO_CLIENT_ID or not settings.EXBO_CLIENT_SECRET:
        print("[SKIP] EXBO_CLIENT_ID / EXBO_CLIENT_SECRET not configured. Keeping existing snapshots.")
        return

    try:
        for reg in SUPPORTED_REGIONS.keys():
            await refresh_region(reg)
    finally:
        await exbo_client.close()


if __name__ == "__main__":
    asyncio.run(refresh_all())
