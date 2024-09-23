from django.urls import path, include

urlpatterns = [
    # Other paths...
    path('api/contacts/', include('contacts.urls')),  # Ensure this line is present
]
