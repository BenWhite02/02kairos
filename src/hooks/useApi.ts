// =============================================================================
// KAIROS FRONTEND - API HOOKS
// =============================================================================
// Author: Sankhadeep Banerjee
// Project: Kairos - Marketing Decisioning Solution
// File: src/hooks/useApi.ts
// Purpose: API integration hooks with mock data for development
// =============================================================================

import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { useState, useEffect } from 'react';

// ============================================================================
// TYPE DEFINITIONS
// ============================================================================

export interface DashboardAnalytics {
  overview: {
    totalCampaigns: number;
    totalDecisions: number;
    avgConversionRate: number;
    totalRevenue: number;
  };
  performance: {
    clickThroughRate: number;
    conversionRate: number;
    revenuePerUser: number;
    customerLifetimeValue: number;
  };
  growth: {
    campaignGrowth: number;
    revenueGrowth: number;
    userGrowth: number;
  };
}

export interface RealTimeMetrics {
  activeUsers: number;
  decisionsPerSecond: number;
  responseTime: number;
  errorRate: number;
  throughput: number;
  lastUpdated: string;
}

export interface Campaign {
  id: string;
  name: string;
  status: 'active' | 'paused' | 'completed' | 'draft';
  type: string;
  startDate: string;
  endDate?: string;
  performance: {
    ctr: number;
    conversions: number;
    revenue: number;
    roas: number;
    impressions: number;
    clicks: number;
  };
  budget: {
    total: number;
    spent: number;
    remaining: number;
  };
  targeting: {
    audience: string[];
    demographics: Record<string, any>;
    locations: string[];
  };
}

export interface EligibilityAtom {
  id: string;
  name: string;
  description: string;
  type: 'demographic' | 'behavioral' | 'contextual' | 'custom';
  status: 'active' | 'inactive' | 'testing';
  rules: {
    conditions: Array<{
      field: string;
      operator: string;
      value: any;
    }>;
    logic: 'AND' | 'OR';
  };
  performance: {
    usage: number;
    successRate: number;
    avgExecutionTime: number;
  };
  createdAt: string;
  updatedAt: string;
}

// ============================================================================
// MOCK DATA
// ============================================================================

const mockDashboardData: DashboardAnalytics = {
  overview: {
    totalCampaigns: 24,
    totalDecisions: 1_247_892,
    avgConversionRate: 3.24,
    totalRevenue: 2_184_600,
  },
  performance: {
    clickThroughRate: 2.8,
    conversionRate: 3.24,
    revenuePerUser: 167.50,
    customerLifetimeValue: 892.30,
  },
  growth: {
    campaignGrowth: 12.4,
    revenueGrowth: 18.7,
    userGrowth: 8.9,
  },
};

const mockRealTimeMetrics: RealTimeMetrics = {
  activeUsers: 1247,
  decisionsPerSecond: 85,
  responseTime: 12,
  errorRate: 0.001,
  throughput: 98.7,
  lastUpdated: new Date().toISOString(),
};

const mockCampaigns: Campaign[] = [
  {
    id: '1',
    name: 'Q4 Customer Acquisition',
    status: 'active',
    type: 'acquisition',
    startDate: '2024-10-01',
    endDate: '2024-12-31',
    performance: {
      ctr: 2.84,
      conversions: 3420,
      revenue: 284600,
      roas: 9.1,
      impressions: 1_250_000,
      clicks: 35500,
    },
    budget: {
      total: 50000,
      spent: 32000,
      remaining: 18000,
    },
    targeting: {
      audience: ['high-value-customers', 'lookalike-audience'],
      demographics: { age: '25-45', income: 'high' },
      locations: ['US', 'CA', 'UK'],
    },
  },
  {
    id: '2',
    name: 'Premium Upsell Campaign',
    status: 'active',
    type: 'upsell',
    startDate: '2024-11-01',
    endDate: '2024-12-15',
    performance: {
      ctr: 4.12,
      conversions: 1890,
      revenue: 156300,
      roas: 7.8,
      impressions: 650_000,
      clicks: 26780,
    },
    budget: {
      total: 25000,
      spent: 18500,
      remaining: 6500,
    },
    targeting: {
      audience: ['existing-customers', 'premium-prospects'],
      demographics: { age: '30-55', income: 'high' },
      locations: ['US', 'CA'],
    },
  },
  {
    id: '3',
    name: 'Retention Optimization',
    status: 'paused',
    type: 'retention',
    startDate: '2024-09-15',
    endDate: '2024-11-30',
    performance: {
      ctr: 1.95,
      conversions: 967,
      revenue: 89400,
      roas: 5.2,
      impressions: 450_000,
      clicks: 8775,
    },
    budget: {
      total: 20000,
      spent: 17200,
      remaining: 2800,
    },
    targeting: {
      audience: ['at-risk-customers', 'churned-customers'],
      demographics: { age: '25-65', income: 'all' },
      locations: ['US', 'CA', 'UK', 'AU'],
    },
  },
];

