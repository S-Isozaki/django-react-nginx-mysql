from rest_framework import serializers
from django.contrib.auth import get_user_model, authenticate
from django.core.exceptions import ValidationError
from .models import UserRecord

UserModel = get_user_model()

class UserRegisterSerializer(serializers.ModelSerializer):
    class Meta:
        model = UserModel
        fields = '__all__'
    def create(self, clean_data):
        user_obj = UserModel.objects.create_user(username=clean_data['username'], email=clean_data['email'], password=clean_data['password'])
        user_obj.save()
        return user_obj

class UserLoginSerialier(serializers.Serializer):
    username = serializers.CharField()
    password = serializers.CharField()
    def check_user(self, clean_data):
        user = authenticate(username=clean_data['username'], password=clean_data['password'])
        if not user:
            raise ValidationError('user not found')
        return user

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = UserModel
        fields = ('username',)

class UserRecordSerializer(serializers.ModelSerializer):
    user_name = serializers.CharField()
    elapsed_time = serializers.DecimalField(max_digits=5, decimal_places=2)
    word_length = serializers.IntegerField()
    class Meta:
        model = UserRecord
        fields = ('user_name', 'elapsed_time', 'word_length',)