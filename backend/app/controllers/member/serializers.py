from rest_framework import serializers

from controllers.jwt_auth.models import *
from .models import *

class OwnerMemberSerializer(serializers.ModelSerializer):
    user = serializers.SerializerMethodField(read_only=True)

    class Meta:
        model = Member
        fields = "__all__"

    def get_user(self, obj):        
        m_data =  User.objects.get(id=obj.user_id)        
        return m_data
    