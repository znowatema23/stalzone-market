// Initialize Telegram WebApp SDK
if (window.Telegram && window.Telegram.WebApp) {
  window.Telegram.WebApp.ready();
  window.Telegram.WebApp.expand();
  if (window.Telegram.WebApp.setHeaderColor) {
    window.Telegram.WebApp.setHeaderColor('#0b0f19');
  }
}

// ==================== I18N DICTIONARIES ====================

const I18N = {
  ru: {
    brandSubtitle: "Биржевой снайпер аукциона",
    regionRU: "🇷🇺 Россия (RU)",
    regionEU: "🇪🇺 Европа (EU)",
    regionNA: "🇺🇸 Сев. Америка (NA)",
    refreshTitle: "Обновить данные",
    labelBestPrice: "Минимальный лот",
    statBestAmount: "Лот: {amt} шт ({cost} ₽)",
    labelAvgPrice: "Средняя цена (30д)",
    statDiscount: "Скидка: -{disc}%",
    labelCeiling: "Медиана / Потолок",
    statMedian: "Медиана: {med} ₽",
    labelLiquidity: "Скорость оборота",
    statSalesPerDay: "Сделок: ~{cnt} в день",
    rarityLabel: "Редкость:",
    ptnLabel: "Заточка:",
    chartRangeLabel: "Период:",
    rangeAll: "Все",
    range1d: "1 День",
    range1w: "1 Неделя",
    range1m: "1 Месяц",
    filterAll: "Все",
    filterAny: "Любая",
    noLotsFilter: "Лотов по выбранному фильтру сейчас нет",
    noSalesFilter: "ℹ️ Нет недавних сделок по фильтру",
    titlePriceChart: "График динамики цен",
    chartDataset: "Цена (₽)",
    titleCycles: "📅 Недельный цикл спроса (Пн - Вс)",
    titleOrderBook: "Биржевой стакан (Лоты)",
    badgeLive: "СВЕЖИЕ",
    loadingOrderBook: "Загрузка стакана...",
    emptyOrderBook: "Лотов на аукционе сейчас нет",
    lotRank: "ЛОТ #{idx}",
    lotBestPrice: " • ЛУЧШАЯ ЦЕНА",
    inStock: "В наличии: <b>{amt} шт</b>",
    unitPrice: "{price} ₽ / шт",
    anomalyBadge: "⛔ АНОМАЛИЯ (ВЫШЕ ПОТОЛКА)",
    gapBadge: "⚠️ РАЗРЫВ +{pct}%",
    titleDealsTable: "🔥 Горячие предложения и подтвержденные разрывы",
    updatedAt: "Обновлено: {time} (авто 5 мин)",
    syncing: "Синхронизация...",
    thItem: "Предмет",
    thCategory: "Категория",
    thBuyout: "Выкуп лота",
    thUnitPrice: "Цена за шт",
    thAvgPrice: "Средний рынок",
    thDiscount: "Скидка",
    thSignal: "Сигнал рынка",
    thAction: "Действие",
    btnBuyShort: "Купил",
    buyThisLot: "Занести лот в мой заработок",
    dealAddedToast: "✅ Лот «{item}» занесён в заработок (+{profit} ₽)!",
    btnUndo: "Отменить",
    dealUndoneToast: "🗑 Сделка отменена и удалена из заработка",
    syncStatusTitle: "24/7 Мониторинг",
    syncTimerLabel: "След. обновление:",
    syncTimeLabel: "Синхр:",
    syncingText: "Синхронизация...",
    syncSuccessText: "Лоты аукциона обновлены!",
    signalMega: "🔥 Мега-слив (-{disc}%)",
    signalGap: "🧱 Разрыв полки",
    signalMarket: "Рыночный лот",
    daysShort: ["Вс", "Пн", "Вт", "Ср", "Чт", "Пт", "Сб"],
    categories: {
      "Артефакты": "Артефакты",
      "Броня": "Броня",
      "Оружие": "Оружие",
      "Расходники": "Расходники",
      "Крупный бартер": "Крупный бартер",
      "Убежище": "Убежище",
      "Контейнеры": "Контейнеры",
      "Детекторы": "Детекторы",
      "Обвесы": "Обвесы",
      "Сезонный пропуск": "Сезонный пропуск",
      "Протоартефакты": "Протоартефакты",
      "Прочее": "Прочее"
    },
    liquidityTiers: {
      "Высокая": "Высокая",
      "Средняя": "Средняя",
      "Низкая": "Низкая",
      "Обычная": "Обычная"
    },
    vipModalTitle: "STALZONE PRO TERMINAL",
    vipModalBadge: "ТОЛЬКО ДЛЯ VIP",
    vipModalSubtitle: "Доступ к живому биржевому терминалу, графикам динамики цен, свечам и стаканам ордеров открыт эксклюзивно для VIP-пользователей.",
    vipFeat1: "Интерактивные графики цен и свечи в реальном времени",
    vipFeat2: "Биржевой стакан и радар разрывов полок",
    vipFeat3: "Недельные циклы спроса и почасовой анализ",
    vipFeat4: "Все серверы (RU, EU, NA) без задержек и ограничений",
    vipModalBtnText: "Оформить VIP в Telegram-боте",
    vipModalFooter: "VIP-доступ окупается за 1-2 удачные сделки на аукционе",
    tabMarket: "График и Стакан",
    tabDeals: "Горячие предложения",
    tabEarnings: "Мой заработок",
    pillDealsCatAll: "Все категории",
    dealsHintText: "💡 Нажмите на любую строку с предметом, чтобы открыть его график и биржевой стакан.",
    pillPeriodDay: "📅 День (24ч)",
    pillPeriodWeek: "📅 Неделя (7д)",
    pillPeriodMonth: "📅 Месяц (30д)",
    pillPeriodAll: "♾️ Всё время",
    btnAddDeal: "Записать сделку",
    labelNetProfit: "Чистый профит (PnL)",
    statAvgRoi: "Доходность: +{roi}% ROI",
    labelTurnover: "Оборот (Вложено в выкуп)",
    statLotsCount: "Выкуплено лотов: {cnt} шт",
    labelRevenue: "Расчетная выручка",
    statTotalFee: "Налог аукциона (5%): -{fee} ₽",
    labelBestDeal: "Лучший флип",
    statBestDealProfit: "Профит: +{profit} ₽",
    titleEarningsChart: "График динамики прибыли и PnL",
    earningsChartSub: "Накопленный чистый профит по закрытым сделкам",
    btnModeCumulative: "Накопительный",
    btnModeDeal: "По сделкам",
    titleEarningsTable: "📋 Журнал занесенных выкупленных лотов",
    thDealTime: "Время",
    thDealItem: "Предмет",
    thDealBuy: "Закупка",
    thDealSell: "Продажа",
    thDealFee: "Налог (5%)",
    thDealProfit: "Чистый профит",
    thDealAction: "Действие",
    emptyEarningsTitle: "В этом периоде пока нет сделок",
    emptyEarningsDesc: "Нажимайте «🛒 Я купил этот лот» в Telegram-боте при получении алертов или запишите сделку вручную кнопкой выше!",
    modalAddDealTitle: "✍️ Записать сделку в журнал",
    lblDealItemName: "Название предмета",
    lblDealBuyPrice: "Закупка (₽)",
    lblDealSellPrice: "Продажа (₽)",
    lblDealAmount: "Количество (шт)",
    btnSaveDeal: "Сохранить сделку",
    dealSavedAlert: "Сделка успешно сохранена!",
    dealDeletedAlert: "Сделка удалена из журнала."
  },
  en: {
    brandSubtitle: "Auction Sniper & Market Terminal",
    regionRU: "🇷🇺 Russia (RU)",
    regionEU: "🇪🇺 Europe (EU)",
    regionNA: "🇺🇸 North America (NA)",
    refreshTitle: "Refresh data",
    labelBestPrice: "Lowest Lot",
    statBestAmount: "Lot: {amt} pcs ({cost} ₽)",
    labelAvgPrice: "30D Avg Price",
    statDiscount: "Discount: -{disc}%",
    labelCeiling: "Median / Ceiling",
    statMedian: "Median: {med} ₽",
    labelLiquidity: "Turnover Velocity",
    statSalesPerDay: "Sales: ~{cnt} / day",
    rarityLabel: "Rarity:",
    ptnLabel: "Sharpening:",
    chartRangeLabel: "Period:",
    rangeAll: "All",
    range1d: "1 Day",
    range1w: "1 Week",
    range1m: "1 Month",
    filterAll: "All",
    filterAny: "Any",
    noLotsFilter: "No lots for selected filter",
    noSalesFilter: "ℹ️ No recent sales for filter",
    titlePriceChart: "Price Dynamics Chart",
    chartDataset: "Price (₽)",
    titleCycles: "📅 Weekly Demand Cycles (Mon - Sun)",
    titleOrderBook: "Order Book (Active Lots)",
    badgeLive: "LIVE",
    loadingOrderBook: "Loading order book...",
    emptyOrderBook: "No active lots on auction right now",
    lotRank: "LOT #{idx}",
    lotBestPrice: " • BEST PRICE",
    inStock: "In stock: <b>{amt} pcs</b>",
    unitPrice: "{price} ₽ / pc",
    anomalyBadge: "⛔ ANOMALY (ABOVE CEILING)",
    gapBadge: "⚠️ SHELF GAP +{pct}%",
    titleDealsTable: "🔥 Hot Deals & Confirmed Shelf Gaps",
    updatedAt: "Updated: {time} (auto 5m)",
    syncing: "Syncing...",
    thItem: "Item",
    thCategory: "Category",
    thBuyout: "Lot Buyout",
    thUnitPrice: "Unit Price",
    thAvgPrice: "Market Avg",
    thDiscount: "Discount",
    thSignal: "Market Signal",
    thAction: "Action",
    btnBuyShort: "Bought",
    buyThisLot: "Log lot into my earnings",
    dealAddedToast: "✅ Lot \"{item}\" added to earnings (+{profit} ₽)!",
    btnUndo: "Undo",
    dealUndoneToast: "🗑 Deal undone and removed from earnings",
    syncStatusTitle: "24/7 Live Monitoring",
    syncTimerLabel: "Next refresh in:",
    syncTimeLabel: "Synced:",
    syncingText: "Syncing...",
    syncSuccessText: "Auction lots refreshed!",
    signalMega: "🔥 Huge Dump (-{disc}%)",
    signalGap: "🧱 Shelf Gap",
    signalMarket: "Market Lot",
    daysShort: ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"],
    categories: {
      "Артефакты": "Artifacts",
      "Броня": "Armor",
      "Оружие": "Weapons",
      "Расходники": "Consumables",
      "Крупный бартер": "Major Barter",
      "Убежище": "Shelter",
      "Контейнеры": "Containers",
      "Детекторы": "Detectors",
      "Обвесы": "Attachments",
      "Сезонный пропуск": "Season Pass",
      "Протоартефакты": "Proto-artifacts",
      "Прочее": "Other"
    },
    liquidityTiers: {
      "Высокая": "High",
      "Средняя": "Medium",
      "Низкая": "Low",
      "Обычная": "Normal"
    },
    vipModalTitle: "STALZONE PRO TERMINAL",
    vipModalBadge: "VIP EXCLUSIVE",
    vipModalSubtitle: "Real-time interactive price charts, candlesticks, and live order books are exclusively available for VIP members.",
    vipFeat1: "Live candlestick & interactive price charts",
    vipFeat2: "Live order book and shelf gap sniper",
    vipFeat3: "Weekly demand cycles & hourly breakdown",
    vipFeat4: "Instant updates across all servers (RU, EU, NA)",
    vipModalBtnText: "Unlock VIP in Telegram Bot",
    vipModalFooter: "VIP access pays for itself in 1-2 successful auction flips",
    tabMarket: "Chart & Order Book",
    tabDeals: "Hot Deals",
    tabEarnings: "My Earnings",
    pillDealsCatAll: "All Categories",
    dealsHintText: "💡 Tap any item row to instantly open its price chart and live order book.",
    pillPeriodDay: "📅 Day (24h)",
    pillPeriodWeek: "📅 Week (7d)",
    pillPeriodMonth: "📅 Month (30d)",
    pillPeriodAll: "♾️ All Time",
    btnAddDeal: "Log Deal",
    labelNetProfit: "Net Profit (PnL)",
    statAvgRoi: "Profitability: +{roi}% ROI",
    labelTurnover: "Capital Turnover",
    statLotsCount: "Lots traded: {cnt} pcs",
    labelRevenue: "Gross Revenue",
    statTotalFee: "5% Auction Tax: -{fee} ₽",
    labelBestDeal: "Best Flip",
    statBestDealProfit: "Profit: +{profit} ₽",
    titleEarningsChart: "Earnings & PnL Dynamics",
    earningsChartSub: "Cumulative net profit across closed deals",
    btnModeCumulative: "Cumulative",
    btnModeDeal: "Per Deal",
    titleEarningsTable: "📋 Closed Deals Ledger",
    thDealTime: "Time",
    thDealItem: "Item",
    thDealBuy: "Buy",
    thDealSell: "Sell",
    thDealFee: "Fee (5%)",
    thDealProfit: "Net Profit",
    thDealAction: "Action",
    emptyEarningsTitle: "No deals recorded for this period yet",
    emptyEarningsDesc: "Tap '🛒 I bought this lot' in Telegram bot alerts or log a deal manually using the button above!",
    modalAddDealTitle: "✍️ Log Deal to Ledger",
    lblDealItemName: "Item Name",
    lblDealBuyPrice: "Buy Price (₽)",
    lblDealSellPrice: "Sell Price (₽)",
    lblDealAmount: "Quantity (pcs)",
    btnSaveDeal: "Save Deal",
    dealSavedAlert: "Deal saved successfully!",
    dealDeletedAlert: "Deal deleted from ledger."
  }
};

