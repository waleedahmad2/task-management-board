import { useQuery } from '@tanstack/react-query';

import { ACCESS_TOKEN } from '#/constants';
import { performRequest } from '#/services/apiClient';
import { User } from '#/types/auth/auth.types';
import { removeLocalStorageItem } from '#/utils';

/**
 * Get current user query using React Query
 */
export const useGetCurrentUser = (token: string | null) => {
  return useQuery({
    queryKey: ['user', token],
    queryFn: async (): Promise<User | null> => {
      if (!token) {
        return null;
      }

      // Check if token looks like a valid mock token
      if (!token.startsWith('mock-token-')) {
        removeLocalStorageItem(ACCESS_TOKEN);
        return null;
      }

      try {
        return await performRequest<User>({
          method: 'GET',
          url: '/api/auth/validate',
          config: {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          },
        });
      } catch (error) {
        // Don't clear token on network errors during development
        // Only clear on actual authentication failures
        return null;
      }
    },
    staleTime: 5 * 60 * 1000, // 5 minutes
    retry: 2, // Retry twice on failure
    retryDelay: 1000, // Wait 1 second between retries
    enabled: !!token, // Only run when token exists
  });
};

/**
 * Check if user is authenticated
 */
export const useIsAuthenticated = (token: string | null) => {
  const { data: user, isLoading } = useGetCurrentUser(token);

  return {
    isAuthenticated: !!user,
    isLoading,
    user,
  };
};
