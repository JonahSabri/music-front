from django.utils.deprecation import MiddlewareMixin
from django.conf import settings
import re


class CSRFExemptMiddleware(MiddlewareMixin):
    """
    Middleware to exempt certain URLs from CSRF protection
    """
    
    def process_request(self, request):
        # Check if the request path matches any exempt URL patterns
        for pattern in getattr(settings, 'CSRF_EXEMPT_URLS', []):
            if re.match(pattern, request.path):
                setattr(request, '_dont_enforce_csrf_checks', True)
                break
