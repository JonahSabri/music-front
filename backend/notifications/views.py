from rest_framework import viewsets, generics, status, permissions
from rest_framework.decorators import action
from rest_framework.response import Response
from django.db.models import Q
from django.utils import timezone
from .models import Notification
from .serializers import NotificationSerializer, NotificationCreateSerializer


class NotificationViewSet(viewsets.ModelViewSet):
    """
    ViewSet برای مدیریت اعلان‌ها
    """
    serializer_class = NotificationSerializer
    permission_classes = [permissions.IsAuthenticated]
    
    def get_queryset(self):
        """کاربران فقط اعلان‌های خودشان را می‌بینند"""
        return Notification.objects.filter(user=self.request.user)
    
    def get_serializer_class(self):
        if self.action == 'create':
            return NotificationCreateSerializer
        return NotificationSerializer
    
    def perform_create(self, serializer):
        """تنظیم کاربر برای اعلان جدید"""
        serializer.save(user=self.request.user)
    
    @action(detail=True, methods=['post'])
    def mark_as_read(self, request, pk=None):
        """علامت‌گذاری اعلان به عنوان خوانده شده"""
        notification = self.get_object()
        notification.mark_as_read()
        return Response({'message': 'اعلان خوانده شد'})
    
    @action(detail=False, methods=['post'])
    def mark_all_as_read(self, request):
        """علامت‌گذاری همه اعلان‌ها به عنوان خوانده شده"""
        count = self.get_queryset().filter(is_read=False).update(
            is_read=True,
            read_at=timezone.now()
        )
        return Response({
            'message': f'{count} اعلان خوانده شد',
            'count': count
        })
    
    @action(detail=False, methods=['get'])
    def unread_count(self, request):
        """تعداد اعلان‌های خوانده نشده"""
        count = self.get_queryset().filter(is_read=False).count()
        return Response({'unread_count': count})


class NotificationListView(generics.ListAPIView):
    """
    لیست اعلان‌های کاربر
    """
    serializer_class = NotificationSerializer
    permission_classes = [permissions.IsAuthenticated]
    
    def get_queryset(self):
        queryset = Notification.objects.filter(user=self.request.user)
        
        # فیلتر بر اساس نوع
        notification_type = self.request.query_params.get('type', None)
        if notification_type:
            queryset = queryset.filter(notification_type=notification_type)
        
        # فیلتر بر اساس خوانده شده/نشده
        is_read = self.request.query_params.get('is_read', None)
        if is_read is not None:
            is_read_bool = is_read.lower() == 'true'
            queryset = queryset.filter(is_read=is_read_bool)
        
        return queryset