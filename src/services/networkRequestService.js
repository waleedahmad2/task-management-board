import {useQuery, useMutation} from '@tanstack/react-query';

import {
  performDeleteRequest,
  performGetRequest,
  performPatchRequest,
  performPostRequest,
  performPutRequest,
} from './apiClient';

export const useGetQuery = (key, url, params = {}) => {
  return useQuery({
    queryKey: [key],
    queryFn: () => {
      return performGetRequest({url, params});
    },
  });
};

export const usePostMutation = (url, onSuccess, onError) => {
  return useMutation({
    mutationFn: ({data, params}) => {
      return performPostRequest({url, data, params});
    },
    onSuccess,
    onError,
  });
};

export const useUpdateMutation = (url, onSuccess, onError) => {
  return useMutation({
    mutationFn: ({data, params}) => {
      return performPatchRequest({url, data, params});
    },
    onSuccess,
    onError,
  });
};

export const usePutMutation = (url, onSuccess, onError) => {
  return useMutation({
    mutationFn: ({data, params}) => {
      return performPutRequest({url, data, params});
    },
    onSuccess,
    onError,
  });
};

export const useDeleteMutation = (url, onSuccess, onError) => {
  return useMutation({
    mutationFn: ({data, params}) => {
      return performDeleteRequest({url, data, params});
    },
    onSuccess,
    onError,
  });
};
