from django.urls import path
from . import views

urlpatterns = [
    path('create/', views.create_contact, name='create_contact'),
    path('list/', views.list_contacts, name='list_contacts'),  
    path('delete/<int:pk>/', views.delete_contact, name='delete_contact'),  
]