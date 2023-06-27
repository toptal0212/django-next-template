from pathlib import Path
from datetime import timedelta
import os
import environ

# Build paths inside the project like this: os.path.join(BASE_DIR, ...)
BASE_DIR = Path(__file__).resolve().parent.parent

env = environ.Env(
    ON_SERVER=(bool, True), LOGGING_LEVEL=(str, "INFO"), DEBUG=(bool, False)
)

IGNORE_DOT_ENV_FILE = env.bool("IGNORE_DOT_ENV_FILE", default=False)
if not IGNORE_DOT_ENV_FILE:
    # reading .env file
    environ.Env.read_env(env_file=os.path.join(BASE_DIR, ".env"))

# Quick-start development settings - unsuitable for production
# See https://docs.djangoproject.com/en/2.0/howto/deployment/checklist/

# SECURITY WARNING: keep the secret key used in production secret!
SECRET_KEY = env("SECRET_KEY")

# SECURITY WARNING: don't run with debug turned on in production!
DEBUG = env("DEBUG")
ON_SERVER = env("ON_SERVER", default=True)

ALLOWED_HOSTS = ["*"]
CORS_ALLOW_CREDENTIALS = True
if ON_SERVER:
    CORS_ORIGIN_REGEX_WHITELIST = env.list(
        "CORS_ORIGIN_REGEX_WHITELIST", default=[]
    )
else:
    CORS_ORIGIN_ALLOW_ALL = True


# Application definition

DJANGO_APPS = [
    "django.contrib.admin",
    "django.contrib.auth",
    "django.contrib.contenttypes",
    "django.contrib.sessions",
    "django.contrib.messages",
    "django.contrib.staticfiles",
]
THIRD_PARTY_APPS = [
    "corsheaders",
    "django_extensions",
    "rest_framework",
    'rest_framework_simplejwt.token_blacklist'
]
OUR_APPS = [
    "controllers.jwt_auth",
    "controllers.owner",
    "controllers.member"
]
INSTALLED_APPS = DJANGO_APPS + THIRD_PARTY_APPS + OUR_APPS

MIDDLEWARE = [
    "django.middleware.security.SecurityMiddleware",
    "django.contrib.sessions.middleware.SessionMiddleware",
    "corsheaders.middleware.CorsMiddleware",
    "django.middleware.common.CommonMiddleware",
    "django.middleware.csrf.CsrfViewMiddleware",
    "django.contrib.auth.middleware.AuthenticationMiddleware",
    "django.contrib.messages.middleware.MessageMiddleware",
    "django.middleware.clickjacking.XFrameOptionsMiddleware",
]

if not ON_SERVER:
    INSTALLED_APPS.append("debug_toolbar")
    MIDDLEWARE.insert(9, "debug_toolbar.middleware.DebugToolbarMiddleware")
    INTERNAL_IPS = [
        '127.0.0.1',
    ]

ROOT_URLCONF = "config.urls"

TEMPLATES = [
{
    'BACKEND': 'django.template.backends.django.DjangoTemplates',
    'DIRS': [
        
    ],
    'APP_DIRS': True,
    'OPTIONS': {
        'context_processors': [
            'django.template.context_processors.debug',
            'django.template.context_processors.request',
            'django.contrib.auth.context_processors.auth',
            'django.contrib.messages.context_processors.messages',
        ],
    },
},]

WSGI_APPLICATION = "config.wsgi.application"


# Database
# https://docs.djangoproject.com/en/2.0/ref/settings/#databases

# Database
DATABASES = {
    'default': {
        'ENGINE': 'django.db.backends.mysql',
        'NAME': env("DB_NAME"),
        'USER':  env("DB_USER"),
        'PASSWORD':  env("DB_PASSWORD"),
        'HOST':'localhost',
        'PORT':'3306',
    }
}


# Password validation
# https://docs.djangoproject.com/en/2.0/ref/settings/#auth-password-validators

password_validators = [
    "django.contrib.auth.password_validation.UserAttributeSimilarityValidator",
    "django.contrib.auth.password_validation.MinimumLengthValidator",
    "django.contrib.auth.password_validation.CommonPasswordValidator",
    "django.contrib.auth.password_validation.NumericPasswordValidator",
]
AUTH_PASSWORD_VALIDATORS = [{"NAME": v} for v in password_validators]
AUTH_USER_MODEL = "jwt_auth.User"

# Internationalization
# https://docs.djangoproject.com/en/2.0/topics/i18n/

LANGUAGE_CODE = "en-us"

TIME_ZONE = "Asia/Tokyo"

USE_I18N = True

USE_L10N = True

USE_TZ = True


# Static files (CSS, JavaScript, Images)
STATIC_ROOT = os.path.join(BASE_DIR, "static")
STATIC_URL = "/static/"


REST_FRAMEWORK = {
    "DEFAULT_AUTHENTICATION_CLASSES": (
        "rest_framework_simplejwt.authentication.JWTAuthentication",
        "rest_framework.authentication.BasicAuthentication",
    ),
    'DEFAULT_PERMISSION_CLASSES': [
        'rest_framework.permissions.AllowAny',
    ],
    'DEFAULT_SCHEMA_CLASS': 'rest_framework.schemas.coreapi.AutoSchema' 
}

# JWT Settings
SIMPLE_JWT = {
    "ACCESS_TOKEN_LIFETIME": timedelta(minutes=1),
    "REFRESH_TOKEN_LIFETIME": timedelta(days=30),
}


#Email
DEFAULT_FROM_EMAIL = os.getenv("DEFAULT_FROM_EMAIL")
EMAIL_HOST = env("EMAIL_HOST")
EMAIL_PORT = 587                  
EMAIL_HOST_USER = env("EMAIL_HOST_USER")
EMAIL_HOST_PASSWORD = env("EMAIL_HOST_PASSWORD")
EMAIL_USE_TLS = True 
# EMAIL_BACKEND = 'account.backend.LoggingEmailBackend'