# Generated by Django 5.0.4 on 2024-05-25 07:01

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0005_remove_currency_conversion_rate'),
    ]

    operations = [
        migrations.AddField(
            model_name='wallet',
            name='eth_address',
            field=models.CharField(blank=True, max_length=42, null=True, unique=True),
        ),
        migrations.AddField(
            model_name='wallet',
            name='eth_private_key',
            field=models.CharField(blank=True, max_length=64, null=True),
        ),
    ]
