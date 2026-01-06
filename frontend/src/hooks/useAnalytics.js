import { useQuery } from '@tanstack/react-query';
import analyticsService from '../services/analytics';

// Query keys
export const analyticsKeys = {
  all: ['analytics'],
  dashboard: () => [...analyticsKeys.all, 'dashboard'],
  snapshots: (filters) => [...analyticsKeys.all, 'snapshots', filters],
  zones: (filters) => [...analyticsKeys.all, 'zones', filters],
  zone: (id) => [...analyticsKeys.all, 'zone', id],
  wasteTypes: (filters) => [...analyticsKeys.all, 'waste-types', filters],
  collectionTrends: (filters) => [...analyticsKeys.all, 'collection-trends', filters],
  recyclingTrends: (filters) => [...analyticsKeys.all, 'recycling-trends', filters],
  efficiency: (filters) => [...analyticsKeys.all, 'efficiency', filters],
  environmentalImpact: (filters) => [...analyticsKeys.all, 'environmental-impact', filters],
  predictions: () => [...analyticsKeys.all, 'predictions'],
};

// Hooks
export const useDashboardOverview = () => {
  return useQuery({
    queryKey: analyticsKeys.dashboard(),
    queryFn: analyticsService.getDashboardOverview,
    refetchInterval: 1000 * 60 * 5, // Refetch every 5 minutes
  });
};

export const useAnalyticsSnapshots = (params = {}) => {
  return useQuery({
    queryKey: analyticsKeys.snapshots(params),
    queryFn: () => analyticsService.getSnapshots(params),
  });
};

export const useZoneAnalytics = (params = {}) => {
  return useQuery({
    queryKey: analyticsKeys.zones(params),
    queryFn: () => analyticsService.getZoneAnalytics(params),
  });
};

export const useZoneAnalyticsById = (id) => {
  return useQuery({
    queryKey: analyticsKeys.zone(id),
    queryFn: () => analyticsService.getZoneById(id),
    enabled: !!id,
  });
};

export const useWasteTypeAnalytics = (params = {}) => {
  return useQuery({
    queryKey: analyticsKeys.wasteTypes(params),
    queryFn: () => analyticsService.getWasteTypeAnalytics(params),
  });
};

export const useCollectionTrends = (params = {}) => {
  return useQuery({
    queryKey: analyticsKeys.collectionTrends(params),
    queryFn: () => analyticsService.getCollectionTrends(params),
  });
};

export const useRecyclingTrends = (params = {}) => {
  return useQuery({
    queryKey: analyticsKeys.recyclingTrends(params),
    queryFn: () => analyticsService.getRecyclingTrends(params),
  });
};

export const useEfficiencyMetrics = (params = {}) => {
  return useQuery({
    queryKey: analyticsKeys.efficiency(params),
    queryFn: () => analyticsService.getEfficiencyMetrics(params),
  });
};

export const useEnvironmentalImpact = (params = {}) => {
  return useQuery({
    queryKey: analyticsKeys.environmentalImpact(params),
    queryFn: () => analyticsService.getEnvironmentalImpact(params),
  });
};

export const usePredictions = () => {
  return useQuery({
    queryKey: analyticsKeys.predictions(),
    queryFn: analyticsService.getPredictions,
    staleTime: 1000 * 60 * 30, // 30 minutes
  });
};
