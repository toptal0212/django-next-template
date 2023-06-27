from django.core.management.base import BaseCommand, CommandError
from django.contrib.auth.hashers import make_password

from controllers.jwt_auth.models import *
from controllers.owner.models import *



class Command(BaseCommand):
    help = "Closes the specified poll for voting"


    def handle(self, *args, **options):
        owner = input("Owner : ")
        email = input("Email : ")
        first_name = input("First Name : ")
        last_name  = input("Last Name : ")
        role  = input("Role(owner, admin, member) : ")
        pwd = input("Password : ")

        user, created = User.objects.get_or_create(email=email)
        
        if created:
            user.password = make_password(pwd)
            user.save()

            try:
                owner_org = Owner.objects.get(name=owner)
                member = OwnerMember(user=user, owner=owner_org, first_name=first_name, last_name=last_name, role=role)
                member.save()
                print("Success!")
            except:
                print("Check Owner name!")
        else:
            print("Already member exists!")





