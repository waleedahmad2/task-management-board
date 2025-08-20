import type { RequestParams, RequestWithPayload } from '#/types/apiClient.types';
import axiosInstance from './axiosInstance';

// Generic GET
export const performGetRequest = <TResponse, TParams extends Record<string, unknown> = Record<string, unknown>>({
  url,
  params = {} as TParams,
}: RequestParams<TParams>): Promise<TResponse> => axiosInstance.get<TResponse>(url, { params }).then(res => res.data);

// Generic POST
export const performPostRequest = <
  TResponse,
  TPayload extends Record<string, unknown>,
  TParams extends Record<string, unknown> = Record<string, unknown>,
>({
  url,
  payload = {} as TPayload,
  params = {} as TParams,
}: RequestWithPayload<TPayload, TParams>): Promise<TResponse> =>
  axiosInstance.post<TResponse>(url, payload, { params }).then(res => res.data);

// Generic PUT
export const performPutRequest = <
  TResponse,
  TPayload extends Record<string, unknown> = Record<string, unknown>,
  TParams extends Record<string, unknown> = Record<string, unknown>,
>({
  url,
  payload = {} as TPayload,
  params = {} as TParams,
}: RequestWithPayload<TPayload, TParams>): Promise<TResponse> =>
  axiosInstance.put<TResponse>(url, payload, { params }).then(res => res.data);

// Generic PATCH
export const performPatchRequest = <
  TResponse,
  TPayload extends Record<string, unknown> = Record<string, unknown>,
  TParams extends Record<string, unknown> = Record<string, unknown>,
>({
  url,
  payload = {} as TPayload,
  params = {} as TParams,
}: RequestWithPayload<TPayload, TParams>): Promise<TResponse> =>
  axiosInstance.patch<TResponse>(url, payload, { params }).then(res => res.data);

// Generic DELETE
export const performDeleteRequest = <
  TResponse,
  TPayload extends Record<string, unknown> = Record<string, unknown>,
  TParams extends Record<string, unknown> = Record<string, unknown>,
>({
  url,
  payload = {} as TPayload,
  params = {} as TParams,
}: RequestWithPayload<TPayload, TParams>): Promise<TResponse> =>
  axiosInstance.delete<TResponse>(url, { data: payload, params }).then(res => res.data);
