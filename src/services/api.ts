// =============================================================================
// KAIROS FRONTEND - ENHANCED API SERVICE LAYER FOR HADES INTEGRATION
// =============================================================================
// Author: Sankhadeep Banerjee
// Project: Kairos - Marketing Decisioning Solution
// File: src/services/api.ts
// Purpose: Centralized API communication with Hades backend
// =============================================================================

import axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse } from 'axios';
import { EligibilityAtom, Moment, Campaign, AnalyticsData } from '@/stores/useAppStore';

// ============================================================================
// API CONFIGURATION
// ============================================================================

const API_CONFIG = {
  baseURL: import.meta.env.VITE_API_BASE_URL || 'http://localhost:8080/api/v1',
  timeout: parseInt(import.meta.env.VITE_API_TIMEOUT || '30000'),
  enableLogging: import.meta.env.VITE_ENABLE_API_LOGGING === 'true',
};

// ============================================================================
// TYPE DEFINITIONS
// ============================================================================

export interface ApiResponse<T = any> {
  success: boolean;
  data: T;
  message?: string;
  errors?: string[];
  pagination?: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  };
}

export interface ApiError {
  message: string;
  code: string;
  details?: any;
  timestamp: string;
}

export interface PaginationParams {
  page?: number;
  limit?: number;
  sort?: string;
  order?: 'asc' | 'desc';
}

export interface FilterParams {
  [key: string]: any;
}

// Authentication types
export interface LoginCredentials {
  email: string;
  password: string;
}

export interface AuthResponse {
  token: string;
  refreshToken: string;
  user: {
    id: string;
    email: string;
    name: string;
    role: string;
    tenantId: string;
    permissions: string[];
  };
  expiresIn: number;
}

// Decision API types
export interface DecisionRequest {
  customerId: string;
  context: {
    timestamp: string;
    channel: string;
    location?: string;
    device?: string;
    session?: string;
    [key: string]: any;
  };
  campaignId?: string;
  momentId?: string;
  eligibilityAtoms?: string[];
}

export interface DecisionResponse {
  eligible: boolean;
  momentId?: string;
  content?: any;
  reasoning: {
    atomResults: {
      atomId: string;
      result: boolean;
      confidence: number;
      executionTime: number;
    }[];
    finalScore: number;
    executionTime: number;
  };
  metadata: {
    decisionId: string;
    timestamp: string;
    version: string;
  };
}

// ============================================================================
// AXIOS INSTANCE CONFIGURATION
// ============================================================================

class ApiService {
  private api: AxiosInstance;
  private authToken: string | null = null;

  constructor() {
    this.api = axios.create({
      baseURL: API_CONFIG.baseURL,
      timeout: API_CONFIG.timeout,
      headers: {
        'Content-Type': 'application/json',
      },
    });

    this.setupInterceptors();
    this.loadAuthToken();
  }

  private setupInterceptors(): void {
    // Request interceptor
    this.api.interceptors.request.use(
      (config) => {
        // Add auth token if available
        if (this.authToken) {
          config.headers.Authorization = `Bearer ${this.authToken}`;
        }

        // Add tenant context
        const tenantId = this.getTenantId();
        if (tenantId) {
          config.headers['X-Tenant-ID'] = tenantId;
        }

        // Add request ID for tracing
        config.headers['X-Request-ID'] = this.generateRequestId();

        // Log request in development
        if (API_CONFIG.enableLogging) {
          console.log(`🚀 API Request: ${config.method?.toUpperCase()} ${config.url}`, {
            headers: config.headers,
            data: config.data,
          });
        }

        return config;
      },
      (error) => {
        console.error('❌ Request interceptor error:', error);
        return Promise.reject(error);
      }
    );

    // Response interceptor
    this.api.interceptors.response.use(
      (response: AxiosResponse) => {
        // Log response in development
        if (API_CONFIG.enableLogging) {
          console.log(`✅ API Response: ${response.status}`, {
            url: response.config.url,
            data: response.data,
          });
        }

        return response;
      },
      async (error) => {
        const originalRequest = error.config;

        // Handle 401 Unauthorized - attempt token refresh
        if (error.response?.status === 401 && !originalRequest._retry) {
          originalRequest._retry = true;

          try {
            await this.refreshToken();
            originalRequest.headers.Authorization = `Bearer ${this.authToken}`;
            return this.api(originalRequest);
          } catch (refreshError) {
            this.handleAuthError();
            return Promise.reject(refreshError);
          }
        }

        // Log error in development
        if (API_CONFIG.enableLogging) {
          console.error(`❌ API Error: ${error.response?.status}`, {
            url: error.config?.url,
            message: error.message,
            response: error.response?.data,
          });
        }

        return Promise.reject(this.formatError(error));
      }
    );
  }

