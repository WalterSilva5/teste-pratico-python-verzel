# Generated by Django 4.0.1 on 2022-01-06 10:03

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='Modulo',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('nome', models.CharField(max_length=100, unique=True)),
                ('app_label', models.CharField(max_length=100)),
            ],
        ),
        migrations.CreateModel(
            name='Aula',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('nome', models.CharField(max_length=100)),
                ('video_url', models.CharField(max_length=200)),
                ('data', models.DateField()),
                ('modulo', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='verzelapp.modulo')),
            ],
        ),
    ]