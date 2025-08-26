import type { AxiosRequestConfig, Method } from 'axios';

import axiosInstance from './axiosInstance';

export const performRequest = async <
  TResponse,
  TPayload extends Record<string, unknown> | undefined = undefined,
  TParams extends Record<string, unknown> = Record<string, unknown>,
>({
  method,
  url,
  payload,
  params,
  config,
}: {
  method: Method;
  url: string;
  payload?: TPayload;
  params?: TParams;
  config?: AxiosRequestConfig;
}): Promise<TResponse> => {
  const res = await axiosInstance.request<TResponse>({
    method,
    url,
    params,
    data: payload, // works for POST/PUT/PATCH/DELETE; ignored for GET
    ...config,
  });
  return res.data;
};
