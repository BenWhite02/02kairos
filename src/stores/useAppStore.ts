// =============================================================================
// KAIROS FRONTEND - ENHANCED ZUSTAND STATE MANAGEMENT STORE
// =============================================================================
// Author: Sankhadeep Banerjee
// Project: Kairos - Marketing Decisioning Solution
// File: src/stores/useAppStore.ts
// Purpose: Centralized state management for application data
// =============================================================================

import { create } from 'zustand';
import { devtools, persist } from 'zustand/middleware';
import { immer } from 'zustand/middleware/immer';

// ============================================================================
// TYPE DEFINITIONS
// ============================================================================

// EligibilityAtom types
export interface EligibilityAtom {
  id: string;
  name: string;
  type: AtomType;
  category: AtomCategory;
  description: string;
  parameters: Record<string, any>;
  logic: string; // JSON schema for atom logic
  version: string;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
  createdBy: string;
  tags: string[];
  performance?: AtomPerformance;
}

export type AtomType = 
  | 'AgeRangeAtom'
  | 'GeographyAtom' 
  | 'TenureAtom'
  | 'SegmentAtom'
  | 'TimeOfDayAtom'
  | 'DeviceTypeAtom'
  | 'ConsentAtom'
  | 'PurchaseFrequencyAtom'
  | 'EngagementScoreAtom'
  | 'ChurnRiskAtom'
  | 'WeatherImpactAtom'
  | 'BehaviorPatternAtom';

export type AtomCategory = 
  | 'Demographic'
  | 'Behavioral'
  | 'Geographic'
  | 'Temporal'
  | 'Predictive'
  | 'Contextual';

export interface AtomPerformance {
  accuracy: number;
  usage: number;
  lastUsed: string;
  avgResponseTime: number;
}

// Moment types
export interface Moment {
  id: string;
  name: string;
  description: string;
  template: MomentTemplate;
  eligibilityRules: EligibilityRule[];
  content: MomentContent[];
  status: MomentStatus;
  schedule?: MomentSchedule;
  performance?: MomentPerformance;
  createdAt: string;
  updatedAt: string;
  createdBy: string;
}

export type MomentStatus = 'draft' | 'active' | 'paused' | 'archived';

export interface MomentTemplate {
  id: string;
  name: string;
  type: 'email' | 'push' | 'sms' | 'web' | 'in-app';
  structure: Record<string, any>;
}

export interface EligibilityRule {
  id: string;
  atomIds: string[];
  operator: 'AND' | 'OR' | 'NOT';
  conditions: RuleCondition[];
}

export interface RuleCondition {
  atomId: string;
  operator: 'equals' | 'contains' | 'greater_than' | 'less_than' | 'in_range';
  value: any;
  weight?: number;
}

export interface MomentContent {
  id: string;
  variant: string;
  title: string;
  body: string;
  cta?: string;
  assets?: string[];
  personalization?: Record<string, any>;
}

export interface MomentSchedule {
  type: 'immediate' | 'scheduled' | 'trigger_based';
  startDate?: string;
  endDate?: string;
  frequency?: string;
  triggers?: string[];
}

export interface MomentPerformance {
  sent: number;
  delivered: number;
  opened: number;
  clicked: number;
  converted: number;
  revenue: number;
  ctr: number;
  conversionRate: number;
}

// Campaign types
export interface Campaign {
  id: string;
  name: string;
  description: string;
  status: CampaignStatus;
  moments: string[]; // Moment IDs
  targetAudience: AudienceDefinition;
  goals: CampaignGoal[];
  budget?: CampaignBudget;
  performance?: CampaignPerformance;
  optimization?: OptimizationSettings;
  createdAt: string;
  updatedAt: string;
  createdBy: string;
}

export type CampaignStatus = 'draft' | 'active' | 'paused' | 'completed' | 'archived';

export interface AudienceDefinition {
  name: string;
  description: string;
  rules: EligibilityRule[];
  estimatedSize?: number;
}

export interface CampaignGoal {
  type: 'conversion' | 'engagement' | 'revenue' | 'retention';
  target: number;
  unit: string;
  weight: number;
}

