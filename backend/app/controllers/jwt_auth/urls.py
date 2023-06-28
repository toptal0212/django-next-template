
from django.conf.urls import include
from django.urls import re_path
from rest_framework_simplejwt import views
from rest_framework.routers import DefaultRouter

from .views import *

router = DefaultRouter()



urlpatterns = [
    re_path(r'auth/login', views.TokenObtainPairView.as_view(), name='account_login'),
    re_path(r'auth/refresh', views.TokenRefreshView.as_view(), name='account_refresh'),
    re_path(r"me", Profile.as_view(), name="account_profile"  )
]
