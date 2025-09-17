import { UseInfiniteQueryResult } from '@tanstack/react-query';

import { apiEndpoints } from '#/constants/apiEndpoints';
import { useInfiniteScrollQuery } from '#/services/networkRequestService';
import type { CommentsResponse } from '#/types/comment.types';

export interface UseGetCommentsInfiniteProps {
  params?: {
    taskId: string;
    pageSize?: number;
  };
  options?: Record<string, unknown>;
}

export const useGetCommentsInfinite = ({
  params = {},
  options = {},
}: UseGetCommentsInfiniteProps = {}): UseInfiniteQueryResult<CommentsResponse, Error> => {
  return useInfiniteScrollQuery<CommentsResponse, { taskId: string; pageSize?: number }>({
    key: `COMMENTS_INFINITE_${params.taskId || 'all'}`,
    url: apiEndpoints.COMMENTS.LIST,
    params: params,
    limit: params.pageSize || 10,
    options: {
      ...options,
    },
  });
};
