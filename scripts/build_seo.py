import html
import json
import os
import sys
import urllib.parse
from datetime import datetime, timezone

if sys.platform == "win32":
    try:
        sys.stdout.reconfigure(encoding="utf-8", errors="replace")
    except Exception:
        pass

ROOT_DIR = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
sys.path.insert(0, ROOT_DIR)

from config import MONITORED_ITEMS, SELLER_CONTACTS, settings

PUBLIC_DIR = os.path.join(ROOT_DIR, "public")
ITEMS_DIR = os.path.join(PUBLIC_DIR, "items")


def fmt_price(val) -> str:
    if not val or val <= 0:
        return "—"
    return f"{int(round(val)):,}".replace(",", " ") + " ₽"


def load_region_map(filename: str) -> tuple[dict, str]:
    path = os.path.join(PUBLIC_DIR, filename)
    if not os.path.exists(path):
        return {}, ""
    with open(path, "r", encoding="utf-8") as f:
        data = json.load(f)
    items_map = {it["id"]: it for it in data.get("items", [])}
    return items_map, data.get("updatedAt", "")


def minify_existing_json(filename: str):
    path = os.path.join(PUBLIC_DIR, filename)
    if not os.path.exists(path):
        return
    with open(path, "r", encoding="utf-8") as f:
        data = json.load(f)
    with open(path, "w", encoding="utf-8") as f:
        json.dump(data, f, ensure_ascii=False, separators=(",", ":"))


def build_tg_order_link(item_name: str, region: str = "RU") -> str:
    msg = f"Привет! Хочу заказать предмет «{item_name}» в STALZONE (сервер {region}). Подскажи актуальную цену?"
    return f"{SELLER_CONTACTS['telegram_url']}?text={urllib.parse.quote(msg)}"


