from rest_framework import viewsets
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.permissions import AllowAny
from django.http import Http404
from utils.permissions import IsAuthenticated


# Create your views here.

from .models import *
from .serializers import *

# Create your views here.
class Profile(APIView):
    permission_classes = [IsAuthenticated]
    
    def get(self, request):
        print(request.user.permission)
        serializer = UserSerializer(request.user).data
        return Response({"me": serializer})