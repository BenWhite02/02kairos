// =============================================================================
// KAIROS FRONTEND - ZUSTAND APP STORE
// =============================================================================
// Author: Sankhadeep Banerjee
// Project: Kairos - Marketing Decisioning Solution
// File: src/stores/useAppStore.ts
// Purpose: Global state management using Zustand
// =============================================================================

import { create } from 'zustand';
import { devtools, persist } from 'zustand/middleware';
import { immer } from 'zustand/middleware/immer';
import type { Campaign, EligibilityAtom, RealTimeMetrics } from '@/hooks/useApi';

// ============================================================================
// TYPE DEFINITIONS
// ============================================================================

export interface User {
  id: string;
  email: string;
  name: string;
  role: 'admin' | 'manager' | 'analyst' | 'viewer';
  permissions: string[];
  avatar?: string;
  lastLogin?: string;
}

export interface AppSettings {
  sidebarCollapsed: boolean;
  autoRefresh: boolean;
  refreshInterval: number; // in seconds
  notifications: {
    email: boolean;
    push: boolean;
    inApp: boolean;
  };
  dashboard: {
    defaultTimeframe: string;
    showRealTimeMetrics: boolean;
    showSystemHealth: boolean;
  };
  theme: {
    name: string;
    autoSwitch: boolean;
  };
}

export interface DashboardFilters {
  timeframe: string;
  campaignStatus: string[];
  atomTypes: string[];
  searchQuery: string;
}

export interface AppState {
  // User & Auth
  user: User | null;
  isAuthenticated: boolean;

  // UI State
  settings: AppSettings;
  filters: DashboardFilters;
  loading: {
    global: boolean;
    campaigns: boolean;
    atoms: boolean;
    analytics: boolean;
  };

  // Data Cache
  campaigns: Campaign[];
  atoms: EligibilityAtom[];
  metrics: RealTimeMetrics | null;

  // UI Feedback
  notifications: Array<{
    id: string;
    type: 'info' | 'success' | 'warning' | 'error';
    title: string;
    message: string;
    timestamp: string;
    read: boolean;
  }>;

  // Modal/Dialog State
  modals: {
    createCampaign: boolean;
    createAtom: boolean;
    settings: boolean;
    profile: boolean;
  };

  // Selection State
  selectedCampaigns: string[];
  selectedAtoms: string[];
}

export interface AppActions {
  // Auth Actions
  setUser: (user: User | null) => void;
  login: (user: User) => void;
  logout: () => void;

  // Settings Actions
  updateSettings: (settings: Partial<AppSettings>) => void;
  toggleSidebar: () => void;
  setAutoRefresh: (enabled: boolean) => void;

  // Filter Actions
  setFilters: (filters: Partial<DashboardFilters>) => void;
  resetFilters: () => void;

  // Loading Actions
  setLoading: (key: keyof AppState['loading'], value: boolean) => void;
  setGlobalLoading: (loading: boolean) => void;

  // Data Actions
  setCampaigns: (campaigns: Campaign[]) => void;
  addCampaign: (campaign: Campaign) => void;
  updateCampaign: (id: string, updates: Partial<Campaign>) => void;
  removeCampaign: (id: string) => void;

  setAtoms: (atoms: EligibilityAtom[]) => void;
  addAtom: (atom: EligibilityAtom) => void;
  updateAtom: (id: string, updates: Partial<EligibilityAtom>) => void;
  removeAtom: (id: string) => void;

  setMetrics: (metrics: RealTimeMetrics) => void;

  // Notification Actions
  addNotification: (notification: Omit<AppState['notifications'][0], 'id' | 'timestamp' | 'read'>) => void;
  markNotificationRead: (id: string) => void;
  removeNotification: (id: string) => void;
  clearAllNotifications: () => void;

  // Modal Actions
  openModal: (modal: keyof AppState['modals']) => void;
  closeModal: (modal: keyof AppState['modals']) => void;
  closeAllModals: () => void;

  // Selection Actions
  selectCampaign: (id: string) => void;
  deselectCampaign: (id: string) => void;
  selectAllCampaigns: () => void;
  clearCampaignSelection: () => void;

  selectAtom: (id: string) => void;
  deselectAtom: (id: string) => void;
  selectAllAtoms: () => void;
  clearAtomSelection: () => void;

  // Utility Actions
  reset: () => void;
}

type AppStore = AppState & AppActions;

// ============================================================================
// INITIAL STATE
// ============================================================================

