# PythonCripto

Веб-приложение для просмотра актуальных данных о криптовалютах: список монет слева, карточка с ценой, изменением за 24 часа и капитализацией справа. Данные берутся из [CoinMarketCap API](https://coinmarketcap.com/api/), бэкенд кэширует ответы, фронтенд отображает выбранную монету.

## Стек

| Часть | Технологии |
|--------|------------|
| **Backend** | Python, FastAPI, aiohttp, async-lru, pydantic-settings |
| **Frontend** | React 19, Vite, Ant Design, Tailwind CSS, Axios |
| **API** | CoinMarketCap Pro API |

## Структура репозитория

```
PythonCripto/
├── PythonCriptoBack/src/     # FastAPI: роуты, HTTP-клиент CMC, настройки
├── pythonCriptoFront/        # React SPA (Vite)
├── requirements.txt          # зависимости Python
├── .env.example              # шаблон переменных окружения
└── README.md
```

## Быстрый старт

### Требования

- Python 3.10+
- Node.js 18+
- API-ключ CoinMarketCap (бесплатный тариф на [сайте API](https://coinmarketcap.com/api/))

### 1. Клонирование и переменные окружения

```bash
git clone <url-вашего-репозитория>
cd PythonCripto
copy .env.example .env
```

В `.env` укажите свой ключ:

```env
CMC_API_KEY=ваш_ключ
```

Файл `.env` в git не попадает (см. `.gitignore`).

### 2. Backend

Из корня репозитория:

```bash
python -m venv .venv
.venv\Scripts\activate
pip install -r requirements.txt
uvicorn PythonCriptoBack.src.main:app --reload --host 127.0.0.1 --port 8000
```

Документация API: [http://127.0.0.1:8000/docs](http://127.0.0.1:8000/docs)

### 3. Frontend

В отдельном терминале:

```bash
cd pythonCriptoFront
npm install
npm run dev
```

Откройте адрес, который выведет Vite (обычно [http://localhost:5173](http://localhost:5173)).

> Бэкенд должен быть запущен на `http://127.0.0.1:8000` — фронтенд обращается к нему напрямую.

## API (бэкенд)

| Метод | Путь | Описание |
|--------|------|----------|
| `GET` | `/cryptocurrencies` | Список криптовалют (listings/latest) |
| `GET` | `/cryptocurrencies/{currency_id}` | Котировки по `id` монеты |

## Как это устроено

```mermaid
flowchart LR
  Browser[React + Ant Design]
  API[FastAPI]
  CMC[CoinMarketCap API]
  Browser -->|HTTP| API
  API -->|aiohttp + кэш alru_cache| CMC
```

1. При загрузке страницы фронтенд запрашивает список монет и строит боковое меню.
2. При выборе монеты — запрос деталей по `id`.
3. Бэкенд проксирует запросы в CMC с заголовком `X-CMC_PRO_API_KEY` и кэширует ответы (`@alru_cache`).

## Плюсы проекта (+)

- **Полный цикл**: отдельный бэкенд и фронтенд — хорошая база для портфолио и дальнейшего роста.
- **Актуальные технологии**: FastAPI, async HTTP, React 19, Vite, современный UI (Ant Design + Tailwind).
- **Реальный внешний API**: работа с ключами, `.env`, CORS, лимитами стороннего сервиса.
- **Кэш на бэкенде**: меньше обращений к CoinMarketCap при повторных запросах.
- **Понятный UX**: список слева, детали справа, индикатор загрузки (`Spin`).
- **Небольшой объём кода**: легко разобрать и расширить за вечер.

## Минусы и ограничения (−)

- **Жёстко зашитый URL API** на фронте (`127.0.0.1:8000`) — без переменных окружения сложно деплоить.
- **Запуск бэкенда из корня** — нужен корректный `PYTHONPATH`/запуск как пакет; новичкам проще положить `app` в один модуль или добавить `pyproject.toml`.
- **Кэш без TTL**: `@alru_cache` не обновляет цены по времени — для «живого» трекера нужен TTL или Redis.
- **Одна сессия aiohttp на всё приложение**: при перезапуске/ошибках нет явного lifecycle (startup/shutdown).
- **Нет обработки ошибок API** на фронте и бэкенде (истёк ключ, 429, сеть).
- **Нет тестов и CI** — сложнее гарантировать регрессии при изменениях.
- **Мелкие недочёты UI/данных**: в карточке для «изменения за 24ч» используется `volume_change_24h`, а не `percent_change_24h`; у капитализации в тексте лишний символ `%`.
- **Только USD** — нет выбора валюты отображения.



## Лицензия

MIT license

## Автор

PEST/Telegram — @PESTYouTube.
