import { useEffect } from 'react';

import * as caseConverter from 'change-object-case';

import { useAuth } from '#/context';
import { cleanupAxiosInstance, axiosInstance } from '#/services/apiClient';

const options = { recursive: true, arrayRecursive: true };

const useSetupAxios = () => {
  const { token: accessToken } = useAuth();

  useEffect(() => {
    axiosInstance.interceptors.request.use(config => {
      if (accessToken) config.headers.Authorization = `Bearer ${accessToken}`;

      if (!(config?.data instanceof FormData)) {
        const caseConvertedData = caseConverter.snakeKeys(config?.data, options);
        config.data = caseConvertedData;
      }

      const caseConvertedData = caseConverter.snakeKeys(config.params);
      config.params = caseConvertedData;

      return config;
    });

    axiosInstance.interceptors.response.use(
      response => {
        const caseConvertedData = caseConverter.camelKeys(response?.data, options);
        response.data = caseConvertedData;
        return response;
      },
      error => {
        return Promise.reject(error);
      }
    );

    return () => {
      cleanupAxiosInstance();
    };
  }, [accessToken]);
};

export default useSetupAxios;
