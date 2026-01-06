import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import schedulingService from '../services/scheduling';

// Query keys
export const schedulingKeys = {
  all: ['scheduling'],
  routes: {
    all: () => [...schedulingKeys.all, 'routes'],
    lists: () => [...schedulingKeys.routes.all(), 'list'],
    list: (filters) => [...schedulingKeys.routes.lists(), filters],
    detail: (id) => [...schedulingKeys.routes.all(), 'detail', id],
  },
  schedules: {
    all: () => [...schedulingKeys.all, 'schedules'],
    lists: () => [...schedulingKeys.schedules.all(), 'list'],
    list: (filters) => [...schedulingKeys.schedules.lists(), filters],
    detail: (id) => [...schedulingKeys.schedules.all(), 'detail', id],
    byDate: (date) => [...schedulingKeys.schedules.all(), 'date', date],
  },
  collections: {
    all: () => [...schedulingKeys.all, 'collections'],
    lists: () => [...schedulingKeys.collections.all(), 'list'],
    list: (filters) => [...schedulingKeys.collections.lists(), filters],
    detail: (id) => [...schedulingKeys.collections.all(), 'detail', id],
    today: () => [...schedulingKeys.collections.all(), 'today'],
    stats: () => [...schedulingKeys.collections.all(), 'stats'],
  },
};

// Routes Hooks
export const useRoutes = (params = {}) => {
  return useQuery({
    queryKey: schedulingKeys.routes.list(params),
    queryFn: () => schedulingService.routes.getAll(params),
  });
};

export const useRoute = (id) => {
  return useQuery({
    queryKey: schedulingKeys.routes.detail(id),
    queryFn: () => schedulingService.routes.getById(id),
    enabled: !!id,
  });
};

export const useCreateRoute = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: schedulingService.routes.create,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: schedulingKeys.routes.lists() });
    },
  });
};

export const useUpdateRoute = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, data }) => schedulingService.routes.update(id, data),
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: schedulingKeys.routes.detail(variables.id) });
      queryClient.invalidateQueries({ queryKey: schedulingKeys.routes.lists() });
    },
  });
};

export const useDeleteRoute = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: schedulingService.routes.delete,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: schedulingKeys.routes.lists() });
    },
  });
};

// Schedules Hooks
export const useSchedules = (params = {}) => {
  return useQuery({
    queryKey: schedulingKeys.schedules.list(params),
    queryFn: () => schedulingService.schedules.getAll(params),
  });
};

export const useSchedule = (id) => {
  return useQuery({
    queryKey: schedulingKeys.schedules.detail(id),
    queryFn: () => schedulingService.schedules.getById(id),
    enabled: !!id,
  });
};

export const useSchedulesByDate = (date) => {
  return useQuery({
    queryKey: schedulingKeys.schedules.byDate(date),
    queryFn: () => schedulingService.schedules.getByDate(date),
    enabled: !!date,
  });
};

export const useCreateSchedule = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: schedulingService.schedules.create,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: schedulingKeys.schedules.lists() });
    },
  });
};

export const useUpdateSchedule = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, data }) => schedulingService.schedules.update(id, data),
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: schedulingKeys.schedules.detail(variables.id) });
      queryClient.invalidateQueries({ queryKey: schedulingKeys.schedules.lists() });
    },
  });
};

// Collections Hooks
export const useCollections = (params = {}) => {
  return useQuery({
    queryKey: schedulingKeys.collections.list(params),
    queryFn: () => schedulingService.collections.getAll(params),
  });
};

export const useCollection = (id) => {
  return useQuery({
    queryKey: schedulingKeys.collections.detail(id),
    queryFn: () => schedulingService.collections.getById(id),
    enabled: !!id,
  });
};

export const useTodaysCollections = () => {
  return useQuery({
    queryKey: schedulingKeys.collections.today(),
    queryFn: schedulingService.collections.getToday,
    refetchInterval: 1000 * 60, // Refetch every minute
  });
};

export const useCollectionStats = (params = {}) => {
  return useQuery({
    queryKey: schedulingKeys.collections.stats(),
    queryFn: () => schedulingService.collections.getStats(params),
  });
};

export const useStartCollection = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: schedulingService.collections.start,
    onSuccess: (_, id) => {
      queryClient.invalidateQueries({ queryKey: schedulingKeys.collections.detail(id) });
      queryClient.invalidateQueries({ queryKey: schedulingKeys.collections.lists() });
      queryClient.invalidateQueries({ queryKey: schedulingKeys.collections.today() });
    },
  });
};

export const useCompleteCollection = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, data }) => schedulingService.collections.complete(id, data),
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: schedulingKeys.collections.detail(variables.id) });
      queryClient.invalidateQueries({ queryKey: schedulingKeys.collections.lists() });
      queryClient.invalidateQueries({ queryKey: schedulingKeys.collections.today() });
      queryClient.invalidateQueries({ queryKey: schedulingKeys.collections.stats() });
    },
  });
};
