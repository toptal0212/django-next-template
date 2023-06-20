from django.utils import timezone
from rest_framework import generics, response, status
from rest_framework.permissions import IsAuthenticated

from . import serializers


class Profile(generics.RetrieveAPIView):
    permission_classes = (IsAuthenticated,)
    serializer_class = serializers.User

    def get(self, request):
        user = self.serializer_class(request.user).data
        return response.Response(user)