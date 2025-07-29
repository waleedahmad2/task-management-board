import { useQuery, useMutation, useQueryClient, useInfiniteQuery } from '@tanstack/react-query';
import { toast } from 'react-toastify';

import {
  performGetRequest,
  performPostRequest,
  performPutRequest,
  performPatchRequest,
  performDeleteRequest,
} from './apiClient';
import { QueryConfig, InfiniteQueryConfig, MutationOptions } from '#/types/services';

// --- Hooks ---

export function useGetQuery<TData = any, TParams extends Record<string, any> = Record<string, any>>({ key, url, params = {} as TParams, options = {} }: QueryConfig<TParams, TData>) {
  return useQuery<TData, unknown, TData, [string, TParams]>({
    queryKey: [key, params],
    queryFn: () => performGetRequest({ url, params }).then(res => res.data as TData),
    retry: false,
    refetchOnWindowFocus: false,
    ...options,
  });
}

export function useInfiniteScrollQuery<TData = any, TParams extends Record<string, any> = Record<string, any>>({ key, url, params = {} as TParams, limit = 10, getNextPageParam, options = { initialPageParam: 1 } }: InfiniteQueryConfig<TParams, TData>) {
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
        const hasNext = (lastPage as any).hasNext !== undefined ? (lastPage as any).hasNext :
          (lastPage as any).total ? (allPages.length * limit) < (lastPage as any).total :
            data && data.length === limit;
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

// --- Mutation Factory ---

type MutationFactory = <TData = any, TVariables = { payload?: any; params?: any }>(
  requestFn: (args: { url: string; payload?: any; params?: any }) => Promise<any>
) => (
  config: MutationOptions<TData, TVariables>
) => ReturnType<typeof useMutation<TData, unknown, TVariables, unknown>>;

const createMutationHook: MutationFactory =
  requestFn =>
    ({ url, onSuccess, onError, options = {} }) => {
      const queryClient = useQueryClient();
      return useMutation({
        mutationFn: ({ payload = {}, params = {} }: any) => requestFn({ url, payload, params }).then(res => res.data),
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
