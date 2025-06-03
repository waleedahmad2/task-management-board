import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';

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
