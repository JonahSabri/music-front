from rest_framework import serializers
from .models import PaymentMethod, Payment, Card
from subscriptions.models import SubscriptionPlan


class SubscriptionPlanSerializer(serializers.ModelSerializer):
    class Meta:
        model = SubscriptionPlan
        fields = ['id', 'name', 'name_fa', 'price_irr', 'duration_days', 'max_tracks']


class PaymentMethodSerializer(serializers.ModelSerializer):
    class Meta:
        model = PaymentMethod
        fields = ['id', 'name', 'is_active']


class CardSerializer(serializers.ModelSerializer):
    class Meta:
        model = Card
        fields = ['id', 'bank', 'card_number', 'card_holder_name', 'is_active', 'description']
        read_only_fields = ['id']

    def to_representation(self, instance):
        """نمایش شماره کارت به صورت مخفی"""
        data = super().to_representation(instance)
        if 'card_number' in data:
            data['card_number'] = instance.get_masked_card_number()
        return data


class PaymentSerializer(serializers.ModelSerializer):
    subscription_plan_name = serializers.CharField(source='subscription_plan.name_fa', read_only=True)
    
    class Meta:
        model = Payment
        fields = [
            'id', 'subscription_plan', 'subscription_plan_name', 'amount', 'status',
            'transfer_date', 'transfer_time', 'tracking_id', 'last_four_digits',
            'receipt_file', 'user_notes', 'admin_notes', 'created_at', 'updated_at'
        ]
        read_only_fields = ['id', 'status', 'admin_notes', 'created_at', 'updated_at']

    def create(self, validated_data):
        """ایجاد پرداخت جدید"""
        validated_data['user'] = self.context['request'].user
        return super().create(validated_data)