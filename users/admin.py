from django.contrib import admin
from django.contrib.auth.admin import UserAdmin as BaseUserAdmin
from .models import User


@admin.register(User)
class UserAdmin(BaseUserAdmin):
    list_display = ['email', 'username', 'artist_name', 'artist_name_locked', 'is_staff', 'created_at']
    list_filter = ['artist_name_locked', 'is_staff', 'is_active']
    search_fields = ['email', 'username', 'artist_name']
    
    fieldsets = BaseUserAdmin.fieldsets + (
        ('اطلاعات هنری', {
            'fields': ('artist_name', 'artist_name_locked', 'phone', 'profile_picture')
        }),
        ('اطلاعات پرداخت', {
            'fields': ('usdt_wallet_address',)
        }),
    )
    
    readonly_fields = ['created_at', 'updated_at']
