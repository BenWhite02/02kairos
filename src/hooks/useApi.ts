// =============================================================================
// KAIROS FRONTEND - MOCK API SERVICES (Development)
// =============================================================================
// Author: Sankhadeep Banerjee
// Project: Kairos - Marketing Decisioning Solution
// File: src/hooks/useApi.ts
// =============================================================================

import { useQuery } from '@tanstack/react-query';

// Mock data for development
const mockDashboardData = {
  analytics: {
    overview: {
      totalCampaigns: 24,
      activeCampaigns: 8,
      totalRevenue: 2100000,
      avgConversionRate: 3.24,
      totalDecisions: 1200000,
      systemUptime: 99.9,
    }
  },
  activeCampaigns: [
    {
      id: 1,
      name: 'Q4 Customer Acquisition',
      status: 'active',
      performance: { ctr: 2.84, conversions: 3420, revenue: 284600, roas: 9.1 }
    },
    {
      id: 2,
      name: 'Premium Upsell Campaign', 
      status: 'active',
      performance: { ctr: 4.12, conversions: 1890, revenue: 156300, roas: 7.8 }
    }
  ]
};

const mockRealTimeMetrics = {
  activeUsers: 1247,
  decisionsPerSecond: 85,
  responseTime: 12,
  errorRate: 0.001
};

// Mock hooks that match the expected API
export function useDashboardData() {
  return {
    analytics: mockDashboardData.analytics,
    activeCampaigns: mockDashboardData.activeCampaigns,
    isLoading: false,
    error: null
  };
}

export function useRealTimeMetrics() {
  return useQuery({
    queryKey: ['realTimeMetrics'],
    queryFn: () => Promise.resolve(mockRealTimeMetrics),
    refetchInterval: 10000, // Refetch every 10 seconds
  });
}

// Other required hooks with mock implementations
export function useAtoms() {
  return { data: { data: [] }, isLoading: false };
}

export function useSystemHealth() {
  return { data: { status: 'healthy' }, isLoading: false };
}

export function useLogin() {
  return { mutate: () => {}, isLoading: false };
}

export function useLogout() {
  return { mutate: () => {}, isLoading: false };
}

// Add other hooks as needed...
export function useValidateToken() { return { data: true, isLoading: false }; }
export function useCampaigns() { return { data: { data: [] }, isLoading: false }; }
export function useMoments() { return { data: { data: [] }, isLoading: false }; }
export function useAnalytics() { return { data: null, isLoading: false }; }
