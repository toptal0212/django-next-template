from django.core.management.base import BaseCommand, CommandError
from django.contrib.auth.hashers import make_password

from controllers.jwt_auth.models import *
from controllers.owner.models import *



class Command(BaseCommand):
    help = "Closes the specified poll for voting"

    def handle(self, *args, **options):
        name = input("Name : ")
        name_furi = input("Name Furigana : ")
        address  = input("Address : ")
        phone  = input("Phone : ")
        fax = input("Fax : ")

        owner, created = Owner.objects.get_or_create(name=name)
        
        if created:
            owner.name_furi = name_furi
            owner.address = address
            owner.phone = phone
            owner.fax = fax
            owner.save()
            print("Success!")
        else:
            print("Already Owner exists!")


