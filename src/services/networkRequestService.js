import { useQuery, useMutation } from '@tanstack/react-query';

import {
  performDeleteRequest,
  performGetRequest,
  performPatchRequest,
  performPostRequest,
  performPutRequest,
} from './apiClient';

export const useGetQuery = (key, url, params = {}, options) => {
  const requestOptions = options ? options : { refetchOnWindowFocus: false, retry: false };
  return useQuery({
    queryKey: [key],
    queryFn: () => {
      return performGetRequest({ url, params });
    },
    ...requestOptions,
  });
};

export const usePostMutation = (url, onSuccess, onError) => {
  return useMutation({
    mutationFn: ({ payload, params }) => {
      return performPostRequest({ url, payload, params });
    },
    onSuccess,
    onError,
  });
};

export const useUpdateMutation = (url, onSuccess, onError) => {
  return useMutation({
    mutationFn: ({ payload, params }) => {
      return performPatchRequest({ url, payload, params });
    },
    onSuccess,
    onError,
  });
};

export const usePutMutation = (url, onSuccess, onError) => {
  return useMutation({
    mutationFn: ({ payload, params }) => {
      return performPutRequest({ url, payload, params });
    },
    onSuccess,
    onError,
  });
};

export const useDeleteMutation = (url, onSuccess, onError) => {
  return useMutation({
    mutationFn: ({ payload, params }) => {
      return performDeleteRequest({ url, payload, params });
    },
    onSuccess,
    onError,
  });
};
