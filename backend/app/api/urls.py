from django.conf import settings
from django.urls import include, path

from . import views

urlpatterns = [
    path("ping/", views.Ping.as_view(), name="ping"),
]


if not settings.ON_SERVER:
    import debug_toolbar
    urlpatterns = [
        path('__debug__/', include(debug_toolbar.urls)),
    ] + urlpatterns
