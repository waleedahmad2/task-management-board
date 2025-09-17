import { UseInfiniteQueryResult } from '@tanstack/react-query';

import { apiEndpoints, QUERY_KEYS } from '#/constants';
import { useInfiniteScrollQuery } from '#/services/networkRequestService';
import type { CommentsInfiniteResponse } from '#/types/comment.types';

export interface UseGetCommentsInfiniteProps {
  params: {
    taskId: string;
    pageSize?: number;
  };
  options?: Record<string, unknown>;
}

export const useGetCommentsInfinite = ({
  params,
  options = {},
}: UseGetCommentsInfiniteProps): UseInfiniteQueryResult<CommentsInfiniteResponse, unknown> => {
  return useInfiniteScrollQuery<CommentsInfiniteResponse, { taskId: string; pageSize?: number }>({
    key: `${QUERY_KEYS.COMMENTS.INFINITE}_${params.taskId}`,
    url: apiEndpoints.COMMENTS.LIST,
    params: params,
    limit: params.pageSize || 10,
    options: {
      enabled: !!params.taskId, // Only fetch when taskId is provided
      initialPageParam: [QUERY_KEYS.COMMENTS.INFINITE, params.taskId, 1] as [string, string, number],
      ...options,
    },
  });
};
