from rest_framework import viewsets, generics, status, permissions
from rest_framework.decorators import action
from rest_framework.response import Response
from django.core.exceptions import ValidationError
from django.utils import timezone
from datetime import datetime
from .models import Payment, PaymentMethod, Card
from subscriptions.models import SubscriptionPlan
from .serializers import (
    PaymentSerializer,
    PaymentMethodSerializer,
    CardSerializer,
    SubscriptionPlanSerializer
)


class PaymentMethodListView(generics.ListAPIView):
    """لیست روش‌های پرداخت فعال"""
    queryset = PaymentMethod.objects.filter(is_active=True)
    serializer_class = PaymentMethodSerializer
    permission_classes = [permissions.IsAuthenticated]


class CardListView(generics.ListAPIView):
    """لیست کارت‌های بانکی فعال"""
    queryset = Card.objects.filter(is_active=True)
    serializer_class = CardSerializer
    permission_classes = [permissions.AllowAny]


class SubscriptionPlanListView(generics.ListAPIView):
    """لیست طرح‌های اشتراک فعال"""
    queryset = SubscriptionPlan.objects.filter(is_active=True)
    serializer_class = SubscriptionPlanSerializer
    permission_classes = [permissions.AllowAny]


class PaymentViewSet(viewsets.ModelViewSet):
    """
    ViewSet برای مدیریت پرداخت‌ها
    """
    serializer_class = PaymentSerializer
    permission_classes = [permissions.IsAuthenticated]
    
    def get_queryset(self):
        """کاربران عادی فقط پرداخت‌های خودشان را می‌بینند"""
        if self.request.user.is_staff:
            return Payment.objects.all()
        return Payment.objects.filter(user=self.request.user)
    
    def validate_payment_data(self, data):
        """اعتبارسنجی داده‌های پرداخت"""
        errors = []
        
        # بررسی فیلدهای الزامی
        if not data.get('payment_method'):
            errors.append('روش پرداخت الزامی است')
        
        if not data.get('transfer_date'):
            errors.append('تاریخ واریز الزامی است')
        else:
            try:
                transfer_date = datetime.strptime(data['transfer_date'], '%Y-%m-%d').date()
                if transfer_date > timezone.now().date():
                    errors.append('تاریخ واریز نمی‌تواند در آینده باشد')
            except ValueError:
                errors.append('فرمت تاریخ واریز نامعتبر است')
        
        if not data.get('transfer_time'):
            errors.append('ساعت واریز الزامی است')
        
        if not data.get('last_four_digits'):
            errors.append('۴ رقم آخر کارت الزامی است')
        elif len(data['last_four_digits']) != 4 or not data['last_four_digits'].isdigit():
            errors.append('۴ رقم آخر کارت باید ۴ رقم عددی باشد')
        
        if not data.get('amount'):
            errors.append('مبلغ واریز الزامی است')
        else:
            try:
                amount = float(data['amount'])
                if amount <= 0:
                    errors.append('مبلغ واریز باید بیشتر از صفر باشد')
            except ValueError:
                errors.append('مبلغ واریز نامعتبر است')
        
        return errors

    def create(self, request, *args, **kwargs):
        """ایجاد پرداخت جدید با اعتبارسنجی"""
        # اعتبارسنجی داده‌ها
        validation_errors = self.validate_payment_data(request.data)
        if validation_errors:
            return Response({
                'error': ' • '.join(validation_errors)
            }, status=status.HTTP_400_BAD_REQUEST)
        
        # بررسی وجود اشتراک فعال
        from subscriptions.models import Subscription
        active_subscription = Subscription.objects.filter(
            user=request.user,
            is_active=True
        ).first()
        
        if active_subscription and active_subscription.is_valid():
            return Response({
                'error': 'شما در حال حاضر اشتراک فعال دارید'
            }, status=status.HTTP_400_BAD_REQUEST)
        
        # تنظیم کاربر
        request.data['user'] = request.user.id
        
        return super().create(request, *args, **kwargs)
    
    @action(detail=False, methods=['get'])
    def pending(self, request):
        """لیست پرداخت‌های در انتظار تایید (فقط برای ادمین)"""
        if not request.user.is_staff:
            return Response(
                {'detail': 'دسترسی غیرمجاز'},
                status=status.HTTP_403_FORBIDDEN
            )
        
        payments = Payment.objects.filter(status='pending')
        serializer = self.get_serializer(payments, many=True)
        return Response(serializer.data)
    
    @action(detail=True, methods=['post'])
    def approve(self, request, pk=None):
        """تایید پرداخت و فعال‌سازی اشتراک (فقط برای ادمین)"""
        if not request.user.is_staff:
            return Response(
                {'detail': 'دسترسی غیرمجاز'},
                status=status.HTTP_403_FORBIDDEN
            )
        
        payment = self.get_object()
        subscription = payment.approve()
        
        return Response({
            'message': 'پرداخت تایید و اشتراک فعال شد',
            'payment': PaymentSerializer(payment).data,
            'subscription': {
                'id': subscription.id,
                'plan': subscription.plan.name_fa,
                'start_date': subscription.start_date,
                'end_date': subscription.end_date,
                'is_active': subscription.is_active
            }
        })
    
    @action(detail=True, methods=['post'])
    def reject(self, request, pk=None):
        """رد پرداخت (فقط برای ادمین)"""
        if not request.user.is_staff:
            return Response(
                {'detail': 'دسترسی غیرمجاز'},
                status=status.HTTP_403_FORBIDDEN
            )
        
        reason = request.data.get('reason', 'دلیلی ذکر نشده است')
        payment = self.get_object()
        payment.reject(reason)
        
        return Response({
            'message': 'پرداخت رد شد',
            'payment': PaymentSerializer(payment).data
        })


class CurrentSubscriptionView(generics.GenericAPIView):
    """دریافت اطلاعات اشتراک فعلی کاربر"""
    permission_classes = [permissions.IsAuthenticated]
    
    def get(self, request):
        from subscriptions.models import Subscription
        
        subscription = Subscription.objects.filter(
            user=request.user,
            is_active=True
        ).first()
        
        if subscription:
            return Response({
                'has_subscription': True,
                'plan': {
                    'name': subscription.plan.name_fa,
                    'price': subscription.plan.price_irr,
                    'max_tracks': subscription.plan.max_tracks
                },
                'start_date': subscription.start_date,
                'end_date': subscription.end_date,
                'is_valid': subscription.is_valid()
            })
        
        return Response({
            'has_subscription': False,
            'message': 'اشتراک فعالی ندارید'
        })
