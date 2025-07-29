import { UseQueryOptions, UseMutationOptions, UseInfiniteQueryOptions } from '@tanstack/react-query';

export interface QueryConfig<TParams = Record<string, any>, TData = any> {
  key: string;
  url: string;
  params?: TParams;
  options?: Omit<UseQueryOptions<TData, unknown, TData, [string, TParams]>, 'queryKey' | 'queryFn'>;
}

export interface InfiniteQueryConfig<TParams = Record<string, any>, TData = any> {
  key: string;
  url: string;
  params?: TParams;
  limit?: number;
  getNextPageParam?: (lastPage: TData, allPages: TData[]) => any;
  options?: Omit<
    UseInfiniteQueryOptions<TData, unknown, TData, TData, [string, string, number]>,
    'queryKey' | 'queryFn' | 'getNextPageParam'
  >;
}

export interface MutationOptions<TData = any, TVariables = any> {
  url: string;
  onSuccess?: (data: TData, variables: TVariables, context: unknown) => void;
  onError?: (error: unknown, variables: TVariables, context: unknown) => void;
  options?: {
    invalidateKeys?: string[];
    successMessage?: string;
    errorMessage?: string;
    [key: string]: any;
  } & Omit<UseMutationOptions<TData, unknown, TVariables, unknown>, 'mutationFn' | 'onSuccess' | 'onError'>;
}
