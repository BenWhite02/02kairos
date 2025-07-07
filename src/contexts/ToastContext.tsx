// =============================================================================
// KAIROS FRONTEND - TOAST NOTIFICATION CONTEXT
// =============================================================================
// Author: Sankhadeep Banerjee
// Project: Kairos - Marketing Decisioning Solution
// File: src/contexts/ToastContext.tsx
// =============================================================================

import React, { createContext, useContext, useState, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  CheckCircleIcon,
  ExclamationTriangleIcon,
  InformationCircleIcon,
  XCircleIcon,
  XMarkIcon,
} from '@heroicons/react/24/outline';

interface Toast {
  id: string;
  type: 'success' | 'error' | 'warning' | 'info';
  title: string;
  message?: string;
  duration?: number;
  action?: {
    label: string;
    onClick: () => void;
  };
}

interface ToastContextType {
  showToast: (toast: Omit<Toast, 'id'>) => void;
  removeToast: (id: string) => void;
  clearAllToasts: () => void;
}

const ToastContext = createContext<ToastContextType | undefined>(undefined);

interface ToastProviderProps {
  children: React.ReactNode;
}

export function ToastProvider({ children }: ToastProviderProps) {
  const [toasts, setToasts] = useState<Toast[]>([]);

  const showToast = useCallback((toastData: Omit<Toast, 'id'>) => {
    const id = Math.random().toString(36).substr(2, 9);
    const toast: Toast = {
      id,
      duration: 5000, // Default 5 seconds
      ...toastData,
    };

    setToasts(prev => [...prev, toast]);

    // Auto remove after duration
    if (toast.duration && toast.duration > 0) {
      setTimeout(() => {
        removeToast(id);
      }, toast.duration);
    }
  }, []);

  const removeToast = useCallback((id: string) => {
    setToasts(prev => prev.filter(toast => toast.id !== id));
  }, []);

  const clearAllToasts = useCallback(() => {
    setToasts([]);
  }, []);

  const getToastIcon = (type: Toast['type']) => {
    switch (type) {
      case 'success':
        return CheckCircleIcon;
      case 'error':
        return XCircleIcon;
      case 'warning':
        return ExclamationTriangleIcon;
      case 'info':
        return InformationCircleIcon;
      default:
        return InformationCircleIcon;
    }
  };

  const getToastColors = (type: Toast['type']) => {
    switch (type) {
      case 'success':
        return {
          bg: 'bg-green-500/20',
          border: 'border-green-500/30',
          icon: 'text-green-400',
          text: 'text-green-100',
        };
      case 'error':
        return {
          bg: 'bg-red-500/20',
          border: 'border-red-500/30',
          icon: 'text-red-400',
          text: 'text-red-100',
        };
      case 'warning':
        return {
          bg: 'bg-yellow-500/20',
          border: 'border-yellow-500/30',
          icon: 'text-yellow-400',
          text: 'text-yellow-100',
        };
      case 'info':
        return {
          bg: 'bg-blue-500/20',
          border: 'border-blue-500/30',
          icon: 'text-blue-400',
          text: 'text-blue-100',
        };
      default:
        return {
          bg: 'bg-gray-500/20',
          border: 'border-gray-500/30',
          icon: 'text-gray-400',
          text: 'text-gray-100',
        };
    }
  };

  const value: ToastContextType = {
    showToast,
    removeToast,
    clearAllToasts,
  };

  return (
    <ToastContext.Provider value={value}>
      {children}
      
      {/* Toast Container */}
      <div className="fixed top-4 right-4 z-50 space-y-2 max-w-sm">
        <AnimatePresence mode="popLayout">
          {toasts.map((toast) => {
            const Icon = getToastIcon(toast.type);
            const colors = getToastColors(toast.type);

            return (
              <motion.div
                key={toast.id}
                initial={{ opacity: 0, x: 100, scale: 0.95 }}
                animate={{ opacity: 1, x: 0, scale: 1 }}
                exit={{ opacity: 0, x: 100, scale: 0.95 }}
                transition={{ duration: 0.2, ease: 'easeOut' }}
                className={`
                  ${colors.bg} ${colors.border} ${colors.text}
                  backdrop-blur-xl border rounded-xl p-4 shadow-2xl
                  max-w-sm w-full
                `}
              >
                <div className="flex items-start space-x-3">
                  <Icon className={`w-6 h-6 ${colors.icon} flex-shrink-0 mt-0.5`} />
                  
                  <div className="flex-1 min-w-0">
                    <h4 className="font-semibold text-white text-sm">
                      {toast.title}
                    </h4>
                    {toast.message && (
                      <p className="text-sm opacity-90 mt-1">
                        {toast.message}
                      </p>
                    )}
                    
                    {toast.action && (
                      <button
                        onClick={toast.action.onClick}
                        className="text-sm font-medium underline hover:no-underline mt-2 opacity-90 hover:opacity-100 transition-opacity"
                      >
                        {toast.action.label}
                      </button>
                    )}
                  </div>
                  
                  <button
                    onClick={() => removeToast(toast.id)}
                    className="text-white/60 hover:text-white transition-colors p-1"
                  >
                    <XMarkIcon className="w-4 h-4" />
                  </button>
                </div>
              </motion.div>
            );
          })}
        </AnimatePresence>
      </div>
    </ToastContext.Provider>
  );
}

export function useToast() {
  const context = useContext(ToastContext);
  if (context === undefined) {
    throw new Error('useToast must be used within a ToastProvider');
  }
  return context;
}

// Convenience hooks for different toast types
export function useToastHelpers() {
  const { showToast } = useToast();

  return {
    showSuccess: (title: string, message?: string, action?: Toast['action']) =>
      showToast({ type: 'success', title, message, action }),
    
    showError: (title: string, message?: string, action?: Toast['action']) =>
      showToast({ type: 'error', title, message, action }),
    
    showWarning: (title: string, message?: string, action?: Toast['action']) =>
      showToast({ type: 'warning', title, message, action }),
    
    showInfo: (title: string, message?: string, action?: Toast['action']) =>
      showToast({ type: 'info', title, message, action }),
  };
}