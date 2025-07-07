// =============================================================================
// KAIROS FRONTEND - ERROR BOUNDARY COMPONENT
// =============================================================================
// Author: Sankhadeep Banerjee
// Project: Kairos - Marketing Decisioning Solution
// File: src/components/ui/ErrorBoundary.tsx
// =============================================================================

import React, { Component, ErrorInfo, ReactNode } from 'react';
import { motion } from 'framer-motion';
import {
  ExclamationTriangleIcon,
  ArrowPathIcon,
  HomeIcon,
  BugAntIcon,
} from '@heroicons/react/24/outline';

interface Props {
  children: ReactNode;
  fallback?: ReactNode;
  onError?: (error: Error, errorInfo: ErrorInfo) => void;
}

interface State {
  hasError: boolean;
  error: Error | null;
  errorInfo: ErrorInfo | null;
}

export class ErrorBoundary extends Component<Props, State> {
  public state: State = {
    hasError: false,
    error: null,
    errorInfo: null,
  };

  public static getDerivedStateFromError(error: Error): State {
    return {
      hasError: true,
      error,
      errorInfo: null,
    };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('ErrorBoundary caught an error:', error, errorInfo);
    
    this.setState({
      error,
      errorInfo,
    });

    // Call custom error handler if provided
    if (this.props.onError) {
      this.props.onError(error, errorInfo);
    }

    // In production, send error to monitoring service
    if (import.meta.env.PROD) {
      // TODO: Send to error monitoring service (Sentry, LogRocket, etc.)
      console.log('Send error to monitoring service:', {
        error: error.toString(),
        stack: error.stack,
        componentStack: errorInfo.componentStack,
        timestamp: new Date().toISOString(),
        userAgent: navigator.userAgent,
        url: window.location.href,
      });
    }
  }

  private handleRetry = () => {
    this.setState({
      hasError: false,
      error: null,
      errorInfo: null,
    });
  };

  private handleGoHome = () => {
    window.location.href = '/dashboard';
  };

  private handleReportBug = () => {
    const { error, errorInfo } = this.state;
    const subject = encodeURIComponent('Kairos Frontend Error Report');
    const body = encodeURIComponent(`
Error Details:
- Error: ${error?.toString() || 'Unknown error'}
- Stack: ${error?.stack || 'No stack trace'}
- Component Stack: ${errorInfo?.componentStack || 'No component stack'}
- Timestamp: ${new Date().toISOString()}
- URL: ${window.location.href}
- User Agent: ${navigator.userAgent}

Please describe what you were doing when this error occurred:
[Your description here]
    `);
    
    window.open(`mailto:support@kairos-platform.com?subject=${subject}&body=${body}`);
  };

  public render() {
    if (this.state.hasError) {
      // Custom fallback UI
      if (this.props.fallback) {
        return this.props.fallback;
      }

      // Default error UI
      return (
        <div className="min-h-screen bg-gray-950 flex items-center justify-center p-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="max-w-2xl w-full"
          >
            <div className="bg-gray-900/50 backdrop-blur-xl border border-gray-800 rounded-2xl p-8 text-center">
              {/* Error Icon */}
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.2 }}
                className="w-20 h-20 mx-auto mb-6 bg-red-500/20 rounded-full flex items-center justify-center"
              >
                <ExclamationTriangleIcon className="w-10 h-10 text-red-400" />
              </motion.div>

              {/* Error Title */}
              <motion.h1
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.3 }}
                className="text-3xl font-bold text-white mb-4"
              >
                Oops! Something went wrong
              </motion.h1>

              {/* Error Description */}
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.4 }}
                className="text-gray-400 text-lg mb-8"
              >
                We encountered an unexpected error. Our team has been notified and we're working to fix this issue.
              </motion.p>

              {/* Error Details (Development Only) */}
              {import.meta.env.DEV && this.state.error && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.5 }}
                  className="mb-8 p-4 bg-red-500/10 border border-red-500/20 rounded-xl text-left"
                >
                  <h3 className="text-red-400 font-semibold mb-2">Error Details (Development)</h3>
                  <div className="text-sm text-gray-300 space-y-2">
                    <div>
                      <strong>Error:</strong> {this.state.error.toString()}
                    </div>
                    {this.state.error.stack && (
                      <div>
                        <strong>Stack Trace:</strong>
                        <pre className="mt-1 text-xs bg-gray-900/50 p-2 rounded overflow-x-auto">
                          {this.state.error.stack}
                        </pre>
                      </div>
                    )}
                  </div>
                </motion.div>
              )}

              {/* Action Buttons */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6 }}
                className="flex flex-col sm:flex-row gap-4 justify-center"
              >
                <button
                  onClick={this.handleRetry}
                  className="px-6 py-3 bg-gradient-to-r from-primary to-secondary text-white font-medium rounded-xl hover:opacity-90 transition-opacity flex items-center justify-center"
                >
                  <ArrowPathIcon className="w-5 h-5 mr-2" />
                  Try Again
                </button>

                <button
                  onClick={this.handleGoHome}
                  className="px-6 py-3 bg-gray-800/50 text-gray-300 border border-gray-700 font-medium rounded-xl hover:bg-gray-700/50 transition-colors flex items-center justify-center"
                >
                  <HomeIcon className="w-5 h-5 mr-2" />
                  Go to Dashboard
                </button>

                <button
                  onClick={this.handleReportBug}
                  className="px-6 py-3 bg-yellow-500/20 text-yellow-400 border border-yellow-500/30 font-medium rounded-xl hover:bg-yellow-500/30 transition-colors flex items-center justify-center"
                >
                  <BugAntIcon className="w-5 h-5 mr-2" />
                  Report Bug
                </button>
              </motion.div>

              {/* Help Text */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.7 }}
                className="mt-8 pt-6 border-t border-gray-800"
              >
                <p className="text-sm text-gray-500">
                  If this problem persists, please contact our support team at{' '}
                  <a 
                    href="mailto:support@kairos-platform.com" 
                    className="text-primary hover:text-primary/80 transition-colors"
                  >
                    support@kairos-platform.com
                  </a>
                </p>
              </motion.div>
            </div>
          </motion.div>
        </div>
      );
    }

    return this.props.children;
  }
}

// Functional wrapper for hooks-based components
interface ErrorFallbackProps {
  error: Error;
  resetError: () => void;
}

export function ErrorFallback({ error, resetError }: ErrorFallbackProps) {
  return (
    <div className="min-h-64 flex items-center justify-center p-6">
      <div className="text-center">
        <ExclamationTriangleIcon className="w-12 h-12 text-red-400 mx-auto mb-4" />
        <h3 className="text-lg font-semibold text-white mb-2">Something went wrong</h3>
        <p className="text-gray-400 mb-4">
          {error.message || 'An unexpected error occurred'}
        </p>
        <button
          onClick={resetError}
          className="px-4 py-2 bg-primary/20 text-primary border border-primary/30 rounded-xl hover:bg-primary/30 transition-colors"
        >
          Try again
        </button>
      </div>
    </div>
  );
}

export default ErrorBoundary;