const ITEM_NAMES_EN = {
  "FN SCAR-H": "FN SCAR-H",
  "HK417": "HK417",
  "ВСК-94": "VSK-94",
  "HK MP7A2": "HK MP7A2",
  "FN Five-seveN": "FN Five-seveN",
  "K15": "Machinegun K15",
  "Пулемет K15": "Machinegun K15",
  "АК-308": "AK-308",
  "«Волна»": "Wave",
  "СВЧ": "SVCh",
  "Derya MK-12 AS-103S": "Derya MK-12 AS-103S",
  "KS-12 Komrad": "KS-12 Komrad",
  "Cheytac M300": "Cheytac M300",
  "IWI Tavor X95": "IWI Tavor X95",
  "QBU-191": "QBU-191",
  "Gerber Downrange Tomahawk": "Gerber Downrange Tomahawk",
  "Jagdkommando": "Jagdkommando",
  "Альбатрос-Перехватчик": "Albatross Interceptor",
  "Альбатрос-Разведчик": "Albatross Scout",
  "Ганимед": "Ganymede",
  "Бронекостюм «КЗ-4»": "Armored Suit KZ-4",
  "Детектор «Эльбрус»": "Elbrus Detector",
  "Контейнер «Берлога-6»": "Den-6 Container",
  "Контейнер «КРАБ-6»": "CRAB-6 Container",
  "Контейнер «Берлога-5»": "Den-5 Container",
  "Контейнер «Кега»": "Keg Container",
  "Контейнер «Дубак»": "Freezer Container",
  "Контейнер «КСМ»": "SMC Container",
  "ZIVCAS Sisyphus-6": "ZIVCAS Sisyphus-6",
  "Барабан 5.56 NATO EMAG": "5.56 NATO EMAG Drum",
  "Барабанный магазин 5.56 NATO EMAG": "5.56 NATO EMAG Drum Magazine",
  "Барабанный магазин 5.45": "5.45 Drum Magazine",
  "Барабанный магазин 7.62x39": "7.62x39 Drum Magazine",
  "Барабанный магазин G3/M1A": "G3/M1A Drum Magazine",
  "Протоартефакт": "Proto-artifact",
  "Протоартефакт [⚪ Обыч.]": "Proto-artifact [⚪ Common]",
  "Протоартефакт [🟢 Необыч.]": "Proto-artifact [🟢 Uncommon]",
  "Протоартефакт [🔵 Особ.]": "Proto-artifact [🔵 Special]",
  "Протоартефакт [🟣 Редк.]": "Proto-artifact [🟣 Rare]",
  "Протоартефакт [🔴 Искл.]": "Proto-artifact [🔴 Exceptional]",
  "Протоартефакт [🟡 Легенд.]": "Proto-artifact [🟡 Legendary]",
  "Набор компонентов оружия (Мастер)": "Master Weapon Components",
  "Набор компонентов оружия (Ветеран)": "Veteran Weapon Components",
  "Стандартные запчасти": "Standard Spare Parts",
  "Продвинутые запчасти": "Advanced Spare Parts",
  "Стандартные инструменты": "Standard Tools",
  "Продвинутые инструменты": "Advanced Tools",
  "Нестабильная аномальная батарея": "Unstable Anomaly Battery",
  "Модифицированная аномальная батарея": "Modified Anomaly Battery",
  "Аммиак": "Ammonia",
  "Черная селезенка": "Black Spleen",
  "Аномальная пыль": "Anomalous Dust",
  "Катализатор": "Catalyst",
  "Хронопыль": "Chrono Dust",
  "Аномальная плазма": "Anomalous Plasma",
  "Сменный аккумулятор": "Spare Battery",
  "Портативный квантовый генератор": "Portable Quantum Generator",
  "Блок данных «Гамма»": "Data Block Gamma",
  "Блок данных «Альфа»": "Data Block Alpha",
  "Блок данных «Бета»": "Data Block Beta",
  "Блок данных «Лямбда»": "Data Block Lambda",
  "Барабанный магазин 7.62 NATO (G3/M1A)": "G3/M1A Drum Magazine",
  "Эргономичный магазин 9x39": "Ergonomic 9x39 Magazine",
  "Эргономичный магазин 5.56": "Ergonomic 5.56 Magazine",
  "Эргономичный магазин 5.45": "Ergonomic 5.45 Magazine",
  "Эргономичный магазин 12.7": "Ergonomic 12.7 Magazine",
  "Эргономичный магазин 7.62 NATO": "Ergonomic 7.62 NATO Magazine",
  "Эргономичный магазин 7.62x39": "Ergonomic 7.62x39 Magazine",
  "Магазин 7.62 NATO PMAG, черный": "7.62 NATO PMAG Magazine, Black",
  "Магазин 7.62 NATO PMAG (черный)": "7.62 NATO PMAG (Black)",
  "Магазин 7.62 NATO PMAG, хаки": "7.62 NATO PMAG Magazine, Khaki",
  "Магазин 7.62 NATO PMAG (хаки)": "7.62 NATO PMAG (Khaki)",
  "Барабанный магазин 5.56 NATO черный": "5.56 NATO Drum Magazine, Black",
  "Барабанный магазин 5.56 NATO (черный)": "5.56 NATO Drum Magazine (Black)",
  "Барабанный магазин 5.56 NATO, хаки": "5.56 NATO Drum Magazine, Khaki",
  "Барабанный магазин 5.56 NATO (хаки)": "5.56 NATO Drum Magazine (Khaki)",
  "Барабанный магазин 5.45 в чехле": "5.45 Drum Magazine in Pouch",
  "Пси-маячок": "Psy-beacon",
  "Цветущий рыжий папоротник": "Blooming Red Fern",
  "Расцветший Горьколистник": "Blooming Bitterleaf",
  "Темный Лимб": "Dark Limb",
  "Очищенное вещество 07270": "Purified Substance 07270",
  "Янтарная полынь": "Amber Wormwood",
  "Перегрузка": "Overload",
  "Сезонный пропуск": "Season Pass",
  "Сезонный пропуск + 20 уровней": "Season Pass + 20 Levels",
  "Сезонный пропуск + 50 уровней": "Season Pass + 50 Levels",
  "Передаваемый уровень Сезона": "Tradeable Season Level",

  // Artifacts
  "Призма": "Prism",
  "Вихрь": "Whirlwind",
  "Браслет": "Bracelet",
  "Солнце": "Sun",
  "Осколок": "Shard",
  "Спираль": "Spiral",
  "Виток": "Coil",
  "Каблук": "Heel",
  "Зеркало": "Mirror",
  "Жар-птица": "Firebird",
  "Черная дыра": "Black Hole",
  "Полено": "Log",
  "Личинка": "Larva",
  "Атом": "Atom",
  "Жильник": "Vein",
  "Проклятая роза": "Cursed Rose",
  "Гелий": "Helium",
  "Ледяной ежик": "Ice Urchin",
  "Стальной ежик": "Steel Urchin",
  "Обруч": "Hoop",
  "Жабры": "Gills",
  "Нервяк": "Nerve",
  "Катушка": "Spool",
  "Звено": "Link",
  "Ветка калины": "Snowball Branch",
  "Юла": "Whirligig",
  "Ершик": "Ruff",
  "Трансформатор": "Transformer",
  "Магма": "Magma",
  "Статик": "Static",
  "Морозец": "Frost",
  "Бубльгум": "Bubble Gum",
  "Радиатор": "Radiator",
  "Роза изнанки": "Nether Rose",
  "Рубик": "Rubik",
  "Желе": "Jelly",
  "Опал": "Opal",
  "Многогранник": "Polyhedron",
  "Смольник": "Pitcher",
  "Петля": "Loop",
  "Чертов еж": "Devil's Urchin",
  "Силки": "Snare",
  "Тыква": "Pumpkin",
  "Янтарник": "Amberite"
};

const DEALS_CAT_LABELS = {
  ru: {
    'all': 'Все категории',
    'Оружие': '🔫 Оружие',
    'Броня': '🛡 Броня',
    'Расходники': '🩸 Расходники',
    'Крупный бартер': '💎 Бартер',
    'Артефакты': '🌀 Артефакты',
    'Протоартефакты': '🔮 Протоарты',
    'Контейнеры': '📦 Контейнеры',
    'Убежище': '🏠 Убежище'
  },
  en: {
    'all': 'All Categories',
    'Оружие': '🔫 Weapons',
    'Броня': '🛡 Armor',
    'Расходники': '🩸 Consumables',
    'Крупный бартер': '💎 Barter',
    'Артефакты': '🌀 Artifacts',
    'Протоартефакты': '🔮 Proto-arts',
    'Контейнеры': '📦 Containers',
    'Убежище': '🏠 Shelter'
  }
};

function localizeTierLabel(rawTier) {
  if (!rawTier) return '';
  if (currentLang !== 'en') return rawTier;
  return rawTier
    .replace('Обычный', 'Common')
    .replace('Обыч.', 'Common')
    .replace('Необычный', 'Uncommon')
    .replace('Необыч.', 'Uncommon')
    .replace('Особый', 'Special')
    .replace('Особ.', 'Special')
    .replace('Редкий', 'Rare')
    .replace('Редк.', 'Rare')
    .replace('Исключительный', 'Exceptional')
    .replace('Искл.', 'Except.')
    .replace('Легендарный', 'Legendary')
    .replace('Легенд.', 'Legend.')
    .replace('Чистый', 'Clean');
}

let currentLang = 'ru';
let marketData = { items: [] };
let currentItem = null;
let priceChart = null;

function t(key, params = {}) {
  const dict = I18N[currentLang] || I18N.ru;
  let str = dict[key] || I18N.ru[key] || key;
  Object.keys(params).forEach(k => {
    str = str.replace(`{${k}}`, params[k]);
  });
  return str;
}

function getItemName(rawName) {
  if (currentLang === 'en' && ITEM_NAMES_EN[rawName]) {
    return ITEM_NAMES_EN[rawName];
  }
  return rawName;
}

function getCategoryName(rawCat) {
  const dict = I18N[currentLang] || I18N.ru;
  return dict.categories[rawCat] || rawCat;
}

function getLiquidityText(rawLiq) {
  if (!rawLiq) return t('liquidityTiers')['Обычная'] || 'Normal';
  if (currentLang === 'en') {
    if (rawLiq.includes('Высокая')) return rawLiq.replace('Высокая', 'High').replace('сд/день', 'sales/day');
    if (rawLiq.includes('Средняя')) return rawLiq.replace('Средняя', 'Medium').replace('сд/день', 'sales/day');
    if (rawLiq.includes('Низкая')) return rawLiq.replace('Низкая', 'Low').replace('сд/день', 'sales/day');
  }
  return rawLiq;
}

function fmt(n) {
  if (n === null || n === undefined || isNaN(n)) return '—';
  const val = Math.round(n);
  const isNeg = val < 0;
  const absStr = Math.abs(val).toString();
  const withDots = absStr.replace(/\B(?=(\d{3})+(?!\d))/g, '.');
  return isNeg ? `-${withDots}` : withDots;
}

function getQueryParam(name) {
  const urlParams = new URLSearchParams(window.location.search);
  return urlParams.get(name);
}

// DOM Elements
const regionSelect = document.getElementById('regionSelect');
const langSelect = document.getElementById('langSelect');
const refreshBtn = document.getElementById('refreshBtn');
const itemSelect = document.getElementById('itemSelect');

// Init Language (URL param -> localStorage -> Telegram SDK -> Default 'ru')
function initLanguage() {
  const urlLang = getQueryParam('lang');
  const storedLang = localStorage.getItem('stalzone_lang');
  let tgLang = null;
  if (window.Telegram && window.Telegram.WebApp && window.Telegram.WebApp.initDataUnsafe && window.Telegram.WebApp.initDataUnsafe.user) {
    tgLang = window.Telegram.WebApp.initDataUnsafe.user.language_code;
  }

  if (urlLang && ['ru', 'en'].includes(urlLang.toLowerCase())) {
    currentLang = urlLang.toLowerCase();
  } else if (storedLang && ['ru', 'en'].includes(storedLang.toLowerCase())) {
    currentLang = storedLang.toLowerCase();
  } else if (tgLang && tgLang.toLowerCase().startsWith('en')) {
    currentLang = 'en';
  } else {
    currentLang = 'ru';
  }

  if (langSelect) {
    langSelect.value = currentLang;
  }
  localStorage.setItem('stalzone_lang', currentLang);
}

// Init Region (URL param -> localStorage -> Default 'ru')
const urlRegion = getQueryParam('region');
const storedRegion = localStorage.getItem('stalzone_region');
if (urlRegion && ['ru', 'eu', 'na'].includes(urlRegion.toLowerCase())) {
  regionSelect.value = urlRegion.toLowerCase();
  localStorage.setItem('stalzone_region', urlRegion.toLowerCase());
} else if (storedRegion && ['ru', 'eu', 'na'].includes(storedRegion.toLowerCase())) {
  regionSelect.value = storedRegion.toLowerCase();
}