def render_item_page(item_meta: dict, ru: dict | None, eu: dict | None, na: dict | None, updated_at: str, site_url: str) -> str:
    item_id = item_meta["id"]
    name = item_meta["name"]
    category = item_meta["category"]
    safe_name = html.escape(name)
    safe_cat = html.escape(category)

    ru_best = fmt_price(ru.get("bestPrice") if ru else 0)
    ru_med = fmt_price(ru.get("medianPrice") if ru else 0)
    ru_avg = fmt_price(ru.get("avgPrice") if ru else 0)
    ru_disc = (ru.get("discount", 0) if ru else 0)
    ru_liq = html.escape(str(ru.get("liquidity", "—"))) if ru else "—"

    eu_best = fmt_price(eu.get("bestPrice") if eu else 0)
    eu_med = fmt_price(eu.get("medianPrice") if eu else 0)
    na_best = fmt_price(na.get("bestPrice") if na else 0)

    canonical = f"{site_url.rstrip('/')}/items/{item_id}.html"
    tg_ru = build_tg_order_link(name, "RU")
    tg_eu = build_tg_order_link(name, "EU")
    funpay = SELLER_CONTACTS["funpay_url"]
    discord = SELLER_CONTACTS["discord_handle"]

    desc = (
        f"Актуальная цена {name} на аукционе STALZONE (STALCRAFT: X): "
        f"RU от {ru_best} (медиана {ru_med}), EU от {eu_best}. "
        f"Живой график цен, биржевой стакан и быстрый заказ предмета напрямую."
    )

    return f"""<!DOCTYPE html>
<html lang="ru">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>{safe_name} — цена на аукционе STALZONE (STALCRAFT) RU / EU / NA</title>
  <meta name="description" content="{html.escape(desc)}">
  <meta name="keywords" content="{safe_name}, цена {safe_name}, stalzone аукцион, stalcraft аукцион, купить {safe_name}, {safe_cat}">
  <link rel="canonical" href="{canonical}">
  <meta property="og:title" content="{safe_name} — цена STALZONE ({ru_best})">
  <meta property="og:description" content="{html.escape(desc)}">
  <meta property="og:type" content="website">
  <meta property="og:url" content="{canonical}">
  <style>
    * {{ box-sizing: border-box; margin: 0; padding: 0; }}
    body {{
      font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
      background: #0b0f19;
      color: #e2e8f0;
      line-height: 1.55;
      padding: 20px 14px 48px;
    }}
    .wrap {{ max-width: 920px; margin: 0 auto; }}
    .crumb {{ font-size: 13px; color: #94a3b8; margin-bottom: 16px; display: flex; gap: 8px; flex-wrap: wrap; }}
    .crumb a {{ color: #38bdf8; text-decoration: none; }}
    .crumb a:hover {{ text-decoration: underline; }}
    .hero {{
      background: linear-gradient(135deg, #111827, #151f33);
      border: 1px solid #1f2d4d;
      border-radius: 16px;
      padding: 22px;
      margin-bottom: 18px;
    }}
    .cat-pill {{
      display: inline-block;
      font-size: 12px;
      font-weight: 600;
      padding: 4px 10px;
      border-radius: 999px;
      background: rgba(56, 189, 248, 0.14);
      color: #38bdf8;
      margin-bottom: 10px;
    }}
    h1 {{ font-size: 26px; color: #fff; margin-bottom: 8px; }}
    .sub {{ color: #94a3b8; font-size: 14px; }}
    .grid {{
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
      gap: 12px;
      margin: 18px 0;
    }}
    .card {{
      background: #111827;
      border: 1px solid #1f2d4d;
      border-radius: 14px;
      padding: 16px;
    }}
    .card-label {{ font-size: 12px; color: #94a3b8; margin-bottom: 6px; }}
    .card-val {{ font-size: 22px; font-weight: 800; color: #fff; }}
    .green {{ color: #10b981; }}
    .yellow {{ color: #f59e0b; }}
    .blue {{ color: #38bdf8; }}
    .card-sub {{ font-size: 12px; color: #64748b; margin-top: 4px; }}
    .actions {{
      display: flex;
      flex-wrap: wrap;
      gap: 10px;
      margin-top: 18px;
    }}
    .btn {{
      display: inline-flex;
      align-items: center;
      justify-content: center;
      gap: 8px;
      padding: 12px 18px;
      border-radius: 12px;
      font-weight: 700;
      font-size: 14px;
      text-decoration: none;
      cursor: pointer;
      border: none;
      transition: transform 0.15s ease, opacity 0.15s ease;
    }}
    .btn:hover {{ transform: translateY(-1px); opacity: 0.94; }}
    .btn-primary {{ background: linear-gradient(135deg, #2563eb, #0284c7); color: #fff; }}
    .btn-tg {{ background: linear-gradient(135deg, #0ea5e9, #0284c7); color: #fff; }}
    .btn-fp {{ background: linear-gradient(135deg, #10b981, #059669); color: #fff; }}
    .btn-dc {{ background: #5865F2; color: #fff; }}
    .order-box {{
      background: linear-gradient(135deg, rgba(16, 185, 129, 0.12), rgba(14, 165, 233, 0.10));
      border: 1px solid rgba(16, 185, 129, 0.35);
      border-radius: 16px;
      padding: 20px;
      margin: 18px 0;
    }}
    .order-box h2 {{ font-size: 18px; color: #fff; margin-bottom: 6px; }}
    .order-box p {{ font-size: 14px; color: #cbd5e1; margin-bottom: 14px; }}
    .seo-text {{
      background: #111827;
      border: 1px solid #1f2d4d;
      border-radius: 14px;
      padding: 18px;
      font-size: 14px;
      color: #94a3b8;
    }}
    .seo-text h3 {{ color: #e2e8f0; font-size: 16px; margin-bottom: 8px; }}
    .footer {{ margin-top: 24px; text-align: center; font-size: 12px; color: #64748b; }}
  </style>
</head>
<body>
  <div class="wrap">
    <nav class="crumb">
      <a href="../index.html">⚡ STALZONE Terminal</a>
      <span>/</span>
      <a href="../catalog.html">Каталог предметов</a>
      <span>/</span>
      <span>{safe_name}</span>
    </nav>

    <section class="hero">
      <span class="cat-pill">{safe_cat}</span>
      <h1>{safe_name} — цена на аукционе STALZONE</h1>
      <p class="sub">Мониторинг аукциона STALZONE (STALCRAFT: X) 24/7 по серверам RU, EU и NA. Обновлено: {html.escape(updated_at or 'недавно')} МСК.</p>
      <div class="actions">
        <a class="btn btn-primary" href="../index.html?region=ru&item={item_id}">📈 Открыть график и стакан (RU)</a>
        <a class="btn btn-primary" style="background:#1e293b; border:1px solid #334155;" href="../index.html?region=eu&item={item_id}">🇪🇺 График EU</a>
        <a class="btn btn-primary" style="background:#1e293b; border:1px solid #334155;" href="../index.html?region=na&item={item_id}">🇺🇸 График NA</a>
      </div>
    </section>

    <section class="grid">
      <div class="card">
        <div class="card-label">🇷🇺 RU — Минимальный лот</div>
        <div class="card-val green">{ru_best}</div>
        <div class="card-sub">Скидка от рынка: {ru_disc}%</div>
      </div>
      <div class="card">
        <div class="card-label">🇷🇺 RU — Медиана / Средняя</div>
        <div class="card-val yellow">{ru_med}</div>
        <div class="card-sub">Средняя (30д): {ru_avg}</div>
      </div>
      <div class="card">
        <div class="card-label">🇪🇺 EU — Минимальный лот</div>
        <div class="card-val blue">{eu_best}</div>
        <div class="card-sub">Медиана EU: {eu_med}</div>
      </div>
      <div class="card">
        <div class="card-label">🇺🇸 NA / Ликвидность RU</div>
        <div class="card-val">{na_best}</div>
        <div class="card-sub">{ru_liq}</div>
      </div>
    </section>

    <section class="order-box">
      <h2>⚡ Заказать «{safe_name}» в STALZONE</h2>
      <p>Нужен этот предмет быстро на сервере RU или EU без долгого фарма и переплат на аукционе? Напишите напрямую или оформите безопасную сделку через FunPay:</p>
      <div class="actions">
        <a class="btn btn-tg" href="{tg_ru}" target="_blank" rel="noopener">✈️ Заказать в Telegram ({SELLER_CONTACTS['telegram_handle']})</a>
        <a class="btn btn-fp" href="{funpay}" target="_blank" rel="noopener">🛡 Купить через FunPay</a>
        <button class="btn btn-dc" type="button" onclick="navigator.clipboard.writeText('{discord}').then(()=>alert('Discord ник {discord} скопирован!'))">💬 Discord: {discord}</button>
        <a class="btn" style="background:#1e293b; color:#cbd5e1; border:1px solid #334155;" href="{tg_eu}" target="_blank" rel="noopener">🇪🇺 Order on EU (TG)</a>
      </div>
    </section>

    <section class="seo-text">
      <h3>О рыночной цене «{safe_name}»</h3>
      <p>
        На этой странице отображается актуальная рыночная статистика по предмету <strong>{safe_name}</strong> (категория «{safe_cat}») на аукционе STALZONE (STALCRAFT: X).
        Данные собираются напрямую через официальный EXBO API с очисткой от тролль-цен и учетом 5% комиссии аукциона.
        Для просмотра подробного стакана лотов, истории сделок, заточки/редкости и недельных циклов спроса перейдите в
        <a href="../index.html?region=ru&item={item_id}" style="color:#38bdf8;">интерактивный терминал</a>.
      </p>
    </section>

    <div class="footer">
      STALZONE Market Terminal • Обновляется автоматически 24/7 • <a href="../catalog.html" style="color:#38bdf8;">Все предметы</a>
    </div>
  </div>
</body>
</html>
"""


