from decimal import Decimal
from web3 import Web3
from django.conf import settings
import json
from .abi import EURS_ABI, USDT_ABI, WBTC_ABI, LINK_ABI, DAI_ABI, USDC_ABI, UNI_ABI
from .models import Currency, ExchangeRate
from django.shortcuts import get_object_or_404


web3 = Web3(Web3.HTTPProvider(settings.WEB3_PROVIDER))

with open('.././blockchain/build/contracts/Wallet.json') as f:
    wallet_abi = json.load(f)['abi']

wallet_contract = web3.eth.contract(address=settings.WALLET_CONTRACT_ADDRESS, abi=wallet_abi)

def get_token_abi(currency_code):
    if currency_code == 'EURS':
        return EURS_ABI
    elif currency_code == 'USDT':
        return USDT_ABI
    elif currency_code == 'WBTC':
        return WBTC_ABI
    elif currency_code == 'LINK':
        return LINK_ABI
    elif currency_code == 'DAI':
        return DAI_ABI
    elif currency_code == 'USDC':
        return USDC_ABI
    elif currency_code == 'UNI':
        return UNI_ABI
    else:
        return None

def deposit(currency, amount, from_address, private_key):
    nonce = web3.eth.get_transaction_count(from_address)
    gas_price = web3.to_wei('50', 'gwei')

    tx = wallet_contract.functions.deposit(currency, amount).build_transaction({
        'chainId': 1337,
        'gas': 2000000,
        'gasPrice': gas_price,
        'nonce': nonce,
    })
    signed_tx = web3.eth.account.sign_transaction(tx, private_key)
    tx_hash = web3.eth.send_raw_transaction(signed_tx.rawTransaction)
    receipt = web3.eth.wait_for_transaction_receipt(tx_hash)

    gas_used = receipt['gasUsed']
    total_gas_cost = Web3.from_wei(gas_used * gas_price, 'ether')

    return tx_hash.hex(), total_gas_cost

def transfer(to, currency_code, amount, from_address, private_key):
    nonce = web3.eth.get_transaction_count(from_address)
    
    if currency_code == 'USD':
        pass
    if currency_code == 'ETH':
        gas_limit = 21000
        gas_price = web3.toWei('50', 'gwei')
        tx = {
            'nonce': nonce,
            'to': to,
            'value': web3.toWei(amount, 'ether'),
            'gas': gas_limit,
            'gasPrice': gas_price,
        }
    else:
        currency = get_object_or_404(Currency, code=currency_code)
        token_abi = get_token_abi(currency_code)
        if not token_abi:
            raise Exception("Unsupported currency")
        token_contract = web3.eth.contract(address=currency.contract_address, abi=token_abi)
        gas_limit = token_contract.functions.transfer(to, amount).estimate_gas({'from': from_address})
        gas_price = web3.to_wei('50', 'gwei')
        tx = token_contract.functions.transfer(to, amount).build_transaction({
            'chainId': 1337,
            'gas': gas_limit,
            'gasPrice': gas_price,
            'nonce': nonce,
        })

    signed_tx = web3.eth.account.sign_transaction(tx, private_key)
    tx_hash = web3.eth.send_raw_transaction(signed_tx.rawTransaction)
    receipt = web3.eth.wait_for_transaction_receipt(tx_hash)
    
    gas_used = receipt['gasUsed']
    total_gas_cost = Web3.from_wei(gas_used * gas_price, 'ether')
    return tx_hash.hex(), total_gas_cost

def get_balance(user_address, currency):
    return wallet_contract.functions.getBalance(user_address, currency).call()


def convert_currency(user_address, source_currency, target_currency, amount, private_key):
    source_rate = ExchangeRate.objects.get(currency_code=source_currency).rate_to_usd
    target_rate = ExchangeRate.objects.get(currency_code=target_currency).rate_to_usd

    amount_in_usd = amount * source_rate

    converted_amount = amount_in_usd / target_rate

    source_rate_uint256 = int(source_rate * Decimal(1e18))
    target_rate_uint256 = int(target_rate * Decimal(1e18))
    
    nonce = web3.eth.get_transaction_count(user_address)
    gas_price = web3.to_wei('50', 'gwei')

    tx = wallet_contract.functions.convertCurrency(
        source_currency,
        target_currency,
        int(amount),
        source_rate_uint256,
        target_rate_uint256
    ).build_transaction({
        'from': user_address,
        'nonce': nonce,
        'gas': 2000000,
        'gasPrice': gas_price,
    })

    signed_tx = web3.eth.account.sign_transaction(tx, private_key)
    tx_hash = web3.eth.send_raw_transaction(signed_tx.rawTransaction)
    receipt = web3.eth.wait_for_transaction_receipt(tx_hash)
    
    gas_used = receipt['gasUsed']
    total_gas_cost = Web3.from_wei(gas_used * gas_price, 'ether')
    
    return tx_hash.hex(), total_gas_cost, converted_amount