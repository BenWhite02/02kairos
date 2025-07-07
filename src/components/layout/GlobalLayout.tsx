// =============================================================================
// KAIROS FRONTEND - GLOBAL LAYOUT COMPONENT
// =============================================================================
// Author: Sankhadeep Banerjee
// Project: Kairos - Marketing Decisioning Solution
// File: src/components/layout/GlobalLayout.tsx
// =============================================================================

import React, { useState } from 'react';
import { Sidebar } from '@/components/layout/Sidebar';
import { Header } from '@/components/layout/Header';
import { useAuth } from '@/contexts/AuthContext';
import { Navigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';

interface GlobalLayoutProps {
  children: React.ReactNode;
}

export function GlobalLayout({ children }: GlobalLayoutProps) {
  const { isAuthenticated, isLoading } = useAuth();
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-950 flex items-center justify-center">
        <div className="flex items-center space-x-3">
          <div className="w-8 h-8 border-2 border-primary border-t-transparent rounded-full animate-spin"></div>
          <span className="text-gray-300 text-lg">Loading Kairos...</span>
        </div>
      </div>
    );
  }

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  return (
    <div className="min-h-screen bg-gray-950 text-gray-100">
      {/* Background Pattern */}
      <div className="fixed inset-0 opacity-5 pointer-events-none">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/20 via-transparent to-secondary/20"></div>
        <div className="absolute inset-0" style={{
          backgroundImage: `radial-gradient(circle at 25% 25%, rgba(0, 217, 255, 0.1) 0%, transparent 50%),
                           radial-gradient(circle at 75% 75%, rgba(255, 107, 157, 0.1) 0%, transparent 50%)`
        }}></div>
      </div>

      <div className="relative flex h-screen overflow-hidden">
        {/* Sidebar */}
        <AnimatePresence mode="wait">
          <motion.div
            key={sidebarCollapsed ? 'collapsed' : 'expanded'}
            initial={{ width: sidebarCollapsed ? 80 : 280 }}
            animate={{ width: sidebarCollapsed ? 80 : 280 }}
            transition={{ duration: 0.3, ease: 'easeInOut' }}
            className="flex-shrink-0 bg-gray-900/80 backdrop-blur-xl border-r border-gray-800"
          >
            <Sidebar 
              collapsed={sidebarCollapsed} 
              onToggle={() => setSidebarCollapsed(!sidebarCollapsed)} 
            />
          </motion.div>
        </AnimatePresence>

        {/* Main Content Area */}
        <div className="flex-1 flex flex-col overflow-hidden">
          {/* Header */}
          <Header sidebarCollapsed={sidebarCollapsed} />

          {/* Main Content */}
          <main className="flex-1 overflow-auto bg-gray-950/50">
            <div className="container mx-auto px-6 py-8">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
              >
                {children}
              </motion.div>
            </div>
          </main>
        </div>
      </div>

      {/* Global Toast Container */}
      <div id="toast-container" className="fixed top-4 right-4 z-50 space-y-2">
        {/* Toast notifications will be rendered here */}
      </div>

      {/* Global Modal Container */}
      <div id="modal-container" className="fixed inset-0 z-40 pointer-events-none">
        {/* Modals will be rendered here */}
      </div>
    </div>
  );
}

export default GlobalLayout;