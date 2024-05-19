from rest_framework import serializers
from .models import Wallet, Balance, Currency
from django.contrib.auth.models import User

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ["id", "username", "password"]
        extra_kwargs = {"password": {"write_only": True}}

    def create(self, validated_data):
        user = User.objects.create_user(**validated_data)
        wallet = Wallet.objects.create(user=user)
        currencies = Currency.objects.all()
        for currency in currencies:
            Balance.objects.create(wallet=wallet, currency=currency, amount=0.00)
        
        return user

class CurrencySerializer(serializers.ModelSerializer):
    class Meta:
        model = Currency
        fields = ['code', 'name']

class BalanceSerializer(serializers.ModelSerializer):
    currency = CurrencySerializer()

    class Meta:
        model = Balance
        fields = ['currency', 'amount']

class WalletSerializer(serializers.ModelSerializer):
    balances = BalanceSerializer(many=True, read_only=True)

    class Meta:
        model = Wallet
        fields = ['balances']

class DepositSerializer(serializers.Serializer):
    currency_code = serializers.CharField(max_length=3)
    amount = serializers.DecimalField(max_digits=20, decimal_places=8)

class WithdrawSerializer(serializers.Serializer):
    currency_code = serializers.CharField(max_length=3)
    amount = serializers.DecimalField(max_digits=20, decimal_places=8)

class ConvertCurrencySerializer(serializers.Serializer):
    source_currency_code = serializers.CharField(max_length=3)
    target_currency_code = serializers.CharField(max_length=3)
    conversion_rate = serializers.DecimalField(max_digits=20, decimal_places=8)
    amount = serializers.DecimalField(max_digits=20, decimal_places=8)