export interface CampaignBudget {
  total: number;
  spent: number;
  currency: string;
  period: 'daily' | 'weekly' | 'monthly' | 'total';
}

export interface CampaignPerformance {
  impressions: number;
  clicks: number;
  conversions: number;
  revenue: number;
  cost: number;
  ctr: number;
  cpc: number;
  roas: number;
  conversionRate: number;
}

export interface OptimizationSettings {
  enabled: boolean;
  algorithm: 'multi_armed_bandit' | 'thompson_sampling' | 'ucb' | 'epsilon_greedy';
  trafficAllocation: Record<string, number>;
  minSampleSize: number;
  confidenceLevel: number;
}

// Analytics types
export interface AnalyticsData {
  campaigns: CampaignAnalytics[];
  atoms: AtomAnalytics[];
  moments: MomentAnalytics[];
  overview: OverviewMetrics;
  realTime: RealTimeMetrics;
}

export interface CampaignAnalytics {
  campaignId: string;
  metrics: CampaignPerformance;
  trend: MetricTrend[];
  segments: SegmentPerformance[];
}

export interface AtomAnalytics {
  atomId: string;
  usage: number;
  performance: AtomPerformance;
  trend: MetricTrend[];
  combinations: AtomCombination[];
}

export interface MomentAnalytics {
  momentId: string;
  performance: MomentPerformance;
  trend: MetricTrend[];
  variants: VariantPerformance[];
}

export interface OverviewMetrics {
  totalCampaigns: number;
  activeCampaigns: number;
  totalRevenue: number;
  avgConversionRate: number;
  totalDecisions: number;
  systemUptime: number;
}

export interface RealTimeMetrics {
  activeUsers: number;
  decisionsPerSecond: number;
  responseTime: number;
  errorRate: number;
  lastUpdated: string;
}

export interface MetricTrend {
  date: string;
  value: number;
}

export interface SegmentPerformance {
  segment: string;
  performance: CampaignPerformance;
}

export interface AtomCombination {
  atoms: string[];
  performance: number;
  usage: number;
}

export interface VariantPerformance {
  variant: string;
  performance: MomentPerformance;
}

// UI State types
export interface UIState {
  sidebarCollapsed: boolean;
  selectedTheme: string;
  activeFilters: Record<string, any>;
  searchQuery: string;
  notifications: Notification[];
  modals: Record<string, boolean>;
  loading: Record<string, boolean>;
  errors: Record<string, string>;
}

export interface Notification {
  id: string;
  type: 'success' | 'error' | 'warning' | 'info';
  title: string;
  message: string;
  timestamp: string;
  read: boolean;
  actions?: NotificationAction[];
}

export interface NotificationAction {
  label: string;
  action: () => void;
}

// ============================================================================
// STORE INTERFACE
// ============================================================================

interface AppState {
  // Data
  atoms: EligibilityAtom[];
  moments: Moment[];
  campaigns: Campaign[];
  analytics: AnalyticsData | null;
  
  // UI State
  ui: UIState;
  
  // Actions
  actions: {
    // Atom actions
    addAtom: (atom: Omit<EligibilityAtom, 'id' | 'createdAt' | 'updatedAt'>) => void;
    updateAtom: (id: string, updates: Partial<EligibilityAtom>) => void;
    deleteAtom: (id: string) => void;
    toggleAtomStatus: (id: string) => void;
    
    // Moment actions
    addMoment: (moment: Omit<Moment, 'id' | 'createdAt' | 'updatedAt'>) => void;
    updateMoment: (id: string, updates: Partial<Moment>) => void;
    deleteMoment: (id: string) => void;
    changeMomentStatus: (id: string, status: MomentStatus) => void;
    
    // Campaign actions
    addCampaign: (campaign: Omit<Campaign, 'id' | 'createdAt' | 'updatedAt'>) => void;
    updateCampaign: (id: string, updates: Partial<Campaign>) => void;
    deleteCampaign: (id: string) => void;
    changeCampaignStatus: (id: string, status: CampaignStatus) => void;
    
    // Analytics actions
    setAnalytics: (analytics: AnalyticsData) => void;
    updateAnalytics: (updates: Partial<AnalyticsData>) => void;
    
    // UI actions
    setSidebarCollapsed: (collapsed: boolean) => void;
    setTheme: (theme: string) => void;
    setSearchQuery: (query: string) => void;
    addNotification: (notification: Omit<Notification, 'id' | 'timestamp'>) => void;
    markNotificationRead: (id: string) => void;
    clearNotifications: () => void;
    showModal: (modalId: string) => void;
    hideModal: (modalId: string) => void;
    setLoading: (key: string, loading: boolean) => void;
    setError: (key: string, error: string | null) => void;
    setFilter: (key: string, value: any) => void;
    clearFilters: () => void;
  };
}