def render_catalog_page(ru_map: dict, eu_map: dict, updated_at: str, site_url: str) -> str:
    categories: dict[str, list[dict]] = {}
    for it in MONITORED_ITEMS:
        categories.setdefault(it["category"], []).append(it)

    sections_html = []
    for cat, items in categories.items():
        rows = []
        for it in items:
            iid = it["id"]
            name = html.escape(it["name"])
            ru = ru_map.get(iid)
            eu = eu_map.get(iid)
            ru_p = fmt_price(ru.get("bestPrice") if ru else 0)
            eu_p = fmt_price(eu.get("bestPrice") if eu else 0)
            disc = ru.get("discount", 0) if ru else 0
            disc_html = f'<span class="disc">-{disc}%</span>' if disc and disc > 0 else '<span class="muted">0%</span>'
            rows.append(
                f'<tr data-name="{name.lower()}">'
                f'<td><a class="item-link" href="items/{iid}.html">{name}</a></td>'
                f'<td class="green">{ru_p}</td>'
                f'<td class="blue">{eu_p}</td>'
                f'<td>{disc_html}</td>'
                f'<td><a class="mini-btn" href="index.html?region=ru&item={iid}">📈 График</a></td>'
                f'</tr>'
            )
        sections_html.append(
            f'<section class="cat-block">'
            f'<h2>{html.escape(cat)}</h2>'
            f'<div class="tbl-wrap"><table><thead><tr>'
            f'<th>Предмет</th><th>🇷🇺 RU от</th><th>🇪🇺 EU от</th><th>Скидка RU</th><th>Терминал</th>'
            f'</tr></thead><tbody>{"".join(rows)}</tbody></table></div>'
            f'</section>'
        )

    canonical = f"{site_url.rstrip('/')}/catalog.html"
    return f"""<!DOCTYPE html>
<html lang="ru">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Каталог цен аукциона STALZONE (STALCRAFT: X) — RU / EU / NA</title>
  <meta name="description" content="Полный каталог актуальных цен аукциона STALZONE (STALCRAFT): оружие, броня, артефакты, контейнеры, расходники и бартер на серверах RU, EU и NA.">
  <link rel="canonical" href="{canonical}">
  <style>
    * {{ box-sizing: border-box; margin: 0; padding: 0; }}
    body {{
      font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
      background: #0b0f19;
      color: #e2e8f0;
      padding: 20px 14px 48px;
    }}
    .wrap {{ max-width: 1020px; margin: 0 auto; }}
    .top {{
      display: flex; flex-wrap: wrap; justify-content: space-between; align-items: center; gap: 12px;
      margin-bottom: 18px;
    }}
    h1 {{ font-size: 24px; color: #fff; }}
    .sub {{ font-size: 13px; color: #94a3b8; margin-top: 4px; }}
    .top-actions {{ display: flex; gap: 8px; flex-wrap: wrap; }}
    .btn {{
      padding: 10px 14px; border-radius: 10px; font-size: 13px; font-weight: 700;
      text-decoration: none; color: #fff; background: #2563eb;
    }}
    .btn-green {{ background: #059669; }}
    .search {{
      width: 100%; padding: 12px 14px; border-radius: 12px; border: 1px solid #1f2d4d;
      background: #111827; color: #fff; font-size: 14px; margin-bottom: 18px; outline: none;
    }}
    .cat-block {{
      background: #111827; border: 1px solid #1f2d4d; border-radius: 14px;
      padding: 16px; margin-bottom: 16px;
    }}
    .cat-block h2 {{ font-size: 17px; color: #38bdf8; margin-bottom: 12px; }}
    .tbl-wrap {{ overflow-x: auto; }}
    table {{ width: 100%; border-collapse: collapse; font-size: 14px; }}
    th, td {{ text-align: left; padding: 9px 10px; border-bottom: 1px solid #1e293b; }}
    th {{ color: #94a3b8; font-size: 12px; text-transform: uppercase; }}
    .item-link {{ color: #f8fafc; text-decoration: none; font-weight: 600; }}
    .item-link:hover {{ color: #38bdf8; text-decoration: underline; }}
    .green {{ color: #10b981; font-weight: 700; }}
    .blue {{ color: #38bdf8; font-weight: 600; }}
    .disc {{ color: #10b981; font-weight: 700; }}
    .muted {{ color: #64748b; }}
    .mini-btn {{
      display: inline-block; padding: 5px 10px; border-radius: 8px;
      background: #1e293b; color: #cbd5e1; text-decoration: none; font-size: 12px; font-weight: 600;
    }}
    .mini-btn:hover {{ background: #334155; color: #fff; }}
  </style>
</head>
<body>
  <div class="wrap">
    <div class="top">
      <div>
        <h1>⚡ Каталог цен STALZONE (RU / EU / NA)</h1>
        <div class="sub">Обновлено: {html.escape(updated_at or 'недавно')} МСК • {len(MONITORED_ITEMS)} предметов</div>
      </div>
      <div class="top-actions">
        <a class="btn" href="index.html">📊 Открыть терминал</a>
        <a class="btn btn-green" href="{SELLER_CONTACTS['funpay_url']}" target="_blank" rel="noopener">🛡 FunPay</a>
        <a class="btn" style="background:#0284c7;" href="{SELLER_CONTACTS['telegram_url']}" target="_blank" rel="noopener">✈️ Telegram {SELLER_CONTACTS['telegram_handle']}</a>
      </div>
    </div>

    <input id="q" class="search" type="search" placeholder="🔍 Поиск предмета (например: Альбатрос, Призма, SCAR-H, Берлога)...">

    {"".join(sections_html)}
  </div>
  <script>
    const q = document.getElementById('q');
    q.addEventListener('input', () => {{
      const val = q.value.trim().toLowerCase();
      document.querySelectorAll('tbody tr').forEach(tr => {{
        tr.style.display = (!val || tr.dataset.name.includes(val)) ? '' : 'none';
      }});
      document.querySelectorAll('.cat-block').forEach(sec => {{
        const vis = [...sec.querySelectorAll('tbody tr')].some(tr => tr.style.display !== 'none');
        sec.style.display = vis ? '' : 'none';
      }});
    }});
  </script>
</body>
</html>
"""


