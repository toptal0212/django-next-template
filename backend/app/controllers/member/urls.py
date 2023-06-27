
from django.conf.urls import include
from django.urls import re_path
from rest_framework_simplejwt import views
from rest_framework.routers import DefaultRouter

from .views import *

router = DefaultRouter()



urlpatterns = [
    re_path(r"me", MemberProfile.as_view(), name="member_profile"  )
]
