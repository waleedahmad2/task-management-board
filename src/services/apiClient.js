import axiosInstance from './axiosInstance';

export const performGetRequest = ({ url, params = {} }) => axiosInstance.get(url, { params });

export const performPostRequest = ({ url, payload = {}, params = {} }) => axiosInstance.post(url, payload, { params });

export const performPutRequest = ({ url, payload = {}, params = {} }) => axiosInstance.put(url, payload, { params });

export const performPatchRequest = ({ url, payload = {}, params = {} }) =>
  axiosInstance.patch(url, payload, { params });

export const performDeleteRequest = ({ url, payload = {}, params = {} }) =>
  axiosInstance.delete(url, { data: payload, params });
