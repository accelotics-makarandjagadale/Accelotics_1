from rest_framework.response import Response
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated
from rest_framework import status
from .models import Contact
from .serializers import ContactSerializer

@api_view(['POST'])
def create_contact(request):
    serializer = ContactSerializer(data=request.data)
    if serializer.is_valid():
        serializer.save()
        return Response(serializer.data, status=status.HTTP_201_CREATED)  # Use the status constant for clarity
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

# List contacts
@api_view(['GET'])
def list_contacts(request):
    contacts = Contact.objects.all()
    serializer = ContactSerializer(contacts, many=True)
    return Response(serializer.data)

# Delete contact
@api_view(['DELETE'])
def delete_contact(request, pk):
    try:
        contact = Contact.objects.get(id=pk)
        contact.delete()
        return Response({"message": "Contact deleted successfully"}, status=status.HTTP_204_NO_CONTENT)  # Use status constant for clarity
    except Contact.DoesNotExist:
        return Response({"error": "Contact not found"}, status=status.HTTP_404_NOT_FOUND)  # Handle not found error
