# create a celery.py in your project directory

from __future__ import absolute_import, unicode_literals
import os
from celery import Celery
from celery.schedules import crontab

os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'backend.settings')

app = Celery('backend')
app.config_from_object('django.conf:settings', namespace='CELERY')

app.autodiscover_tasks()

app.conf.broker_url = 'redis://localhost:6379/0'
app.conf.result_backend = 'redis://localhost:6379/0'

app.conf.broker_connection_retry_on_startup = True

app.conf.beat_schedule = {
    'fetch-exchange-rates-every-5-minutes': {
        'task': 'api.tasks.fetch_exchange_rates',
        'schedule': crontab(minute='*/5'),
    },
}