function updateStaticTexts() {
  document.documentElement.lang = currentLang;
  
  const setEl = (id, text) => {
    const el = document.getElementById(id);
    if (el) el.innerText = text;
  };

  const setHtml = (id, html) => {
    const el = document.getElementById(id);
    if (el) el.innerHTML = html;
  };

  setEl('brandSubtitle', t('brandSubtitle'));
  setEl('optRegRu', t('regionRU'));
  setEl('optRegEu', t('regionEU'));
  setEl('optRegNa', t('regionNA'));
  if (refreshBtn) refreshBtn.title = t('refreshTitle');

  setEl('labelBestPrice', t('labelBestPrice'));
  setEl('labelAvgPrice', t('labelAvgPrice'));
  setEl('labelCeiling', t('labelCeiling'));
  setEl('labelLiquidity', t('labelLiquidity'));

  setHtml('titlePriceChart', `<span>📈</span> ${t('titlePriceChart')}`);
  setEl('titleCycles', t('titleCycles'));
  setEl('rarityLabel', t('rarityLabel'));
  setEl('ptnLabel', t('ptnLabel'));
  setEl('chartRangeLabel', t('chartRangeLabel'));
  const rangeBtnNames = {
    ru: { 'all': 'Все', '1d': '1 День', '1w': '1 Неделя', '1m': '1 Месяц' },
    en: { 'all': 'All', '1d': '1 Day', '1w': '1 Week', '1m': '1 Month' }
  };
  const activeRangeDict = rangeBtnNames[currentLang] || rangeBtnNames.ru;
  document.querySelectorAll('#chartRangePills .filter-pill').forEach(btn => {
    const rKey = btn.getAttribute('data-range');
    if (activeRangeDict[rKey]) {
      btn.innerText = activeRangeDict[rKey];
    }
  });
  setEl('pillQltAll', t('filterAll'));
  setEl('pillPtnAll', t('filterAny'));
  const rarityNames = {
    ru: ["⚪ Обычный", "🟢 Необычный", "🔵 Особый", "🟣 Редкий", "🔴 Исключительный", "🟡 Легендарный"],
    en: ["⚪ Common", "🟢 Uncommon", "🔵 Special", "🟣 Rare", "🔴 Exceptional", "🟡 Legendary"]
  };
  document.querySelectorAll('#rarityPills .filter-pill').forEach(btn => {
    const qAttr = btn.getAttribute('data-qlt');
    if (qAttr === 'all') {
      btn.innerText = t('filterAll');
    } else {
      const q = parseInt(qAttr, 10);
      if (rarityNames[currentLang] && rarityNames[currentLang][q]) {
        btn.innerText = rarityNames[currentLang][q];
      }
    }
  });
  const ptnLabels = {
    ru: { 'all': 'Любая', '0': '+0 (Чистый)', '5': '+5', '10': '+10', '15': '+15' },
    en: { 'all': 'Any', '0': '+0 (Clean)', '5': '+5', '10': '+10', '15': '+15' }
  };
  document.querySelectorAll('#ptnPills .filter-pill').forEach(btn => {
    const pAttr = btn.getAttribute('data-ptn');
    if (ptnLabels[currentLang] && ptnLabels[currentLang][pAttr]) {
      btn.innerText = ptnLabels[currentLang][pAttr];
    }
  });
  setHtml('titleOrderBook', `<span>🧱</span> ${t('titleOrderBook')}`);
  setHtml('badgeLive', `<span class="pulse-dot"></span> ${t('badgeLive')}`);
  setEl('loadingOrderBook', t('loadingOrderBook'));
  setHtml('titleDealsTable', `<span>🔥</span> ${t('titleDealsTable')}`);

  // Category filter pills in Deals tab
  const catLabels = DEALS_CAT_LABELS[currentLang] || DEALS_CAT_LABELS.ru;
  document.querySelectorAll('#dealsFilterBar .deals-cat-pill').forEach(btn => {
    const cat = btn.getAttribute('data-cat');
    if (catLabels[cat]) {
      btn.innerText = catLabels[cat];
    }
  });

  // Artifact sub-filter pills in Deals tab
  setEl('lblArtDealsQlt', currentLang === 'en' ? 'Quality:' : 'Качество:');
  setEl('lblArtDealsPtn', currentLang === 'en' ? 'Sharpening:' : 'Заточка:');

  const artDealsRarityNames = {
    ru: { 'all': 'Все', '0': '⚪ Обыч.', '1': '🟢 Необыч.', '2': '🔵 Особ.', '3': '🟣 Редк.', '4': '🔴 Искл.', '5': '🟡 Легенд.' },
    en: { 'all': 'All', '0': '⚪ Common', '1': '🟢 Uncommon', '2': '🔵 Special', '3': '🟣 Rare', '4': '🔴 Except.', '5': '🟡 Legend.' }
  };
  const artRarityDict = artDealsRarityNames[currentLang] || artDealsRarityNames.ru;
  document.querySelectorAll('#artDealsRarityPills .art-sub-pill').forEach(btn => {
    const q = btn.getAttribute('data-qlt');
    if (artRarityDict[q]) {
      btn.innerText = artRarityDict[q];
    }
  });

  const artDealsPtnNames = {
    ru: { 'all': 'Все', '0': '+0', '5': '+5', '10': '+10', '15': '+15' },
    en: { 'all': 'All', '0': '+0', '5': '+5', '10': '+10', '15': '+15' }
  };
  const artPtnDict = artDealsPtnNames[currentLang] || artDealsPtnNames.ru;
  document.querySelectorAll('#artDealsPtnPills .art-sub-pill').forEach(btn => {
    const p = btn.getAttribute('data-ptn');
    if (artPtnDict[p]) {
      btn.innerText = artPtnDict[p];
    }
  });

  setEl('thItem', t('thItem'));
  setEl('thCategory', t('thCategory'));
  setEl('thBuyout', t('thBuyout'));
  setEl('thUnitPrice', t('thUnitPrice'));
  setEl('thAvgPrice', t('thAvgPrice'));
  setEl('thDiscount', t('thDiscount'));
  setEl('thSignal', t('thSignal'));
  setEl('thAction', t('thAction'));
  setEl('syncStatusTitle', t('syncStatusTitle'));
  setEl('syncTimerLabel', t('syncTimerLabel'));
  setEl('syncTimeLabel', t('syncTimeLabel'));

  // VIP Paywall Modal
  setEl('vipModalTitle', t('vipModalTitle'));
  setEl('vipModalBadge', t('vipModalBadge'));
  setEl('vipModalSubtitle', t('vipModalSubtitle'));
  setEl('vipFeat1', t('vipFeat1'));
  setEl('vipFeat2', t('vipFeat2'));
  setEl('vipFeat3', t('vipFeat3'));
  setEl('vipFeat4', t('vipFeat4'));
  setEl('vipModalBtnText', t('vipModalBtnText'));
  setEl('vipModalFooter', t('vipModalFooter'));

  // Terminal Navigation & Earnings Tab Texts
  setEl('tabMarketLabel', t('tabMarket'));
  setEl('tabDealsLabel', t('tabDeals'));
  setEl('tabEarningsLabel', t('tabEarnings'));
  setEl('pillDealsCatAll', t('pillDealsCatAll'));
  setEl('dealsHintText', t('dealsHintText'));
  setEl('lblArtDealsQlt', currentLang === 'en' ? 'Quality:' : 'Качество:');
  setEl('lblArtDealsPtn', currentLang === 'en' ? 'Sharpening:' : 'Заточка:');
  setEl('pillPeriodDay', t('pillPeriodDay'));
  setEl('pillPeriodWeek', t('pillPeriodWeek'));
  setEl('pillPeriodMonth', t('pillPeriodMonth'));
  setEl('pillPeriodAll', t('pillPeriodAll'));
  setEl('btnAddDealLabel', t('btnAddDeal'));
  setEl('labelNetProfit', t('labelNetProfit'));
  setEl('labelTurnover', t('labelTurnover'));
  setEl('labelRevenue', t('labelRevenue'));
  setEl('labelBestDeal', t('labelBestDeal'));
  setHtml('titleEarningsChart', `<span>📈</span> ${t('titleEarningsChart')}`);
  setEl('earningsChartSub', t('earningsChartSub'));
  setEl('btnModeCumulative', t('btnModeCumulative'));
  setEl('btnModeDeal', t('btnModeDeal'));
  setEl('emptyEarningsTitle', t('emptyEarningsTitle'));
  setEl('emptyEarningsDesc', t('emptyEarningsDesc'));
  setEl('titleEarningsTable', t('titleEarningsTable'));
  setEl('thDealTime', t('thDealTime'));
  setEl('thDealItem', t('thDealItem'));
  setEl('thDealBuy', t('thDealBuy'));
  setEl('thDealSell', t('thDealSell'));
  setEl('thDealFee', t('thDealFee'));
  setEl('thDealProfit', t('thDealProfit'));
  setEl('thDealAction', t('thDealAction'));
  setEl('modalAddDealTitle', t('modalAddDealTitle'));
  setEl('lblDealItemName', t('lblDealItemName'));
  setEl('lblDealBuyPrice', t('lblDealBuyPrice'));
  setEl('lblDealSellPrice', t('lblDealSellPrice'));
  setEl('lblDealAmount', t('lblDealAmount'));
  setEl('btnSaveDealLabel', t('btnSaveDeal'));
  if (typeof updateOrderCtaContext === 'function') {
    updateOrderCtaContext();
  }
}

async function loadData() {
  const region = (regionSelect.value || 'ru').toLowerCase();
  try {
    const apiBase = window.STALZONE_API || getQueryParam('api') || '';
    let res = null;
    if (apiBase) {
      try {
        res = await fetch(`${apiBase}/api/market-data?region=${region}`);
      } catch (e) {
        console.warn('API unavailable, falling back to local snapshot', e);
      }
    }
    if (!res || !res.ok) {
      const targetSnapshot = (region === 'ru') ? 'data.json' : `data_${region}.json`;
      try {
        res = await fetch(`${targetSnapshot}?_t=${Date.now()}`, { cache: 'no-store' });
      } catch (e) {
        // Fallback to default data.json if regional file missing
      }
      if (!res || !res.ok) {
        res = await fetch(`data.json?_t=${Date.now()}`, { cache: 'no-store' });
      }
    }
    if (!res.ok) throw new Error('Network error loading data');
    marketData = await res.json();
    lastLoadedTime = Date.now();
    const upTextEl = document.getElementById('updatedAtText');
    if (upTextEl) {
      upTextEl.innerText = t('updatedAt', { time: marketData.updatedAt || (currentLang === 'en' ? 'just now' : 'сейчас') });
    }
    const syncTimeVal = document.getElementById('syncTimeVal');
    if (syncTimeVal && marketData.updatedAt) {
      const parts = marketData.updatedAt.split(' ');
      if (parts.length === 2) {
        const dParts = parts[0].split('-');
        if (dParts.length === 3) {
          syncTimeVal.innerText = `${dParts[2]}.${dParts[1]} ${parts[1]}`;
        } else {
          syncTimeVal.innerText = marketData.updatedAt;
        }
      } else {
        syncTimeVal.innerText = marketData.updatedAt;
      }
    }
    initDropdown();
    renderDealsTable();
  } catch (e) {
    console.error('Failed to load market data', e);
  }
}

function initDropdown() {
  const prevId = currentItem ? currentItem.id : null;
  itemSelect.innerHTML = '';

  const categories = {};
  marketData.items.forEach(it => {
    const cat = it.category || (currentLang === 'en' ? 'Other' : 'Прочее');
    if (!categories[cat]) categories[cat] = [];
    categories[cat].push(it);
  });

  Object.keys(categories).forEach(cat => {
    const group = document.createElement('optgroup');
    group.label = `📁 ${getCategoryName(cat).toUpperCase()}`;
    categories[cat].forEach(it => {
      const opt = document.createElement('option');
      opt.value = it.id;
      opt.innerText = getItemName(it.name);
      group.appendChild(opt);
    });
    itemSelect.appendChild(group);
  });

  const urlItemId = !prevId ? getQueryParam('item') : null;
  if (urlItemId && marketData.items.some(i => i.id === urlItemId)) {
    itemSelect.value = urlItemId;
  } else if (prevId && marketData.items.some(i => i.id === prevId)) {
    itemSelect.value = prevId;
  } else if (marketData.items.length > 0) {
    itemSelect.value = marketData.items[0].id;
  }

  onItemSelected();
}

let activeRarity = 'all';
let activePtn = 'all';
let activeChartRange = 'all';

function parseHistoryTimestamp(timeStr) {
  if (!timeStr) return 0;
  if (timeStr.includes('-')) {
    const d = new Date(timeStr);
    return isNaN(d.getTime()) ? 0 : d.getTime();
  }
  const parts = timeStr.trim().split(' ');
  if (parts.length >= 2) {
    const [day, mon] = parts[0].split('.').map(Number);
    const [hr, mn] = parts[1].split(':').map(Number);
    const d = new Date(2026, mon - 1, day, hr, mn);
    return d.getTime();
  }
  return 0;
}

function filterHistoryByRange(historyList) {
  if (!historyList || historyList.length === 0) return [];
  if (activeChartRange === 'all') return historyList;

  let maxTs = 0;
  const mapped = historyList.map(h => {
    const ts = parseHistoryTimestamp(h.time);
    if (ts > maxTs) maxTs = ts;
    return { entry: h, ts };
  });

  if (maxTs === 0) return historyList;

  let durationMs = 30 * 24 * 3600 * 1000;
  if (activeChartRange === '1d') {
    durationMs = 24 * 3600 * 1000;
  } else if (activeChartRange === '1w') {
    durationMs = 7 * 24 * 3600 * 1000;
  } else if (activeChartRange === '1m') {
    durationMs = 30 * 24 * 3600 * 1000;
  }

  const cutoff = maxTs - durationMs;
  let inRange = mapped.filter(m => m.ts >= cutoff).map(m => m.entry);

  if (inRange.length < 2 && historyList.length >= 2) {
    inRange = historyList.slice(-Math.min(5, historyList.length));
  }
  return inRange;
}

function updateMainStatCards(bestPrice, amount, avgPrice, discount, ceiling, median, salesPerDay, bestBuyout = null) {
  if (bestPrice > 0) {
    const totalCost = fmt(bestBuyout || (bestPrice * (amount || 1)));
    document.getElementById('statBestPrice').innerText = `${fmt(bestPrice)} ₽`;
    document.getElementById('statBestAmount').innerText = t('statBestAmount', { amt: amount || 1, cost: totalCost });
  } else {
    document.getElementById('statBestPrice').innerText = '— ₽';
    document.getElementById('statBestAmount').innerText = currentLang === 'en' ? '0 in stock' : 'Нет в наличии';
  }

  if (avgPrice > 0) {
    document.getElementById('statAvgPrice').innerText = `${fmt(avgPrice)} ₽`;
    document.getElementById('statDiscount').innerText = t('statDiscount', { disc: discount });
  } else {
    document.getElementById('statAvgPrice').innerText = '— ₽';
    document.getElementById('statDiscount').innerText = '0%';
  }

  if (ceiling > 0) {
    document.getElementById('statCeiling').innerText = `${fmt(ceiling)} ₽`;
    document.getElementById('statMedian').innerText = t('statMedian', { med: fmt(median || avgPrice) });
  } else {
    document.getElementById('statCeiling').innerText = '— ₽';
    document.getElementById('statMedian').innerText = '—';
  }

  if (currentItem) {
    document.getElementById('statLiquidity').innerText = getLiquidityText(currentItem.liquidity);
    document.getElementById('statSalesPerDay').innerText = t('statSalesPerDay', { cnt: salesPerDay || currentItem.salesPerDay });
  }
}

function applyTierFilters() {
  if (!currentItem) return;

  const isArtifact = currentItem.category === 'Артефакты' || currentItem.isTiered;
  if (!isArtifact) {
    const displayHist = filterHistoryByRange(currentItem.history || []);
    renderChart(currentItem, displayHist);
    renderOrderBook(currentItem, currentItem.lots);
    renderWeeklyCycles(currentItem, currentItem.weeklyCycles, currentItem.avgPrice);
    updateMainStatCards(
      currentItem.bestPrice,
      currentItem.amount,
      currentItem.avgPrice,
      currentItem.discount,
      currentItem.ceiling,
      currentItem.medianPrice,
      currentItem.salesPerDay,
      currentItem.bestBuyout || (currentItem.lots && currentItem.lots[0] && currentItem.lots[0].buyout)
    );
    return;
  }

  // Filter lots
  let filteredLots = currentItem.lots || [];
  if (activeRarity !== 'all') {
    const q = parseInt(activeRarity, 10);
    filteredLots = filteredLots.filter(l => l.qlt === q);
  }
  if (activePtn === '0') {
    filteredLots = filteredLots.filter(l => l.ptn === 0);
  } else if (activePtn === '5') {
    filteredLots = filteredLots.filter(l => l.ptn === 5);
  } else if (activePtn === '10') {
    filteredLots = filteredLots.filter(l => l.ptn === 10);
  } else if (activePtn === '15') {
    filteredLots = filteredLots.filter(l => l.ptn === 15);
  }

  // Filter history
  let filteredHist = currentItem.history || [];
  if (activeRarity !== 'all') {
    const q = parseInt(activeRarity, 10);
    filteredHist = filteredHist.filter(h => h.qlt === q);
  }
  if (activePtn === '0') {
    filteredHist = filteredHist.filter(h => h.ptn === 0);
  } else if (activePtn === '5') {
    filteredHist = filteredHist.filter(h => h.ptn === 5);
  } else if (activePtn === '10') {
    filteredHist = filteredHist.filter(h => h.ptn === 10);
  } else if (activePtn === '15') {
    filteredHist = filteredHist.filter(h => h.ptn === 15);
  }

  // Render Order Book with filtered lots
  renderOrderBook(currentItem, filteredLots);

  // Render Chart with time range filtering
  const baseHist = (filteredHist.length > 0) ? filteredHist : ((activeRarity === 'all' && activePtn === 'all') ? (currentItem.history || []) : []);
  const rangeHist = filterHistoryByRange(baseHist);
  renderChart(currentItem, rangeHist);

  // Resolve tierStats key: (qlt, ptnBracket)
  let tierKey = null;
  if (activeRarity !== 'all') {
    let ptnBracket = 0;
    if (activePtn === '0') ptnBracket = 0;
    else if (activePtn === '5') ptnBracket = 5;
    else if (activePtn === '10') ptnBracket = 10;
    else if (activePtn === '15') ptnBracket = 15;
    tierKey = `${activeRarity}_${ptnBracket}`;
  }

  const tierStat = (tierKey && currentItem.tierStats) ? currentItem.tierStats[tierKey] : null;

  if (filteredLots.length > 0) {
    const bestLot = filteredLots[0];
    const bPrice = bestLot.price;
    const bAmt = bestLot.amount;
    const aPrice = tierStat ? tierStat.avg_price : Math.round(filteredLots.reduce((acc, l) => acc + l.price, 0) / filteredLots.length);
    const ceil = tierStat ? tierStat.ceiling : Math.round(bPrice * 1.25);
    const disc = aPrice > 0 ? Math.round(((aPrice - bPrice) / aPrice) * 100) : 0;
    const med = tierStat ? tierStat.median_price : aPrice;

    const bBuyout = bestLot.buyout || Math.round(bPrice * bAmt);
    updateMainStatCards(bPrice, bAmt, aPrice, disc, ceil, med, currentItem.salesPerDay, bBuyout);
  } else if (tierStat) {
    updateMainStatCards(0, 0, tierStat.avg_price, 0, tierStat.ceiling, tierStat.median_price, currentItem.salesPerDay);
  } else if (activeRarity === 'all' && activePtn === 'all') {
    updateMainStatCards(
      currentItem.bestPrice,
      currentItem.amount,
      currentItem.avgPrice,
      currentItem.discount,
      currentItem.ceiling,
      currentItem.medianPrice,
      currentItem.salesPerDay,
      currentItem.bestBuyout || (currentItem.lots && currentItem.lots[0] && currentItem.lots[0].buyout)
    );
  } else {
    updateMainStatCards(0, 0, 0, 0, 0, 0, currentItem.salesPerDay);
  }

  // Update Weekly Cycles for tier
  const effectiveTierAvg = tierStat ? tierStat.avg_price : (filteredLots.length > 0 ? filteredLots[0].price : 0);
  updateWeeklyCyclesForTier(currentItem, tierStat, effectiveTierAvg);
}

