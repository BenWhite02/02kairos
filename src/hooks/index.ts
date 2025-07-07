// =============================================================================
// KAIROS FRONTEND - HOOKS INDEX FILE
// =============================================================================
// Author: Sankhadeep Banerjee
// Project: Kairos - Marketing Decisioning Solution
// File: src/hooks/index.ts
// Purpose: Central export for all custom hooks
// =============================================================================

// Export all API hooks
export {
  // Authentication hooks
  useLogin,
  useLogout,
  useValidateToken,

  // Atom hooks
  useAtoms,
  useAtom,
  useCreateAtom,
  useUpdateAtom,
  useDeleteAtom,
  useTestAtom,
  useAtomPerformance,

  // Moment hooks
  useMoments,
  useMoment,
  useCreateMoment,
  useUpdateMoment,
  useDeleteMoment,
  useActivateMoment,
  usePauseMoment,

  // Campaign hooks
  useCampaigns,
  useCampaign,
  useCreateCampaign,
  useUpdateCampaign,
  useDeleteCampaign,
  useLaunchCampaign,
  usePauseCampaign,
  useCampaignPerformance,

  // Decision hooks
  useMakeDecision,
  useBatchDecisions,
  useDecisionHistory,

  // Analytics hooks
  useAnalytics,
  useRealTimeMetrics,
  useCampaignAnalytics,
  useAtomAnalytics,
  useExportAnalytics,

  // Experiment hooks
  useCreateExperiment,
  useExperiments,
  useExperimentResults,
  useStopExperiment,

  // System hooks
  useSystemHealth,
  useSystemMetrics,
  useAuditLogs,

  // Utility hooks
  useUploadFile,

  // Combined hooks
  useDashboardData,
  useAtomLibraryData,
  useCampaignManagementData,
  usePrefetchData,
} from './useApi';

// Export utility hooks
export { useLocalStorage } from './useLocalStorage';
export { useDebounce } from './useDebounce';
export { useKeyboardShortcuts } from './useKeyboardShortcuts';
export { useIntersectionObserver } from './useIntersectionObserver';