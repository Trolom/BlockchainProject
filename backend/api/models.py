from django.db import models
from django.contrib.auth.models import User
from web3 import Web3
from django.conf import settings

class Currency(models.Model):
    code = models.CharField(max_length=10, unique=True)
    name = models.CharField(max_length=50)
    is_token = models.BooleanField(default=False)
    contract_address = models.CharField(max_length=42, blank=True, null=True)

    def __str__(self):
        return self.code

class Wallet(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE, related_name='wallet')
    eth_address = models.CharField(max_length=42, unique=True, blank=True, null=True)
    eth_private_key = models.CharField(max_length=64, blank=True, null=True)

    def __str__(self):
        return f"{self.user.username}'s wallet"

    def create_eth_account(self):
        web3 = Web3(Web3.HTTPProvider(settings.WEB3_PROVIDER))
        if not web3.is_connected():
            raise Exception("Failed to connect to Ethereum node")

        account = web3.eth.account.create()
        self.eth_address = account.address
        self.eth_private_key = account._private_key.hex()
        self.save()

class Balance(models.Model):
    wallet = models.ForeignKey(Wallet, on_delete=models.CASCADE, related_name='balances')
    currency = models.ForeignKey(Currency, on_delete=models.CASCADE)
    amount = models.DecimalField(max_digits=20, decimal_places=8, default=0.00)

    def __str__(self):
        return f"{self.wallet.user.username} - {self.currency.code}: {self.amount}"

    def deposit(self, amount):
        self.amount += amount
        self.save()

    def withdraw(self, amount):
        if self.amount >= amount:
            self.amount -= amount
            self.save()
        else:
            raise Exception("Insufficient funds")

class ExchangeRate(models.Model):
    currency_code = models.CharField(max_length=10)
    rate_to_usd = models.DecimalField(max_digits=20, decimal_places=8)
    last_updated = models.DateTimeField(auto_now=True)

    class Meta:
        unique_together = ('currency_code', 'last_updated')

    def __str__(self):
        return f"{self.currency_code} to USD: {self.rate_to_usd}"