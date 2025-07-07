// =============================================================================
// KAIROS FRONTEND - LOADING SPINNER COMPONENT
// =============================================================================
// Author: Sankhadeep Banerjee
// Project: Kairos - Marketing Decisioning Solution
// File: src/components/ui/LoadingSpinner.tsx
// =============================================================================

import React from 'react';
import { motion } from 'framer-motion';
import { ClockIcon } from '@heroicons/react/24/outline';

interface LoadingSpinnerProps {
  size?: 'sm' | 'md' | 'lg' | 'xl';
  variant?: 'default' | 'minimal' | 'branded';
  message?: string;
  className?: string;
}

export function LoadingSpinner({ 
  size = 'md', 
  variant = 'default', 
  message,
  className = '' 
}: LoadingSpinnerProps) {
  const getSizeClasses = () => {
    switch (size) {
      case 'sm':
        return 'w-4 h-4';
      case 'md':
        return 'w-8 h-8';
      case 'lg':
        return 'w-12 h-12';
      case 'xl':
        return 'w-16 h-16';
      default:
        return 'w-8 h-8';
    }
  };

  const getMessageSize = () => {
    switch (size) {
      case 'sm':
        return 'text-xs';
      case 'md':
        return 'text-sm';
      case 'lg':
        return 'text-base';
      case 'xl':
        return 'text-lg';
      default:
        return 'text-sm';
    }
  };

  if (variant === 'minimal') {
    return (
      <div className={`inline-flex items-center ${className}`}>
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
          className={`border-2 border-primary border-t-transparent rounded-full ${getSizeClasses()}`}
        />
        {message && (
          <span className={`ml-2 text-gray-400 ${getMessageSize()}`}>
            {message}
          </span>
        )}
      </div>
    );
  }

  if (variant === 'branded') {
    return (
      <div className={`flex flex-col items-center space-y-4 ${className}`}>
        <div className="relative">
          {/* Outer ring */}
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 2, repeat: Infinity, ease: 'linear' }}
            className={`border-2 border-primary/20 border-t-primary rounded-full ${getSizeClasses()}`}
          />
          
          {/* Inner Kairos logo */}
          <motion.div
            animate={{ rotate: -360 }}
            transition={{ duration: 1.5, repeat: Infinity, ease: 'linear' }}
            className="absolute inset-0 flex items-center justify-center"
          >
            <ClockIcon className="w-1/2 h-1/2 text-primary" />
          </motion.div>
        </div>
        
        {message && (
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className={`text-gray-300 ${getMessageSize()} text-center`}
          >
            {message}
          </motion.p>
        )}
      </div>
    );
  }

  // Default variant
  return (
    <div className={`flex flex-col items-center space-y-3 ${className}`}>
      <div className="relative">
        {/* Primary spinner */}
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
          className={`border-2 border-primary/30 border-t-primary rounded-full ${getSizeClasses()}`}
        />
        
        {/* Secondary ring */}
        <motion.div
          animate={{ rotate: -360 }}
          transition={{ duration: 1.5, repeat: Infinity, ease: 'linear' }}
          className={`absolute inset-1 border border-secondary/20 border-b-secondary rounded-full`}
        />
      </div>
      
      {message && (
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className={`text-gray-400 ${getMessageSize()} text-center`}
        >
          {message}
        </motion.p>
      )}
    </div>
  );
}

// Full screen loading overlay
interface LoadingOverlayProps {
  message?: string;
  transparent?: boolean;
}

export function LoadingOverlay({ message = 'Loading...', transparent = false }: LoadingOverlayProps) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className={`
        fixed inset-0 z-50 flex items-center justify-center
        ${transparent ? 'bg-black/50' : 'bg-gray-950'}
        backdrop-blur-sm
      `}
    >
      <LoadingSpinner size="xl" variant="branded" message={message} />
    </motion.div>
  );
}

// Inline loading for buttons
interface ButtonLoadingProps {
  loading?: boolean;
  children: React.ReactNode;
  className?: string;
}

export function ButtonLoading({ loading = false, children, className = '' }: ButtonLoadingProps) {
  return (
    <span className={`inline-flex items-center ${className}`}>
      {loading && (
        <LoadingSpinner size="sm" variant="minimal" className="mr-2" />
      )}
      {children}
    </span>
  );
}

// Skeleton loading component
interface SkeletonProps {
  className?: string;
  variant?: 'text' | 'rectangular' | 'circular';
  animation?: boolean;
}

export function Skeleton({ 
  className = '', 
  variant = 'rectangular',
  animation = true 
}: SkeletonProps) {
  const baseClasses = 'bg-gray-800/50';
  const animationClasses = animation ? 'loading-skeleton' : '';
  
  const variantClasses = {
    text: 'h-4 rounded',
    rectangular: 'rounded-lg',
    circular: 'rounded-full',
  };

  return (
    <div 
      className={`
        ${baseClasses} 
        ${animationClasses} 
        ${variantClasses[variant]} 
        ${className}
      `}
    />
  );
}

// Loading states for cards
export function CardSkeleton() {
  return (
    <div className="card">
      <div className="space-y-4">
        <Skeleton className="h-6 w-3/4" variant="text" />
        <Skeleton className="h-4 w-full" variant="text" />
        <Skeleton className="h-4 w-2/3" variant="text" />
        <div className="flex space-x-2 mt-4">
          <Skeleton className="h-8 w-20" variant="rectangular" />
          <Skeleton className="h-8 w-20" variant="rectangular" />
        </div>
      </div>
    </div>
  );
}

export default LoadingSpinner;