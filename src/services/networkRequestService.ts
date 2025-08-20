import { useInfiniteQuery } from '@tanstack/react-query';

import { InfiniteQueryConfig } from '#/types/services.types';
import { performGetRequest } from './apiClient';

export function useInfiniteScrollQuery<TData, TParams extends Record<string, unknown> = Record<string, unknown>>({
  key,
  url,
  params = {} as TParams,
  limit = 10,
  getNextPageParam,
  options = { initialPageParam: 1 },
}: InfiniteQueryConfig<TParams, TData>) {
  const stableParams = JSON.stringify(params);

  return useInfiniteQuery<TData, unknown, TData, [string, string, number]>({
    queryKey: [key, stableParams, limit],
    queryFn: ({ pageParam = 1 }) =>
      performGetRequest<TData, TParams>({
        url,
        params: { ...params, page: pageParam, limit } as TParams & { page: number; limit: number },
      }),
    getNextPageParam: (lastPage, allPages) => {
      if (getNextPageParam) {
        return getNextPageParam(lastPage, allPages);
      }
      // Enhanced fallback logic that handles different response formats
      if (Array.isArray(lastPage)) {
        return lastPage.length === limit ? allPages.length + 1 : undefined;
      }

      if (lastPage && typeof lastPage === 'object') {
        type Paginated = {
          data?: unknown[];
          items?: unknown[];
          results?: unknown[];
          hasNext?: boolean;
          total?: number;
        };

        const pageObj = lastPage as Paginated;
        const data = pageObj.data ?? pageObj.items ?? pageObj.results;

        const hasNext =
          pageObj.hasNext !== undefined
            ? pageObj.hasNext
            : pageObj.total !== undefined
              ? allPages.length * limit < pageObj.total
              : Array.isArray(data) && data.length === limit;

        return hasNext ? allPages.length + 1 : undefined;
      }

      return undefined;
    },
    retry: false,
    refetchOnWindowFocus: false,
    staleTime: 5 * 60 * 1000,
    ...options,
  });
}