def main():
    site_url = os.environ.get("SITE_URL") or settings.SITE_URL
    site_url = site_url.rstrip("/")

    # Minify regional JSON snapshots so bandwidth is tiny
    for fn in ("data.json", "data_eu.json", "data_na.json"):
        minify_existing_json(fn)

    ru_map, updated_at = load_region_map("data.json")
    eu_map, eu_upd = load_region_map("data_eu.json")
    na_map, _ = load_region_map("data_na.json")
    updated_at = updated_at or eu_upd

    os.makedirs(ITEMS_DIR, exist_ok=True)
    today_iso = datetime.now(timezone.utc).strftime("%Y-%m-%d")

    urls = [
        (f"{site_url}/", "1.0", "hourly"),
        (f"{site_url}/catalog.html", "0.9", "hourly"),
    ]

    for item_meta in MONITORED_ITEMS:
        iid = item_meta["id"]
        page_html = render_item_page(
            item_meta=item_meta,
            ru=ru_map.get(iid),
            eu=eu_map.get(iid),
            na=na_map.get(iid),
            updated_at=updated_at,
            site_url=site_url,
        )
        with open(os.path.join(ITEMS_DIR, f"{iid}.html"), "w", encoding="utf-8") as f:
            f.write(page_html)
        urls.append((f"{site_url}/items/{iid}.html", "0.8", "hourly"))

    catalog_html = render_catalog_page(ru_map, eu_map, updated_at, site_url)
    with open(os.path.join(PUBLIC_DIR, "catalog.html"), "w", encoding="utf-8") as f:
        f.write(catalog_html)

    sitemap_entries = "\n".join(
        f"  <url><loc>{u}</loc><lastmod>{today_iso}</lastmod><changefreq>{freq}</changefreq><priority>{prio}</priority></url>"
        for u, prio, freq in urls
    )
    sitemap_xml = (
        '<?xml version="1.0" encoding="UTF-8"?>\n'
        '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n'
        f"{sitemap_entries}\n"
        "</urlset>\n"
    )
    with open(os.path.join(PUBLIC_DIR, "sitemap.xml"), "w", encoding="utf-8") as f:
        f.write(sitemap_xml)

    robots_txt = f"User-agent: *\nAllow: /\n\nSitemap: {site_url}/sitemap.xml\n"
    with open(os.path.join(PUBLIC_DIR, "robots.txt"), "w", encoding="utf-8") as f:
        f.write(robots_txt)

    print(f"[SEO] Generated {len(MONITORED_ITEMS)} item pages, catalog.html, sitemap.xml, and robots.txt for {site_url}")


if __name__ == "__main__":
    main()
