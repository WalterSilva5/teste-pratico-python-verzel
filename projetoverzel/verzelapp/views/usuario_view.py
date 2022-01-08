'''
usuario_view.py

arquivo responsavel por definir as funções de usuario
'''

from verzelapp.models import Usuario
from verzelapp.serializers import UsuarioSerializer
from rest_framework import (
    status, mixins, generics, serializers
)
from rest_framework.response import Response
from rest_framework.decorators import action
from rest_framework.permissions import IsAuthenticated, AllowAny


class UsuarioViewSet(
    mixins.CreateModelMixin,
    generics.GenericAPIView
):
    queryset = Usuario.objects.all()
    serializer_class = UsuarioSerializer
    permission_classes = [AllowAny]
    @action(detail=False, methods=['post'])
    def post(self, request):
        serializer = UsuarioSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        else:
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