// ============================================================================
// ZUSTAND STORE IMPLEMENTATION
// ============================================================================

export const useAppStore = create<AppState>()(
  devtools(
    persist(
      immer((set, get) => ({
        // Initial state
        atoms: [],
        moments: [],
        campaigns: [],
        analytics: null,
        
        ui: {
          sidebarCollapsed: false,
          selectedTheme: 'kairos-deep-black',
          activeFilters: {},
          searchQuery: '',
          notifications: [],
          modals: {},
          loading: {},
          errors: {},
        },
        
        actions: {
          // ============================================================================
          // ATOM ACTIONS
          // ============================================================================
          
          addAtom: (atomData) => set((state) => {
            const newAtom: EligibilityAtom = {
              ...atomData,
              id: `atom_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
              createdAt: new Date().toISOString(),
              updatedAt: new Date().toISOString(),
            };
            state.atoms.push(newAtom);
          }),
          
          updateAtom: (id, updates) => set((state) => {
            const index = state.atoms.findIndex(atom => atom.id === id);
            if (index !== -1) {
              state.atoms[index] = {
                ...state.atoms[index],
                ...updates,
                updatedAt: new Date().toISOString(),
              };
            }
          }),
          
          deleteAtom: (id) => set((state) => {
            state.atoms = state.atoms.filter(atom => atom.id !== id);
          }),
          
          toggleAtomStatus: (id) => set((state) => {
            const atom = state.atoms.find(atom => atom.id === id);
            if (atom) {
              atom.isActive = !atom.isActive;
              atom.updatedAt = new Date().toISOString();
            }
          }),
          
          // ============================================================================
          // MOMENT ACTIONS
          // ============================================================================
          
          addMoment: (momentData) => set((state) => {
            const newMoment: Moment = {
              ...momentData,
              id: `moment_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
              createdAt: new Date().toISOString(),
              updatedAt: new Date().toISOString(),
            };
            state.moments.push(newMoment);
          }),
          
          updateMoment: (id, updates) => set((state) => {
            const index = state.moments.findIndex(moment => moment.id === id);
            if (index !== -1) {
              state.moments[index] = {
                ...state.moments[index],
                ...updates,
                updatedAt: new Date().toISOString(),
              };
            }
          }),
          
          deleteMoment: (id) => set((state) => {
            state.moments = state.moments.filter(moment => moment.id !== id);
          }),
          
          changeMomentStatus: (id, status) => set((state) => {
            const moment = state.moments.find(moment => moment.id === id);
            if (moment) {
              moment.status = status;
              moment.updatedAt = new Date().toISOString();
            }
          }),
          
          // ============================================================================
          // CAMPAIGN ACTIONS
          // ============================================================================
          
          addCampaign: (campaignData) => set((state) => {
            const newCampaign: Campaign = {
              ...campaignData,
              id: `campaign_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
              createdAt: new Date().toISOString(),
              updatedAt: new Date().toISOString(),
            };
            state.campaigns.push(newCampaign);
          }),
          
          updateCampaign: (id, updates) => set((state) => {
            const index = state.campaigns.findIndex(campaign => campaign.id === id);
            if (index !== -1) {
              state.campaigns[index] = {
                ...state.campaigns[index],
                ...updates,
                updatedAt: new Date().toISOString(),
              };
            }
          }),
          
          deleteCampaign: (id) => set((state) => {
            state.campaigns = state.campaigns.filter(campaign => campaign.id !== id);
          }),
          
          changeCampaignStatus: (id, status) => set((state) => {
            const campaign = state.campaigns.find(campaign => campaign.id === id);
            if (campaign) {
              campaign.status = status;
              campaign.updatedAt = new Date().toISOString();
            }
          }),
          
          // ============================================================================
          // ANALYTICS ACTIONS
          // ============================================================================
          
          setAnalytics: (analytics) => set((state) => {
            state.analytics = analytics;
          }),
          
          updateAnalytics: (updates) => set((state) => {
            if (state.analytics) {
              state.analytics = { ...state.analytics, ...updates };
            }
          }),
          
          // ============================================================================
          // UI ACTIONS
          // ============================================================================
          
          setSidebarCollapsed: (collapsed) => set((state) => {
            state.ui.sidebarCollapsed = collapsed;
          }),
          
          setTheme: (theme) => set((state) => {
            state.ui.selectedTheme = theme;
          }),
          
          setSearchQuery: (query) => set((state) => {
            state.ui.searchQuery = query;
          }),
          
          addNotification: (notificationData) => set((state) => {
            const notification: Notification = {
              ...notificationData,
              id: `notification_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
              timestamp: new Date().toISOString(),
              read: false,
            };
            state.ui.notifications.unshift(notification);
            
            // Keep only last 50 notifications
            if (state.ui.notifications.length > 50) {
              state.ui.notifications = state.ui.notifications.slice(0, 50);
            }
          }),
          
          markNotificationRead: (id) => set((state) => {
            const notification = state.ui.notifications.find(n => n.id === id);
            if (notification) {
              notification.read = true;
            }
          }),
          
          clearNotifications: () => set((state) => {
            state.ui.notifications = [];
          }),
          
          showModal: (modalId) => set((state) => {
            state.ui.modals[modalId] = true;
          }),
          
          hideModal: (modalId) => set((state) => {
            state.ui.modals[modalId] = false;
          }),
          
          setLoading: (key, loading) => set((state) => {
            if (loading) {
              state.ui.loading[key] = true;
            } else {
              delete state.ui.loading[key];
            }
          }),
          
          setError: (key, error) => set((state) => {
            if (error) {
              state.ui.errors[key] = error;
            } else {
              delete state.ui.errors[key];
            }
          }),
          
          setFilter: (key, value) => set((state) => {
            if (value === null || value === undefined || value === '') {
              delete state.ui.activeFilters[key];
            } else {
              state.ui.activeFilters[key] = value;
            }
          }),
          
          clearFilters: () => set((state) => {
            state.ui.activeFilters = {};
          }),
        },
      })),
      {
        name: 'kairos-app-store',
        partialize: (state) => ({
          atoms: state.atoms,
          moments: state.moments,
          campaigns: state.campaigns,
          ui: {
            sidebarCollapsed: state.ui.sidebarCollapsed,
            selectedTheme: state.ui.selectedTheme,
            notifications: state.ui.notifications.slice(0, 10), // Persist only recent notifications
          },
        }),
      }
    ),
    {
      name: 'kairos-app-store',
    }
  )
);

