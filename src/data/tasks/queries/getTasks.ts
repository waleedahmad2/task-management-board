import { UseQueryResult } from '@tanstack/react-query';

import { apiEndpoints } from '#/constants';
import { useGetQuery } from '#/services/networkRequestService';
import type { TasksResponse } from '#/types/task.types';
import { transformBackendTasks } from '../transformers';

/**
 * Parameters for getTasks query
 */
export interface UseGetTasksProps {
  params?: {
    projectId: string;
    page?: number;
    pageSize?: number;
    status?: string;
  };
  options?: Record<string, unknown>;
}

/**
 * Custom hook to fetch tasks using React Query.
 * Follows the same pattern as getProjects for data layer separation.
 */
export const useGetTasks = ({ params = {}, options = {} }: UseGetTasksProps = {}): UseQueryResult<
  TasksResponse,
  Error
> => {
  return useGetQuery({
    key: `TASKS_LIST_${params.projectId || 'all'}`,
    url: apiEndpoints.TASKS.LIST,
    params,
    options: {
      keepPreviousData: true,
      select: (data: Record<string, unknown>) => ({
        ...data,
        data: transformBackendTasks(data.data || []),
      }),
      ...options,
    },
  });
};
