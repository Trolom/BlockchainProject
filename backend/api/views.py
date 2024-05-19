from rest_framework import status, generics
from rest_framework.views import APIView
from rest_framework.response import Response
from .models import InsufficientFundsException, Wallet, Balance, Currency
from .serializers import WalletSerializer, DepositSerializer, WithdrawSerializer, ConvertCurrencySerializer, UserSerializer, CurrencySerializer
from django.shortcuts import get_object_or_404
from django.contrib.auth.models import User
from rest_framework.permissions import IsAuthenticated, AllowAny

class CreateUserView(generics.CreateAPIView):
    queryset = User.objects.all()
    serializer_class = UserSerializer
    permission_classes = [AllowAny]

class CurrencyListView(generics.ListAPIView):
    queryset = Currency.objects.all()
    serializer_class = CurrencySerializer
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
        wallet = get_object_or_404(Wallet, user=request.user)
        serializer = DepositSerializer(data=request.data)
        if serializer.is_valid():
            currency_code = serializer.validated_data['currency_code']
            amount = serializer.validated_data['amount']
            currency = get_object_or_404(Currency, code=currency_code)
            balance = get_object_or_404(Balance, wallet=wallet, currency=currency)
            balance.deposit(amount)
            return Response({'status': 'deposit successful'}, status=status.HTTP_200_OK)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class WithdrawView(APIView):
    permission_classes = [IsAuthenticated]

    def post(self, request):
        wallet = get_object_or_404(Wallet, user=request.user)
        serializer = WithdrawSerializer(data=request.data)
        if serializer.is_valid():
            currency_code = serializer.validated_data['currency_code']
            amount = serializer.validated_data['amount']
            currency = get_object_or_404(Currency, code=currency_code)
            balance = get_object_or_404(Balance, wallet=wallet, currency=currency)
            try:
                balance.withdraw(amount)
                return Response({'status': 'withdrawal successful'}, status=status.HTTP_200_OK)
            except InsufficientFundsException as e:
                return Response({'error': str(e)}, status=status.HTTP_400_BAD_REQUEST)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class ConvertCurrencyView(APIView):
    permission_classes = [IsAuthenticated]

    def post(self, request):
        wallet = get_object_or_404(Wallet, user=request.user)
        serializer = ConvertCurrencySerializer(data=request.data)
        if serializer.is_valid():
            source_currency_code = serializer.validated_data['source_currency_code']
            target_currency_code = serializer.validated_data['target_currency_code']
            conversion_rate = serializer.validated_data['conversion_rate']
            amount = serializer.validated_data['amount']
            source_currency = get_object_or_404(Currency, code=source_currency_code)
            target_currency = get_object_or_404(Currency, code=target_currency_code)
            source_balance = get_object_or_404(Balance, wallet=wallet, currency=source_currency)
            source_balance.convert(target_currency, conversion_rate, amount)
            return Response({'status': 'conversion successful'}, status=status.HTTP_200_OK)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