// ============================================================================
// HELPER HOOKS
// ============================================================================

// Atom-related hooks
export const useAtoms = () => useAppStore((state) => state.atoms);
export const useAtomActions = () => useAppStore((state) => state.actions);
export const useAtomById = (id: string) => useAppStore((state) => 
  state.atoms.find(atom => atom.id === id)
);
export const useAtomsByCategory = (category: AtomCategory) => useAppStore((state) => 
  state.atoms.filter(atom => atom.category === category)
);

// Moment-related hooks
export const useMoments = () => useAppStore((state) => state.moments);
export const useMomentById = (id: string) => useAppStore((state) => 
  state.moments.find(moment => moment.id === id)
);
export const useActiveMoments = () => useAppStore((state) => 
  state.moments.filter(moment => moment.status === 'active')
);

// Campaign-related hooks
export const useCampaigns = () => useAppStore((state) => state.campaigns);
export const useCampaignById = (id: string) => useAppStore((state) => 
  state.campaigns.find(campaign => campaign.id === id)
);
export const useActiveCampaigns = () => useAppStore((state) => 
  state.campaigns.filter(campaign => campaign.status === 'active')
);

// Analytics hooks
export const useAnalytics = () => useAppStore((state) => state.analytics);
export const useRealTimeMetrics = () => useAppStore((state) => 
  state.analytics?.realTime
);

