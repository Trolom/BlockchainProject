# Generated by Django 5.0.4 on 2024-05-25 09:08

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0007_currency_contract_address_currency_is_token'),
    ]

    operations = [
        migrations.AlterField(
            model_name='currency',
            name='code',
            field=models.CharField(max_length=10, unique=True),
        ),
    ]