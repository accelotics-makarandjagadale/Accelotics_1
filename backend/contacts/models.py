# contacts/models.py

from django.db import models

class Contact(models.Model):
    first_name = models.CharField(max_length=100)
    middle_name = models.CharField(max_length=100, blank=True)
    last_name = models.CharField(max_length=100)
    email = models.EmailField(unique=True)
    phone_number = models.CharField(max_length=15)
    message = models.TextField()
    file_upload = models.FileField(upload_to='uploads/', blank=True, null=True)

    def __str__(self):
        return f"{self.first_name} {self.last_name}"        