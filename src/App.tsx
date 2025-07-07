// =============================================================================
// KAIROS FRONTEND - FIXED MAIN APP COMPONENT
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

// Import components directly instead of lazy loading for now
import Dashboard from '@/pages/Dashboard';
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
      cacheTime: 10 * 60 * 1000, // 10 minutes
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