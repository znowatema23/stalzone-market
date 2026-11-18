# ⚡ STALZONE Market Web — Открытый сайт-терминал (24/7 бесплатно)

Публичная веб-версия аукционного терминала STALZONE (STALCRAFT: X) по серверам **RU / EU / NA**:
- Без привязки к Telegram и без платного VPS (0 ₽ в месяц, 24/7).
- Автоматическое обновление цен каждые 30 минут через GitHub Actions + EXBO API.
- Автогенерация SEO-страниц под каждый предмет (`public/items/*.html`), каталога (`public/catalog.html`) и `sitemap.xml` для Google/Яндекса.
- Встроенные кнопки заказа предметов на ваши контакты: **Telegram (`@polvifp`)**, **FunPay** и **Discord (`angwyttl`)**.
- Вкладка «Мой заработок» работает локально в браузере пользователя (`localStorage`).

---

## 🚀 Запуск за 5 минут на 100% бесплатном GitHub Pages (нужен только GitHub)

### Шаг 1. Создайте репозиторий на GitHub
1. Зайдите на [github.com](https://github.com) и создайте **Public** репозиторий (например, `stalzone-market`).
   > На Public-репозитории минуты GitHub Actions полностью безлимитны и бесплатны навсегда. Ключи EXBO хранятся в закрытых Secrets и никому не видны.
2. Залейте содержимое этой папки (`stalzone-web`) в репозиторий (через Git или GitHub Desktop).

### Шаг 2. Добавьте ключи EXBO API в Secrets
1. В репозитории откройте **Settings → Secrets and variables → Actions**.
2. Нажмите **New repository secret** и добавьте 2 секрета (возьмите их из вашего локального `Stalzone_SaaS/.env` или `config.py`):
   - `EXBO_CLIENT_ID`
   - `EXBO_CLIENT_SECRET`

### Шаг 3. Включите GitHub Pages
1. Откройте **Settings → Pages**.
2. В пункте **Source** выберите **GitHub Actions**.

### Шаг 4. Запустите первый деплой
1. Перейдите во вкладку **Actions** → выберите **Update Prices & Deploy to GitHub Pages (24/7 Free)** → нажмите **Run workflow**.
2. Через ~1–2 минуты сайт откроется по адресу `https://<ваш_логин>.github.io/stalzone-market/` и начнет обновлять цены автоматически каждые 30 минут 24/7.

---

## 🌐 Переход на Cloudflare Pages (если захотите безлимитный трафик и свой домен)
1. Зарегистрируйтесь на [dash.cloudflare.com](https://dash.cloudflare.com) → **Workers & Pages → Create → Pages** (проект `stalzone-market`).
2. Добавьте в GitHub Secrets: `CLOUDFLARE_API_TOKEN` и `CLOUDFLARE_ACCOUNT_ID`.
3. Включите расписание в `.github/workflows/deploy-cloudflare.yml`.

---

## 📈 Как получить бесплатный трафик из Google
1. После запуска откройте [Google Search Console](https://search.google.com/search-console).
2. Добавьте URL вашего сайта и отправьте карту сайта: `https://<ваш_домен>/sitemap.xml`.
3. Все 118+ страниц предметов (`items/*.html`) и каталог (`catalog.html`) начнут индексироваться по запросам «цена [предмет] stalzone / stalcraft».

---

## 💻 Локальный предпросмотр прямо сейчас
```powershell
python scripts/build_seo.py
python -m http.server 8080 -d public
```
И откройте `http://localhost:8080` в браузере.
