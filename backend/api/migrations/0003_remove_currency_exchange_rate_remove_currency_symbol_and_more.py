# Generated by Django 5.0.4 on 2024-05-19 10:17

import django.db.models.deletion
from django.conf import settings
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0002_currency_wallet_walletcurrency_delete_creditcard'),
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
    ]

    operations = [
        migrations.RemoveField(
            model_name='currency',
            name='exchange_rate',
        ),
        migrations.RemoveField(
            model_name='currency',
            name='symbol',
        ),
        migrations.AddField(
            model_name='currency',
            name='code',
            field=models.CharField(default='USD', max_length=3, unique=True),
        ),
        migrations.AlterField(
            model_name='currency',
            name='name',
            field=models.CharField(max_length=50),
        ),
        migrations.AlterField(
            model_name='wallet',
            name='user',
            field=models.OneToOneField(on_delete=django.db.models.deletion.CASCADE, related_name='wallet', to=settings.AUTH_USER_MODEL),
        ),
        migrations.CreateModel(
            name='Balance',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('amount', models.DecimalField(decimal_places=8, default=0.0, max_digits=20)),
                ('currency', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='api.currency')),
                ('wallet', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='balances', to='api.wallet')),
            ],
        ),
        migrations.DeleteModel(
            name='WalletCurrency',
        ),
    ]