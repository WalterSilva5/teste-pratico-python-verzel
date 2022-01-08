from django.contrib import admin
from django.urls import path

from drf_spectacular.views import SpectacularAPIView, SpectacularRedocView, SpectacularSwaggerView
from verzelapp.views import (
    modulo_view, aula_view, usuario_view, front_view)
from rest_framework_simplejwt import views as jwt_views

urlpatterns = [
    #index
    # path('', front_view.index, name='index'),
    #swagger
    path('swagger-file/', SpectacularAPIView.as_view(), name='schema'),
    # redoc
    path('redoc/', SpectacularRedocView.as_view(url_name='schema'), name='redoc'),
    # swagger
    path('swagger/', SpectacularSwaggerView.as_view(url_name='schema'),
         name='swagger-ui'),
    #modulo
    path('api/modulo/', modulo_view.ModuloViewSet.as_view(), name='modulo'),
    path('api/modulo_create/', modulo_view.ModuloViewSetCreate.as_view(), name='modulo-create'),
    path('api/modulo/<int:pk>/', modulo_view.ModuloViewSetDetail.as_view(), name='modulo-detail'),
    #aula
    path('api/aula/', aula_view.AulaViewSet.as_view(), name='aula'),
    path('api/aula/<int:pk>/', aula_view.AulaViewSetDetail.as_view(), name='aula-detail'),
    #usuario
    path('api/usuario/', usuario_view.UsuarioViewSet.as_view(), name='usuario'),
    #login
    path('api/login/', jwt_views.TokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('api/login/refresh/', jwt_views.TokenRefreshView.as_view(), name='token_refresh'),
]