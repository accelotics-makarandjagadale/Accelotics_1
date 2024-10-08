# contacts/serializers.py

from rest_framework import serializers
from .models import Contact

class ContactSerializer(serializers.ModelSerializer):
    class Meta:
        model = Contact
        fields = ['id', 'first_name', 'middle_name', 'last_name', 'email', 'phone_number', 'message', 'file_upload'] 