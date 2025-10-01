from django.core.management.base import BaseCommand
from payments.models import PaymentMethod
from subscriptions.models import SubscriptionPlan


class Command(BaseCommand):
    help = 'ایجاد داده‌های اولیه (روش پرداخت و طرح‌های اشتراک)'

    def handle(self, *args, **options):
        # ایجاد روش پرداخت
        payment_method, created = PaymentMethod.objects.get_or_create(
            card_number="6037997123456789",
            defaults={
                'name': "کارت اصلی",
                'card_holder_name': "علی احمدی",
                'bank_name': "بانک ملی",
                'is_active': True
            }
        )
        
        if created:
            self.stdout.write(
                self.style.SUCCESS('[OK] Payment method created')
            )
        else:
            self.stdout.write(
                self.style.WARNING('Payment method already exists')
            )
        
        # ایجاد طرح رایگان
        free_plan, created = SubscriptionPlan.objects.get_or_create(
            name="Free",
            defaults={
                'name_fa': "رایگان",
                'price_irr': 0,
                'duration_days': 365,
                'max_tracks': 1,
                'has_analytics': True,
                'is_active': True
            }
        )
        
        if created:
            self.stdout.write(
                self.style.SUCCESS('[OK] Free plan created')
            )
        else:
            self.stdout.write(
                self.style.WARNING('Free plan already exists')
            )
        
        # ایجاد طرح حرفه‌ای
        pro_plan, created = SubscriptionPlan.objects.get_or_create(
            name="Professional",
            defaults={
                'name_fa': "حرفه‌ای",
                'price_irr': 59900,
                'duration_days': 365,
                'max_tracks': None,  # نامحدود
                'has_pre_save': True,
                'has_content_id': True,
                'has_splits': True,
                'has_analytics': True,
                'has_shazam': True,
                'has_store_maximizer': True,
                'has_priority_support': True,
                'is_active': True
            }
        )
        
        if created:
            self.stdout.write(
                self.style.SUCCESS('[OK] Professional plan created')
            )
        else:
            self.stdout.write(
                self.style.WARNING('Professional plan already exists')
            )
        
        self.stdout.write(
            self.style.SUCCESS('\n[SUCCESS] Initial data setup completed!')
        )

