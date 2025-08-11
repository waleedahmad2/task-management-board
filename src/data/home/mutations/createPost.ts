import { useMutation, UseMutationOptions, UseMutationResult } from '@tanstack/react-query';

import { apiEndpoints } from '#/constants';
import { performPostRequest } from '#/services/apiClient';
import type { CreatePostResponse, CreatePostVariables } from '#/types/home/api.types';
/**
 * Custom hook to send a POST request to create a new user.
 *
 * This mutation will typically be used in:
 * `data/home/mutations/createPosts.js` to separate the data layer from components.
 *

 *
 */

export const useCreatePost = (
  onSuccess?: (data: CreatePostResponse) => void,
  onError?: (error: Error) => void,
  options?: UseMutationOptions<CreatePostResponse, Error, CreatePostVariables>
): UseMutationResult<CreatePostResponse, Error, CreatePostVariables> => {
  return useMutation<CreatePostResponse, Error, CreatePostVariables>({
    mutationFn: ({ payload = {}, params = {} }: CreatePostVariables = {}) => {
      return performPostRequest({
        url: apiEndpoints.POSTS,
        payload,
        params,
      });
    },
    onSuccess,
    onError,
    ...options,
  });
};
