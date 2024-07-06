from django.db.models.signals import post_migrate, post_save
from django.dispatch import receiver
from .models import Currency, Wallet, Balance
from django.contrib.auth.models import User
from django.conf import settings
from web3 import Web3

web3 = Web3(Web3.HTTPProvider(settings.WEB3_PROVIDER))
INITIAL_FUNDS = 1
INITIAL_USD_FUNDS = 10000

@receiver(post_migrate)
def create_default_currencies(sender, **kwargs):
    default_currencies = [
        {"code": "ETH", "name": "Ethereum", "is_token": False, "contract_address": None},
        {"code": "USDT", "name": "Tether", "is_token": True, "contract_address": "0xdAC17F958D2ee523a2206206994597C13D831ec7"},
        {"code": "WBTC", "name": "Wrapped Bitcoin", "is_token": True, "contract_address": "0x2260FAC5E5542a773Aa44fBCfeDf7C193bc2C599"},
        {"code": "LINK", "name": "Chainlink", "is_token": True, "contract_address": "0x514910771AF9Ca656af840dff83E8264EcF986CA"},
        {"code": "DAI", "name": "Dai", "is_token": True, "contract_address": "0x6B175474E89094C44Da98b954EedeAC495271d0F"},
        {"code": "USDC", "name": "USD Coin", "is_token": True, "contract_address": "0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48"},
        {"code": "UNI", "name": "Uniswap", "is_token": True, "contract_address": "0x1f9840a85d5aF5bf1D1762F925BDADdC4201F984"},
        {"code": "USD", "name": "US Dollar", "is_token": False, "contract_address": None},

        # Add more tokens as needed
    ]
    
    for currency_data in default_currencies:
        Currency.objects.get_or_create(
            code=currency_data["code"], defaults={
                "name": currency_data["name"],
                "is_token": currency_data["is_token"],
                "contract_address": currency_data["contract_address"]
            }
        )



@receiver(post_save, sender=User)
def create_wallet_for_new_user(sender, instance, created, **kwargs):
    if created:
        wallet, created = Wallet.objects.get_or_create(user=instance)
        if created:
            wallet.create_eth_account()
            currencies = Currency.objects.all()
            for currency in currencies:
                Balance.objects.create(wallet=wallet, currency=currency, amount=0.00)
            
            fund_new_wallet(wallet.eth_address, wallet)

def fund_new_wallet(new_wallet_address, wallet):
    nonce = web3.eth.get_transaction_count(settings.FUNDING_ACCOUNT_ADDRESS)
    tx = {
        'nonce': nonce,
        'to': new_wallet_address,
        'value': web3.to_wei(INITIAL_FUNDS, 'ether'),
        'gas': 21000,
        'gasPrice': web3.to_wei('50', 'gwei')
    }
    signed_tx = web3.eth.account.sign_transaction(tx, settings.FUNDING_ACCOUNT_PRIVATE_KEY)
    tx_hash = web3.eth.send_raw_transaction(signed_tx.rawTransaction)
    web3.eth.wait_for_transaction_receipt(tx_hash)
    print(f"Funded new wallet {new_wallet_address} with {INITIAL_FUNDS} ETH, tx_hash: {tx_hash.hex()}")

    # Update ETH balance
    eth_currency = Currency.objects.get(code='ETH')
    eth_balance, created = Balance.objects.get_or_create(wallet=wallet, currency=eth_currency)
    eth_balance.amount += INITIAL_FUNDS
    eth_balance.save()

    # Update USD balance
    usd_currency = Currency.objects.get(code='USD')
    usd_balance, created = Balance.objects.get_or_create(wallet=wallet, currency=usd_currency)
    usd_balance.amount += INITIAL_USD_FUNDS
    usd_balance.save()