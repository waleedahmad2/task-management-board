import { useQuery, UseQueryResult } from '@tanstack/react-query';

import { apiEndpoints, GET } from '#/constants';
import { performRequest } from '#/services/apiClient';
import type { CommentsResponse } from '#/types/comment.types';

export interface UseGetCommentsProps {
  params?: {
    taskId: string;
    page?: number;
    pageSize?: number;
  };
  options?: Record<string, unknown>;
}

export const useGetComments = ({ params = {}, options = {} }: UseGetCommentsProps = {}): UseQueryResult<
  CommentsResponse,
  Error
> => {
  return useQuery({
    queryKey: [`COMMENTS_LIST_${params.taskId || 'all'}`, params],
    queryFn: () =>
      performRequest({
        method: GET,
        url: apiEndpoints.COMMENTS.LIST,
        params,
      }).then(res => res.data),
    options: {
      keepPreviousData: true,
      ...options,
    },
  });
};
