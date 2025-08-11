import { UseInfiniteQueryOptions } from '@tanstack/react-query';

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