const mockEligibilityAtoms: EligibilityAtom[] = [
  {
    id: '1',
    name: 'High Value Customer',
    description: 'Customers with CLV > $500',
    type: 'behavioral',
    status: 'active',
    rules: {
      conditions: [
        { field: 'customerLifetimeValue', operator: '>', value: 500 },
        { field: 'purchaseFrequency', operator: '>=', value: 3 },
      ],
      logic: 'AND',
    },
    performance: {
      usage: 15420,
      successRate: 94.2,
      avgExecutionTime: 8.5,
    },
    createdAt: '2024-08-15T10:30:00Z',
    updatedAt: '2024-11-20T14:22:00Z',
  },
  {
    id: '2',
    name: 'Geographic Targeting - Urban',
    description: 'Users in major metropolitan areas',
    type: 'demographic',
    status: 'active',
    rules: {
      conditions: [
        { field: 'location.populationDensity', operator: '>', value: 1000 },
        { field: 'location.type', operator: '=', value: 'urban' },
      ],
      logic: 'AND',
    },
    performance: {
      usage: 28900,
      successRate: 87.6,
      avgExecutionTime: 3.2,
    },
    createdAt: '2024-09-01T09:15:00Z',
    updatedAt: '2024-11-18T16:45:00Z',
  },
];

// ============================================================================
// API SIMULATION FUNCTIONS
// ============================================================================

const simulateApiCall = <T>(data: T, delay: number = 1000): Promise<T> => {
  return new Promise((resolve) => {
    setTimeout(() => resolve(data), delay);
  });
};

const generateRandomMetrics = (): RealTimeMetrics => ({
  activeUsers: Math.floor(Math.random() * 500) + 1000,
  decisionsPerSecond: Math.floor(Math.random() * 50) + 70,
  responseTime: Math.floor(Math.random() * 20) + 5,
  errorRate: Math.random() * 0.01,
  throughput: Math.random() * 10 + 95,
  lastUpdated: new Date().toISOString(),
});

// ============================================================================
// DASHBOARD HOOKS
// ============================================================================

export const useDashboardData = () => {
  const {
    data: analytics,
    isLoading,
    error,
  } = useQuery({
    queryKey: ['dashboard-analytics'],
    queryFn: () => simulateApiCall(mockDashboardData, 800),
    staleTime: 5 * 60 * 1000, // 5 minutes
    gcTime: 10 * 60 * 1000, // 10 minutes
  });

  const {
    data: activeCampaigns = [],
    isLoading: campaignsLoading,
  } = useQuery({
    queryKey: ['active-campaigns'],
    queryFn: () => simulateApiCall(mockCampaigns.filter(c => c.status === 'active'), 600),
    staleTime: 2 * 60 * 1000, // 2 minutes
  });

  return {
    analytics,
    activeCampaigns,
    isLoading: isLoading || campaignsLoading,
    error,
  };
};

export const useRealTimeMetrics = () => {
  const [data, setData] = useState<RealTimeMetrics>(mockRealTimeMetrics);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulate initial load
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 500);

    // Update metrics every 5 seconds
    const interval = setInterval(() => {
      setData(generateRandomMetrics());
    }, 5000);

    return () => {
      clearTimeout(timer);
      clearInterval(interval);
    };
  }, []);

  return { data, isLoading };
};

// ============================================================================
// CAMPAIGN HOOKS
// ============================================================================

export const useCampaigns = () => {
  return useQuery({
    queryKey: ['campaigns'],
    queryFn: () => simulateApiCall(mockCampaigns),
    staleTime: 5 * 60 * 1000,
  });
};

export const useCampaign = (id: string) => {
  return useQuery({
    queryKey: ['campaign', id],
    queryFn: () => {
      const campaign = mockCampaigns.find(c => c.id === id);
      if (!campaign) throw new Error('Campaign not found');
      return simulateApiCall(campaign);
    },
    enabled: !!id,
  });
};

export const useCreateCampaign = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (newCampaign: Omit<Campaign, 'id'>) => {
      const campaign = {
        ...newCampaign,
        id: Math.random().toString(36).substr(2, 9),
      };
      return simulateApiCall(campaign, 1500);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['campaigns'] });
      queryClient.invalidateQueries({ queryKey: ['dashboard-analytics'] });
    },
  });
};

export const useUpdateCampaign = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ id, updates }: { id: string; updates: Partial<Campaign> }) => {
      const updatedCampaign = { ...mockCampaigns.find(c => c.id === id), ...updates };
      return simulateApiCall(updatedCampaign, 1000);
    },
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ['campaigns'] });
      queryClient.invalidateQueries({ queryKey: ['campaign', data.id] });
    },
  });
};

// ============================================================================
// ELIGIBILITY ATOMS HOOKS
// ============================================================================

