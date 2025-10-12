from django.contrib import admin
from django.urls import path, include
from rest_framework_simplejwt.views import (
    TokenObtainPairView,
    TokenRefreshView,
    TokenVerifyView,
)
from django.conf import settings
from django.conf.urls.static import static
from django.http import JsonResponse


def home_view(request):
    return JsonResponse({
        "message": "Welcome to the E-commerce Product API 🚀",
        "routes": {
            "register": "/api/users/register/",
            "login": "/api/users/login/",
            "products": "/api/products/",
        }
    })


urlpatterns = [
    path('', home_view, name='home'),
    path('admin/', admin.site.urls),

    # 🔐 Auth endpoints
    path('api/token/', TokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('api/token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
    path('api/token/verify/', TokenVerifyView.as_view(), name='token_verify'),

    # 🧩 App routes
    path('api/products/', include('products.urls')),
    path('api/users/', include('users.urls')),
]

if settings.DEBUG:
    urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
    urlpatterns += static(settings.STATIC_URL, document_root=settings.STATIC_ROOT)

