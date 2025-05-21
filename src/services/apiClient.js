import axios from 'axios';

import env from '#env';

export const axiosInstance = axios.create({
  baseURL: env.VITE_BACKEND_BASE_URL,
});

export const cleanupAxiosInstance = () => {
  axiosInstance.interceptors.request.clear();
  axiosInstance.interceptors.response.clear();
};

export const performGetRequest = ({ url, params = {} }) => axiosInstance.get(url, { params });

export const performPostRequest = ({ url, payload = {}, params = {} }) => axiosInstance.post(url, payload, { params });

export const performPutRequest = (url, payload = {}, params = {}) => axiosInstance.put(url, payload, { params });

export const performPatchRequest = (url, payload = {}, params = {}) => axiosInstance.patch(url, payload, { params });

export const performDeleteRequest = (url, payload = {}, params = {}) =>
  axiosInstance.delete(url, { params: params, payload });
