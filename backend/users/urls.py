from django.urls import path
from .views import (
    RegisterView,
    LoginView,
    LogoutView,
    CurrentUserView,
    CheckArtistNameView,
    CSRFView
)

urlpatterns = [
    path('register/', RegisterView.as_view(), name='register'),
    path('login/', LoginView.as_view(), name='login'),
    path('logout/', LogoutView.as_view(), name='logout'),
    path('me/', CurrentUserView.as_view(), name='current-user'),
    path('check-artist-name/', CheckArtistNameView.as_view(), name='check-artist-name'),
    path('csrf/', CSRFView.as_view(), name='csrf'),
]

