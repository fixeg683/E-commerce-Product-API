# ===============================
# Static & Media Files Configuration (Render + Whitenoise)
# ===============================

import os
from pathlib import Path

BASE_DIR = Path(__file__).resolve().parent.parent

# URL paths
STATIC_URL = '/static/'
MEDIA_URL = '/media/'

# Root directories (must match render.yaml)
STATIC_ROOT = os.path.join(BASE_DIR, 'staticfiles')
MEDIA_ROOT = os.path.join(BASE_DIR, 'media')

# Whitenoise storage backend (compressed & hashed)
STATICFILES_STORAGE = 'whitenoise.storage.CompressedManifestStaticFilesStorage'

# Additional static directories (optional)
STATICFILES_DIRS = [
    os.path.join(BASE_DIR, 'static'),
]

# ===============================
# Middleware Configuration (must include Whitenoise)
# ===============================

MIDDLEWARE = [
    'django.middleware.security.SecurityMiddleware',
    'whitenoise.middleware.WhiteNoiseMiddleware',  # ✅ Whitenoise before all other middleware that use static files
    'django.contrib.sessions.middleware.SessionMiddleware',
    'django.middleware.common.CommonMiddleware',
    'django.middleware.csrf.CsrfViewMiddleware',
    'django.contrib.auth.middleware.AuthenticationMiddleware',
    'django.contrib.messages.middleware.MessageMiddleware',
    'django.middleware.clickjacking.XFrameOptionsMiddleware',
]

# ===============================
# Security (Recommended for Production)
# ===============================
# Ensures static files are served securely over HTTPS in Render
SECURE_PROXY_SSL_HEADER = ('HTTP_X_FORWARDED_PROTO', 'https')
CSRF_TRUSTED_ORIGINS = ['https://ecommerce-product-api.onrender.com']
ALLOWED_HOSTS = ['ecommerce-product-api.onrender.com', 'localhost', '127.0.0.1']
