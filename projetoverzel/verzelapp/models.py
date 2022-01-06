from django.db import models

# Create your models here.
class Modulo(models.Model):
    nome = models.CharField(max_length=100, null=False, blank=False, unique=True)
        
class Aula(models.Model):
    nome = models.CharField(max_length=100, blank=False, null=False)
    modulo = models.ForeignKey(Modulo, on_delete=models.CASCADE)
    video_url = models.CharField(max_length=200, null=False, blank=False)
    data = models.DateField(auto_now=False, auto_now_add=False, blank=False, null=False)

    def __str__(self):
        return self.nome