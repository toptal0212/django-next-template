from django.conf import settings
from django.urls import include, path

from . import views
from . import jwt_views

urlpatterns = [
    path("me", views.Profile.as_view(), name="me"),
    path("login", jwt_views.Login.as_view(), name="login"),
    path("token/refresh", jwt_views.RefreshToken.as_view(), name="token-refresh"),
    path("logout", jwt_views.Logout.as_view(), name="logout"),
]

urlpatterns += [
    path("api-auth/", include('rest_framework.urls'))
]

if not settings.ON_SERVER:
    import debug_toolbar
    urlpatterns = [
        path('__debug__/', include(debug_toolbar.urls)),
    ] + urlpatterns
