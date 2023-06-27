from django.conf import settings
from django.conf.urls import include
from django.urls import re_path
from django.views.static import serve

from controllers.jwt_auth.urls import urlpatterns as auth_urls
from controllers.owner.urls import urlpatterns as owner_urls
from controllers.member.urls import urlpatterns as member_urls


urlpatterns = [
    re_path(r'^api/', include(auth_urls)),
    re_path(r'^api/owner/', include(owner_urls)),
    re_path(r'^api/member/', include(member_urls)),
    re_path(r'^static/(?P<path>.*)$', serve, {'document_root': settings.STATIC_ROOT,}),
]

if settings.DEBUG:
    import debug_toolbar
    from rest_framework_swagger.views import get_swagger_view
    
    schema_view = get_swagger_view(title='MY API')
    urlpatterns += [
        re_path(r'^swagger/', schema_view),
        re_path(r'^__debug__/', include(debug_toolbar.urls)),
    ]
