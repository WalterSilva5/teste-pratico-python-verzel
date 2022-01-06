from rest_framework import serializers
from verzelapp.models import *
        
class AulaSerializer(serializers.ModelSerializer):
    class Meta:
        model = Aula
        fields = ('id', 'nome', 'modulo', 'video_url', 'data')
        read_only_fields = ('id',)
        
class ModuloSerializer(serializers.ModelSerializer):
    quantidade_aulas = serializers.SerializerMethodField()
    aulas = AulaSerializer(many=True, read_only=True)
    class Meta:
        model = Modulo
        fields = ('id', 'nome', 'quantidade_aulas', 'aulas')
        read_only_fields = ('id', 'quantidade_aulas', 'aulas')
    
    def get_quantidade_aulas(self, obj):
        return len(obj.aulas.all())
    