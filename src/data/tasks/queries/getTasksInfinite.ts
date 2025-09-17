import { UseInfiniteQueryResult } from '@tanstack/react-query';

import { apiEndpoints, QUERY_KEYS } from '#/constants';
import { TASKS_CONFIG } from '#/constants/tasks';
import { useInfiniteScrollQuery } from '#/services/networkRequestService';
import type { TasksInfiniteResponse } from '#/types/task.types';

export interface UseGetTasksInfiniteProps {
  params?: {
    projectId?: string;
    pageSize?: number;
    status?: string;
  };
  options?: Record<string, unknown>;
}

export const useGetTasksInfinite = ({
  params = {},
  options = {},
}: UseGetTasksInfiniteProps = {}): UseInfiniteQueryResult<TasksInfiniteResponse, unknown> => {
  const query = useInfiniteScrollQuery<
    TasksInfiniteResponse,
    { projectId?: string; pageSize?: number; status?: string }
  >({
    key: `${QUERY_KEYS.TASKS.INFINITE}_${params.projectId || 'all'}_${params.status || 'all'}`,
    url: apiEndpoints.TASKS.LIST,
    params,
    limit: params.pageSize || TASKS_CONFIG.INFINITE_SCROLL.PAGE_SIZE,
    options,
  });

  return query;
};
