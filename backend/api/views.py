import logging
from decimal import Decimal
from rest_framework import status, generics
from rest_framework.views import APIView
from rest_framework.response import Response
from django.shortcuts import get_object_or_404
from django.contrib.auth.models import User
from rest_framework.permissions import IsAuthenticated, AllowAny
from django.conf import settings

from .models import ExchangeRate, Wallet, Balance, Currency
from .serializers import (
    WalletSerializer,
    DepositSerializer,
    WithdrawSerializer,
    UserSerializer,
    CurrencySerializer,
    ConvertCurrencySerializer,
    ExchangeRateSerializer
)
from .web3_service import deposit, transfer, convert_currency

# Set up logger
logger = logging.getLogger(__name__)

class CreateUserView(generics.CreateAPIView):
    queryset = User.objects.all()
    serializer_class = UserSerializer
    permission_classes = [AllowAny]

class CurrencyListView(generics.ListAPIView):
    queryset = Currency.objects.all()
    serializer_class = CurrencySerializer
    permission_classes = [AllowAny]

class ExchangeRateListView(generics.ListAPIView):
    queryset = ExchangeRate.objects.all()
    serializer_class = ExchangeRateSerializer
    permission_classes = [AllowAny]

class WalletDetailView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        wallet = get_object_or_404(Wallet, user=request.user)
        serializer = WalletSerializer(wallet)
        return Response(serializer.data)

class DepositView(APIView):
    permission_classes = [IsAuthenticated]

    def post(self, request):
        logger.debug("Deposit request received")

        wallet = get_object_or_404(Wallet, user=request.user)
        serializer = DepositSerializer(data=request.data)
        
        if serializer.is_valid():
            currency_code = serializer.validated_data['currency_code']
            amount = Decimal(serializer.validated_data['amount'])
            currency = get_object_or_404(Currency, code=currency_code)
            
            balance, created = Balance.objects.get_or_create(wallet=wallet, currency=currency)
            logger.debug(f"Preparing to deposit {amount} {currency_code} for user {request.user.username}")

            try:
                exchange_rate = ExchangeRate.objects.get(currency_code=currency_code).rate_to_usd
                cost_in_usd = amount * exchange_rate

                tx_hash, gas_cost = deposit(currency_code, int(amount), wallet.eth_address, wallet.eth_private_key)
                balance.deposit(amount)

                usd_currency = get_object_or_404(Currency, code='USD')
                usd_balance, created = Balance.objects.get_or_create(wallet=wallet, currency=usd_currency)
                usd_balance.amount -= cost_in_usd
                usd_balance.save()

                eth_currency = get_object_or_404(Currency, code='ETH')
                eth_balance, created = Balance.objects.get_or_create(wallet=wallet, currency=eth_currency)
                eth_balance.amount -= Decimal(gas_cost)
                eth_balance.save()

                logger.info(f"Deposit successful: {amount} {currency_code} for user {request.user.username}, tx_hash: {tx_hash}")
                return Response({'status': 'deposit successful', 'tx_hash': tx_hash}, status=status.HTTP_200_OK)
            except Exception as e:
                logger.error(f"Error during deposit transaction: {str(e)}")
                return Response({'error': 'Transaction failed', 'details': str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
        
        logger.error(f"Deposit failed: {serializer.errors}")
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    
class WithdrawView(APIView):
    permission_classes = [IsAuthenticated]

    def post(self, request):
        logger.debug("Withdraw request received")
        wallet = get_object_or_404(Wallet, user=request.user)
        serializer = WithdrawSerializer(data=request.data)
        
        if serializer.is_valid():
            currency_code = serializer.validated_data['currency_code']
            amount = Decimal(serializer.validated_data['amount'])
            to_address = settings.FUNDING_ACCOUNT_ADDRESS  
            currency = get_object_or_404(Currency, code=currency_code)
            balance = get_object_or_404(Balance, wallet=wallet, currency=currency)
            
            try:
                exchange_rate = ExchangeRate.objects.get(currency_code=currency_code).rate_to_usd
                proceeds_in_usd = amount * exchange_rate
                
                balance.withdraw(amount)
                tx_hash, gas_cost = transfer(to_address, currency_code, int(amount), wallet.eth_address, wallet.eth_private_key)

                usd_currency = get_object_or_404(Currency, code='USD')
                usd_balance, created = Balance.objects.get_or_create(wallet=wallet, currency=usd_currency)
                usd_balance.amount += proceeds_in_usd
                usd_balance.save()
                
                # Deduct gas cost from ETH balance
                eth_currency = get_object_or_404(Currency, code='ETH')
                eth_balance, created = Balance.objects.get_or_create(wallet=wallet, currency=eth_currency)
                eth_balance.amount -= Decimal(gas_cost)
                eth_balance.save()
                
                logger.info(f"Withdrawal successful: {amount} {currency_code} from {wallet.user.username}")
                return Response({'status': 'withdrawal successful', 'tx_hash': tx_hash if tx_hash else None}, status=status.HTTP_200_OK)
            except Exception as e:
                logger.error(f"Error during withdrawal transaction: {str(e)}")
                return Response({'error': 'Transaction failed', 'details': str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
        
        logger.error(f"Withdraw failed: {serializer.errors}")
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class ConvertCurrencyView(APIView):
    permission_classes = [IsAuthenticated]

    def post(self, request):
        logger.debug("Currency conversion request received")

        wallet = get_object_or_404(Wallet, user=request.user)
        serializer = ConvertCurrencySerializer(data=request.data)

        if serializer.is_valid():
            source_currency_code = serializer.validated_data['source_currency_code']
            target_currency_code = serializer.validated_data['target_currency_code']
            amount = Decimal(serializer.validated_data['amount'])

            source_currency = get_object_or_404(Currency, code=source_currency_code)
            target_currency = get_object_or_404(Currency, code=target_currency_code)
            source_balance = get_object_or_404(Balance, wallet=wallet, currency=source_currency)

            if source_balance.amount < amount:
                return Response({'error': 'Insufficient funds'}, status=status.HTTP_400_BAD_REQUEST)

            try:
                tx_hash, gas_cost, converted_amount = convert_currency(wallet.eth_address, source_currency_code, target_currency_code, int(amount), wallet.eth_private_key)
                
                # Deduct the amount from source balance and add to target balance
                source_balance.withdraw(amount)
                target_balance, created = Balance.objects.get_or_create(wallet=wallet, currency=target_currency)
                target_balance.deposit(Decimal(converted_amount))
                
                # Deduct gas cost from ETH balance
                eth_currency = get_object_or_404(Currency, code='ETH')
                eth_balance, created = Balance.objects.get_or_create(wallet=wallet, currency=eth_currency)
                eth_balance.amount -= Decimal(gas_cost)
                eth_balance.save()

                logger.info(f"Conversion successful: {amount} {source_currency_code} to {target_currency_code} for user {request.user.username}")
                return Response({'status': 'conversion successful', 'tx_hash': tx_hash}, status=status.HTTP_200_OK)
            except Exception as e:
                logger.error(f"Error during conversion transaction: {str(e)}")
                return Response({'error': 'Transaction failed', 'details': str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

        logger.error(f"Conversion failed: {serializer.errors}")
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)