# Generated by Django 4.0.1 on 2022-01-07 21:01

from django.db import migrations
import django.db.models.functions.text


class Migration(migrations.Migration):

    dependencies = [
        ('verzelapp', '0005_alter_aula_options_alter_modulo_options'),
    ]

    operations = [
        migrations.AlterModelOptions(
            name='aula',
            options={'ordering': [django.db.models.functions.text.Lower('nome')]},
        ),
        migrations.AlterModelOptions(
            name='modulo',
            options={'ordering': [django.db.models.functions.text.Lower('nome')]},
        ),
    ]
