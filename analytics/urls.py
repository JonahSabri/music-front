from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import (
    TrackAnalyticsViewSet,
    DailyStreamsViewSet,
    UserAnalyticsViewSet,
    AnalyticsReportViewSet,
    AnalyticsSummaryView,
    TrackAnalyticsDetailView
)

router = DefaultRouter()
router.register(r'track-analytics', TrackAnalyticsViewSet, basename='track-analytics')
router.register(r'daily-streams', DailyStreamsViewSet, basename='daily-streams')
router.register(r'user-analytics', UserAnalyticsViewSet, basename='user-analytics')
router.register(r'reports', AnalyticsReportViewSet, basename='reports')

urlpatterns = [
    path('', include(router.urls)),
    path('summary/', AnalyticsSummaryView.as_view(), name='analytics-summary'),
    path('track/<int:track_id>/', TrackAnalyticsDetailView.as_view(), name='track-analytics-detail'),
]