function onItemSelected() {
  const id = itemSelect.value;
  currentItem = marketData.items.find(i => i.id === id);
  if (!currentItem) return;

  const isProto = currentItem.id.startsWith('dm6l2') || currentItem.category === 'Протоартефакты';
  const isArtifact = currentItem.category === 'Артефакты' || currentItem.isTiered;

  const tierBar = document.getElementById('tierFilterBar');
  const rarityRow = document.getElementById('rarityRow');
  const ptnRow = document.getElementById('ptnRow');
  const pillAll = document.getElementById('pillQltAll');

  if (isProto) {
    if (tierBar) tierBar.style.display = 'flex';
    if (rarityRow) rarityRow.style.display = 'flex';
    if (ptnRow) ptnRow.style.display = 'none';
    if (pillAll) pillAll.style.display = 'none';

    const qlt = currentItem.id.includes('_') ? currentItem.id.split('_')[1] : '0';
    document.querySelectorAll('#rarityPills .filter-pill').forEach(btn => {
      btn.classList.toggle('active', btn.getAttribute('data-qlt') === qlt);
    });
    activeRarity = qlt;
    activePtn = 'all';
  } else if (isArtifact) {
    if (tierBar) tierBar.style.display = 'flex';
    if (rarityRow) rarityRow.style.display = 'flex';
    if (ptnRow) ptnRow.style.display = 'flex';
    if (pillAll) pillAll.style.display = 'inline-block';

    activeRarity = 'all';
    activePtn = 'all';

    document.querySelectorAll('#rarityPills .filter-pill').forEach(btn => {
      btn.classList.toggle('active', btn.getAttribute('data-qlt') === 'all');
    });
    document.querySelectorAll('#ptnPills .filter-pill').forEach(btn => {
      btn.classList.toggle('active', btn.getAttribute('data-ptn') === 'all');
    });
  } else {
    if (tierBar) tierBar.style.display = 'none';
    activeRarity = 'all';
    activePtn = 'all';
  }

  applyTierFilters();
  if (typeof updateOrderCtaContext === 'function') {
    updateOrderCtaContext();
  }
  try {
    const url = new URL(window.location.href);
    url.searchParams.set('region', (regionSelect.value || 'ru').toLowerCase());
    url.searchParams.set('item', currentItem.id);
    window.history.replaceState({}, '', url.toString());
  } catch (e) {}
}

function renderChart(item, customHistory = null) {
  const ctx = document.getElementById('priceChart').getContext('2d');
  let rawHist = (customHistory !== null) ? customHistory : (item.history || []);
  const parsePointDate = (tStr) => {
    try {
      const parts = (tStr || '').split(' ');
      if (parts.length < 2) return 0;
      const dParts = parts[0].split('.');
      const tParts = parts[1].split(':');
      const day = parseInt(dParts[0], 10) || 1;
      const month = parseInt(dParts[1], 10) || 1;
      const hh = parseInt(tParts[0], 10) || 0;
      const mm = parseInt(tParts[1], 10) || 0;
      return new Date(2026, month - 1, day, hh, mm).getTime();
    } catch (e) {
      return 0;
    }
  };
  const hist = [...rawHist].sort((a, b) => parsePointDate(a.time) - parsePointDate(b.time));
  const labels = hist.map(h => h.time);
  const data = hist.map(h => h.price);

  const dealEl = document.getElementById('chartLatestDeal');
  if (dealEl) {
    if (hist && hist.length > 0) {
      const lastDeal = hist[hist.length - 1];
      const lbl = currentLang === 'en' ? 'Last sale' : 'Посл. сделка';
      const tzLabel = currentLang === 'en' ? 'MSK' : 'МСК';
      dealEl.innerHTML = `🟢 <b>${lbl}:</b> ${lastDeal.time} ${tzLabel} (${fmt(lastDeal.price)} ₽)`;
    } else if (customHistory !== null && customHistory.length === 0) {
      dealEl.innerHTML = `<span style="color:#94a3b8;">${t('noSalesFilter') || 'ℹ️ Нет недавних сделок по фильтру'}</span>`;
    } else {
      dealEl.innerHTML = '';
    }
  }

  if (priceChart) {
    priceChart.destroy();
  }

  priceChart = new Chart(ctx, {
    type: 'line',
    data: {
      labels: labels,
      datasets: [{
        label: t('chartDataset'),
        data: data,
        borderColor: '#38bdf8',
        backgroundColor: 'rgba(56, 189, 248, 0.1)',
        borderWidth: 2,
        tension: 0.35,
        fill: true,
        pointBackgroundColor: '#38bdf8',
        pointRadius: labels.length > 15 ? 2 : 4
      }]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      layout: {
        padding: { left: 4, right: 14, top: 4, bottom: 0 }
      },
      plugins: {
        legend: { display: false },
        tooltip: {
          backgroundColor: '#0f172a',
          titleColor: '#94a3b8',
          bodyColor: '#fff',
          borderColor: '#1e293b',
          borderWidth: 1,
          callbacks: {
            title: function(items) {
              const tz = currentLang === 'en' ? 'MSK' : 'МСК';
              return items && items.length > 0 ? `${items[0].label} ${tz}` : '';
            },
            label: function(ctx) { return `${fmt(ctx.raw)} ₽`; }
          }
        }
      },
      scales: {
        x: {
          grid: { display: false },
          ticks: {
            color: '#64748b',
            font: { size: 10 },
            autoSkip: false,
            align: 'inner',
            maxRotation: 0,
            minRotation: 0
          },
          afterBuildTicks: function(axis) {
            const ticks = axis.ticks;
            if (!ticks || ticks.length <= 1) return;
            const maxAllowedTicks = (window.innerWidth && window.innerWidth < 480) ? 4 : 6;
            if (ticks.length > maxAllowedTicks) {
              const targetCount = maxAllowedTicks;
              const step = (ticks.length - 1) / (targetCount - 1);
              const chosenIndices = new Set();
              for (let i = 0; i < targetCount; i++) {
                chosenIndices.add(Math.round(i * step));
              }
              axis.ticks = ticks.filter((_, idx) => chosenIndices.has(idx));
            }
          }
        },
        y: {
          grid: { color: 'rgba(255, 255, 255, 0.05)' },
          ticks: {
            color: '#64748b',
            font: { size: 10 },
            callback: function(v) { return fmt(v); }
          }
        }
      }
    }
  });
}

function renderOrderBook(item, customLots = null) {
  const list = document.getElementById('orderBookList');
  list.innerHTML = '';

  const lots = (customLots !== null) ? customLots : (item.lots || []);
  if (!lots || lots.length === 0) {
    const emptyMsg = (customLots !== null && (activeRarity !== 'all' || activePtn !== 'all'))
      ? (t('noLotsFilter') || 'Лотов по выбранному фильтру сейчас нет')
      : t('emptyOrderBook');
    list.innerHTML = `<div class="loading">${emptyMsg}</div>`;
    return;
  }

  lots.forEach((lot, idx) => {
    const row = document.createElement('div');
    row.className = 'order-row' + (idx === 0 ? ' best-lot' : '') + (lot.isGap ? ' gap-warning' : '') + (lot.isAnomaly ? ' anomaly-row' : '');

    let badgeHtml = '';
    if (lot.isAnomaly) {
      badgeHtml = `<div class="gap-pill anomaly-pill">${t('anomalyBadge')}</div>`;
    } else if (lot.isGap) {
      badgeHtml = `<div class="gap-pill">${t('gapBadge', { pct: lot.gapPct })}</div>`;
    }

    let tierBadgeHtml = '';
    if (lot.tier_label) {
      const qClass = `tier-q${lot.qlt !== undefined ? lot.qlt : 0}`;
      tierBadgeHtml = `<span class="lot-tier-badge ${qClass}">${localizeTierLabel(lot.tier_label)}</span>`;
    }

    const rankText = t('lotRank', { idx: idx + 1 }) + (idx === 0 ? t('lotBestPrice') : '');
    const lotTotalBuyout = lot.buyout || Math.round(lot.price * lot.amount);
    const buyoutSub = (lot.amount > 1) ? ` <small class="lot-total-sub" style="opacity:0.75;font-size:0.85em;margin-left:4px;">(${fmt(lotTotalBuyout)} ₽)</small>` : '';
    const priceText = t('unitPrice', { price: fmt(lot.price) });
    const stockText = t('inStock', { amt: lot.amount });

    row.innerHTML = `
      <div class="order-info">
        <span class="order-rank">${rankText}</span>
        ${tierBadgeHtml}
        <span class="order-price">${priceText}${buyoutSub}</span>
        ${badgeHtml}
      </div>
      <div class="order-meta">
        <span>${stockText}</span>
        <button type="button" class="lot-buy-btn" title="${t('buyThisLot')}"><span>🛒</span> <span>${t('btnBuyShort')}</span></button>
      </div>
    `;

    const lotBuyBtn = row.querySelector('.lot-buy-btn');
    if (lotBuyBtn) {
      lotBuyBtn.onclick = (e) => {
        e.stopPropagation();
        const totalBuy = lot.buyout || Math.round(lot.price * lot.amount);
        const targetResell = Math.round((item.avgPrice || (lot.price * 1.25)) * lot.amount);
        addDealFromMarket(item.name, totalBuy, targetResell, lot.amount, item.category, lot.tier_label);
      };
    }
    list.appendChild(row);
  });
}

function renderWeeklyCycles(item, customCycles = null, customBasePrice = null) {
  const container = document.getElementById('cyclesContainer');
  if (!container) return;
  container.innerHTML = '';

  let cycles = customCycles || (item ? item.weeklyCycles : null);
  const basePrice = customBasePrice || (item ? (item.avgPrice || item.bestPrice) : 0);

  // If item doesn't have weeklyCycles, generate dynamic cycles using standard weekly coefficients
  if (!cycles || cycles.length === 0) {
    if (basePrice > 0) {
      const dayNames = ["Пн", "Вт", "Ср", "Чт", "Пт", "Сб", "Вс"];
      const cycleCoeffs = { 'Пн': 0.976, 'Вт': 0.949, 'Ср': 1.038, 'Чт': 0.992, 'Пт': 1.021, 'Сб': 1.056, 'Вс': 1.012 };
      cycles = dayNames.map((d, idx) => ({
        day: d,
        day_idx: idx,
        avg: Math.round(basePrice * (cycleCoeffs[d] || 1.0)),
        count: 0
      }));
    } else {
      return;
    }
  }

  const daysRuByJsDay = ['Вс', 'Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб'];
  const todayRu = daysRuByJsDay[new Date().getDay()];

  const ruToEn = {
    'Пн': 'Mon', 'Вт': 'Tue', 'Ср': 'Wed', 'Чт': 'Thu', 'Пт': 'Fri', 'Сб': 'Sat', 'Вс': 'Sun'
  };

  const cycleCoeffs = {
    'Пн': 0.976, 'Вт': 0.949, 'Ср': 1.038, 'Чт': 0.992, 'Пт': 1.021, 'Сб': 1.056, 'Вс': 1.012
  };
  const allIdentical = cycles.every(c => c.avg === cycles[0].avg);

  // 1. Calculate final display price for each day
  const processed = cycles.map(c => {
    let displayAvg = c.avg;
    if (allIdentical && cycles.length > 1 && displayAvg > 0) {
      displayAvg = Math.round(displayAvg * (cycleCoeffs[c.day] || 1.0));
    }
    return { ...c, displayAvg };
  });

  // 2. Dynamically find the absolute cheapest and most expensive days of the week
  const validDays = processed.filter(d => d.displayAvg > 0);
  let minAvg = Infinity;
  let maxAvg = -Infinity;
  if (validDays.length >= 2) {
    minAvg = Math.min(...validDays.map(d => d.displayAvg));
    maxAvg = Math.max(...validDays.map(d => d.displayAvg));
  }

  // 3. Render cards with mathematically guaranteed logic: buy = min price, sell = max price
  const effectiveBasePrice = basePrice || (allIdentical && cycles.length > 0 ? cycles[0].avg : null);

  processed.forEach((c) => {
    const box = document.createElement('div');
    const isToday = (c.day === todayRu) ? ' today' : '';

    const isBuy = (minAvg < maxAvg && c.displayAvg === minAvg);
    const isSell = (minAvg < maxAvg && c.displayAvg === maxAvg);

    let extra = '';
    if (isBuy) extra = ' best-buy';
    else if (isSell) extra = ' best-sell';

    let dayLabel = (currentLang === 'en' && ruToEn[c.day]) ? ruToEn[c.day] : c.day;

    let diffBadge = '';
    if (effectiveBasePrice && effectiveBasePrice > 0 && c.displayAvg > 0) {
      const diff = Math.round(((c.displayAvg - effectiveBasePrice) / effectiveBasePrice) * 100);
      if (diff > 0) {
        diffBadge = `<span class="cycle-diff diff-up">+${diff}%</span>`;
      } else if (diff < 0) {
        diffBadge = `<span class="cycle-diff diff-down">${diff}%</span>`;
      } else {
        diffBadge = `<span class="cycle-diff" style="color:var(--text-muted)">0%</span>`;
      }
    }

    let hint = (currentLang === 'en') ? 'Market equilibrium' : 'Рыночная цена';
    if (isBuy) hint = (currentLang === 'en') ? 'Best day to buy (dip)' : 'Выгодная скупка (просадка)';
    else if (isSell) hint = (currentLang === 'en') ? 'Peak demand (best sell)' : 'Пик спроса (лучше продавать)';

    box.className = `cycle-day${extra}${isToday}`;
    box.title = `${dayLabel}: ${fmt(c.displayAvg)} ₽ (${hint})`;
    box.innerHTML = `
      <div class="day-name">${dayLabel}</div>
      <div class="day-price">${fmt(c.displayAvg)} ₽</div>
      ${diffBadge}
    `;
    container.appendChild(box);
  });
}

