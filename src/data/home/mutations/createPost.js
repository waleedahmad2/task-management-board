import { useMutation } from '@tanstack/react-query';

import { apiEndpoints } from '#/constants';
import { performPostRequest } from '#/services/apiClient';

/**
 * Custom hook to send a POST request to create a new user.
 *
 * This mutation will typically be used in:
 * `data/home/mutations/createPosts.js` to separate the data layer from components.
 *
 * @param {Function} onSuccess - Callback function called on successful mutation.
 * @param {Function} onError - Callback function called on mutation error.
 * @returns {Object} - Contains `mutate`, `isPending`, `error`, and other mutation state.
 *
 */

export const useCreatePost = (onSuccess, onError) => {
  return useMutation({
    mutationFn: ({ payload = {}, params = {}, config = {} } = {}) => {
      return performPostRequest({
        url: apiEndpoints.POST_CREATE_USER,
        payload,
        params,
        config,
      });
    },
    onSuccess,
    onError,
  });
};
