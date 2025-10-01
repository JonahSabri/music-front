from rest_framework import generics, status, permissions
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework_simplejwt.tokens import RefreshToken
from django.contrib.auth import login, logout
from django.middleware.csrf import get_token
from django.views.decorators.csrf import ensure_csrf_cookie, csrf_exempt
from django.utils.decorators import method_decorator
from .serializers import (
    UserSerializer,
    RegisterSerializer,
    LoginSerializer
)
from .models import User


@method_decorator(csrf_exempt, name='dispatch')
class RegisterView(generics.CreateAPIView):
    """ثبت نام کاربر جدید"""
    queryset = User.objects.all()
    serializer_class = RegisterSerializer
    permission_classes = [permissions.AllowAny]
    
    def create(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        user = serializer.save()
        
        # تولید JWT tokens
        refresh = RefreshToken.for_user(user)
        
        return Response({
            'user': UserSerializer(user).data,
            'tokens': {
                'refresh': str(refresh),
                'access': str(refresh.access_token),
            },
            'message': 'ثبت نام با موفقیت انجام شد'
        }, status=status.HTTP_201_CREATED)


@method_decorator(csrf_exempt, name='dispatch')
class LoginView(APIView):
    """ورود کاربر"""
    permission_classes = [permissions.AllowAny]
    
    def post(self, request):
        serializer = LoginSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        
        user = serializer.validated_data['user']
        
        # تولید JWT tokens
        refresh = RefreshToken.for_user(user)
        
        return Response({
            'user': UserSerializer(user).data,
            'tokens': {
                'refresh': str(refresh),
                'access': str(refresh.access_token),
            },
            'message': 'ورود با موفقیت انجام شد'
        })


@method_decorator(csrf_exempt, name='dispatch')
class LogoutView(APIView):
    """خروج کاربر"""
    def post(self, request):
        try:
            refresh_token = request.data.get('refresh_token')
            if refresh_token:
                token = RefreshToken(refresh_token)
                token.blacklist()
            return Response({
                'message': 'خروج با موفقیت انجام شد'
            })
        except Exception as e:
            return Response({
                'message': 'خروج با موفقیت انجام شد'
            })


class CurrentUserView(generics.RetrieveUpdateAPIView):
    """دریافت و ویرایش اطلاعات کاربر فعلی"""
    serializer_class = UserSerializer
    permission_classes = [permissions.IsAuthenticated]
    
    def get_object(self):
        return self.request.user


class CheckArtistNameView(APIView):
    """بررسی قابل تغییر بودن نام هنری"""
    permission_classes = [permissions.IsAuthenticated]
    
    def get(self, request):
        user = request.user
        return Response({
            'artist_name': user.artist_name,
            'is_locked': user.artist_name_locked,
            'can_change': not user.artist_name_locked,
            'message': 'نام هنری قابل تغییر نیست' if user.artist_name_locked else 'می‌توانید نام هنری خود را تنظیم کنید'
        })


@method_decorator(csrf_exempt, name='dispatch')
class CSRFView(APIView):
    """دریافت CSRF token"""
    permission_classes = [permissions.AllowAny]
    
    def get(self, request):
        return Response({
            'csrfToken': get_token(request)
        })