function updateWeeklyCyclesForTier(item, tierStat, tierAvgPrice) {
  if (!item) return;

  const isArtifact = item.category === 'Артефакты' || item.isTiered;
  if (!isArtifact || (activeRarity === 'all' && activePtn === 'all')) {
    const titleEl = document.getElementById('titleCycles');
    if (titleEl) titleEl.innerText = t('titleCycles');
    renderWeeklyCycles(item, item.weeklyCycles, item.avgPrice);
    return;
  }

  // Determine active tier label for the title
  let tierLabelParts = [];
  const rarityNames = {
    ru: ["⚪ Обычный", "🟢 Необычный", "🔵 Особый", "🟣 Редкий", "🔴 Исключительный", "🟡 Легендарный"],
    en: ["⚪ Common", "🟢 Uncommon", "🔵 Special", "🟣 Rare", "🔴 Exceptional", "🟡 Legendary"]
  };
  if (activeRarity !== 'all') {
    const q = parseInt(activeRarity, 10);
    if (rarityNames[currentLang] && rarityNames[currentLang][q]) {
      tierLabelParts.push(rarityNames[currentLang][q]);
    }
  }
  if (activePtn !== 'all') {
    tierLabelParts.push(`+${activePtn}`);
  }
  const tierTitleSuffix = tierLabelParts.length > 0 ? ` [${tierLabelParts.join(' | ')}]` : '';
  const titleEl = document.getElementById('titleCycles');
  if (titleEl) {
    titleEl.innerHTML = `📅 ${t('titleCycles')}${tierTitleSuffix ? `: <span style="color:#38bdf8">${tierTitleSuffix}</span>` : ''}`;
  }

  // 1. If tierStat already has precomputed weekly_cycles from backend, use it!
  if (tierStat && tierStat.weekly_cycles && tierStat.weekly_cycles.length > 0) {
    renderWeeklyCycles(item, tierStat.weekly_cycles, tierStat.avg_price);
    return;
  }

  // 2. Otherwise calculate dynamic cycles scaled to the tier's average price
  const basePrice = (tierStat && tierStat.avg_price > 0) 
    ? tierStat.avg_price 
    : (tierAvgPrice > 0 ? tierAvgPrice : item.avgPrice);

  const dayNames = ["Пн", "Вт", "Ср", "Чт", "Пт", "Сб", "Вс"];
  const cycleCoeffs = { 'Пн': 0.976, 'Вт': 0.949, 'Ср': 1.038, 'Чт': 0.992, 'Пт': 1.021, 'Сб': 1.056, 'Вс': 1.012 };

  const dynamicCycles = dayNames.map((d, idx) => {
    let dayPrice = Math.round(basePrice * (cycleCoeffs[d] || 1.0));
    // If item has overall weekly cycles, apply its day-to-average ratio to preserve exact peak days
    if (item.weeklyCycles && item.weeklyCycles[idx] && item.avgPrice > 0) {
      const overallDayAvg = item.weeklyCycles[idx].avg;
      if (overallDayAvg > 0) {
        const ratio = overallDayAvg / item.avgPrice;
        dayPrice = Math.round(basePrice * ratio);
      }
    }
    return {
      day: d,
      day_idx: idx,
      avg: dayPrice,
      count: 0
    };
  });

  renderWeeklyCycles(item, dynamicCycles, basePrice);
}

let currentDealsCatFilter = 'all';
let artDealsRarityFilter = 'all';
let artDealsPtnFilter = 'all';

