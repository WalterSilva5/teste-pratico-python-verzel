# Generated by Django 4.0.1 on 2022-01-06 14:01

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('verzelapp', '0001_initial'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='modulo',
            name='app_label',
        ),
    ]