const initialState: AppState = {
  // User & Auth
  user: null,
  isAuthenticated: false,

  // UI State
  settings: {
    sidebarCollapsed: false,
    autoRefresh: true,
    refreshInterval: 30,
    notifications: {
      email: true,
      push: true,
      inApp: true,
    },
    dashboard: {
      defaultTimeframe: '7d',
      showRealTimeMetrics: true,
      showSystemHealth: true,
    },
    theme: {
      name: 'kairos-dark',
      autoSwitch: false,
    },
  },

  filters: {
    timeframe: '7d',
    campaignStatus: [],
    atomTypes: [],
    searchQuery: '',
  },

  loading: {
    global: false,
    campaigns: false,
    atoms: false,
    analytics: false,
  },

  // Data Cache
  campaigns: [],
  atoms: [],
  metrics: null,

  // UI Feedback
  notifications: [],

  // Modal/Dialog State
  modals: {
    createCampaign: false,
    createAtom: false,
    settings: false,
    profile: false,
  },

  // Selection State
  selectedCampaigns: [],
  selectedAtoms: [],
};

// ============================================================================
// ZUSTAND STORE
// ============================================================================

export const useAppStore = create<AppStore>()(
  devtools(
    persist(
      immer((set, get) => ({
        ...initialState,

        // Auth Actions
        setUser: (user) =>
          set((state) => {
            state.user = user;
            state.isAuthenticated = !!user;
          }),

        login: (user) =>
          set((state) => {
            state.user = user;
            state.isAuthenticated = true;
          }),

        logout: () =>
          set((state) => {
            state.user = null;
            state.isAuthenticated = false;
            state.notifications = [];
            state.selectedCampaigns = [];
            state.selectedAtoms = [];
          }),

        // Settings Actions
        updateSettings: (newSettings) =>
          set((state) => {
            Object.assign(state.settings, newSettings);
          }),

        toggleSidebar: () =>
          set((state) => {
            state.settings.sidebarCollapsed = !state.settings.sidebarCollapsed;
          }),

        setAutoRefresh: (enabled) =>
          set((state) => {
            state.settings.autoRefresh = enabled;
          }),

        // Filter Actions
        setFilters: (newFilters) =>
          set((state) => {
            Object.assign(state.filters, newFilters);
          }),

        resetFilters: () =>
          set((state) => {
            state.filters = { ...initialState.filters };
          }),

        // Loading Actions
        setLoading: (key, value) =>
          set((state) => {
            state.loading[key] = value;
          }),

        setGlobalLoading: (loading) =>
          set((state) => {
            state.loading.global = loading;
          }),

        // Campaign Actions
        setCampaigns: (campaigns) =>
          set((state) => {
            state.campaigns = campaigns;
          }),

        addCampaign: (campaign) =>
          set((state) => {
            state.campaigns.push(campaign);
          }),

        updateCampaign: (id, updates) =>
          set((state) => {
            const index = state.campaigns.findIndex((c) => c.id === id);
            if (index !== -1) {
              Object.assign(state.campaigns[index], updates);
            }
          }),

        removeCampaign: (id) =>
          set((state) => {
            state.campaigns = state.campaigns.filter((c) => c.id !== id);
            state.selectedCampaigns = state.selectedCampaigns.filter((cId) => cId !== id);
          }),

        // Atom Actions
        setAtoms: (atoms) =>
          set((state) => {
            state.atoms = atoms;
          }),

        addAtom: (atom) =>
          set((state) => {
            state.atoms.push(atom);
          }),

        updateAtom: (id, updates) =>
          set((state) => {
            const index = state.atoms.findIndex((a) => a.id === id);
            if (index !== -1) {
              Object.assign(state.atoms[index], updates);
            }
          }),

        removeAtom: (id) =>
          set((state) => {
            state.atoms = state.atoms.filter((a) => a.id !== id);
            state.selectedAtoms = state.selectedAtoms.filter((aId) => aId !== id);
          }),

        // Metrics Actions
        setMetrics: (metrics) =>
          set((state) => {
            state.metrics = metrics;
          }),

        // Notification Actions
        addNotification: (notification) =>
          set((state) => {
            const newNotification = {
              ...notification,
              id: Math.random().toString(36).substr(2, 9),
              timestamp: new Date().toISOString(),
              read: false,
            };
            state.notifications.unshift(newNotification);
            
            // Keep only last 50 notifications
            if (state.notifications.length > 50) {
              state.notifications = state.notifications.slice(0, 50);
            }
          }),

        markNotificationRead: (id) =>
          set((state) => {
            const notification = state.notifications.find((n) => n.id === id);
            if (notification) {
              notification.read = true;
            }
          }),

        removeNotification: (id) =>
          set((state) => {
            state.notifications = state.notifications.filter((n) => n.id !== id);
          }),

        clearAllNotifications: () =>
          set((state) => {
            state.notifications = [];
          }),

        // Modal Actions
        openModal: (modal) =>
          set((state) => {
            state.modals[modal] = true;
          }),

        closeModal: (modal) =>
          set((state) => {
            state.modals[modal] = false;
          }),

        closeAllModals: () =>
          set((state) => {
            Object.keys(state.modals).forEach((key) => {
              state.modals[key as keyof typeof state.modals] = false;
            });
          }),

        // Campaign Selection Actions
        selectCampaign: (id) =>
          set((state) => {
            if (!state.selectedCampaigns.includes(id)) {
              state.selectedCampaigns.push(id);
            }
          }),

        deselectCampaign: (id) =>
          set((state) => {
            state.selectedCampaigns = state.selectedCampaigns.filter((cId) => cId !== id);
          }),

        selectAllCampaigns: () =>
          set((state) => {
            state.selectedCampaigns = state.campaigns.map((c) => c.id);
          }),

        clearCampaignSelection: () =>
          set((state) => {
            state.selectedCampaigns = [];
          }),

        // Atom Selection Actions
        selectAtom: (id) =>
          set((state) => {
            if (!state.selectedAtoms.includes(id)) {
              state.selectedAtoms.push(id);
            }
          }),

        deselectAtom: (id) =>
          set((state) => {
            state.selectedAtoms = state.selectedAtoms.filter((aId) => aId !== id);
          }),

        selectAllAtoms: () =>
          set((state) => {
            state.selectedAtoms = state.atoms.map((a) => a.id);
          }),

        clearAtomSelection: () =>
          set((state) => {
            state.selectedAtoms = [];
          }),

        // Utility Actions
        reset: () =>
          set(() => ({ ...initialState })),
      })),
      {
        name: 'kairos-app-store',
        partialize: (state) => ({
          user: state.user,
          isAuthenticated: state.isAuthenticated,
          settings: state.settings,
          filters: state.filters,
        }),
      }
    ),
    {
      name: 'kairos-app-store',
    }
  )
);

