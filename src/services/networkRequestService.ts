import { useInfiniteQuery } from '@tanstack/react-query';

import { GET } from '#/constants';
import { InfiniteQueryConfig } from '#/types/services.types';
import { performRequest } from './apiClient';

/**
 * Custom React Query hook for handling infinite scrolling data fetching.
 *
 * This hook abstracts the logic of using `useInfiniteQuery` with a paginated API,
 * automatically handling next page detection and caching.
 *
 * @template TData - The type of data returned by the API.
 * @template TParams - The type of query parameters (defaults to Record<string, unknown>).
 *
 * @param config - Configuration object for the query.
 * @param config.key - Unique key for caching the query.
 * @param config.url - API endpoint URL.
 * @param config.params - Query parameters to be sent with the request.
 * @param config.limit - Number of items per page (default: 10).
 * @param config.getNextPageParam - Optional custom function to determine the next page param.
 * @param config.options - Additional React Query options.
 *
 * @returns A React Query `useInfiniteQuery` result object, which includes data,
 * status, pagination helpers, and fetch functions.
 *
 * @example
 * ```ts
 * const { data, fetchNextPage, hasNextPage } = useInfiniteScrollQuery<User[], { search: string }>({
 *   key: 'users',
 *   url: '/api/users',
 *   params: { search: 'John' },
 *   limit: 20,
 * });
 * ```
 */


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
      performRequest<TData, undefined, TParams>({
        method: GET,
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
    staleTime: 5 * 60 * 1000,
    ...options,
  });
}