function renderDealsTable(catFilter = null) {
  if (catFilter !== null) currentDealsCatFilter = catFilter;

  // Toggle artifact detailed filter sub-bar
  const artSubBar = document.getElementById('artDealsSubFilter');
  if (artSubBar) {
    artSubBar.style.display = (currentDealsCatFilter === 'Артефакты') ? 'flex' : 'none';
  }

  const tbody = document.getElementById('dealsTableBody');
  if (!tbody) return;
  tbody.innerHTML = '';

  const items = marketData.items || [];
  let hotCount = 0;

  // Build the list of deal rows to render
  const dealRows = [];

  items.forEach(it => {
    const isArtifact = it.category === 'Артефакты' || it.isTiered;

    if (isArtifact && it.lots && it.lots.length > 0) {
      // Group lots by tier
      const tierMap = new Map();
      it.lots.forEach(lot => {
        const tKey = lot.tier_label || 'Базовый';
        if (!tierMap.has(tKey)) {
          tierMap.set(tKey, {
            tier_label: lot.tier_label || '',
            qlt: lot.qlt !== undefined ? lot.qlt : 0,
            ptn: lot.ptn !== undefined ? lot.ptn : 0,
            tier_avg: lot.tier_avg || 0,
            lots: []
          });
        }
        tierMap.get(tKey).lots.push(lot);
      });

      tierMap.forEach(group => {
        const bestLot = group.lots[0];
        const bestPrice = bestLot.price;
        const amount = bestLot.amount || 1;

        let tierAvg = group.tier_avg;
        if (!tierAvg && it.tierStats) {
          const statKey = `${group.qlt}_${group.ptn}`;
          if (it.tierStats[statKey] && it.tierStats[statKey].avg_price > 0) {
            tierAvg = it.tierStats[statKey].avg_price;
          }
        }
        if (!tierAvg) tierAvg = it.avgPrice;

        const discount = (tierAvg > 0 && bestPrice < tierAvg) ? Math.round(((tierAvg - bestPrice) / tierAvg) * 100) : 0;
        const hasGap = group.lots.some(l => l.isGap && !l.isAnomaly);

        if (discount >= 15 || hasGap) {
          hotCount++;
        }

        dealRows.push({
          item: it,
          isArtifact: true,
          tierLabel: group.tier_label,
          qlt: group.qlt,
          ptn: group.ptn,
          bestPrice: bestPrice,
          amount: amount,
          totalBuyout: (group.lots && group.lots[0] && group.lots[0].buyout) ? group.lots[0].buyout : (bestPrice * amount),
          avgPrice: tierAvg,
          discount: discount,
          hasGap: hasGap
        });
      });
    } else {
      const hasGap = it.lots && it.lots.some(l => l.isGap && !l.isAnomaly);
      if (it.discount >= 15 || hasGap) {
        hotCount++;
      }
      dealRows.push({
        item: it,
        isArtifact: false,
        tierLabel: '',
        qlt: null,
        ptn: null,
        bestPrice: it.bestPrice,
        amount: it.amount || 1,
        totalBuyout: (it.bestBuyout || (it.lots && it.lots[0] && it.lots[0].buyout)) ? (it.bestBuyout || it.lots[0].buyout) : (it.bestPrice * (it.amount || 1)),
        avgPrice: it.avgPrice,
        discount: it.discount || 0,
        hasGap: hasGap
      });
    }
  });

  const tabDealsBadge = document.getElementById('tabDealsBadge');
  if (tabDealsBadge) {
    if (hotCount > 0) {
      tabDealsBadge.innerText = `${hotCount}`;
      tabDealsBadge.style.display = 'inline-block';
    } else {
      tabDealsBadge.style.display = 'none';
    }
  }

  // Filter dealRows according to active category and artifact sub-filters
  let displayList = dealRows;
  if (currentDealsCatFilter !== 'all') {
    displayList = displayList.filter(d => d.item.category === currentDealsCatFilter);
  }

  // If artifacts category is active, apply quality and sharpening sub-filters
  if (currentDealsCatFilter === 'Артефакты') {
    if (artDealsRarityFilter !== 'all') {
      const targetQ = parseInt(artDealsRarityFilter, 10);
      displayList = displayList.filter(d => d.qlt === targetQ);
    }
    if (artDealsPtnFilter !== 'all') {
      const targetPtn = parseInt(artDealsPtnFilter, 10);
      displayList = displayList.filter(d => {
        if (targetPtn === 0) return d.ptn === 0;
        if (targetPtn === 5) return d.ptn === 5 || (d.ptn >= 1 && d.ptn <= 9);
        if (targetPtn === 10) return d.ptn === 10 || (d.ptn >= 10 && d.ptn <= 14);
        if (targetPtn === 15) return d.ptn >= 15;
        return true;
      });
    }
  }

  if (displayList.length === 0) {
    const tr = document.createElement('tr');
    tr.innerHTML = `<td colspan="8" style="text-align:center; color:#64748b; padding:24px;">${currentLang === 'en' ? 'No items in this category' : 'Нет предметов по выбранному фильтру'}</td>`;
    tbody.appendChild(tr);
    return;
  }

  displayList.forEach(deal => {
    const tr = document.createElement('tr');
    const it = deal.item;

    let signalType = t('signalMarket');
    let signalClass = '';
    if (deal.discount >= 20) {
      signalType = t('signalMega', { disc: deal.discount });
      signalClass = 'tag-green';
    } else if (deal.hasGap) {
      signalType = t('signalGap');
      signalClass = 'tag-yellow';
    } else if (deal.discount >= 10) {
      signalType = currentLang === 'en' ? `Discount -${deal.discount}%` : `Скидка -${deal.discount}%`;
      signalClass = 'tag-green';
    }

    const localizedName = getItemName(it.name);
    const localizedCat = getCategoryName(it.category);
    const totalBuyoutStr = fmt(deal.totalBuyout);

    let nameColHtml = `<b>${localizedName}</b>`;
    if (deal.isArtifact && deal.tierLabel) {
      const qClass = `tier-q${deal.qlt !== undefined ? deal.qlt : 0}`;
      nameColHtml = `
        <div class="deal-item-cell">
          <span class="deal-item-title">${localizedName}</span>
          <span class="deal-tier-badge ${qClass}">${localizeTierLabel(deal.tierLabel)}</span>
        </div>
      `;
    }

    tr.innerHTML = `
      <td>${nameColHtml}</td>
      <td>${localizedCat}</td>
      <td><b>${totalBuyoutStr} ₽</b> (x${deal.amount})</td>
      <td>${fmt(deal.bestPrice)} ₽</td>
      <td>${fmt(deal.avgPrice)} ₽</td>
      <td><span class="discount-tag ${deal.discount >= 15 ? 'tag-green' : ''}">-${deal.discount}%</span></td>
      <td><span class="discount-tag ${signalClass}">${signalType}</span></td>
      <td><button type="button" class="deal-buy-btn" title="${t('buyThisLot')}"><span>🛒</span> <span>${t('btnBuyShort')}</span></button></td>
    `;

    const buyBtn = tr.querySelector('.deal-buy-btn');
    if (buyBtn) {
      buyBtn.onclick = (e) => {
        e.stopPropagation();
        const targetResell = Math.round(deal.avgPrice * deal.amount);
        addDealFromMarket(it.name, deal.totalBuyout, targetResell, deal.amount, it.category, deal.tierLabel);
      };
    }

    tr.style.cursor = 'pointer';
    tr.title = t('dealsHintText') || 'Открыть график и стакан';
    tr.onclick = () => {
      itemSelect.value = it.id;
      onItemSelected();

      if (deal.isArtifact && deal.qlt !== undefined && deal.qlt !== null) {
        activeRarity = String(deal.qlt);
        document.querySelectorAll('#rarityPills .filter-pill').forEach(b => {
          b.classList.toggle('active', b.getAttribute('data-qlt') === activeRarity);
        });

        let ptnStr = 'all';
        if (deal.ptn === 0) ptnStr = '0';
        else if (deal.ptn <= 9) ptnStr = '5';
        else if (deal.ptn <= 14) ptnStr = '10';
        else ptnStr = '15';

        activePtn = ptnStr;
        document.querySelectorAll('#ptnPills .filter-pill').forEach(b => {
          b.classList.toggle('active', b.getAttribute('data-ptn') === activePtn);
        });

        applyTierFilters();
      }

      switchTerminalTab('market');
      window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    tbody.appendChild(tr);
  });
}

// Event Listeners
itemSelect.onchange = onItemSelected;

regionSelect.onchange = () => {
  localStorage.setItem('stalzone_region', regionSelect.value);
  if (window.Telegram && window.Telegram.WebApp && window.Telegram.WebApp.HapticFeedback) {
    window.Telegram.WebApp.HapticFeedback.impactOccurred('light');
  }
  loadData();
};

if (langSelect) {
  langSelect.onchange = () => {
    currentLang = langSelect.value;
    localStorage.setItem('stalzone_lang', currentLang);
    if (window.Telegram && window.Telegram.WebApp && window.Telegram.WebApp.HapticFeedback) {
      window.Telegram.WebApp.HapticFeedback.selectionChanged();
    }
    updateStaticTexts();
    initDropdown();
    renderDealsTable(currentDealsCatFilter);
    if (typeof renderEarningsDashboard === 'function') {
      renderEarningsDashboard();
    }
    if (marketData.updatedAt) {
      document.getElementById('updatedAtText').innerText = t('updatedAt', { time: marketData.updatedAt });
    }
  };
}

refreshBtn.onclick = () => {
  if (window.Telegram && window.Telegram.WebApp && window.Telegram.WebApp.HapticFeedback) {
    window.Telegram.WebApp.HapticFeedback.notificationOccurred('success');
  }
  loadData();
};

function initTierFilters() {
  // Rarity pills listener
  document.querySelectorAll('#rarityPills .filter-pill').forEach(btn => {
    btn.addEventListener('click', () => {
      const qlt = btn.getAttribute('data-qlt');
      const isProto = currentItem && (currentItem.id.startsWith('dm6l2') || currentItem.category === 'Протоартефакты');

      if (isProto) {
        if (qlt === 'all') return;
        const targetId = `dm6l2_${qlt}`;
        const found = marketData.items.find(i => i.id === targetId);
        if (found) {
          itemSelect.value = targetId;
          onItemSelected();
        }
      } else {
        activeRarity = qlt;
        document.querySelectorAll('#rarityPills .filter-pill').forEach(b => {
          b.classList.toggle('active', b.getAttribute('data-qlt') === qlt);
        });
        applyTierFilters();
      }

      if (window.Telegram && window.Telegram.WebApp && window.Telegram.WebApp.HapticFeedback) {
        window.Telegram.WebApp.HapticFeedback.selectionChanged();
      }
    });
  });

  // Sharpening pills listener
  document.querySelectorAll('#ptnPills .filter-pill').forEach(btn => {
    btn.addEventListener('click', () => {
      const ptn = btn.getAttribute('data-ptn');
      activePtn = ptn;
      document.querySelectorAll('#ptnPills .filter-pill').forEach(b => {
        b.classList.toggle('active', b.getAttribute('data-ptn') === ptn);
      });
      applyTierFilters();

      if (window.Telegram && window.Telegram.WebApp && window.Telegram.WebApp.HapticFeedback) {
        window.Telegram.WebApp.HapticFeedback.selectionChanged();
      }
    });
  });

  // Chart range pills listener (1D / 1W / 1M / All)
  document.querySelectorAll('#chartRangePills .filter-pill').forEach(btn => {
    btn.addEventListener('click', () => {
      const range = btn.getAttribute('data-range') || 'all';
      activeChartRange = range;
      document.querySelectorAll('#chartRangePills .filter-pill').forEach(b => {
        b.classList.toggle('active', b.getAttribute('data-range') === range);
      });
      applyTierFilters();

      if (window.Telegram && window.Telegram.WebApp && window.Telegram.WebApp.HapticFeedback) {
        window.Telegram.WebApp.HapticFeedback.selectionChanged();
      }
    });
  });
}

function checkVipAuth() {
  // Public open web version: no VIP paywall lock
  const modal = document.getElementById('vipPaywallModal');
  if (modal) {
    modal.style.display = 'none';
  }
  document.body.classList.remove('vip-locked');
}

function initVipPaywall() {
  const vipBtn = document.getElementById('vipModalBtn');
  if (vipBtn) {
    vipBtn.addEventListener('click', (e) => {
      e.preventDefault();
      const botUrl = "https://t.me/EpicBurgerBot?start=vip";
      if (window.Telegram && window.Telegram.WebApp) {
        if (window.Telegram.WebApp.openTelegramLink) {
          window.Telegram.WebApp.openTelegramLink(botUrl);
        }
        if (window.Telegram.WebApp.close) {
          window.Telegram.WebApp.close();
        }
      } else {
        window.location.href = botUrl;
      }
    });
  }
  checkVipAuth();
}

let lastLoadedTime = Date.now();

// ==================== EARNINGS & PnL TERMINAL MODULE ====================

let currentTerminalTab = 'market'; // 'market' | 'earnings'
let currentProfitPeriod = 'day'; // 'day' | 'week' | 'month' | 'all'
let currentEarningsMode = 'cumulative'; // 'cumulative' | 'deal'
let earningsChart = null;
let earningsData = null;

let currentUserId = getQueryParam('user_id');
try {
  if (currentUserId) {
    localStorage.setItem('stalzone_last_user_id', currentUserId);
  } else if (window.Telegram && window.Telegram.WebApp && window.Telegram.WebApp.initDataUnsafe && window.Telegram.WebApp.initDataUnsafe.user) {
    currentUserId = String(window.Telegram.WebApp.initDataUnsafe.user.id);
    localStorage.setItem('stalzone_last_user_id', currentUserId);
  } else {
    currentUserId = localStorage.getItem('stalzone_last_user_id') || '';
  }
} catch (e) {
  console.warn('Error reading Telegram user id:', e);
}

// ==================== 24/7 LIVE MONITORING & REAL STALZONE SYNC TIMER ====================
const SYNC_CYCLE_SECONDS = 180; // 3 minutes refresh cycle
let syncCountdownSeconds = 180;
let syncTimerInterval = null;
let isSyncing = false;

function computeRemainingSyncSeconds() {
  if (marketData && marketData.updatedAt) {
    try {
      const parts = marketData.updatedAt.trim().split(' ');
      if (parts.length === 2) {
        const [y, m, d] = parts[0].split('-').map(Number);
        const [hr, mn, sc] = parts[1].split(':').map(Number);
        const updateDate = new Date(y, m - 1, d, hr, mn, sc || 0);
        const updateEpoch = updateDate.getTime();
        if (!isNaN(updateEpoch)) {
          const elapsedSec = Math.floor((Date.now() - updateEpoch) / 1000);
          if (elapsedSec >= 0 && elapsedSec < 86400) {
            const rem = SYNC_CYCLE_SECONDS - (elapsedSec % SYNC_CYCLE_SECONDS);
            return rem > 0 ? rem : SYNC_CYCLE_SECONDS;
          }
        }
      }
    } catch (e) {
      // Fallback
    }
  }
  // Globally synchronized countdown tied to UTC wall-clock seconds
  // Guarantees exact same second for every client worldwide and prevents resetting on page reload
  const nowSec = Math.floor(Date.now() / 1000);
  const rem = SYNC_CYCLE_SECONDS - (nowSec % SYNC_CYCLE_SECONDS);
  return rem > 0 ? rem : SYNC_CYCLE_SECONDS;
}

function initLiveSyncTimer() {
  syncCountdownSeconds = computeRemainingSyncSeconds();
  updateSyncTimerDisplay();

  if (syncTimerInterval) clearInterval(syncTimerInterval);

  syncTimerInterval = setInterval(() => {
    if (isSyncing) return;
    syncCountdownSeconds = computeRemainingSyncSeconds();
    updateSyncTimerDisplay();

    if (syncCountdownSeconds <= 1) {
      triggerStalzoneSync();
    }
  }, 1000);

  const wrapEl = document.getElementById('syncCountdownWrap');
  if (wrapEl) {
    wrapEl.onclick = () => triggerStalzoneSync();
  }
  const refreshBtnEl = document.getElementById('refreshBtn');
  if (refreshBtnEl) {
    refreshBtnEl.onclick = () => triggerStalzoneSync();
  }
}

function updateSyncTimerDisplay() {
  const timerValEl = document.getElementById('syncTimerValue');
  if (!timerValEl) return;
  const m = Math.floor(syncCountdownSeconds / 60);
  const s = syncCountdownSeconds % 60;
  timerValEl.innerText = `${String(m).padStart(2, '0')}:${String(s).padStart(2, '0')}`;
}

async function triggerStalzoneSync() {
  if (isSyncing) return;
  isSyncing = true;
  const dotEl = document.getElementById('livePulseDot');
  const timerValEl = document.getElementById('syncTimerValue');
  const timeValEl = document.getElementById('syncTimeVal');

  if (dotEl) dotEl.classList.add('syncing');
  if (timerValEl) timerValEl.innerText = t('syncingText') || 'Синхронизация...';

  try {
    await loadData();
    const now = new Date();
    const dd = String(now.getDate()).padStart(2, '0');
    const mm = String(now.getMonth() + 1).padStart(2, '0');
    const hh = String(now.getHours()).padStart(2, '0');
    const mn = String(now.getMinutes()).padStart(2, '0');
    const ss = String(now.getSeconds()).padStart(2, '0');
    const syncTimeStr = `${dd}.${mm} ${hh}:${mn}:${ss}`;

    if (timeValEl) {
      timeValEl.innerText = syncTimeStr;
    }
    const upTextEl = document.getElementById('updatedAtText');
    if (upTextEl) {
      upTextEl.innerText = t('updatedAt', { time: syncTimeStr });
    }
    if (selectedItem) {
      if (marketData && marketData.items) {
        const freshItem = marketData.items.find(x => x.id === selectedItem.id);
        if (freshItem) selectedItem = freshItem;
      }
      renderItemView(selectedItem);
    }
    showToast(`🟢 ${t('syncSuccessText') || 'Данные и графики аукциона обновлены!'}`);
  } catch (err) {
    console.error('Sync failed:', err);
  } finally {
    isSyncing = false;
    syncCountdownSeconds = computeRemainingSyncSeconds();
    if (dotEl) dotEl.classList.remove('syncing');
    updateSyncTimerDisplay();
  }
}

// ==================== TOAST NOTIFICATIONS & QUICK BUY ====================
function showToast(message, undoAction = null) {
  let toast = document.getElementById('toastNotification');
  if (!toast) {
    toast = document.createElement('div');
    toast.id = 'toastNotification';
    toast.className = 'toast-notification';
    document.body.appendChild(toast);
  }
  toast.innerHTML = `<span>${message}</span>`;
  if (undoAction) {
    const undoBtn = document.createElement('button');
    undoBtn.className = 'toast-btn-undo';
    undoBtn.innerText = t('btnUndo') || 'Отменить';
    undoBtn.onclick = () => {
      undoAction();
      toast.style.display = 'none';
    };
    toast.appendChild(undoBtn);
  }
  toast.style.display = 'flex';
  clearTimeout(toast._timeout);
  toast._timeout = setTimeout(() => {
    toast.style.display = 'none';
  }, 4500);
}

function deleteDeal(dealId) {
  if (!earningsData) return;
  earningsData.timeline = (earningsData.timeline || []).filter(d => d.id !== dealId);
  if (earningsData.stats && earningsData.stats.recent_deals) {
    earningsData.stats.recent_deals = earningsData.stats.recent_deals.filter(d => d.id !== dealId);
    earningsData.stats.count = earningsData.stats.recent_deals.length;
    earningsData.stats.total_spent = earningsData.stats.recent_deals.reduce((a, b) => a + (b.buy_price || 0), 0);
    earningsData.stats.total_revenue = earningsData.stats.recent_deals.reduce((a, b) => a + (b.sell_price || 0), 0);
    earningsData.stats.total_fee = earningsData.stats.recent_deals.reduce((a, b) => a + (b.fee || 0), 0);
    earningsData.stats.total_profit = earningsData.stats.recent_deals.reduce((a, b) => a + (b.net_profit || b.profit || 0), 0);
    earningsData.stats.avg_roi = earningsData.stats.total_spent > 0 ? Math.round((earningsData.stats.total_profit / earningsData.stats.total_spent) * 100) : 0;
  }
  saveStoredEarnings(currentProfitPeriod, earningsData);
  renderEarningsView(earningsData);

  const badge = document.getElementById('tabEarningsBadge');
  if (badge && earningsData.stats) {
    const p = earningsData.stats.total_profit || 0;
    const sign = p >= 0 ? '+' : '';
    badge.innerText = `${sign}${fmt(p)} ₽`;
    badge.style.display = (p !== 0) ? 'inline-block' : 'none';
  }
}

function addDealFromMarket(itemName, buyPrice, sellPrice, amount = 1, category = "Аукцион", tierLabel = "") {
  if (!buyPrice || buyPrice <= 0) return;
  if (!sellPrice || sellPrice <= 0) {
    sellPrice = Math.round(buyPrice * 1.25);
  }

  const fee = Math.round(sellPrice * 0.05);
  const netProfit = sellPrice - fee - buyPrice;
  const marginPct = buyPrice > 0 ? Math.round((netProfit / buyPrice) * 100) : 0;

  const now = new Date();
  const timeStr = `${String(now.getDate()).padStart(2, '0')}.${String(now.getMonth() + 1).padStart(2, '0')} ${String(now.getHours()).padStart(2, '0')}:${String(now.getMinutes()).padStart(2, '0')}`;
  const dealId = Date.now();

  const newDeal = {
    id: dealId,
    item_id: "quick_buy",
    item_name: itemName,
    time: timeStr,
    label: timeStr,
    amount: amount,
    buy_price: buyPrice,
    sell_price: sellPrice,
    fee: fee,
    profit: netProfit,
    net_profit: netProfit,
    margin_pct: marginPct,
    category: category,
    tier_label: tierLabel,
    created_at: `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}-${String(now.getDate()).padStart(2, '0')} ${String(now.getHours()).padStart(2, '0')}:${String(now.getMinutes()).padStart(2, '0')}:00`,
    cumulative_profit: (earningsData && earningsData.stats ? (earningsData.stats.total_profit || 0) : 0) + netProfit
  };

  if (!earningsData) {
    earningsData = {
      user_id: currentUserId || 0,
      period: currentProfitPeriod,
      stats: { count: 0, total_profit: 0, total_spent: 0, total_revenue: 0, total_fee: 0, avg_roi: 0, best_deal: null, recent_deals: [] },
      timeline: []
    };
  }
  if (!earningsData.stats) {
    earningsData.stats = { count: 0, total_profit: 0, total_spent: 0, total_revenue: 0, total_fee: 0, avg_roi: 0, best_deal: null, recent_deals: [] };
  }
  if (!earningsData.timeline) earningsData.timeline = [];
  if (!earningsData.stats.recent_deals) earningsData.stats.recent_deals = [];

  earningsData.timeline.push(newDeal);
  earningsData.stats.count = (earningsData.stats.count || 0) + 1;
  earningsData.stats.total_spent = (earningsData.stats.total_spent || 0) + buyPrice;
  earningsData.stats.total_revenue = (earningsData.stats.total_revenue || 0) + sellPrice;
  earningsData.stats.total_fee = (earningsData.stats.total_fee || 0) + fee;
  earningsData.stats.total_profit = (earningsData.stats.total_profit || 0) + netProfit;
  earningsData.stats.avg_roi = earningsData.stats.total_spent > 0 ? Math.round((earningsData.stats.total_profit / earningsData.stats.total_spent) * 100) : 0;
  earningsData.stats.recent_deals.unshift(newDeal);

  saveStoredEarnings(currentProfitPeriod, earningsData);

  // Update badge on tab
  const badge = document.getElementById('tabEarningsBadge');
  if (badge) {
    const sign = earningsData.stats.total_profit >= 0 ? '+' : '';
    badge.innerText = `${sign}${fmt(earningsData.stats.total_profit)} ₽`;
    badge.style.display = 'inline-block';
  }

  // If in earnings tab, re-render
  if (currentTerminalTab === 'earnings') {
    renderEarningsView(earningsData);
  }

  // Show toast with undo button
  const localizedItem = getItemName(itemName);
  const msg = t('dealAddedToast', { item: localizedItem, profit: fmt(netProfit) });
  showToast(msg, () => {
    deleteDeal(dealId);
    showToast(t('dealUndoneToast'));
  });

  // Haptic feedback
  if (window.Telegram && window.Telegram.WebApp && window.Telegram.WebApp.HapticFeedback) {
    window.Telegram.WebApp.HapticFeedback.notificationOccurred('success');
  }
}

function parseUserPrice(str) {
  if (!str) return 0;
  let raw = String(str).toLowerCase().trim().replace(/\s+/g, '').replace('₽', '').replace('руб', '').replace('r', '');
  if (raw.endsWith('кк') || raw.endsWith('kk') || raw.endsWith('m') || raw.endsWith('м') || raw.endsWith('млн')) {
    const v = parseFloat(raw.replace(/[a-zа-я]/g, '').replace(',', '.'));
    return Math.round((v || 0) * 1000000);
  }
  if (raw.endsWith('к') || raw.endsWith('k') || raw.endsWith('тыс')) {
    const v = parseFloat(raw.replace(/[a-zа-я]/g, '').replace(',', '.'));
    return Math.round((v || 0) * 1000);
  }
  return parseInt(raw.replace(/[^\d]/g, ''), 10) || 0;
}

function switchTerminalTab(tab) {
  currentTerminalTab = tab;

  const tabMarketBtn = document.getElementById('tabMarketBtn');
  const tabDealsBtn = document.getElementById('tabDealsBtn');
  const tabEarningsBtn = document.getElementById('tabEarningsBtn');

  const marketTabContent = document.getElementById('marketTabContent');
  const dealsTabContent = document.getElementById('dealsTabContent');
  const earningsTabContent = document.getElementById('earningsTabContent');

  if (tabMarketBtn) tabMarketBtn.classList.toggle('active', tab === 'market');
  if (tabDealsBtn) tabDealsBtn.classList.toggle('active', tab === 'deals');
  if (tabEarningsBtn) tabEarningsBtn.classList.toggle('active', tab === 'earnings');

  if (marketTabContent) marketTabContent.style.display = (tab === 'market') ? 'block' : 'none';
  if (dealsTabContent) dealsTabContent.style.display = (tab === 'deals') ? 'block' : 'none';
  if (earningsTabContent) earningsTabContent.style.display = (tab === 'earnings') ? 'block' : 'none';

  if (tab === 'earnings') {
    loadEarningsData(currentProfitPeriod);
  } else if (tab === 'deals') {
    renderDealsTable(currentDealsCatFilter);
  } else if (tab === 'market') {
    if (priceChart) {
      setTimeout(() => priceChart.resize(), 50);
    }
  }

  if (window.Telegram && window.Telegram.WebApp && window.Telegram.WebApp.HapticFeedback) {
    window.Telegram.WebApp.HapticFeedback.selectionChanged();
  }
}

function decodeEarningsPayloadFromUrl() {
  const pDataParam = getQueryParam('p_data');
  if (!pDataParam) return null;
  try {
    const raw = decodeURIComponent(pDataParam);
    const parsed = JSON.parse(raw);
    const timeline = (parsed.tl || []).map((pt, idx) => ({
      id: idx + 1,
      time: pt.t,
      label: pt.t,
      item_name: pt.n,
      amount: pt.a || 1,
      buy_price: pt.b || 0,
      sell_price: pt.s || 0,
      profit: pt.p || 0,
      cumulative_profit: pt.cp || 0,
      fee: pt.f || Math.round((pt.s || 0) * 0.05),
      margin_pct: pt.m || 0
    }));
    return {
      user_id: currentUserId || 0,
      period: currentProfitPeriod,
      stats: {
        count: parsed.c !== undefined ? parsed.c : timeline.length,
        total_profit: parsed.p || 0,
        total_spent: parsed.sp || 0,
        total_revenue: parsed.r || 0,
        total_fee: parsed.f || 0,
        avg_roi: parsed.roi || 0,
        best_deal: parsed.b_name ? { item_name: parsed.b_name, net_profit: parsed.b_p } : null,
        recent_deals: timeline.slice().reverse()
      },
      timeline: timeline
    };
  } catch (e) {
    console.warn('Failed to parse p_data from URL:', e);
    return null;
  }
}

function getStoredEarnings(period) {
  try {
    const uid = currentUserId || localStorage.getItem('stalzone_last_user_id') || 'default';
    const key = `stalzone_deals_${uid}_${period || 'day'}`;
    const raw = localStorage.getItem(key) ||
                localStorage.getItem(`stalzone_deals_${uid}`) ||
                localStorage.getItem('stalzone_deals_default');
    if (raw) return JSON.parse(raw);
  } catch (e) {}
  return null;
}

function saveStoredEarnings(period, data) {
  try {
    const uid = currentUserId || localStorage.getItem('stalzone_last_user_id') || 'default';
    const key = `stalzone_deals_${uid}_${period || 'day'}`;
    const serialized = JSON.stringify(data);
    localStorage.setItem(key, serialized);
    localStorage.setItem(`stalzone_deals_${uid}`, serialized);
    localStorage.setItem('stalzone_deals_default', serialized);
  } catch (e) {}
}

async function loadEarningsData(period = null) {
  if (period) currentProfitPeriod = period;

  // 1. Try URL payload first (instant render from Telegram bot link)
  const urlData = decodeEarningsPayloadFromUrl();
  if (urlData) {
    earningsData = urlData;
    saveStoredEarnings(currentProfitPeriod, urlData);
    renderEarningsView(urlData);
  } else {
    // 2. Try localStorage cache
    const stored = getStoredEarnings(currentProfitPeriod);
    if (stored) {
      earningsData = stored;
      renderEarningsView(stored);
    }
  }

  // 3. Try live API call only when explicit backend apiBase is configured
  const apiBase = window.STALZONE_API || getQueryParam('api') || '';
  if (apiBase) {
    const url = `${apiBase}/api/earnings?user_id=${currentUserId || ''}&period=${currentProfitPeriod}`;
    try {
      const res = await fetch(url);
      if (res.ok) {
        const contentType = res.headers.get('content-type') || '';
        if (contentType.includes('application/json')) {
          const data = await res.json();
          earningsData = data;
          saveStoredEarnings(currentProfitPeriod, data);
          renderEarningsView(data);
        }
      }
    } catch (e) {
      // Silent fail on static hosting
    }
  }

  // If still no earningsData at all, render empty state cleanly
  if (!earningsData) {
    renderEarningsView({
      user_id: currentUserId || 0,
      period: currentProfitPeriod,
      stats: { count: 0, total_profit: 0, total_spent: 0, total_revenue: 0, total_fee: 0, avg_roi: 0, best_deal: null, recent_deals: [] },
      timeline: []
    });
  }
}

function renderEarningsView(data) {
  if (!data) return;
  const stats = data.stats || {};
  const timeline = data.timeline || [];
  const deals = stats.recent_deals || [];

  const count = stats.count || 0;
  const totalProfit = stats.total_profit || 0;
  const totalSpent = stats.total_spent || 0;
  const totalRevenue = stats.total_revenue || 0;
  const totalFee = stats.total_fee || 0;
  const avgRoi = stats.avg_roi || 0;
  const bestDeal = stats.best_deal;

  // 1. Stat cards
  const elNet = document.getElementById('statNetProfit');
  if (elNet) {
    const sign = totalProfit > 0 ? '+' : '';
    elNet.innerText = `${sign}${fmt(totalProfit)} ₽`;
    elNet.className = 'stat-value ' + (totalProfit > 0 ? 'text-green' : (totalProfit < 0 ? 'text-red' : ''));
  }
  const elRoi = document.getElementById('statAvgRoi');
  if (elRoi) {
    elRoi.innerText = t('statAvgRoi', { roi: avgRoi });
  }

  const elTurnover = document.getElementById('statTurnover');
  if (elTurnover) elTurnover.innerText = `${fmt(totalSpent)} ₽`;
  const elLots = document.getElementById('statLotsCount');
  if (elLots) elLots.innerText = t('statLotsCount', { cnt: count });

  const elRev = document.getElementById('statRevenue');
  if (elRev) elRev.innerText = `${fmt(totalRevenue)} ₽`;
  const elFee = document.getElementById('statTotalFee');
  if (elFee) elFee.innerText = t('statTotalFee', { fee: fmt(totalFee) });

  const elBest = document.getElementById('statBestDeal');
  const elBestSub = document.getElementById('statBestDealProfit');
  if (bestDeal) {
    if (elBest) elBest.innerText = bestDeal.item_name || '—';
    if (elBestSub) elBestSub.innerText = t('statBestDealProfit', { profit: fmt(bestDeal.net_profit) });
  } else {
    if (elBest) elBest.innerText = '—';
    if (elBestSub) elBestSub.innerText = t('statBestDealProfit', { profit: '0' });
  }

  // 2. Tab badge
  const tabBadge = document.getElementById('tabEarningsBadge');
  if (tabBadge) {
    if (totalProfit > 0) {
      tabBadge.innerText = `+${fmt(totalProfit)} ₽`;
      tabBadge.style.display = 'inline-block';
    } else {
      tabBadge.style.display = 'none';
    }
  }

  // 3. Render Chart
  renderEarningsChart(timeline);

  // 4. Render Table
  renderEarningsTable(deals);
}

function renderEarningsChart(timeline) {
  const chartWrapper = document.getElementById('earningsChartWrapper');
  const emptyBox = document.getElementById('emptyEarningsMsg');
  const canvas = document.getElementById('earningsChart');
  if (!canvas) return;

  if (!timeline || timeline.length === 0) {
    if (chartWrapper) chartWrapper.style.display = 'none';
    if (emptyBox) emptyBox.style.display = 'flex';
    if (earningsChart) {
      earningsChart.destroy();
      earningsChart = null;
    }
    return;
  }

  if (chartWrapper) chartWrapper.style.display = 'block';
  if (emptyBox) emptyBox.style.display = 'none';

  const labels = timeline.map(t => t.label || t.time);
  const data = timeline.map(t => currentEarningsMode === 'cumulative' ? t.cumulative_profit : t.profit);

  const ctx = canvas.getContext('2d');
  if (earningsChart) {
    earningsChart.destroy();
  }

  const gradient = ctx.createLinearGradient(0, 0, 0, 260);
  gradient.addColorStop(0, 'rgba(16, 185, 129, 0.35)');
  gradient.addColorStop(1, 'rgba(16, 185, 129, 0.0)');

  earningsChart = new Chart(ctx, {
    type: 'line',
    data: {
      labels: labels,
      datasets: [{
        label: currentEarningsMode === 'cumulative' ? t('btnModeCumulative') : t('btnModeDeal'),
        data: data,
        borderColor: '#10b981',
        backgroundColor: gradient,
        borderWidth: 2.5,
        tension: 0.3,
        fill: true,
        pointBackgroundColor: '#10b981',
        pointBorderColor: '#fff',
        pointBorderWidth: 1,
        pointRadius: timeline.length > 20 ? 2 : 4,
        pointHoverRadius: 6
      }]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      layout: {
        padding: { left: 4, right: 14, top: 8, bottom: 0 }
      },
      plugins: {
        legend: { display: false },
        tooltip: {
          backgroundColor: '#0f172a',
          titleColor: '#94a3b8',
          bodyColor: '#fff',
          borderColor: '#10b981',
          borderWidth: 1,
          padding: 10,
          callbacks: {
            title: function(items) {
              if (!items || !items.length) return '';
              const idx = items[0].dataIndex;
              const point = timeline[idx];
              if (!point) return '';
              const localizedName = getItemName(point.item_name);
              return `${localizedName} (${point.label || point.time})`;
            },
            label: function(ctx) {
              const idx = ctx.dataIndex;
              const point = timeline[idx];
              if (!point) return `${fmt(ctx.raw)} ₽`;
              const isEn = (currentLang === 'en');
              return [
                isEn ? `🛒 Buy: ${fmt(point.buy_price)} ₽ (x${point.amount} pcs)` : `🛒 Закупка: ${fmt(point.buy_price)} ₽ (x${point.amount} шт)`,
                isEn ? `📈 Sell: ${fmt(point.sell_price)} ₽` : `📈 Продажа: ${fmt(point.sell_price)} ₽`,
                isEn ? `💵 Profit: ${point.profit >= 0 ? '+' : ''}${fmt(point.profit)} ₽ (+${point.margin_pct}%)` : `💵 Профит: ${point.profit >= 0 ? '+' : ''}${fmt(point.profit)} ₽ (+${point.margin_pct}%)`,
                isEn ? `📊 Cumulative PnL: ${fmt(point.cumulative_profit)} ₽` : `📊 Накопленный PnL: ${fmt(point.cumulative_profit)} ₽`
              ];
            }
          }
        }
      },
      scales: {
        x: {
          grid: { display: false },
          ticks: {
            color: '#64748b',
            font: { size: 10 },
            autoSkip: true,
            maxTicksLimit: 6
          }
        },
        y: {
          grid: { color: 'rgba(255, 255, 255, 0.05)' },
          ticks: {
            color: '#64748b',
            font: { size: 10 },
            callback: function(v) { return fmt(v); }
          }
        }
      }
    }
  });
}

function renderEarningsTable(deals) {
  const tbody = document.getElementById('earningsTableBody');
  const meta = document.getElementById('earningsTableMeta');
  if (!tbody) return;

  tbody.innerHTML = '';
  if (meta) meta.innerText = `${deals.length} ${currentLang === 'en' ? 'deals' : 'сделок'}`;

  if (!deals || deals.length === 0) {
    const tr = document.createElement('tr');
    tr.innerHTML = `<td colspan="7" style="text-align:center; color:#64748b; padding:20px;">${t('emptyEarningsTitle')}</td>`;
    tbody.appendChild(tr);
    return;
  }

  deals.forEach((d) => {
    const tr = document.createElement('tr');
    const timeStr = (d.created_at && d.created_at.length >= 16) ? d.created_at.substring(5, 16) : (d.created_at || '—');
    const tierBadge = d.tier_label ? ` <span class="badge" style="font-size:10px;">${localizeTierLabel(d.tier_label)}</span>` : '';
    const profitSign = d.net_profit >= 0 ? '+' : '';
    const profitClass = d.net_profit >= 0 ? 'text-green' : 'text-red';
    const localizedItemName = getItemName(d.item_name);

    tr.innerHTML = `
      <td><span style="font-size:11px; color:#94a3b8;">${timeStr}</span></td>
      <td><b>${localizedItemName}</b>${tierBadge} <span style="font-size:11px; color:#64748b;">(x${d.amount})</span></td>
      <td><code>${fmt(d.buy_price)} ₽</code></td>
      <td><code>${fmt(d.sell_price)} ₽</code></td>
      <td><span style="color:#94a3b8;">-${fmt(d.fee)} ₽</span></td>
      <td><b class="${profitClass}">${profitSign}${fmt(d.net_profit)} ₽</b> <span style="font-size:11px; color:#94a3b8;">(+${d.margin_pct}%)</span></td>
      <td>
        <button type="button" class="deal-del-btn" title="${currentLang === 'en' ? 'Delete deal' : 'Удалить сделку'}" onclick="deleteDealAction(${d.id})">🗑</button>
      </td>
    `;
    tbody.appendChild(tr);
  });
}

async function deleteDealAction(dealId) {
  const confirmMsg = currentLang === 'en' ? 'Delete this deal from ledger?' : 'Удалить эту сделку из журнала?';
  if (!confirm(confirmMsg)) return;

  const apiBase = window.STALZONE_API || getQueryParam('api') || '';
  let apiSucceeded = false;
  try {
    const res = await fetch(`${apiBase}/api/deals/delete`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ user_id: currentUserId || 0, deal_id: dealId })
    });
    if (res.ok) {
      const ct = res.headers.get('content-type') || '';
      if (ct.includes('application/json')) {
        apiSucceeded = true;
        loadEarningsData(currentProfitPeriod);
      }
    }
  } catch (e) {
    console.warn('API error during delete, falling back to local:', e);
  }

  if (!apiSucceeded && earningsData) {
    // Local fallback delete
    earningsData.timeline = (earningsData.timeline || []).filter(d => d.id !== dealId);
    if (earningsData.stats && earningsData.stats.recent_deals) {
      earningsData.stats.recent_deals = earningsData.stats.recent_deals.filter(d => d.id !== dealId);
      earningsData.stats.count = earningsData.stats.recent_deals.length;
      earningsData.stats.total_spent = earningsData.stats.recent_deals.reduce((a, b) => a + (b.buy_price || 0), 0);
      earningsData.stats.total_revenue = earningsData.stats.recent_deals.reduce((a, b) => a + (b.sell_price || 0), 0);
      earningsData.stats.total_fee = earningsData.stats.recent_deals.reduce((a, b) => a + (b.fee || 0), 0);
      earningsData.stats.total_profit = earningsData.stats.recent_deals.reduce((a, b) => a + (b.net_profit || b.profit || 0), 0);
      earningsData.stats.avg_roi = earningsData.stats.total_spent > 0 ? Math.round((earningsData.stats.total_profit / earningsData.stats.total_spent) * 100) : 0;
    }
    saveStoredEarnings(currentProfitPeriod, earningsData);
    renderEarningsView(earningsData);
  }

  if (window.Telegram && window.Telegram.WebApp && window.Telegram.WebApp.HapticFeedback) {
    window.Telegram.WebApp.HapticFeedback.notificationOccurred('success');
  }
}

