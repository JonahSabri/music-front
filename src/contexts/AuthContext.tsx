'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';
import { api } from '@/lib/api';

interface User {
  id: number;
  username: string;
  email: string;
  artist_name?: string;
  artist_name_locked: boolean;
  phone?: string;
  profile_picture?: string;
  usdt_wallet_address?: string;
  can_upload?: {
    allowed: boolean;
    message: string;
  };
  created_at: string;
}

interface AuthContextType {
  user: User | null;
  isLoading: boolean;
  authLoading: boolean; // Add this for consistency
  isAuthenticated: boolean;
  login: (email: string, password: string) => Promise<{ success: boolean; error?: string }>;
  register: (userData: any) => Promise<{ success: boolean; error?: string }>;
  logout: () => Promise<void>;
  updateUser: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    checkAuth();
  }, []);

  const checkAuth = async () => {
    setIsLoading(true);
    try {
      // Check if we have a token
      const token = typeof window !== 'undefined' ? localStorage.getItem('access_token') : null;
      
      if (!token) {
        setUser(null);
        setIsLoading(false);
        return;
      }

      const response = await api.getCurrentUser();
      if (response.data && !response.error) {
        setUser(response.data);
      } else {
        setUser(null);
        // Only clear tokens if it's a real authentication error, not a network error
        if (response.error && response.error.includes('جلسه')) {
          if (typeof window !== 'undefined') {
            localStorage.removeItem('access_token');
            localStorage.removeItem('refresh_token');
          }
        }
      }
    } catch (error) {
      console.error('Auth check failed:', error);
      setUser(null);
      // Don't clear tokens on network errors, only on auth errors
    } finally {
      setIsLoading(false);
    }
  };

  const login = async (email: string, password: string) => {
    try {
      const response = await api.login(email, password);
      if (response.data && !response.error) {
        setUser(response.data.user);
        return { success: true };
      }
      return { success: false, error: response.error || 'خطا در ورود' };
    } catch (error) {
      console.error('Login error:', error);
      return { success: false, error: 'خطا در ارتباط با سرور' };
    }
  };

  const register = async (userData: any) => {
    try {
      const response = await api.register(userData);
      if (response.data && !response.error) {
        setUser(response.data.user);
        return { success: true };
      }
      return { success: false, error: response.error || 'خطا در ثبت نام' };
    } catch (error) {
      console.error('Register error:', error);
      return { success: false, error: 'خطا در ارتباط با سرور' };
    }
  };

  const logout = async () => {
    try {
      await api.logout();
    } catch (error) {
      console.error('Logout failed:', error);
    } finally {
      setUser(null);
      // Clear tokens
      if (typeof window !== 'undefined') {
        localStorage.removeItem('access_token');
        localStorage.removeItem('refresh_token');
      }
    }
  };

  const updateUser = async () => {
    await checkAuth();
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isLoading,
        authLoading: isLoading, // Add this for consistency
        isAuthenticated: !!user,
        login,
        register,
        logout,
        updateUser,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}

