from django.urls import path
from .views import WalletDetailView, DepositView, WithdrawView, CurrencyListView, ConvertCurrencyView, ExchangeRateListView

urlpatterns = [
    path('wallet/', WalletDetailView.as_view(), name='wallet-detail'),
    path('wallet/deposit/', DepositView.as_view(), name='wallet-deposit'),
    path('wallet/withdraw/', WithdrawView.as_view(), name='wallet-withdraw'),
    path('currencies/', CurrencyListView.as_view(), name='currency-list'),
    path('convert/', ConvertCurrencyView.as_view(), name='convert_currency'),
    path('exchange-rates/', ExchangeRateListView.as_view(), name='exchange-rate-list'),

]
#These paths are used for interacting with the backend.
#The frontend will make GET or POST requests to these links
#to get or modify the data in of the user.

#https://localhost:8000/api/add-wallet-currency/ will make
# a POST request to add a currency to the user's wallet.
#Why api/ ? because we added /api at the start of all these paths
# in backend/backend/urls.py.