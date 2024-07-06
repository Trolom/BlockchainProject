from rest_framework import serializers
from .models import Wallet, Balance, Currency, ExchangeRate
from django.contrib.auth.models import User

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ["id", "username", "password"]
        extra_kwargs = {"password": {"write_only": True}}

    def create(self, validated_data):
        user = User.objects.create_user(**validated_data)
        return user

class CurrencySerializer(serializers.ModelSerializer):
    class Meta:
        model = Currency
        fields = ['code', 'name', 'is_token', 'contract_address']

class BalanceSerializer(serializers.ModelSerializer):
    currency = CurrencySerializer()

    class Meta:
        model = Balance
        fields = ['currency', 'amount']

class WalletSerializer(serializers.ModelSerializer):
    balances = BalanceSerializer(many=True, read_only=True)

    class Meta:
        model = Wallet
        fields = ['eth_address', 'balances']

class DepositSerializer(serializers.Serializer):
    currency_code = serializers.CharField(max_length=10)
    amount = serializers.DecimalField(max_digits=20, decimal_places=8)

class WithdrawSerializer(serializers.Serializer):
    currency_code = serializers.CharField(max_length=10)
    amount = serializers.DecimalField(max_digits=20, decimal_places=8)
    to_address = serializers.CharField(max_length=42, required=False)

    def validate(self, data):
        currency_code = data.get('currency_code')
        if currency_code == 'ETH' and not data.get('to_address'):
            raise serializers.ValidationError("to_address is required for ETH withdrawals")
        return data
    

class ConvertCurrencySerializer(serializers.Serializer):
    source_currency_code = serializers.CharField(max_length=10)
    target_currency_code = serializers.CharField(max_length=10)
    amount = serializers.DecimalField(max_digits=20, decimal_places=8)

class ExchangeRateSerializer(serializers.ModelSerializer):
    class Meta:
        model = ExchangeRate
        fields = ['currency_code', 'rate_to_usd', 'last_updated']