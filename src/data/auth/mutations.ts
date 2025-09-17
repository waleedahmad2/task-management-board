import { useMutation, useQueryClient } from '@tanstack/react-query';

import { ACCESS_TOKEN } from '#/constants';
import { performRequest } from '#/services/apiClient';
import { LoginRequest, LoginResponse } from '#/types/auth/auth.types';
import { setLocalStorageItem, removeLocalStorageItem } from '#/utils';

/**
 * Login mutation using React Query
 */
export const useLoginMutation = () => {
  return useMutation({
    mutationFn: async (request: LoginRequest): Promise<LoginResponse> => {
      return performRequest<LoginResponse, LoginRequest>({
        method: 'POST',
        url: '/api/auth/login',
        payload: request,
      });
    },
    onSuccess: data => {
      setLocalStorageItem(ACCESS_TOKEN, data.token);
    },
    onError: () => {
      removeLocalStorageItem(ACCESS_TOKEN);
    },
  });
};

/**
 * Logout mutation using React Query
 */
export const useLogoutMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (): Promise<void> => {
      return performRequest<void>({
        method: 'POST',
        url: '/api/auth/logout',
      });
    },
    onSuccess: () => {
      removeLocalStorageItem(ACCESS_TOKEN);
      queryClient.clear();
    },
    onError: () => {
      // Even if logout fails on server, clear local state
      removeLocalStorageItem(ACCESS_TOKEN);
      queryClient.clear();
    },
  });
};
