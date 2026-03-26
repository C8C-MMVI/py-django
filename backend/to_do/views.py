from rest_framework import viewsets
from rest_framework.permissions import IsAuthenticated
from .serializers import ToDoSerializer
from .models import ToDo

class ToDoView(viewsets.ModelViewSet):
    serializer_class = ToDoSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        return ToDo.objects.filter(user=self.request.user)

    def perform_create(self, serializer):
        serializer.save(user=self.request.user)