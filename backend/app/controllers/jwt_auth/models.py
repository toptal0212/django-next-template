from django.contrib.auth.models import AbstractUser
from django.utils.translation import gettext_lazy as _
from django.db import models

# Create your models here.
class User(AbstractUser):
    PERMISSION_CHOICES = (
        ("owner", 'Owner'),
        ("member", 'Member')
    )

    first_name = None
    last_name = None
    username = None
    email = models.EmailField(_('email address'), unique=True)

    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS = []
    permission = models.CharField(max_length=50, choices=PERMISSION_CHOICES, default="member")

    
    updated_at = models.DateTimeField(auto_now=True)
    created_at = models.DateTimeField(auto_now_add=True)
