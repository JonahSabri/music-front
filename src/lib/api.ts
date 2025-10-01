// API helper for connecting to Django backend

const API_BASE_URL = 'http://localhost:8000/api';

// Helper function to get CSRF token from cookies
function getCookie(name: string): string | null {
  if (typeof document === 'undefined') return null;
  const value = `; ${document.cookie}`;
  const parts = value.split(`; ${name}=`);
  if (parts.length === 2) return parts.pop()?.split(';').shift() || null;
  return null;
}

interface ApiResponse<T = any> {
  data?: T;
  error?: string;
  message?: string;
}

class ApiClient {
  private baseURL: string;

  constructor(baseURL: string) {
    this.baseURL = baseURL;
  }

  private getAuthToken(): string | null {
    if (typeof window !== 'undefined') {
      return localStorage.getItem('access_token');
    }
    return null;
  }

  private setAuthTokens(accessToken: string, refreshToken: string): void {
    if (typeof window !== 'undefined') {
      localStorage.setItem('access_token', accessToken);
      localStorage.setItem('refresh_token', refreshToken);
    }
  }

  private clearAuthTokens(): void {
    if (typeof window !== 'undefined') {
      localStorage.removeItem('access_token');
      localStorage.removeItem('refresh_token');
    }
  }

  private async request<T>(
    endpoint: string,
    options: RequestInit = {}
  ): Promise<ApiResponse<T>> {
    const url = `${this.baseURL}${endpoint}`;
    const authToken = this.getAuthToken();

        const headers: Record<string, string> = {
          ...(options.headers as Record<string, string>),
        };

    // Add JWT token to headers
    if (authToken) {
      headers['Authorization'] = `Bearer ${authToken}`;
    }

    if (!(options.body instanceof FormData)) {
      headers['Content-Type'] = 'application/json';
    }

    try {
      const response = await fetch(url, {
        ...options,
        headers,
        credentials: 'include',
      });

      // Handle 401 Unauthorized - token might be expired
      if (response.status === 401 && authToken) {
        const refreshResult = await this.refreshToken();
        if (refreshResult.success) {
          // Retry the original request with new token
          headers['Authorization'] = `Bearer ${this.getAuthToken()}`;
          const retryResponse = await fetch(url, {
            ...options,
            headers,
            credentials: 'include',
          });
          const retryData = await retryResponse.json();
          
          if (!retryResponse.ok) {
            return { error: retryData.detail || retryData.message || 'خطایی رخ داد', data: retryData };
          }
          return { data: retryData };
        } else {
          // Refresh failed, clear tokens
          this.clearAuthTokens();
          return { error: 'جلسه شما منقضی شده است' };
        }
      }

      const data = await response.json();

      if (!response.ok) {
        return { error: data.detail || data.message || 'خطایی رخ داد', data };
      }

      return { data };
    } catch (error) {
      console.error('API Error:', error);
      return { error: 'خطا در ارتباط با سرور' };
    }
  }

