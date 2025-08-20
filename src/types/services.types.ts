import { UseInfiniteQueryOptions } from '@tanstack/react-query';

export interface InfiniteQueryConfig<
  TParams extends Record<string, unknown> = Record<string, unknown>,
  TData = unknown,
> {
  key: string;
  url: string;
  params?: TParams;
  limit?: number;
  getNextPageParam?: (lastPage: TData, allPages: TData[]) => unknown;
  options?: Omit<
    UseInfiniteQueryOptions<TData, unknown, TData, TData, [string, string, number]>,
    'queryKey' | 'queryFn' | 'getNextPageParam'
  >;
}
