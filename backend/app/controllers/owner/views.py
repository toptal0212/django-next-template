from rest_framework import viewsets
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.permissions import AllowAny
from django.http import Http404
from utils.permissions import IsOwner

from .models import *
from .serializers import *

# Create your views here.
class OwnerMemberProfile(APIView):
    permission_classes = [IsOwner]
    
    def get(self, request):
        print(request.user)
        # snippet = self.get_object(pk)
        # serializer = OwnerMemberSerializer(snippet)
        return Response({"user": "serializer.data"})