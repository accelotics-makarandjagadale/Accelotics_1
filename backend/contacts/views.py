from rest_framework.response import Response
from rest_framework.decorators import api_view , permission_classes
from rest_framework.permissions import IsAuthenticated
from .models import Contact
from .serializers import ContactSerializer

@api_view(['POST'])
def create_contact(request):
    serializer = ContactSerializer(data=request.data)
    if serializer.is_valid():
        serializer.save()
        return Response(serializer.data, status=201)
    return Response(serializer.errors, status=400)


# List contacts
@api_view(['GET'])
@permission_classes([IsAuthenticated])  # Only logged-in admins can access
def list_contacts(request):
    contacts = Contact.objects.all()
    serializer = ContactSerializer(contacts, many=True)
    return Response(serializer.data)


# Delete contact
@api_view(['DELETE'])
@permission_classes([IsAuthenticated])  # Only logged-in admins can access
def delete_contact(request, pk):
    contact = Contact.objects.get(id=pk)
    contact.delete()
    return Response({"message": "Contact deleted successfully"}, status=204)
