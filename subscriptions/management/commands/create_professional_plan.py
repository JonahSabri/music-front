from django.core.management.base import BaseCommand
from subscriptions.models import SubscriptionPlan


class Command(BaseCommand):
    help = 'ایجاد اشتراک حرفه‌ای 5,300,000 تومانی'

    def handle(self, *args, **options):
        # ایجاد اشتراک حرفه‌ای
        professional_plan, created = SubscriptionPlan.objects.get_or_create(
            name='professional',
            defaults={
                'name_fa': 'حرفه‌ای',
                'price_irr': 5300000,
                'duration_days': 365,
                'max_tracks': None,  # نامحدود
                'has_pre_save': True,
                'has_content_id': True,
                'has_splits': True,
                'has_analytics': True,
                'has_shazam': True,
                'has_store_maximizer': True,
                'has_priority_support': True,
                'is_active': True,
            }
        )

        if created:
            self.stdout.write(
                self.style.SUCCESS(
                    f'Professional plan created successfully: {professional_plan.name} - {professional_plan.price_irr:,} Toman'
                )
            )
        else:
            self.stdout.write(
                self.style.WARNING(
                    f'Professional plan already exists: {professional_plan.name} - {professional_plan.price_irr:,} Toman'
                )
            )
