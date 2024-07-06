# api/tasks.py

from celery import shared_task
import requests
from .models import ExchangeRate
from decimal import Decimal

COINGECKO_API = "https://api.coingecko.com/api/v3/simple/price"
EXCHANGE_RATE_API = "https://open.er-api.com/v6/latest/USD"

# Mapping of CoinGecko IDs to currency codes
CRYPTO_CURRENCY_MAPPING = {
    "bitcoin": "BTC",
    "ethereum": "ETH",
    "tether": "USDT",
    "wrapped-bitcoin": "WBTC",
    "stasis-eurs": "EURS",
    "chainlink": "LINK",
    "dai": "DAI",
    "usd-coin": "USDC",
    "uniswap": "UNI"
}

@shared_task
def fetch_exchange_rates():
    # Fetch cryptocurrency rates from CoinGecko
    crypto_params = {
        "ids": ",".join(CRYPTO_CURRENCY_MAPPING.keys()),
        "vs_currencies": "usd"
    }
    response = requests.get(COINGECKO_API, params=crypto_params)
    crypto_data = response.json()

    for crypto_id, data in crypto_data.items():
        currency_code = CRYPTO_CURRENCY_MAPPING.get(crypto_id)
        if currency_code:
            ExchangeRate.objects.update_or_create(
                currency_code=currency_code,
                defaults={'rate_to_usd': Decimal(data['usd'])}
            )

    # Fetch fiat currency rates from ExchangeRate-API
    response = requests.get(EXCHANGE_RATE_API)
    fiat_data = response.json()

    if 'rates' in fiat_data:
        for currency_code, rate_to_usd in fiat_data['rates'].items():
            ExchangeRate.objects.update_or_create(
                currency_code=currency_code,
                defaults={'rate_to_usd': Decimal(rate_to_usd)}
            )