export const useEligibilityAtoms = () => {
  return useQuery({
    queryKey: ['eligibility-atoms'],
    queryFn: () => simulateApiCall(mockEligibilityAtoms),
    staleTime: 10 * 60 * 1000, // 10 minutes
  });
};

export const useEligibilityAtom = (id: string) => {
  return useQuery({
    queryKey: ['eligibility-atom', id],
    queryFn: () => {
      const atom = mockEligibilityAtoms.find(a => a.id === id);
      if (!atom) throw new Error('Eligibility atom not found');
      return simulateApiCall(atom);
    },
    enabled: !!id,
  });
};

export const useCreateEligibilityAtom = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (newAtom: Omit<EligibilityAtom, 'id' | 'createdAt' | 'updatedAt'>) => {
      const atom = {
        ...newAtom,
        id: Math.random().toString(36).substr(2, 9),
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      };
      return simulateApiCall(atom, 1200);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['eligibility-atoms'] });
    },
  });
};

export const useUpdateEligibilityAtom = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ id, updates }: { id: string; updates: Partial<EligibilityAtom> }) => {
      const updatedAtom = {
        ...mockEligibilityAtoms.find(a => a.id === id),
        ...updates,
        updatedAt: new Date().toISOString(),
      };
      return simulateApiCall(updatedAtom, 1000);
    },
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ['eligibility-atoms'] });
      queryClient.invalidateQueries({ queryKey: ['eligibility-atom', data.id] });
    },
  });
};

// ============================================================================
// ANALYTICS HOOKS
// ============================================================================

export const useAnalytics = (timeframe: string = '7d') => {
  return useQuery({
    queryKey: ['analytics', timeframe],
    queryFn: () => {
      // Generate analytics data based on timeframe
      const baseData = mockDashboardData;
      const multiplier = timeframe === '24h' ? 0.1 : timeframe === '30d' ? 3 : 1;
      
      return simulateApiCall({
        ...baseData,
        overview: {
          ...baseData.overview,
          totalDecisions: Math.floor(baseData.overview.totalDecisions * multiplier),
          totalRevenue: Math.floor(baseData.overview.totalRevenue * multiplier),
        },
      });
    },
    staleTime: 2 * 60 * 1000, // 2 minutes
  });
};

export const useCampaignAnalytics = (campaignId: string, timeframe: string = '7d') => {
  return useQuery({
    queryKey: ['campaign-analytics', campaignId, timeframe],
    queryFn: () => {
      const campaign = mockCampaigns.find(c => c.id === campaignId);
      if (!campaign) throw new Error('Campaign not found');
      
      // Generate detailed analytics for the campaign
      return simulateApiCall({
        campaignId,
        timeframe,
        metrics: {
          impressions: campaign.performance.impressions,
          clicks: campaign.performance.clicks,
          conversions: campaign.performance.conversions,
          revenue: campaign.performance.revenue,
          cost: campaign.budget.spent,
        },
        trends: {
          daily: Array.from({ length: 30 }, (_, i) => ({
            date: new Date(Date.now() - (29 - i) * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
            impressions: Math.floor(Math.random() * 10000) + 5000,
            clicks: Math.floor(Math.random() * 500) + 100,
            conversions: Math.floor(Math.random() * 50) + 10,
            revenue: Math.floor(Math.random() * 5000) + 1000,
          })),
        },
      });
    },
    enabled: !!campaignId,
    staleTime: 5 * 60 * 1000,
  });
};

// ============================================================================
// SYSTEM HEALTH HOOKS
// ============================================================================

export const useSystemHealth = () => {
  const [healthData, setHealthData] = useState({
    overall: 'healthy',
    components: [
      { name: 'Decision Engine', status: 'healthy', response: 12, uptime: 99.9 },
      { name: 'Analytics Service', status: 'healthy', response: 45, uptime: 99.8 },
      { name: 'Database', status: 'healthy', response: 8, uptime: 100 },
      { name: 'Cache Layer', status: 'warning', response: 156, uptime: 98.5 },
      { name: 'API Gateway', status: 'healthy', response: 23, uptime: 99.7 },
    ],
  });

  useEffect(() => {
    const interval = setInterval(() => {
      setHealthData(prev => ({
        ...prev,
        components: prev.components.map(component => ({
          ...component,
          response: component.response + Math.floor(Math.random() * 10) - 5,
          uptime: Math.max(95, component.uptime + (Math.random() - 0.5) * 0.1),
        })),
      }));
    }, 10000); // Update every 10 seconds

    return () => clearInterval(interval);
  }, []);

  return { data: healthData, isLoading: false };
};

// ============================================================================
// EXPORT ALL HOOKS
// ============================================================================

export default {
  useDashboardData,
  useRealTimeMetrics,
  useCampaigns,
  useCampaign,
  useCreateCampaign,
  useUpdateCampaign,
  useEligibilityAtoms,
  useEligibilityAtom,
  useCreateEligibilityAtom,
  useUpdateEligibilityAtom,
  useAnalytics,
  useCampaignAnalytics,
  useSystemHealth,
};