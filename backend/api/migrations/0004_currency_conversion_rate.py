# Generated by Django 5.0.4 on 2024-05-21 19:29

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0003_remove_currency_exchange_rate_remove_currency_symbol_and_more'),
    ]

    operations = [
        migrations.AddField(
            model_name='currency',
            name='conversion_rate',
            field=models.DecimalField(decimal_places=8, default=0.0, max_digits=20),
        ),
    ]
