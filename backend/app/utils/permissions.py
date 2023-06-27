from rest_framework import permissions


class IsOwner(permissions.BasePermission):
    message = 'You are not allowed.'


    def has_permission(self, request, view):
        try:
            if request.user.permission == "owner":
                return True
            else:
                return False
        except:
            return False
        
    
class IsMember(permissions.BasePermission):
    message = 'You are not allowed.'


    def has_permission(self, request, view):
        try:
            if request.user.permission == "member":
                return True
            else:
                return False
        except:
            return False