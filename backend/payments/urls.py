from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import (
    PaymentViewSet,
    PaymentMethodListView,
    CardListView,
    SubscriptionPlanListView,
    CurrentSubscriptionView
)

router = DefaultRouter()
router.register(r'payments', PaymentViewSet, basename='payment')

urlpatterns = [
    path('', include(router.urls)),
    path('payment-methods/', PaymentMethodListView.as_view(), name='payment-methods'),
    path('cards/', CardListView.as_view(), name='cards'),
    path('subscription-plans/', SubscriptionPlanListView.as_view(), name='subscription-plans'),
    path('current-subscription/', CurrentSubscriptionView.as_view(), name='current-subscription'),
]