function initEarningsListeners() {
  // Tab buttons
  const tabMarketBtn = document.getElementById('tabMarketBtn');
  const tabDealsBtn = document.getElementById('tabDealsBtn');
  const tabEarningsBtn = document.getElementById('tabEarningsBtn');
  if (tabMarketBtn) tabMarketBtn.addEventListener('click', () => switchTerminalTab('market'));
  if (tabDealsBtn) tabDealsBtn.addEventListener('click', () => switchTerminalTab('deals'));
  if (tabEarningsBtn) tabEarningsBtn.addEventListener('click', () => switchTerminalTab('earnings'));

  // Period pills
  document.querySelectorAll('#periodPillsGroup .period-pill').forEach(btn => {
    btn.addEventListener('click', () => {
      const p = btn.getAttribute('data-period');
      document.querySelectorAll('#periodPillsGroup .period-pill').forEach(b => b.classList.toggle('active', b === btn));
      loadEarningsData(p);
      if (window.Telegram && window.Telegram.WebApp && window.Telegram.WebApp.HapticFeedback) {
        window.Telegram.WebApp.HapticFeedback.selectionChanged();
      }
    });
  });

  // Chart mode toggle
  const btnCum = document.getElementById('btnModeCumulative');
  const btnDeal = document.getElementById('btnModeDeal');
  if (btnCum) {
    btnCum.addEventListener('click', () => {
      currentEarningsMode = 'cumulative';
      btnCum.classList.add('active');
      if (btnDeal) btnDeal.classList.remove('active');
      if (earningsData) renderEarningsChart(earningsData.timeline);
    });
  }
  if (btnDeal) {
    btnDeal.addEventListener('click', () => {
      currentEarningsMode = 'deal';
      btnDeal.classList.add('active');
      if (btnCum) btnCum.classList.remove('active');
      if (earningsData) renderEarningsChart(earningsData.timeline);
    });
  }

  // Modal open & close
  const openBtn = document.getElementById('openAddDealBtn');
  const closeBtn = document.getElementById('closeAddDealBtn');
  const modal = document.getElementById('addDealModal');
  if (openBtn && modal) {
    openBtn.addEventListener('click', () => {
      modal.style.display = 'flex';
      const inputItem = document.getElementById('inputDealItem');
      if (inputItem) inputItem.focus();
    });
  }
  if (closeBtn && modal) {
    closeBtn.addEventListener('click', () => {
      modal.style.display = 'none';
    });
  }
  if (modal) {
    modal.addEventListener('click', (e) => {
      if (e.target === modal) modal.style.display = 'none';
    });
  }

  // Live calculation in modal
  const inputBuy = document.getElementById('inputDealBuy');
  const inputSell = document.getElementById('inputDealSell');
  const prevFee = document.getElementById('prevTaxFee');
  const prevProfit = document.getElementById('prevNetProfit');

  function updateDealPreview() {
    const buy = parseUserPrice(inputBuy ? inputBuy.value : '0');
    const sell = parseUserPrice(inputSell ? inputSell.value : '0');
    const fee = Math.round(sell * 0.05);
    const net = sell - fee - buy;
    const roi = buy > 0 ? Math.round((net / buy) * 100) : 0;

    if (prevFee) prevFee.innerText = `-${fmt(fee)} ₽`;
    if (prevProfit) {
      prevProfit.innerText = `${net >= 0 ? '+' : ''}${fmt(net)} ₽ (${roi >= 0 ? '+' : ''}${roi}%)`;
      prevProfit.style.color = net >= 0 ? '#10b981' : '#ef4444';
    }
  }
  if (inputBuy) inputBuy.addEventListener('input', updateDealPreview);
  if (inputSell) inputSell.addEventListener('input', updateDealPreview);

  // Submit modal
  const submitBtn = document.getElementById('submitAddDealBtn');
  if (submitBtn) {
    submitBtn.addEventListener('click', async () => {
      const itemEl = document.getElementById('inputDealItem');
      const itemName = itemEl ? itemEl.value.trim() : '';
      const buyPrice = parseUserPrice(inputBuy ? inputBuy.value : '0');
      const sellPrice = parseUserPrice(inputSell ? inputSell.value : '0');
      const amountEl = document.getElementById('inputDealAmount');
      const amount = amountEl ? (parseInt(amountEl.value, 10) || 1) : 1;

      if (!itemName) {
        alert(currentLang === 'en' ? 'Please enter item name' : 'Введите название предмета');
        return;
      }
      if (buyPrice <= 0 || sellPrice <= 0) {
        alert(currentLang === 'en' ? 'Prices must be greater than zero' : 'Цены должны быть больше нуля');
        return;
      }

      const apiBase = window.STALZONE_API || getQueryParam('api') || '';
      let apiDone = false;
      try {
        const res = await fetch(`${apiBase}/api/deals/add`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            user_id: currentUserId || 0,
            item_name: itemName,
            buy_price: buyPrice,
            sell_price: sellPrice,
            amount: amount
          })
        });
        if (res.ok) {
          const ct = res.headers.get('content-type') || '';
          if (ct.includes('application/json')) {
            const resData = await res.json();
            if (resData.success) {
              apiDone = true;
            }
          }
        }
      } catch (e) {
        console.warn('API add failed, saving to local state:', e);
      }

      if (!apiDone) {
        // Local state save
        const fee = Math.round(sellPrice * 0.05);
        const netProfit = sellPrice - fee - buyPrice;
        const marginPct = buyPrice > 0 ? Math.round((netProfit / buyPrice) * 100) : 0;
        const nowTime = new Date().toTimeString().substring(0, 5);

        const newDeal = {
          id: Date.now(),
          time: nowTime,
          label: nowTime,
          item_name: itemName,
          amount: amount,
          buy_price: buyPrice,
          sell_price: sellPrice,
          fee: fee,
          profit: netProfit,
          net_profit: netProfit,
          margin_pct: marginPct,
          cumulative_profit: (earningsData && earningsData.stats ? (earningsData.stats.total_profit || 0) : 0) + netProfit
        };

        if (!earningsData) {
          earningsData = {
            user_id: currentUserId || 0,
            period: currentProfitPeriod,
            stats: { count: 0, total_profit: 0, total_spent: 0, total_revenue: 0, total_fee: 0, avg_roi: 0, best_deal: null, recent_deals: [] },
            timeline: []
          };
        }
        if (!earningsData.stats) earningsData.stats = { count: 0, total_profit: 0, total_spent: 0, total_revenue: 0, total_fee: 0, avg_roi: 0, best_deal: null, recent_deals: [] };
        if (!earningsData.timeline) earningsData.timeline = [];
        if (!earningsData.stats.recent_deals) earningsData.stats.recent_deals = [];

        earningsData.timeline.push(newDeal);
        earningsData.stats.count = (earningsData.stats.count || 0) + 1;
        earningsData.stats.total_spent = (earningsData.stats.total_spent || 0) + buyPrice;
        earningsData.stats.total_revenue = (earningsData.stats.total_revenue || 0) + sellPrice;
        earningsData.stats.total_fee = (earningsData.stats.total_fee || 0) + fee;
        earningsData.stats.total_profit = (earningsData.stats.total_profit || 0) + netProfit;
        earningsData.stats.avg_roi = earningsData.stats.total_spent > 0 ? Math.round((earningsData.stats.total_profit / earningsData.stats.total_spent) * 100) : 0;
        earningsData.stats.recent_deals.unshift(newDeal);

        saveStoredEarnings(currentProfitPeriod, earningsData);
      }

      if (modal) modal.style.display = 'none';
      if (itemEl) itemEl.value = '';
      if (inputBuy) inputBuy.value = '';
      if (inputSell) inputSell.value = '';
      if (amountEl) amountEl.value = '1';
      updateDealPreview();
      if (window.Telegram && window.Telegram.WebApp && window.Telegram.WebApp.HapticFeedback) {
        window.Telegram.WebApp.HapticFeedback.notificationOccurred('success');
      }
      loadEarningsData(currentProfitPeriod);
    });
  }
}

