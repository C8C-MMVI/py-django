from django.urls import path
from web_app import views

urlpatterns = [
    path('', views.renderIndex),
    path('addStudent', views.fetchFromForm),
    path('deleteStudent', views.deleteStudent),
    path('updatePage', views.updatePage),
    path('updateInfo', views.updateInformation),
]