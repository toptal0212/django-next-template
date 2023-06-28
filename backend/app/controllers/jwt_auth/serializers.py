from rest_framework import serializers
from django.forms.models import model_to_dict
from controllers.jwt_auth.models import *
from .models import *
from controllers.member.models import *
from controllers.owner.models import *

class UserSerializer(serializers.ModelSerializer):
    info = serializers.SerializerMethodField(read_only=True)

    class Meta:
        model = User
        fields = ['email', 'is_active', 'permission', 'info']
        
    
    def get_info(self, obj):        
        if(obj.permission == "member"):
            return model_to_dict(Member.objects.get(user_id=obj.id))

        if(obj.permission == "owner"):
            return model_to_dict(OwnerMember.objects.get(user_id=obj.id))