function initDealsFilterBar() {
  document.querySelectorAll('#dealsFilterBar .deals-cat-pill').forEach(btn => {
    btn.addEventListener('click', () => {
      const cat = btn.getAttribute('data-cat');
      document.querySelectorAll('#dealsFilterBar .deals-cat-pill').forEach(b => b.classList.toggle('active', b === btn));
      renderDealsTable(cat);
      if (window.Telegram && window.Telegram.WebApp && window.Telegram.WebApp.HapticFeedback) {
        window.Telegram.WebApp.HapticFeedback.selectionChanged();
      }
    });
  });
}

function initArtDealsSubFilter() {
  document.querySelectorAll('#artDealsRarityPills .art-sub-pill').forEach(btn => {
    btn.addEventListener('click', () => {
      artDealsRarityFilter = btn.getAttribute('data-qlt');
      document.querySelectorAll('#artDealsRarityPills .art-sub-pill').forEach(b => b.classList.toggle('active', b === btn));
      renderDealsTable();
      if (window.Telegram && window.Telegram.WebApp && window.Telegram.WebApp.HapticFeedback) {
        window.Telegram.WebApp.HapticFeedback.selectionChanged();
      }
    });
  });

  document.querySelectorAll('#artDealsPtnPills .art-sub-pill').forEach(btn => {
    btn.addEventListener('click', () => {
      artDealsPtnFilter = btn.getAttribute('data-ptn');
      document.querySelectorAll('#artDealsPtnPills .art-sub-pill').forEach(b => b.classList.toggle('active', b === btn));
      renderDealsTable();
      if (window.Telegram && window.Telegram.WebApp && window.Telegram.WebApp.HapticFeedback) {
        window.Telegram.WebApp.HapticFeedback.selectionChanged();
      }
    });
  });
}

// Initial Setup
initLanguage();
updateStaticTexts();
initTierFilters();
initVipPaywall();
initDealsFilterBar();
initArtDealsSubFilter();
initEarningsListeners();
initLiveSyncTimer();
loadData();

// Switch tab if specified in URL query
const initialTab = getQueryParam('tab');
if (initialTab === 'earnings') {
  switchTerminalTab('earnings');
} else if (initialTab === 'deals') {
  switchTerminalTab('deals');
}

// Refresh immediately when returning to the tab if more than 3 minutes passed
document.addEventListener('visibilitychange', () => {
  if (document.visibilityState === 'visible' && (Date.now() - lastLoadedTime) >= 3 * 60 * 1000) {
    console.log('[STALZONE] Tab restored, syncing data...');
    triggerStalzoneSync();
  }
});


// ==================== DIRECT ORDER CTA & CONTACTS MODULE ====================
const SELLER_CONFIG = {
  funpayUrl: 'https://funpay.com/users/8348874/',
  telegramHandle: '@polvifp',
  telegramUrl: 'https://t.me/polvifp',
  discordHandle: 'angwyttl'
};

function buildOrderTelegramUrl(itemName, regionCode) {
  const reg = (regionCode || 'RU').toUpperCase();
  const isEn = (currentLang === 'en');
  const msg = isEn
    ? `Hi! I want to order "${itemName}" in STALZONE (${reg} server). What's the current price?`
    : `Привет! Хочу заказать предмет «${itemName}» в STALZONE (сервер ${reg}). Подскажи актуальную цену?`;
  return `${SELLER_CONFIG.telegramUrl}?text=${encodeURIComponent(msg)}`;
}

function updateOrderCtaContext() {
  const isEn = (currentLang === 'en');
  const regionCode = (regionSelect ? regionSelect.value : 'ru').toUpperCase();
  const rawName = currentItem ? getItemName(currentItem.name) : (isEn ? 'any STALZONE item' : 'любой предмет STALZONE');
  const tgUrl = buildOrderTelegramUrl(rawName, regionCode);

  const setTxt = (id, txt) => {
    const el = document.getElementById(id);
    if (el) el.innerText = txt;
  };

  setTxt('catalogLinkBtn', isEn ? '📚 Catalog' : '📚 Каталог');
  setTxt('headerOrderBtn', isEn ? '🛒 Order Item' : '🛒 Заказать');
  setTxt('footerCatalogLink', isEn ? '📚 All items catalog' : '📚 Каталог всех предметов');

  if (currentItem) {
    setTxt(
      'orderCtaTitle',
      isEn
        ? `⚡ Need "${rawName}" on ${regionCode} fast?`
        : `⚡ Нужен «${rawName}» на ${regionCode} без долгого фарма?`
    );
  } else {
    setTxt(
      'orderCtaTitle',
      isEn ? '⚡ Need an item in STALZONE fast?' : '⚡ Нужен этот предмет быстро без фарма?'
    );
  }

  setTxt(
    'orderCtaSub',
    isEn
      ? 'Order direct delivery via Telegram / Discord or safe escrow on FunPay.'
      : 'Выкуплю и передам нужный предмет в STALZONE — напрямую или через гаранта FunPay.'
  );

  const ctaTg = document.getElementById('ctaOrderTg');
  if (ctaTg) {
    ctaTg.href = tgUrl;
    ctaTg.innerText = `✈️ Telegram ${SELLER_CONFIG.telegramHandle}`;
  }
  const ctaFp = document.getElementById('ctaOrderFp');
  if (ctaFp) {
    ctaFp.href = SELLER_CONFIG.funpayUrl;
    ctaFp.innerText = isEn ? '🛡 Buy on FunPay' : '🛡 FunPay';
  }
  const ctaDc = document.getElementById('ctaOrderDc');
  if (ctaDc) {
    ctaDc.innerText = `💬 Discord: ${SELLER_CONFIG.discordHandle}`;
  }

  // Modal fields
  setTxt('orderModalTitle', isEn ? '🛒 Order STALZONE Item' : '🛒 Заказать предмет в STALZONE');
  setTxt(
    'orderModalDesc',
    isEn
      ? 'Choose your preferred contact method — fast pricing and delivery on RU / EU / NA:'
      : 'Выбирайте удобный способ связи — подскажу актуальную цену и быстро передам нужный предмет на вашем сервере:'
  );
  setTxt('orderModalItemName', rawName);
  setTxt('orderModalRegion', regionCode);
  setTxt('modalTgSub', isEn ? 'Direct chat with pre-filled order text' : 'Написать напрямую с готовым текстом заказа');
  setTxt('modalFpSub', isEn ? 'Seller profile, reviews & safe escrow' : 'Профиль продавца, отзывы и безопасная оплата');
  setTxt('modalDcSub', isEn ? 'Click to copy Discord username' : 'Нажмите, чтобы скопировать ник в буфер обмена');

  const modalTg = document.getElementById('modalOrderTg');
  if (modalTg) modalTg.href = tgUrl;
  const modalFp = document.getElementById('modalOrderFp');
  if (modalFp) modalFp.href = SELLER_CONFIG.funpayUrl;
}

function copyDiscordHandle() {
  const isEn = (currentLang === 'en');
  const handle = SELLER_CONFIG.discordHandle;
  if (navigator.clipboard && navigator.clipboard.writeText) {
    navigator.clipboard.writeText(handle).then(() => {
      showToast(isEn ? `📋 Discord "${handle}" copied!` : `📋 Discord ник «${handle}» скопирован!`);
    }).catch(() => {
      showToast(`💬 Discord: ${handle}`);
    });
  } else {
    showToast(`💬 Discord: ${handle}`);
  }
}

function initOrderControls() {
  const headerBtn = document.getElementById('headerOrderBtn');
  const modal = document.getElementById('orderModal');
  const closeBtn = document.getElementById('closeOrderModalBtn');
  const ctaDc = document.getElementById('ctaOrderDc');
  const modalDc = document.getElementById('modalOrderDc');

  if (headerBtn && modal) {
    headerBtn.addEventListener('click', () => {
      updateOrderCtaContext();
      modal.style.display = 'flex';
    });
  }
  if (closeBtn && modal) {
    closeBtn.addEventListener('click', () => {
      modal.style.display = 'none';
    });
  }
  if (modal) {
    modal.addEventListener('click', (e) => {
      if (e.target === modal) modal.style.display = 'none';
    });
  }
  if (ctaDc) ctaDc.addEventListener('click', copyDiscordHandle);
  if (modalDc) modalDc.addEventListener('click', copyDiscordHandle);

  updateOrderCtaContext();
}

initOrderControls();
