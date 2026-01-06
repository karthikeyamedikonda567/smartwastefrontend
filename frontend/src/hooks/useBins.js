import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import binsService from '../services/bins';

// Query keys
export const binKeys = {
  all: ['bins'],
  lists: () => [...binKeys.all, 'list'],
  list: (filters) => [...binKeys.lists(), filters],
  details: () => [...binKeys.all, 'detail'],
  detail: (id) => [...binKeys.details(), id],
  types: () => [...binKeys.all, 'types'],
  stats: () => [...binKeys.all, 'stats'],
  readings: (binId) => [...binKeys.all, 'readings', binId],
  maintenance: (binId) => [...binKeys.all, 'maintenance', binId],
};

// Hooks
export const useBins = (params = {}) => {
  return useQuery({
    queryKey: binKeys.list(params),
    queryFn: () => binsService.getAll(params),
  });
};

export const useBin = (id) => {
  return useQuery({
    queryKey: binKeys.detail(id),
    queryFn: () => binsService.getById(id),
    enabled: !!id,
  });
};

export const useBinTypes = () => {
  return useQuery({
    queryKey: binKeys.types(),
    queryFn: binsService.getTypes,
    staleTime: 1000 * 60 * 30, // 30 minutes
  });
};

export const useBinStats = () => {
  return useQuery({
    queryKey: binKeys.stats(),
    queryFn: binsService.getStats,
    refetchInterval: 1000 * 60, // Refetch every minute
  });
};

export const useBinReadings = (binId, params = {}) => {
  return useQuery({
    queryKey: binKeys.readings(binId),
    queryFn: () => binsService.getReadings(binId, params),
    enabled: !!binId,
  });
};

export const useBinMaintenanceLogs = (binId) => {
  return useQuery({
    queryKey: binKeys.maintenance(binId),
    queryFn: () => binsService.getMaintenanceLogs(binId),
    enabled: !!binId,
  });
};

export const useBinsNeedingAttention = () => {
  return useQuery({
    queryKey: [...binKeys.lists(), 'needs-attention'],
    queryFn: binsService.getNeedingAttention,
    refetchInterval: 1000 * 60 * 2, // Refetch every 2 minutes
  });
};

// Mutations
export const useCreateBin = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: binsService.create,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: binKeys.lists() });
      queryClient.invalidateQueries({ queryKey: binKeys.stats() });
    },
  });
};

export const useUpdateBin = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, data }) => binsService.update(id, data),
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: binKeys.detail(variables.id) });
      queryClient.invalidateQueries({ queryKey: binKeys.lists() });
    },
  });
};

export const useDeleteBin = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: binsService.delete,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: binKeys.lists() });
      queryClient.invalidateQueries({ queryKey: binKeys.stats() });
    },
  });
};

export const useCreateMaintenanceLog = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ binId, data }) => binsService.createMaintenanceLog(binId, data),
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: binKeys.maintenance(variables.binId) });
      queryClient.invalidateQueries({ queryKey: binKeys.detail(variables.binId) });
    },
  });
};
