from django.contrib import admin
from .models import Wallet, Balance, Currency, ExchangeRate


@admin.register(Currency)
class CurrencyAdmin(admin.ModelAdmin):
    list_display = ('code', 'name')

@admin.register(Wallet)
class WalletAdmin(admin.ModelAdmin):
    list_display = ('user',)
    search_fields = ('user__username',)
    readonly_fields = ('user',)

@admin.register(Balance)
class BalanceAdmin(admin.ModelAdmin):
    list_display = ('wallet', 'currency', 'amount')
    search_fields = ('wallet__user__username', 'currency__code')
    list_filter = ('currency',)
    readonly_fields = ('wallet', 'currency')

@admin.register(ExchangeRate)
class ExchangeRateAdmin(admin.ModelAdmin):
    list_display = ('currency_code', 'rate_to_usd', 'last_updated')
    search_fields = ('currency_code',)
    list_filter = ('currency_code', 'last_updated')

#Added the classes from models here so that 
#they are visible in the admin panel