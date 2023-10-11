import axios from 'axios';

const getUrl = relativeUrl => `${import.meta.env.VITE_BACKEND_BASE_URL}${relativeUrl}`;

export const performGetRequest = ({url, params = {}}) => axios.get(getUrl(url), {params});

export const performPostRequest = ({url, data = {}, params = {}}) => axios.post(getUrl(url), data, {params});

export const performPutRequest = (url, data = {}, params = {}) => axios.put(getUrl(url), data, {params});

export const performPatchRequest = (url, data = {}, params = {}) => axios.patch(getUrl(url), data, {params});

export const performDeleteRequest = (url, data = {}, params = {}) => axios.delete(getUrl(url), {params: params, data});
