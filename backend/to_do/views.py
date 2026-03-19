from rest_framework import viewsets
from .serializers import ToDoSerializer
from .models import ToDo

class ToDoView(viewsets.ModelViewSet):
    serializer_class = ToDoSerializer
    queryset = ToDo.objects.all()