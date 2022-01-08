from django.db import models
from django.contrib.auth.models import User as DjangoUser
from django.contrib.auth.hashers import make_password
from django.db.models.functions import Lower


# Create your models here.


class Modulo(models.Model):
    nome = models.CharField(max_length=100, null=False,
                            blank=False, unique=True)

    class Meta:
        ordering = [Lower('nome')]


class Aula(models.Model):
    nome = models.CharField(max_length=100, blank=False, null=False)
    modulo = models.ForeignKey(Modulo, on_delete=models.CASCADE)
    video_url = models.CharField(max_length=200, null=False, blank=False)
    data = models.DateField(auto_now=False, auto_now_add=False, blank=False, null=False)

    class Meta:
        ordering = [Lower('nome')]

    def __str__(self):
        return self.nome


class Usuario(DjangoUser):

    def save(self, *args, **kwargs):
        self.password = make_password(self.password)
        super(Usuario, self).save(*args, **kwargs)

    def __str__(self):
        return self.username
