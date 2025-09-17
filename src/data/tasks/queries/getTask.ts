import { UseQueryResult } from '@tanstack/react-query';

import { apiEndpoints, QUERY_KEYS } from '#/constants';
import { useGetQuery } from '#/services/networkRequestService';
import type { Task } from '#/types/task.types';

export interface UseGetTaskProps {
  taskId: string;
  options?: Record<string, unknown>;
}

export const useGetTask = ({ taskId, options = {} }: UseGetTaskProps): UseQueryResult<Task, Error> => {
  return useGetQuery({
    key: `${QUERY_KEYS.TASKS.DETAIL}-${taskId}`,
    url: `${apiEndpoints.TASKS.DETAIL}/${taskId}`,
    options: {
      enabled: !!taskId,
      ...options,
    },
  }) as UseQueryResult<Task, Error>;
};
