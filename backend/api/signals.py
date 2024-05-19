from django.db.models.signals import post_migrate
from django.dispatch import receiver
from .models import Currency

@receiver(post_migrate)
def create_default_currencies(sender, **kwargs):
    default_currencies = [
        {"code": "USD", "name": "US Dollar"},
        {"code": "BTC", "name": "Bitcoin"},
        {"code": "EUR", "name": "Euro"},
        {"code": "ETH", "name": "Ethereum"},
        {"code": "DOGE", "name": "Dogecoin"},
    ]
    
    for currency_data in default_currencies:
        Currency.objects.get_or_create(code=currency_data["code"], defaults={"name": currency_data["name"]})
#If you want to update these, change the code and then python3 manage.py migrate