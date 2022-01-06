'''
modulo_view.py

arquivo responsavel por definir as funções de modulo
'''


from django.shortcuts import render
from verzelapp.models import Aula, Modulo
from verzelapp.serializers import ModuloSerializer, AulaSerializer
from rest_framework import (
    status, mixins, generics, serializers
)
from rest_framework.response import Response
from rest_framework.decorators import action

class ModuloViewSet(mixins.ListModelMixin,
                    mixins.CreateModelMixin,
                    generics.GenericAPIView):
    queryset = Modulo.objects.all()
    serializer_class = ModuloSerializer
    
    @action(detail=False, methods=['get'])
    def get(self, request):
        modulos = Modulo.objects.all()
        serializer = ModuloSerializer(modulos, many=True)
        return Response(serializer.data)

    @action(detail=False, methods=['post'])
    def post(self, request):
        serializer = ModuloSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
        
        

class ModuloViewSetDetail(mixins.RetrieveModelMixin,
                          mixins.UpdateModelMixin,
                          mixins.DestroyModelMixin,
                          generics.GenericAPIView):
    queryset = Modulo.objects.all()
    serializer_class = ModuloSerializer

    @action(detail=True, methods=['get'])
    def get(self, request, pk):
        modulo = Modulo.objects.get(pk=pk)
        serializer = ModuloSerializer(modulo)
        return Response(serializer.data)
    
    @action(detail=True, methods=['put'])
    def put(self, request, pk):
        modulo = Modulo.objects.get(pk=pk)
        serializer = ModuloSerializer(modulo, data=request.data)
        if serializer.is_valid():
            serializer.save()
        return Response(serializer.data)
    
    @action(detail=True, methods=['delete'])
    def delete(self, request, pk):
        modulo = Modulo.objects.get(pk=pk)
        modulo.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)
