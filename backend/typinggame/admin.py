from django.contrib import admin
from django.contrib.auth.models import User
from .models import AppUser
from django.contrib.sessions.models import Session
# Register your models here.

admin.site.register(User)
admin.site.register(AppUser)
admin.site.register(Session)