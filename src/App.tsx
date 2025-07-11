﻿// =============================================================================
// KAIROS FRONTEND - UPDATED APP COMPONENT
// =============================================================================
// Author: Sankhadeep Banerjee
// Project: Kairos - Marketing Decisioning Solution
// File: src/App.tsx
// =============================================================================

import React, { Suspense } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ThemeProvider } from '@/contexts/ThemeContext';
import { ToastProvider } from '@/contexts/ToastContext';
import { LoadingSpinner } from '@/components/ui/LoadingSpinner';
import { ErrorBoundary } from '@/components/ui/ErrorBoundary';

// Import components
import Dashboard from '@/pages/Dashboard';
import AtomLibrary from '@/pages/AtomLibrary';
import MomentManagement from '@/pages/MomentManagement';
import CampaignOverview from '@/pages/CampaignOverview';
import Analytics from '@/pages/Analytics';
import Settings from '@/pages/Settings';
import Login from '@/pages/auth/Login';

// Import providers
import { AuthProvider } from '@/contexts/AuthContext';
import { GlobalLayout } from '@/components/layout/GlobalLayout';

// Create React Query client
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 2,
      staleTime: 5 * 60 * 1000,
      refetchOnWindowFocus: false,
    },
  },
});

function AppRoutes() {
  return (
    <AuthProvider>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/*" element={
          <GlobalLayout>
            <Routes>
              <Route path="/" element={<Dashboard />} />
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/atoms" element={<AtomLibrary />} />
              <Route path="/moments" element={<MomentManagement />} />
              <Route path="/campaigns" element={<CampaignOverview />} />
              <Route path="/analytics" element={<Analytics />} />
              <Route path="/settings" element={<Settings />} />
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
            </Router>
          </ToastProvider>
        </ThemeProvider>
      </QueryClientProvider>
    </ErrorBoundary>
  );
}

export default App;
