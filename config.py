import os
from typing import List, Dict
from pydantic_settings import BaseSettings
from pydantic import Field


class Settings(BaseSettings):
    EXBO_CLIENT_ID: str = Field(default="")
    EXBO_CLIENT_SECRET: str = Field(default="")
    SITE_URL: str = Field(default="https://stalzone-market.pages.dev")

    class Config:
        env_file = ".env"
        extra = "ignore"


settings = Settings()

SELLER_CONTACTS = {
    "funpay_url": "https://funpay.com/users/8348874/",
    "telegram_handle": "@polvifp",
    "telegram_url": "https://t.me/polvifp",
    "discord_handle": "angwyttl",
}

SUPPORTED_REGIONS = {
    "ru": {"name": "Россия (RU)", "name_en": "Russia (RU)", "flag": "🇷🇺", "currency": "₽"},
    "eu": {"name": "Европа (EU)", "name_en": "Europe (EU)", "flag": "🇪🇺", "currency": "₽"},
    "na": {"name": "Сев. Америка (NA)", "name_en": "North America (NA)", "flag": "🇺🇸", "currency": "₽"},
}

MONITORED_ITEMS: List[Dict[str, str]] = [
    # Оружие
    {"id": "wj75o", "name": "FN SCAR-H", "category": "Оружие"},
    {"id": "p63d2", "name": "HK417", "category": "Оружие"},
    {"id": "m0mo7", "name": "ВСК-94", "category": "Оружие"},
    {"id": "lylnq", "name": "HK MP7A2", "category": "Оружие"},
    {"id": "7lng9", "name": "FN Five-seveN", "category": "Оружие"},
    {"id": "j5op4", "name": "K15", "category": "Оружие"},
    {"id": "dmjdn", "name": "АК-308", "category": "Оружие"},
    {"id": "rw23l", "name": "«Волна»", "category": "Оружие"},
    {"id": "dmj6j", "name": "СВЧ", "category": "Оружие"},
    {"id": "p63w4", "name": "Derya MK-12 AS-103S", "category": "Оружие"},
    {"id": "vj2mp", "name": "KS-12 Komrad", "category": "Оружие"},
    {"id": "2ongl", "name": "Cheytac M300", "category": "Оружие"},
    {"id": "2ony6", "name": "IWI Tavor X95", "category": "Оружие"},
    {"id": "3gnzl", "name": "QBU-191", "category": "Оружие"},
    {"id": "y3j20", "name": "Gerber Downrange Tomahawk", "category": "Оружие"},
    {"id": "knvmj", "name": "Jagdkommando", "category": "Оружие"},

    # Броня
    {"id": "ok3q0", "name": "Альбатрос-Перехватчик", "category": "Броня"},
    {"id": "knqkv", "name": "Альбатрос-Разведчик", "category": "Броня"},
    {"id": "p69k2", "name": "Ганимед", "category": "Броня"},
    {"id": "qj1lk", "name": "Бронекостюм «КЗ-4»", "category": "Броня"},

    # Детекторы
    {"id": "gdj6",  "name": "Детектор «Эльбрус»", "category": "Детекторы"},

    # Контейнеры
    {"id": "g35n",  "name": "Контейнер «Берлога-6»", "category": "Контейнеры"},
    {"id": "l362",  "name": "Контейнер «КРАБ-6»", "category": "Контейнеры"},
    {"id": "d3kg",  "name": "Контейнер «Берлога-5»", "category": "Контейнеры"},
    {"id": "zj1k",  "name": "Контейнер «Кега»", "category": "Контейнеры"},
    {"id": "j34l",  "name": "Контейнер «Дубак»", "category": "Контейнеры"},
    {"id": "j3ml",  "name": "Контейнер «КСМ»", "category": "Контейнеры"},
    {"id": "vyjd",  "name": "ZIVCAS Sisyphus-6", "category": "Контейнеры"},

    # Обвесы
    {"id": "rw4ry", "name": "Барабанный магазин 5.56 NATO EMAG", "category": "Обвесы"},
    {"id": "4qp1o", "name": "Барабанный магазин 5.45", "category": "Обвесы"},
    {"id": "1r3j2", "name": "Барабанный магазин 7.62x39", "category": "Обвесы"},
    {"id": "p6y44", "name": "Эргономичный магазин 9x39", "category": "Обвесы"},
    {"id": "g4205", "name": "Эргономичный магазин 5.56", "category": "Обвесы"},
    {"id": "ok5wm", "name": "Эргономичный магазин 5.45", "category": "Обвесы"},
    {"id": "n4zy2", "name": "Эргономичный магазин 12.7", "category": "Обвесы"},
    {"id": "1r3d2", "name": "Эргономичный магазин 7.62 NATO", "category": "Обвесы"},
    {"id": "m0g52", "name": "Эргономичный магазин 7.62x39", "category": "Обвесы"},
    {"id": "ly1lo", "name": "Магазин 7.62 NATO PMAG, черный", "category": "Обвесы"},
    {"id": "j52lg", "name": "Магазин 7.62 NATO PMAG, хаки", "category": "Обвесы"},
    {"id": "4qp0o", "name": "Барабанный магазин 5.56 NATO черный", "category": "Обвесы"},
    {"id": "wjro3", "name": "Барабанный магазин 5.56 NATO, хаки", "category": "Обвесы"},
    {"id": "6wpz0", "name": "Барабанный магазин 5.45 в чехле", "category": "Обвесы"},

    # Протоартефакты
    {"id": "dm6l2_0", "real_id": "dm6l2", "qlt": 0, "name": "Протоартефакт [⚪ Обыч.]", "category": "Протоартефакты"},
    {"id": "dm6l2_1", "real_id": "dm6l2", "qlt": 1, "name": "Протоартефакт [🟢 Необыч.]", "category": "Протоартефакты"},
    {"id": "dm6l2_2", "real_id": "dm6l2", "qlt": 2, "name": "Протоартефакт [🔵 Особ.]", "category": "Протоартефакты"},
    {"id": "dm6l2_3", "real_id": "dm6l2", "qlt": 3, "name": "Протоартефакт [🟣 Редк.]", "category": "Протоартефакты"},
    {"id": "dm6l2_4", "real_id": "dm6l2", "qlt": 4, "name": "Протоартефакт [🔴 Искл.]", "category": "Протоартефакты"},
    {"id": "dm6l2_5", "real_id": "dm6l2", "qlt": 5, "name": "Протоартефакт [🟡 Легенд.]", "category": "Протоартефакты"},

    # Артефакты
    {"id": "y5w3", "name": "Призма", "category": "Артефакты"},
    {"id": "y5k0", "name": "Вихрь", "category": "Артефакты"},
    {"id": "kqgy", "name": "Браслет", "category": "Артефакты"},
    {"id": "qoq6", "name": "Солнце", "category": "Артефакты"},
    {"id": "5rwq", "name": "Осколок", "category": "Артефакты"},
    {"id": "gyq5", "name": "Спираль", "category": "Артефакты"},
    {"id": "04yr", "name": "Виток", "category": "Артефакты"},
    {"id": "kqoj", "name": "Каблук", "category": "Артефакты"},
    {"id": "zyrm", "name": "Зеркало", "category": "Артефакты"},
    {"id": "kqp0", "name": "Жар-птица", "category": "Артефакты"},
    {"id": "w4jo", "name": "Черная дыра", "category": "Артефакты"},
    {"id": "zjzn", "name": "Полено", "category": "Артефакты"},
    {"id": "yq3o", "name": "Личинка", "category": "Артефакты"},
    {"id": "wg53", "name": "Атом", "category": "Артефакты"},
    {"id": "y5jk", "name": "Жильник", "category": "Артефакты"},
    {"id": "5rg1", "name": "Проклятая роза", "category": "Артефакты"},
    {"id": "kqr0", "name": "Гелий", "category": "Артефакты"},
    {"id": "5r5g", "name": "Ледяной ежик", "category": "Артефакты"},
    {"id": "5rd1", "name": "Стальной ежик", "category": "Артефакты"},
    {"id": "k3yv", "name": "Обруч", "category": "Артефакты"},
    {"id": "q1lk", "name": "Жабры", "category": "Артефакты"},
    {"id": "49zn", "name": "Нервяк", "category": "Артефакты"},
    {"id": "lj0j", "name": "Катушка", "category": "Артефакты"},
    {"id": "q10k", "name": "Звено", "category": "Артефакты"},
    {"id": "wglp", "name": "Ветка калины", "category": "Артефакты"},
    {"id": "g34p", "name": "Юла", "category": "Артефакты"},
    {"id": "gy06", "name": "Ершик", "category": "Артефакты"},
    {"id": "qo06", "name": "Трансформатор", "category": "Артефакты"},
    {"id": "jkq7", "name": "Магма", "category": "Артефакты"},
    {"id": "4lpo", "name": "Статик", "category": "Артефакты"},
    {"id": "ljn2", "name": "Морозец", "category": "Артефакты"},
    {"id": "qodk", "name": "Бубльгум", "category": "Артефакты"},
    {"id": "ljrj", "name": "Радиатор", "category": "Артефакты"},
    {"id": "wgko", "name": "Роза изнанки", "category": "Артефакты"},
    {"id": "9n7z", "name": "Рубик", "category": "Артефакты"},
    {"id": "7z77", "name": "Желе", "category": "Артефакты"},
    {"id": "rn1z", "name": "Опал", "category": "Артефакты"},
    {"id": "ljpq", "name": "Многогранник", "category": "Артефакты"},
    {"id": "j3p6", "name": "Смольник", "category": "Артефакты"},
    {"id": "6goy", "name": "Петля", "category": "Артефакты"},
    {"id": "k3rv", "name": "Чертов еж", "category": "Артефакты"},
    {"id": "rnkl", "name": "Силки", "category": "Артефакты"},
    {"id": "qokj", "name": "Тыква", "category": "Артефакты"},
    {"id": "5rpq", "name": "Янтарник", "category": "Артефакты"},

    # Расходники
    {"id": "l0og1", "name": "Стандартные запчасти", "category": "Расходники"},
    {"id": "y3nmw", "name": "Продвинутые запчасти", "category": "Расходники"},
    {"id": "qjqw9", "name": "Стандартные инструменты", "category": "Расходники"},
    {"id": "4q7pl", "name": "Продвинутые инструменты", "category": "Расходники"},
    {"id": "3gqkg", "name": "Нестабильная аномальная батарея", "category": "Расходники"},
    {"id": "3gq6k", "name": "Набор компонентов оружия (Мастер)", "category": "Расходники"},
    {"id": "2o0qm", "name": "Набор компонентов оружия (Ветеран)", "category": "Расходники"},
    {"id": "96z7y", "name": "Катализатор", "category": "Расходники"},
    {"id": "f8dccdd9f5f2", "name": "Перегрузка", "category": "Расходники"},

    # Сезонный пропуск
    {"id": "g49mp", "name": "Сезонный пропуск", "category": "Сезонный пропуск"},
    {"id": "zz02n", "name": "Сезонный пропуск + 20 уровней", "category": "Сезонный пропуск"},
    {"id": "5l6n0", "name": "Сезонный пропуск + 50 уровней", "category": "Сезонный пропуск"},
    {"id": "f280e674ded4", "name": "Передаваемый уровень Сезона", "category": "Сезонный пропуск"},

    # Крупный бартер
    {"id": "y4y33", "name": "Блок данных «Лямбда»", "category": "Крупный бартер"},
    {"id": "y409k", "name": "Блок данных «Гамма»", "category": "Крупный бартер"},
    {"id": "4k5gr", "name": "Блок данных «Альфа»", "category": "Крупный бартер"},
    {"id": "dr61j", "name": "Блок данных «Бета»", "category": "Крупный бартер"},
    {"id": "gn975", "name": "Портативный квантовый генератор", "category": "Крупный бартер"},
    {"id": "w3zj3", "name": "Модифицированная аномальная батарея", "category": "Крупный бартер"},
    {"id": "gn976", "name": "Очищенное вещество 07270", "category": "Крупный бартер"},
    {"id": "9dk7y", "name": "Пси-маячок", "category": "Крупный бартер"},
    {"id": "z30my", "name": "Цветущий рыжий папоротник", "category": "Крупный бартер"},
    {"id": "z3ogm", "name": "Расцветший Горьколистник", "category": "Крупный бартер"},
    {"id": "gnpr5", "name": "Темный Лимб", "category": "Крупный бартер"},

    # Убежище
    {"id": "prrd",  "name": "Янтарная полынь", "category": "Убежище"},
    {"id": "40vn",  "name": "Аммиак", "category": "Убежище"},
    {"id": "l0ryo", "name": "Черная селезенка", "category": "Убежище"},
    {"id": "7l127", "name": "Аномальная пыль", "category": "Убежище"},
    {"id": "96z2z", "name": "Хронопыль", "category": "Убежище"},
]
