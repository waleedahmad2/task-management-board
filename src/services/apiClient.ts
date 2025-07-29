import axiosInstance from './axiosInstance';

interface RequestParams {
  url: string;
  params?: Record<string, any>;
}

interface RequestWithPayload extends RequestParams {
  payload?: any;
}

export const performGetRequest = ({ url, params = {} }: RequestParams): Promise<any> =>
  axiosInstance.get(url, { params });

export const performPostRequest = ({ url, payload = {}, params = {} }: RequestWithPayload): Promise<any> =>
  axiosInstance.post(url, payload, { params });

export const performPutRequest = ({ url, payload = {}, params = {} }: RequestWithPayload): Promise<any> =>
  axiosInstance.put(url, payload, { params });

export const performPatchRequest = ({ url, payload = {}, params = {} }: RequestWithPayload): Promise<any> =>
  axiosInstance.patch(url, payload, { params });

export const performDeleteRequest = ({ url, payload = {}, params = {} }: RequestWithPayload): Promise<any> =>
  axiosInstance.delete(url, { data: payload, params });
