from django.urls import path, include
from rest_framework import routers
from . import views

router = routers.DefaultRouter()
router.register(r'todos', views.ToDoView, basename='todo')

urlpatterns = [
    path('', include(router.urls)),
]