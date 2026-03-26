from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import ToDoView

router = DefaultRouter()
router.register(r'todos', ToDoView, basename='todo')

urlpatterns = [
    path('', include(router.urls)),
]