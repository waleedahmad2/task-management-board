import axios from 'axios';

export const performGetRequest = ({ url, params = {} }) => axios.get(url, { params });

export const performPostRequest = ({ url, payload = {}, params = {} }) => axios.post(url, payload, { params });

export const performPutRequest = (url, payload = {}, params = {}) => axios.put(url, payload, { params });

export const performPatchRequest = (url, payload = {}, params = {}) => axios.patch(url, payload, { params });

export const performDeleteRequest = (url, payload = {}, params = {}) => axios.delete(url, { params: params, payload });