  private loadAuthToken(): void {
    this.authToken = localStorage.getItem('kairos-auth-token');
  }

  private getTenantId(): string | null {
    try {
      const userData = localStorage.getItem('kairos-user-data');
      if (userData) {
        const user = JSON.parse(userData);
        return user.tenantId || null;
      }
    } catch (error) {
      console.error('Error getting tenant ID:', error);
    }
    return null;
  }

  private generateRequestId(): string {
    return `req_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
  }

  private formatError(error: any): ApiError {
    return {
      message: error.response?.data?.message || error.message || 'An unexpected error occurred',
      code: error.response?.data?.code || error.code || 'UNKNOWN_ERROR',
      details: error.response?.data?.details,
      timestamp: new Date().toISOString(),
    };
  }

  private handleAuthError(): void {
    this.authToken = null;
    localStorage.removeItem('kairos-auth-token');
    localStorage.removeItem('kairos-user-data');
    
    // Redirect to login
    if (typeof window !== 'undefined') {
      window.location.href = '/login';
    }
  }

  // ============================================================================
  // AUTHENTICATION METHODS
  // ============================================================================

  async login(credentials: LoginCredentials): Promise<AuthResponse> {
    const response = await this.api.post<ApiResponse<AuthResponse>>('/auth/login', credentials);
    const authData = response.data.data;
    
    this.authToken = authData.token;
    localStorage.setItem('kairos-auth-token', authData.token);
    localStorage.setItem('kairos-refresh-token', authData.refreshToken);
    localStorage.setItem('kairos-user-data', JSON.stringify(authData.user));
    
    return authData;
  }

  async logout(): Promise<void> {
    try {
      await this.api.post('/auth/logout');
    } catch (error) {
      console.error('Logout error:', error);
    } finally {
      this.authToken = null;
      localStorage.removeItem('kairos-auth-token');
      localStorage.removeItem('kairos-refresh-token');
      localStorage.removeItem('kairos-user-data');
    }
  }

  async refreshToken(): Promise<string> {
    const refreshToken = localStorage.getItem('kairos-refresh-token');
    if (!refreshToken) {
      throw new Error('No refresh token available');
    }

    const response = await this.api.post<ApiResponse<{ token: string }>>('/auth/refresh', {
      refreshToken,
    });

    const newToken = response.data.data.token;
    this.authToken = newToken;
    localStorage.setItem('kairos-auth-token', newToken);
    
    return newToken;
  }

  async validateToken(): Promise<boolean> {
    try {
      await this.api.post('/auth/validate');
      return true;
    } catch (error) {
      return false;
    }
  }

  // ============================================================================
  // ELIGIBILITY ATOMS API
  // ============================================================================

  async getAtoms(params?: PaginationParams & FilterParams): Promise<ApiResponse<EligibilityAtom[]>> {
    const response = await this.api.get<ApiResponse<EligibilityAtom[]>>('/atoms', { params });
    return response.data;
  }

  async getAtomById(id: string): Promise<EligibilityAtom> {
    const response = await this.api.get<ApiResponse<EligibilityAtom>>(`/atoms/${id}`);
    return response.data.data;
  }

  async createAtom(atom: Omit<EligibilityAtom, 'id' | 'createdAt' | 'updatedAt'>): Promise<EligibilityAtom> {
    const response = await this.api.post<ApiResponse<EligibilityAtom>>('/atoms', atom);
    return response.data.data;
  }

  async updateAtom(id: string, updates: Partial<EligibilityAtom>): Promise<EligibilityAtom> {
    const response = await this.api.put<ApiResponse<EligibilityAtom>>(`/atoms/${id}`, updates);
    return response.data.data;
  }

  async deleteAtom(id: string): Promise<void> {
    await this.api.delete(`/atoms/${id}`);
  }

  async testAtom(id: string, testData: any): Promise<{ result: boolean; confidence: number; executionTime: number }> {
    const response = await this.api.post<ApiResponse<any>>(`/atoms/${id}/test`, testData);
    return response.data.data;
  }

  async getAtomPerformance(id: string): Promise<any> {
    const response = await this.api.get<ApiResponse<any>>(`/atoms/${id}/performance`);
    return response.data.data;
  }

  // ============================================================================
  // MOMENTS API
  // ============================================================================

  async getMoments(params?: PaginationParams & FilterParams): Promise<ApiResponse<Moment[]>> {
    const response = await this.api.get<ApiResponse<Moment[]>>('/moments', { params });
    return response.data;
  }

  async getMomentById(id: string): Promise<Moment> {
    const response = await this.api.get<ApiResponse<Moment>>(`/moments/${id}`);
    return response.data.data;
  }

  async createMoment(moment: Omit<Moment, 'id' | 'createdAt' | 'updatedAt'>): Promise<Moment> {
    const response = await this.api.post<ApiResponse<Moment>>('/moments', moment);
    return response.data.data;
  }

  async updateMoment(id: string, updates: Partial<Moment>): Promise<Moment> {
    const response = await this.api.put<ApiResponse<Moment>>(`/moments/${id}`, updates);
    return response.data.data;
  }

  async deleteMoment(id: string): Promise<void> {
    await this.api.delete(`/moments/${id}`);
  }

  async activateMoment(id: string): Promise<Moment> {
    const response = await this.api.post<ApiResponse<Moment>>(`/moments/${id}/activate`);
    return response.data.data;
  }

  async pauseMoment(id: string): Promise<Moment> {
    const response = await this.api.post<ApiResponse<Moment>>(`/moments/${id}/pause`);
    return response.data.data;
  }

  // ============================================================================
  // CAMPAIGNS API
  // ============================================================================

  async getCampaigns(params?: PaginationParams & FilterParams): Promise<ApiResponse<Campaign[]>> {
    const response = await this.api.get<ApiResponse<Campaign[]>>('/campaigns', { params });
    return response.data;
  }

  async getCampaignById(id: string): Promise<Campaign> {
    const response = await this.api.get<ApiResponse<Campaign>>(`/campaigns/${id}`);
    return response.data.data;
  }

  async createCampaign(campaign: Omit<Campaign, 'id' | 'createdAt' | 'updatedAt'>): Promise<Campaign> {
    const response = await this.api.post<ApiResponse<Campaign>>('/campaigns', campaign);
    return response.data.data;
  }

  async updateCampaign(id: string, updates: Partial<Campaign>): Promise<Campaign> {
    const response = await this.api.put<ApiResponse<Campaign>>(`/campaigns/${id}`, updates);
    return response.data.data;
  }

  async deleteCampaign(id: string): Promise<void> {
    await this.api.delete(`/campaigns/${id}`);
  }

  async launchCampaign(id: string): Promise<Campaign> {
    const response = await this.api.post<ApiResponse<Campaign>>(`/campaigns/${id}/launch`);
    return response.data.data;
  }

  async pauseCampaign(id: string): Promise<Campaign> {
    const response = await this.api.post<ApiResponse<Campaign>>(`/campaigns/${id}/pause`);
    return response.data.data;
  }

  async getCampaignPerformance(id: string, timeframe?: string): Promise<any> {
    const response = await this.api.get<ApiResponse<any>>(`/campaigns/${id}/performance`, {
      params: { timeframe },
    });
    return response.data.data;
  }

  // ============================================================================
  // DECISION ENGINE API
  // ============================================================================

  async makeDecision(request: DecisionRequest): Promise<DecisionResponse> {
    const response = await this.api.post<ApiResponse<DecisionResponse>>('/decisions', request);
    return response.data.data;
  }

  async batchDecisions(requests: DecisionRequest[]): Promise<DecisionResponse[]> {
    const response = await this.api.post<ApiResponse<DecisionResponse[]>>('/decisions/batch', {
      requests,
    });
    return response.data.data;
  }

  async getDecisionHistory(params?: PaginationParams & FilterParams): Promise<ApiResponse<any[]>> {
    const response = await this.api.get<ApiResponse<any[]>>('/decisions/history', { params });
    return response.data;
  }

  // ============================================================================
  // ANALYTICS API
  // ============================================================================

  async getAnalytics(timeframe?: string, filters?: FilterParams): Promise<AnalyticsData> {
    const response = await this.api.get<ApiResponse<AnalyticsData>>('/analytics', {
      params: { timeframe, ...filters },
    });
    return response.data.data;
  }

  async getRealTimeMetrics(): Promise<any> {
    const response = await this.api.get<ApiResponse<any>>('/analytics/realtime');
    return response.data.data;
  }

  async getCampaignAnalytics(campaignId: string, timeframe?: string): Promise<any> {
    const response = await this.api.get<ApiResponse<any>>(`/analytics/campaigns/${campaignId}`, {
      params: { timeframe },
    });
    return response.data.data;
  }

  async getAtomAnalytics(atomId: string, timeframe?: string): Promise<any> {
    const response = await this.api.get<ApiResponse<any>>(`/analytics/atoms/${atomId}`, {
      params: { timeframe },
    });
    return response.data.data;
  }

  async exportAnalytics(format: 'csv' | 'excel' | 'pdf', filters?: FilterParams): Promise<Blob> {
    const response = await this.api.get('/analytics/export', {
      params: { format, ...filters },
      responseType: 'blob',
    });
    return response.data;
  }

  // ============================================================================
  // EXPERIMENTATION API
  // ============================================================================

  async createExperiment(experiment: any): Promise<any> {
    const response = await this.api.post<ApiResponse<any>>('/experiments', experiment);
    return response.data.data;
  }

  async getExperiments(params?: PaginationParams & FilterParams): Promise<ApiResponse<any[]>> {
    const response = await this.api.get<ApiResponse<any[]>>('/experiments', { params });
    return response.data;
  }

  async getExperimentResults(id: string): Promise<any> {
    const response = await this.api.get<ApiResponse<any>>(`/experiments/${id}/results`);
    return response.data.data;
  }

  async stopExperiment(id: string): Promise<any> {
    const response = await this.api.post<ApiResponse<any>>(`/experiments/${id}/stop`);
    return response.data.data;
  }

  // ============================================================================
  // SYSTEM API
  // ============================================================================

  async getSystemHealth(): Promise<any> {
    const response = await this.api.get<ApiResponse<any>>('/system/health');
    return response.data.data;
  }

  async getSystemMetrics(): Promise<any> {
    const response = await this.api.get<ApiResponse<any>>('/system/metrics');
    return response.data.data;
  }

  async getAuditLogs(params?: PaginationParams & FilterParams): Promise<ApiResponse<any[]>> {
    const response = await this.api.get<ApiResponse<any[]>>('/system/audit', { params });
    return response.data;
  }

  // ============================================================================
  // UTILITY METHODS
  // ============================================================================

  async uploadFile(file: File, path: string): Promise<string> {
    const formData = new FormData();
    formData.append('file', file);
    formData.append('path', path);

    const response = await this.api.post<ApiResponse<{ url: string }>>('/upload', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });

    return response.data.data.url;
  }

  async downloadFile(url: string, filename?: string): Promise<void> {
    const response = await this.api.get(url, { responseType: 'blob' });
    
    const blob = new Blob([response.data]);
    const downloadUrl = window.URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = downloadUrl;
    link.download = filename || 'download';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    window.URL.revokeObjectURL(downloadUrl);
  }

  // Get raw axios instance for custom requests
  getRawApi(): AxiosInstance {
    return this.api;
  }
}

// ============================================================================
// SINGLETON INSTANCE
// ============================================================================

export const apiService = new ApiService();

// ============================================================================
// REACT QUERY HELPERS
// ============================================================================

export const API_KEYS = {
  // Atoms
  atoms: ['atoms'] as const,
  atom: (id: string) => ['atoms', id] as const,
  atomPerformance: (id: string) => ['atoms', id, 'performance'] as const,
  
  // Moments
  moments: ['moments'] as const,
  moment: (id: string) => ['moments', id] as const,
  
  // Campaigns
  campaigns: ['campaigns'] as const,
  campaign: (id: string) => ['campaigns', id] as const,
  campaignPerformance: (id: string, timeframe?: string) => 
    ['campaigns', id, 'performance', timeframe] as const,
  
  // Analytics
  analytics: (timeframe?: string) => ['analytics', timeframe] as const,
  realTimeMetrics: ['analytics', 'realtime'] as const,
  campaignAnalytics: (id: string, timeframe?: string) => 
    ['analytics', 'campaigns', id, timeframe] as const,
  atomAnalytics: (id: string, timeframe?: string) => 
    ['analytics', 'atoms', id, timeframe] as const,
  
  // System
  systemHealth: ['system', 'health'] as const,
  systemMetrics: ['system', 'metrics'] as const,
  auditLogs: ['system', 'audit'] as const,
} as const;

export default apiService;