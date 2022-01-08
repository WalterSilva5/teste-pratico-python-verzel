'''
modulo_view.py

arquivo responsavel por definir as funções de modulo
'''


from verzelapp.models import Aula, Modulo
from verzelapp.serializers import ModuloSerializer, AulaSerializer
from rest_framework import (
    status, mixins, generics, serializers
)
from rest_framework.permissions import IsAuthenticated, AllowAny
from rest_framework.response import Response
from rest_framework.decorators import action
class ModuloViewSet(mixins.ListModelMixin, 
                    mixins.CreateModelMixin, 
                    generics.GenericAPIView):
    queryset = Modulo.objects.all()
    serializer_class = ModuloSerializer
    permission_classes = [AllowAny]
    
    @action(detail = False, methods = ['get'])
    def get(self, request):
        modulos = Modulo.objects.all()
        for modulo in modulos:
            aulas = Aula.objects.filter(modulo = modulo)
            modulo.aulas = aulas
        serializer = ModuloSerializer(modulos, many = True)
        return Response(serializer.data)


class ModuloViewSetCreate(mixins.CreateModelMixin, 
                          generics.GenericAPIView):
    
    queryset = Modulo.objects.all()
    serializer_class = ModuloSerializer
    permission_classes = [IsAuthenticated]
    @action(detail = False, methods = ['post'])
    def post(self, request):
        serializer = ModuloSerializer(data = request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status = status.HTTP_201_CREATED)
        else:
            return Response(serializer.errors, status = status.HTTP_400_BAD_REQUEST)
        
        

class ModuloViewSetDetail(mixins.RetrieveModelMixin, 
                          mixins.UpdateModelMixin, 
                          mixins.DestroyModelMixin, 
                          generics.GenericAPIView):
    queryset = Modulo.objects.all()
    serializer_class = ModuloSerializer

    @action(detail = True, methods = ['get'])
    def get(self, request, pk):
        modulo = Modulo.objects.get(pk = pk)
        serializer = ModuloSerializer(modulo)
        return Response(serializer.data)
    
    @action(detail = True, methods = ['put'])
    def put(self, request, pk):
        modulo = Modulo.objects.get(pk = pk)
        serializer = ModuloSerializer(modulo, data = request.data)
        if serializer.is_valid():
            serializer.save()
        return Response(serializer.data)
    
    @action(detail = True, methods = ['delete'])
    def delete(self, request, pk):
        modulo = Modulo.objects.get(pk = pk)
        modulo.delete()
        return Response(status = status.HTTP_204_NO_CONTENT)


def busca_aulas_modulo(modulo):
    aulas = Aula.objects.filter(modulo = modulo)
    return aulas