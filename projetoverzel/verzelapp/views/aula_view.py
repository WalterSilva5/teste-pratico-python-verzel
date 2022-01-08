'''
aula_view.py

arquivo responsavel por definir as funções de aula
'''


from verzelapp.models import Aula, Modulo
from verzelapp.serializers import ModuloSerializer, AulaSerializer
from rest_framework import (
    status, mixins, generics, serializers
)
from rest_framework.response import Response
from rest_framework.decorators import action


class AulaViewSet(mixins.ListModelMixin,
                  mixins.CreateModelMixin,
                  generics.GenericAPIView):
    queryset = Aula.objects.all()
    serializer_class = AulaSerializer

    @action(detail=False, methods=['get'])
    def get(self, request):
        aulas = Aula.objects.all()
        serializer = AulaSerializer(aulas, many=True)
        return Response(serializer.data)
    
    @action(detail=False, methods=['post'])
    def post(self, request):    
        serializer = AulaSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    
    
    
    
class AulaViewSetDetail(mixins.RetrieveModelMixin,
                        mixins.UpdateModelMixin,
                        mixins.DestroyModelMixin,
                        generics.GenericAPIView):
    queryset = Aula.objects.all()
    serializer_class = AulaSerializer

    @action(detail=True, methods=['get'])
    def get(self, request, pk):
        aula = Aula.objects.get(pk=pk)
        serializer = AulaSerializer(aula)
        return Response(serializer.data)
    
    @action(detail=True, methods=['put'])
    def put(self, request, pk):
        aula = Aula.objects.get(pk=pk)
        serializer = AulaSerializer(aula, data=request.data)
        if serializer.is_valid():
            serializer.save()
        return Response(serializer.data)

    @action(detail=True, methods=['delete'])
    def delete(self, request, pk):
        aula = Aula.objects.get(pk=pk)
        aula.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)
    