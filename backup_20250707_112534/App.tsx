// =============================================================================
// KAIROS FRONTEND - UPDATED APP COMPONENT WITH ENHANCED DASHBOARD
// =============================================================================
// Author: Sankhadeep Banerjee
// Project: Kairos - Marketing Decisioning Solution
// File: src/App.tsx
// =============================================================================

import React, { Suspense } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { ThemeProvider } from '@/contexts/ThemeContext';
import { ToastProvider } from '@/contexts/ToastContext';
import { LoadingSpinner } from '@/components/ui/LoadingSpinner';
import { ErrorBoundary } from '@/components/ui/ErrorBoundary';

// Import components directly instead of lazy loading for now
import EnhancedDashboard from '@/pages/EnhancedDashboard';
import AtomLibrary from '@/pages/AtomLibrary';
import MomentManagement from '@/pages/MomentManagement';
import CampaignOverview from '@/pages/CampaignOverview';
import Analytics from '@/pages/Analytics';
import Settings from '@/pages/Settings';
import Login from '@/pages/auth/Login';

// Import the auth provider and layout
import { AuthProvider } from '@/contexts/AuthContext';
import { GlobalLayout } from '@/components/layout/GlobalLayout';

// Create a client for React Query
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 2,
      staleTime: 5 * 60 * 1000, // 5 minutes
      gcTime: 10 * 60 * 1000, // 10 minutes (formerly cacheTime)
      refetchOnWindowFocus: false,
    },
    mutations: {
      retry: 1,
    },
  },
});

// Main App Routes component (this will have access to router context)
function AppRoutes() {
  return (
    <AuthProvider>
      <Routes>
        {/* Auth Routes */}
        <Route path="/login" element={<Login />} />
        
        {/* Protected Routes */}
        <Route path="/*" element={
          <GlobalLayout>
            <Routes>
              {/* Use EnhancedDashboard as the main dashboard */}
              <Route path="/" element={<EnhancedDashboard />} />
              <Route path="/dashboard" element={<EnhancedDashboard />} />
              <Route path="/atoms" element={<AtomLibrary />} />
              <Route path="/moments" element={<MomentManagement />} />
              <Route path="/campaigns" element={<CampaignOverview />} />
              <Route path="/analytics" element={<Analytics />} />
              <Route path="/settings" element={<Settings />} />
              
              {/* Additional routes for enhanced features */}
              <Route path="/atoms/new" element={<AtomLibrary />} />
              <Route path="/atoms/:id" element={<AtomLibrary />} />
              <Route path="/moments/new" element={<MomentManagement />} />
              <Route path="/moments/:id" element={<MomentManagement />} />
              <Route path="/campaigns/new" element={<CampaignOverview />} />
              <Route path="/campaigns/:id" element={<CampaignOverview />} />
            </Routes>
          </GlobalLayout>
        } />
      </Routes>
    </AuthProvider>
  );
}

function App() {
  return (
    <ErrorBoundary>
      <QueryClientProvider client={queryClient}>
        <ThemeProvider>
          <ToastProvider>
            <Router>
              <div className="min-h-screen bg-gray-950 text-gray-100">
                <Suspense fallback={
                  <div className="min-h-screen flex items-center justify-center">
                    <LoadingSpinner size="xl" variant="branded" message="Loading Kairos..." />
                  </div>
                }>
                  <AppRoutes />
                </Suspense>
              </div>
              
              {/* React Query DevTools - only in development */}
              {import.meta.env.DEV && (
                <ReactQueryDevtools 
                  initialIsOpen={false} 
                  position="bottom-right"
                  buttonPosition="bottom-right"
                />
              )}
            </Router>
          </ToastProvider>
        </ThemeProvider>
      </QueryClientProvider>
    </ErrorBoundary>
  );
}

export default App;