// ============================================================================
// SELECTORS
// ============================================================================

export const useAuth = () => {
  return useAppStore((state) => ({
    user: state.user,
    isAuthenticated: state.isAuthenticated,
    login: state.login,
    logout: state.logout,
  }));
};

export const useSettings = () => {
  return useAppStore((state) => ({
    settings: state.settings,
    updateSettings: state.updateSettings,
    toggleSidebar: state.toggleSidebar,
    setAutoRefresh: state.setAutoRefresh,
  }));
};

export const useFilters = () => {
  return useAppStore((state) => ({
    filters: state.filters,
    setFilters: state.setFilters,
    resetFilters: state.resetFilters,
  }));
};

export const useLoading = () => {
  return useAppStore((state) => ({
    loading: state.loading,
    setLoading: state.setLoading,
    setGlobalLoading: state.setGlobalLoading,
  }));
};

export const useCampaignData = () => {
  return useAppStore((state) => ({
    campaigns: state.campaigns,
    selectedCampaigns: state.selectedCampaigns,
    setCampaigns: state.setCampaigns,
    addCampaign: state.addCampaign,
    updateCampaign: state.updateCampaign,
    removeCampaign: state.removeCampaign,
    selectCampaign: state.selectCampaign,
    deselectCampaign: state.deselectCampaign,
    selectAllCampaigns: state.selectAllCampaigns,
    clearCampaignSelection: state.clearCampaignSelection,
  }));
};

export const useAtomData = () => {
  return useAppStore((state) => ({
    atoms: state.atoms,
    selectedAtoms: state.selectedAtoms,
    setAtoms: state.setAtoms,
    addAtom: state.addAtom,
    updateAtom: state.updateAtom,
    removeAtom: state.removeAtom,
    selectAtom: state.selectAtom,
    deselectAtom: state.deselectAtom,
    selectAllAtoms: state.selectAllAtoms,
    clearAtomSelection: state.clearAtomSelection,
  }));
};

export const useNotifications = () => {
  return useAppStore((state) => ({
    notifications: state.notifications,
    addNotification: state.addNotification,
    markNotificationRead: state.markNotificationRead,
    removeNotification: state.removeNotification,
    clearAllNotifications: state.clearAllNotifications,
  }));
};

export const useModals = () => {
  return useAppStore((state) => ({
    modals: state.modals,
    openModal: state.openModal,
    closeModal: state.closeModal,
    closeAllModals: state.closeAllModals,
  }));
};

// ============================================================================
// EXPORT DEFAULT
// ============================================================================

export default useAppStore;