// =============================================================================
// KAIROS FRONTEND - SIMPLIFIED AUTHENTICATION CONTEXT
// =============================================================================
// Author: Sankhadeep Banerjee
// Project: Kairos - Marketing Decisioning Solution
// File: src/contexts/AuthContext.tsx
// =============================================================================

import React, { createContext, useContext, useEffect, useState } from 'react';

interface User {
  id: string;
  name: string;
  email: string;
  role: string;
  tenantId: string;
  permissions: string[];
  avatar?: string;
}

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<boolean>;
  logout: () => void;
  refreshToken: () => Promise<boolean>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

interface AuthProviderProps {
  children: React.ReactNode;
}

export function AuthProvider({ children }: AuthProviderProps) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  // Check for existing authentication on mount
  useEffect(() => {
    const initAuth = async () => {
      const token = localStorage.getItem('kairos-auth-token');
      const userData = localStorage.getItem('kairos-user-data');

      if (token && userData) {
        try {
          // Validate token with backend
          const isValid = await validateToken(token);
          if (isValid) {
            setUser(JSON.parse(userData));
          } else {
            // Token is invalid, clear storage
            localStorage.removeItem('kairos-auth-token');
            localStorage.removeItem('kairos-user-data');
          }
        } catch (error) {
          console.error('Token validation failed:', error);
          localStorage.removeItem('kairos-auth-token');
          localStorage.removeItem('kairos-user-data');
        }
      }
      setIsLoading(false);
    };

    initAuth();
  }, []);

  const validateToken = async (token: string): Promise<boolean> => {
    try {
      // In development, we'll mock this
      if (import.meta.env.VITE_ENABLE_MOCK_DATA === 'true') {
        return Promise.resolve(true);
      }

      const response = await fetch(`${import.meta.env.VITE_API_BASE_URL}/auth/validate`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      });

      return response.ok;
    } catch (error) {
      console.error('Token validation error:', error);
      return false;
    }
  };

  const login = async (email: string, password: string): Promise<boolean> => {
    try {
      setIsLoading(true);

      // Mock login for development
      if (import.meta.env.VITE_ENABLE_MOCK_DATA === 'true') {
        // Simulate API delay
        await new Promise(resolve => setTimeout(resolve, 1000));

        const mockUser: User = {
          id: '1',
          name: 'Admin User',
          email: email,
          role: 'Administrator',
          tenantId: 'tenant-1',
          permissions: ['read', 'write', 'admin'],
          avatar: undefined,
        };

        const mockToken = 'mock-jwt-token-' + Date.now();

        localStorage.setItem('kairos-auth-token', mockToken);
        localStorage.setItem('kairos-user-data', JSON.stringify(mockUser));
        setUser(mockUser);
        
        // Use window.location for navigation to avoid router context issues
        setTimeout(() => {
          window.location.href = '/dashboard';
        }, 100);
        
        return true;
      }

      // Real API call
      const response = await fetch(`${import.meta.env.VITE_API_BASE_URL}/auth/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });

      if (response.ok) {
        const data = await response.json();
        const { token, user: userData } = data;

        localStorage.setItem('kairos-auth-token', token);
        localStorage.setItem('kairos-user-data', JSON.stringify(userData));
        setUser(userData);
        
        // Navigate to dashboard
        setTimeout(() => {
          window.location.href = '/dashboard';
        }, 100);
        
        return true;
      } else {
        return false;
      }
    } catch (error) {
      console.error('Login error:', error);
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  const logout = () => {
    localStorage.removeItem('kairos-auth-token');
    localStorage.removeItem('kairos-user-data');
    setUser(null);
    
    // Use window.location for navigation
    window.location.href = '/login';
  };

  const refreshToken = async (): Promise<boolean> => {
    try {
      const currentToken = localStorage.getItem('kairos-auth-token');
      if (!currentToken) return false;

      // Mock refresh for development
      if (import.meta.env.VITE_ENABLE_MOCK_DATA === 'true') {
        return true;
      }

      const response = await fetch(`${import.meta.env.VITE_API_BASE_URL}/auth/refresh`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${currentToken}`,
          'Content-Type': 'application/json',
        },
      });

      if (response.ok) {
        const data = await response.json();
        localStorage.setItem('kairos-auth-token', data.token);
        return true;
      }

      return false;
    } catch (error) {
      console.error('Token refresh error:', error);
      return false;
    }
  };

  const value: AuthContextType = {
    user,
    isAuthenticated: !!user,
    isLoading,
    login,
    logout,
    refreshToken,
  };

  return (
    <AuthContext.Provider value={value}>
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