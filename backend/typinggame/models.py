from django.db import models
from django.contrib.auth.base_user import BaseUserManager
from django.contrib.auth.models import AbstractBaseUser, PermissionsMixin

class AppUserManager(BaseUserManager):
    def create_user(self, username, email, password=None):
        if not username:
            raise ValueError('A username is required')
        if not email:
            raise ValueError('An email is required')
        if not password:
            raise ValueError('A password is required')
        username = self.model.normalize_username(username)
        email = self.normalize_email(email)
        user = self.model(username=username, email=email)
        user.set_password(password)
        user.save()
        return user
    def create_superuser(self, username, email, password=None):
        if not username:
            raise ValueError('A username is required')
        if not email:
            raise ValueError('An email is required')
        if not password:
            raise ValueError('A password is required')
        user = self.create_user(username, email, password)
        user.is_superuser = True
        user.save()
        return user

class AppUser(AbstractBaseUser, PermissionsMixin):
    user_id = models.AutoField(primary_key=True)
    email = models.EmailField(max_length=50, unique=True)
    username = models.CharField(max_length=50, unique=True)
    USERNAME_FIELD = 'username'
    REQUIRED_FIELDS = ['email', 'password']

    @property
    def is_staff(self):
        return self.is_superuser
    
    objects = AppUserManager()
    def __str__(self):
        return self.username

class UserRecord(models.Model):
    user_name = models.CharField(max_length=255)
    elapsed_time = models.DecimalField(max_digits=5, decimal_places=2)
    timestamp = models.DateTimeField(auto_now_add=True)
    word_length = models.PositiveIntegerField()