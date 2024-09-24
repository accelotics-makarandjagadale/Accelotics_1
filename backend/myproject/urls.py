# myproject/urls.py

from django.contrib import admin
from django.urls import path, include

urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/contacts/', include('contacts.urls')),  # Ensure this line is present for contacts app
]