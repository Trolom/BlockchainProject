# models.py
from django.db import models
from django.contrib.auth.models import User

class InsufficientFundsException(Exception):
    pass

class Currency(models.Model):
    code = models.CharField(max_length=3, unique=True, default='USD')
    name = models.CharField(max_length=50)  # e.g., 'US Dollar', 'Bitcoin'

    def __str__(self):
        return self.code

class Wallet(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE, related_name='wallet')

    def __str__(self):
        return f"{self.user.username}'s wallet"

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
            raise InsufficientFundsException("Insufficient funds")


    def convert(self, target_currency, conversion_rate, amount):
        self.withdraw(amount)
        target_balance, created = Balance.objects.get_or_create(wallet=self.wallet, currency=target_currency)
        target_balance.deposit(amount * conversion_rate)