// UI hooks
export const useUIState = () => useAppStore((state) => state.ui);
export const useNotifications = () => useAppStore((state) => state.ui.notifications);
export const useUnreadNotifications = () => useAppStore((state) => 
  state.ui.notifications.filter(n => !n.read)
);
export const useLoading = (key?: string) => useAppStore((state) => 
  key ? state.ui.loading[key] || false : Object.keys(state.ui.loading).length > 0
);
export const useError = (key: string) => useAppStore((state) => 
  state.ui.errors[key] || null
);

// ============================================================================
// SELECTOR HELPERS
// ============================================================================

export const selectAtomsByType = (type: AtomType) => (state: AppState) =>
  state.atoms.filter(atom => atom.type === type);

export const selectCampaignPerformance = (state: AppState) =>
  state.campaigns.map(campaign => ({
    id: campaign.id,
    name: campaign.name,
    performance: campaign.performance,
  }));

export const selectTopPerformingAtoms = (limit = 10) => (state: AppState) =>
  state.atoms
    .filter(atom => atom.performance)
    .sort((a, b) => (b.performance?.accuracy || 0) - (a.performance?.accuracy || 0))
    .slice(0, limit);

// ============================================================================
// INITIALIZATION AND MOCK DATA
// ============================================================================

export const initializeMockData = () => {
  const { actions } = useAppStore.getState();
  
  // Add mock atoms
  const mockAtoms: Omit<EligibilityAtom, 'id' | 'createdAt' | 'updatedAt'>[] = [
    {
      name: 'Age Range 25-35',
      type: 'AgeRangeAtom',
      category: 'Demographic',
      description: 'Targets users between 25 and 35 years old',
      parameters: { minAge: 25, maxAge: 35 },
      logic: JSON.stringify({ type: 'range', field: 'age', min: 25, max: 35 }),
      version: '1.0.0',
      isActive: true,
      createdBy: 'system',
      tags: ['demographic', 'age', 'millennials'],
      performance: { accuracy: 94, usage: 1250, lastUsed: new Date().toISOString(), avgResponseTime: 12 }
    },
    {
      name: 'High Purchase Frequency',
      type: 'PurchaseFrequencyAtom',
      category: 'Behavioral',
      description: 'Identifies users with high purchase frequency',
      parameters: { threshold: 5, period: 'monthly' },
      logic: JSON.stringify({ type: 'threshold', field: 'purchase_frequency', operator: '>=', value: 5 }),
      version: '1.0.0',
      isActive: true,
      createdBy: 'system',
      tags: ['behavioral', 'purchase', 'high-value'],
      performance: { accuracy: 87, usage: 892, lastUsed: new Date().toISOString(), avgResponseTime: 15 }
    }
  ];
  
  mockAtoms.forEach(atom => actions.addAtom(atom));
  
  // Add mock campaigns
  const mockCampaigns: Omit<Campaign, 'id' | 'createdAt' | 'updatedAt'>[] = [
    {
      name: 'Q4 Customer Acquisition',
      description: 'Holiday season customer acquisition campaign',
      status: 'active',
      moments: [],
      targetAudience: {
        name: 'Holiday Shoppers',
        description: 'Users likely to shop during holiday season',
        rules: [],
        estimatedSize: 45000
      },
      goals: [
        { type: 'conversion', target: 1000, unit: 'conversions', weight: 1 },
        { type: 'revenue', target: 250000, unit: 'USD', weight: 0.8 }
      ],
      createdBy: 'system',
      performance: {
        impressions: 125000,
        clicks: 3550,
        conversions: 284,
        revenue: 142000,
        cost: 15600,
        ctr: 2.84,
        cpc: 4.39,
        roas: 9.1,
        conversionRate: 8.0
      }
    }
  ];
  
  mockCampaigns.forEach(campaign => actions.addCampaign(campaign));
  
  console.log('🎯 Mock data initialized successfully');
};

export default useAppStore;