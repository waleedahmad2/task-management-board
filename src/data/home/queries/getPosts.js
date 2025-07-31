import { useQuery } from '@tanstack/react-query';

import { apiEndpoints, queryKeys } from '#/constants';
import { performGetRequest } from '#/services/apiClient';

/**
 * Custom hook to fetch posts using React Query.
 *
 * This hook uses the `performGetRequest` utility to call the `/posts` endpoint
 * and retrieve post data. It accepts optional query parameters and React Query options.
 *
 * This query will typically be used in:
 * `data/home/queries/getPosts.js` to separate the data layer from components.
 *
 * @param {Object} [params={}] - Optional query parameters to include in the request.
 * @param {Object} [options={}] - Optional React Query options (e.g. `staleTime`, `enabled`, etc.).
 *
 * @returns {Object} - The result object from React Query's `useQuery`:
 *   - `data`: The fetched posts.
 *   - `isLoading`: Boolean indicating if the request is in progress.
 *   - `error`: Any error that occurred during the request.
 *
 * @example
 * const { data, isLoading, error } = useGetPosts({
 *   params: { limit: 10 },
 *   options: { staleTime: 300000 }
 * });
 */
export const useGetPosts = ({ params = {}, options = {} } = {}) => {
  return useQuery({
    // Caches based on queryKey and params
    queryKey: [queryKeys.USERS, params],

    // Executes GET request using custom API utility
    queryFn: () =>
      performGetRequest({
        url: apiEndpoints.POST,
        params,
      }).then(res => res.data),

    // React Query behavior options
    retry: false,
    refetchOnWindowFocus: false,

    // Additional options provided by consumer
    ...options,
  });
};
