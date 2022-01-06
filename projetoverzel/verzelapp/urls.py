from django.contrib import admin
from django.urls import path

from drf_spectacular.views import SpectacularAPIView, SpectacularRedocView, SpectacularSwaggerView
from verzelapp.views import views


urlpatterns = [
    path('swagger-file/', SpectacularAPIView.as_view(), name='schema'),
    # redoc
    path('redoc/', SpectacularRedocView.as_view(url_name='schema'), name='redoc'),
    # swagger
    path('swagger/', SpectacularSwaggerView.as_view(url_name='schema'),
         name='swagger-ui'),
    #modulo
    path('modulo/', views.ModuloViewSet.as_view(), name='modulo'),
    path('modulo/<int:pk>/', views.ModuloViewSetDetail.as_view(), name='modulo-detail'),
    #aula
    path('aula/', views.AulaViewSet.as_view(), name='aula'),
    path('aula/<int:pk>/', views.AulaViewSetDetail.as_view(), name='aula-detail'),
]