  private async refreshToken(): Promise<{ success: boolean }> {
    const refreshToken = typeof window !== 'undefined' ? localStorage.getItem('refresh_token') : null;
    
    if (!refreshToken) {
      return { success: false };
    }

    try {
      const response = await fetch(`${this.baseURL}/token/refresh/`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ refresh: refreshToken }),
      });

      if (response.ok) {
        const data = await response.json();
        this.setAuthTokens(data.access, refreshToken);
        return { success: true };
      } else {
        this.clearAuthTokens();
        return { success: false };
      }
    } catch (error) {
      console.error('Token refresh failed:', error);
      this.clearAuthTokens();
      return { success: false };
    }
  }

  // =============== AUTH APIs ===============

  async register(userData: {
    username: string;
    email: string;
    password: string;
    password2: string;
    artist_name?: string;
  }) {
    const result = await this.request('/auth/register/', {
      method: 'POST',
      body: JSON.stringify(userData),
    });

    if (result.data && (result.data as any).tokens) {
      this.setAuthTokens((result.data as any).tokens.access, (result.data as any).tokens.refresh);
    }

    return result;
  }

  async login(email: string, password: string) {
    const result = await this.request('/auth/login/', {
      method: 'POST',
      body: JSON.stringify({ email, password }),
    });

    if (result.data && (result.data as any).tokens) {
      this.setAuthTokens((result.data as any).tokens.access, (result.data as any).tokens.refresh);
    }

    return result;
  }

  async logout() {
    const refreshToken = typeof window !== 'undefined' ? localStorage.getItem('refresh_token') : null;
    
    const result = await this.request('/auth/logout/', {
      method: 'POST',
      body: JSON.stringify({ refresh_token: refreshToken }),
    });

    this.clearAuthTokens();
    return result;
  }

  async getCurrentUser() {
    return this.request('/auth/me/');
  }

  async updateCurrentUser(data: any) {
    return this.request('/auth/me/', {
      method: 'PUT',
      body: JSON.stringify(data),
    });
  }

  async checkArtistName() {
    return this.request('/auth/check-artist-name/');
  }

  // =============== TRACK APIs ===============

  async getTracks() {
    return this.request('/tracks/');
  }

  async getTrack(id: number) {
    return this.request(`/tracks/${id}/`);
  }

  async updateTrack(id: number, trackData: any) {
    return this.request(`/tracks/${id}/`, {
      method: 'PATCH',
      body: JSON.stringify(trackData),
    });
  }

  async deleteTrack(id: number) {
    return this.request(`/tracks/${id}/`, {
      method: 'DELETE',
    });
  }


  async uploadTrack(formData: FormData) {
    return this.request('/tracks/', {
      method: 'POST',
      body: formData,
    });
  }

  async canUploadTrack() {
    return this.request('/tracks/can_upload/');
  }

  // =============== PAYMENT & SUBSCRIPTION APIs ===============


  async getPaymentMethods() {
    return this.request('/payment-methods/');
  }


  async submitPayment(formData: FormData) {
    return this.request('/payments/payments/', {
      method: 'POST',
      body: formData,
    });
  }

  async getPayments() {
    return this.request('/payments/payments/');
  }

  async getPayment(id: number) {
    return this.request(`/payments/payments/${id}/`);
  }

  async getPendingPayments() {
    return this.request('/payments/payments/pending/');
  }

  async approvePayment(id: number) {
    return this.request(`/payments/payments/${id}/approve/`, {
      method: 'POST',
    });
  }

  async rejectPayment(id: number, reason: string) {
    return this.request(`/payments/payments/${id}/reject/`, {
      method: 'POST',
      body: JSON.stringify({ reason }),
    });
  }

  async getCards() {
    return this.request('/payments/cards/');
  }

  async getSubscriptionPlans() {
    return this.request('/payments/subscription-plans/');
  }

  async getCurrentSubscription() {
    return this.request('/payments/current-subscription/');
  }

  // =============== NOTIFICATIONS APIs ===============

  async getNotifications() {
    return this.request('/notifications/');
  }

  async markNotificationAsRead(id: number) {
    return this.request(`/notifications/${id}/mark-read/`, {
      method: 'POST',
    });
  }

  async markAllNotificationsAsRead() {
    return this.request('/notifications/mark-all-read/', {
      method: 'POST',
    });
  }

  // =============== ANALYTICS APIs ===============

  async getAnalyticsSummary() {
    return this.request('/analytics/summary/');
  }

  async getTrackAnalytics(trackId: number) {
    return this.request(`/analytics/track/${trackId}/`);
  }

  async getTrackAnalyticsList() {
    return this.request('/analytics/track-analytics/');
  }

  async getDailyStreams() {
    return this.request('/analytics/daily-streams/');
  }

  async getUserAnalytics() {
    return this.request('/analytics/user-analytics/');
  }

  async getAnalyticsReports() {
    return this.request('/analytics/reports/');
  }
}

export const api = new ApiClient(API_BASE_URL);

