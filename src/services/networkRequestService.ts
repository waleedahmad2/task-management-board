import { useInfiniteQuery } from '@tanstack/react-query';

import { InfiniteQueryConfig } from '#/types/services';
import { performGetRequest } from './apiClient';

export function useInfiniteScrollQuery<TData = any, TParams extends Record<string, any> = Record<string, any>>({
  key,
  url,
  params = {} as TParams,
  limit = 10,
  getNextPageParam,
  options = { initialPageParam: 1 },
}: InfiniteQueryConfig<TParams, TData>) {
  // Create stable query key by serializing params
  const stableParams = JSON.stringify(params);

  return useInfiniteQuery<TData, unknown, TData, [string, string, number]>({
    queryKey: [key, stableParams, limit],
    queryFn: ({ pageParam = 1 }) =>
      performGetRequest({ url, params: { ...params, page: pageParam, limit } }).then(res => res.data as TData),
    getNextPageParam: (lastPage, allPages) => {
      if (getNextPageParam) {
        return getNextPageParam(lastPage, allPages);
      }
      // Enhanced fallback logic that handles different response formats
      if (Array.isArray(lastPage)) {
        if (lastPage.length === limit) {
          return allPages.length + 1;
        }
      } else if (lastPage && typeof lastPage === 'object') {
        const data = (lastPage as any).data || (lastPage as any).items || (lastPage as any).results;
        const hasNext =
          (lastPage as any).hasNext !== undefined
            ? (lastPage as any).hasNext
            : (lastPage as any).total
              ? allPages.length * limit < (lastPage as any).total
              : data && data.length === limit;
        if (hasNext) {
          return allPages.length + 1;
        }
      }
      return undefined;
    },
    retry: false,
    refetchOnWindowFocus: false,
    staleTime: 5 * 60 * 1000, // 5 minutes
    ...options,
  });
}
