from django.contrib.auth import get_user_model, login, logout
from rest_framework.authentication import SessionAuthentication
from rest_framework.views import APIView
from rest_framework.response import Response
from .serializers import UserRegisterSerializer, UserLoginSerialier, UserSerializer, UserRecordSerializer
from rest_framework import permissions, status
from .validations import custom_validation, validate_email, validate_password
from django.contrib.auth.decorators import login_required
from django.http import JsonResponse
from .models import UserRecord


def checkAuthenticationStatus(request):
    return JsonResponse({'is_anonymous': request.user.is_anonymous})

def checkUsername(request):
    return JsonResponse({'user_name': request.user.get_username()})

class UserRegister(APIView):
    permission_classes = (permissions.AllowAny,)
    def post(self, request):
        clean_data = custom_validation(request.data)
        serializer = UserRegisterSerializer(data=clean_data)
        if serializer.is_valid(raise_exception=True):
            user = serializer.create(clean_data)
            if user:
                return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(status=status.HTTP_400_BAD_REQUEST)

class UserLogin(APIView):
    permission_classes = (permissions.AllowAny,)
    authentication_classes = (SessionAuthentication,)
    def post(self, request):
        data = request.data
        # assert validate_email(data)
        assert validate_password(data)
        serializer = UserLoginSerialier(data=data)
        if serializer.is_valid(raise_exception=True):
            user = serializer.check_user(data)
            login(request, user)
            return Response(serializer.data, status=status.HTTP_200_OK)

class UserLogout(APIView):
    permission_classes = (permissions.AllowAny,)
    authentication_classes = ()
    def post(self, request):
        logout(request)
        return Response(status=status.HTTP_200_OK)

class UserView(APIView):
    permission_classes = (permissions.AllowAny,)
    authentication_classes = (SessionAuthentication,)
    def get(self, request):
        serializer = UserSerializer(request.user)
        return Response({'user': serializer.data}, status=status.HTTP_200_OK)

class AddRecord(APIView):
    permission_classes = (permissions.AllowAny,)
    authentication_classes = (SessionAuthentication,)
    serializer_class = UserRecordSerializer
    def post(self, request):
        new_record = UserRecord(user_name=request.data["user_name"], elapsed_time=request.data["elapsed_time"], word_length=request.data["word_length"])
        new_record.save()
        user_records = UserRecord.objects.filter(user_name=request.data["user_name"], word_length=request.data["word_length"]).order_by('-elapsed_time', '-timestamp')
        while user_records.count() > 10:
            user_records.first().delete()
        return Response(status=status.HTTP_200_OK)