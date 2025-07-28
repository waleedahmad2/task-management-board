import { useQuery, useMutation, useQueryClient, useInfiniteQuery } from '@tanstack/react-query';

import {
  performGetRequest,
  performPostRequest,
  performPutRequest,
  performPatchRequest,
  performDeleteRequest,
} from './apiClient';

/**
 * Custom React Query hook to perform a GET request.
 *
 * @param {Object} config - Configuration object for the query.
 * @param {string} config.key - Unique key for the query cache.
 * @param {string} config.url - The endpoint URL to fetch data from.
 * @param {Object} [config.params={}] - Optional query parameters to include in the request.
 * @param {Object} [config.options={}] - Additional options to pass to the `useQuery` hook (e.g., enabled, staleTime, etc.).
 *
 * @returns {Object} - Returns the result from `useQuery`, including status, data, error, etc.
 *
 */

export const useGetQuery = ({ key, url, params = {}, options = {} }) => {
  return useQuery({
    queryKey: [key, params],
    queryFn: () => performGetRequest({ url, params }).then(res => res.data),
    retry: false,
    refetchOnWindowFocus: false,
    ...options,
  });
};

/**
 * Custom React Query hook for infinite scroll (pagination).
 *
 * @param {Object} config - Configuration object for the query.
 * @param {string} config.key - Unique key for the query cache.
 * @param {string} config.url - The endpoint URL to fetch data from.
 * @param {Object} [config.params={}] - Optional query parameters to include in the request.
 * @param {number} [config.limit=10] - The number of items to fetch per page.
 * @param {Function} [config.getNextPageParam] - Function to get the next page param from the last page.
 * @param {Object} [config.options={}] - Additional options to pass to the `useInfiniteQuery` hook.
 * @returns {Object} - Returns the result from `useInfiniteQuery`, including status, data, error, fetchNextPage, etc.
 */

export const useInfiniteScrollQuery = ({ key, url, params = {}, limit = 10, getNextPageParam, options = {} }) => {
  return useInfiniteQuery({
    queryKey: [key, params, limit],
    queryFn: ({ pageParam = 1 }) =>
      performGetRequest({ url, params: { ...params, page: pageParam, limit } }).then(res => res.data),
    getNextPageParam: (lastPage, allPages) => {
      if (getNextPageParam) {
        return getNextPageParam(lastPage, allPages);
      }

      // fallback assumes lastPage is an array
      if (Array.isArray(lastPage) && lastPage.length === limit) {
        return allPages.length + 1;
      }

      return undefined;
    },
    ...options,
  });
};

/**
 * Factory to create mutation hooks (e.g., POST, PUT).
 *
 * @param {Function} requestFn - Function to perform the HTTP request.
 * @returns {Function} - Custom mutation hook.
 */

const createMutationHook =
  requestFn =>
  ({ url, onSuccess, onError, options = {} }) => {
    const queryClient = useQueryClient();

    return useMutation({
      mutationFn: ({ payload = {}, params = {} }) => requestFn({ url, payload, params }).then(res => res.data),

      onSuccess: (data, variables, context) => {
        if (options.invalidateKeys) {
          for (const key of options.invalidateKeys) {
            queryClient.invalidateQueries({ queryKey: [key] });
          }
        }
        if (options.successMessage) {
          toast.success(options.successMessage);
        }
        onSuccess?.(data, variables, context);
      },

      onError: (error, variables, context) => {
        if (options.errorMessage) {
          toast.error(options.errorMessage);
        }
        onError?.(error, variables, context);
      },

      ...options,
    });
  };

export const usePostMutation = createMutationHook(performPostRequest);

export const usePutMutation = createMutationHook(performPutRequest);

export const usePatchMutation = createMutationHook(performPatchRequest);

export const useDeleteMutation = createMutationHook(performDeleteRequest);
