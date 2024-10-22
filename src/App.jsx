import { useEffect } from 'react';

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import CacheBuster from 'react-cache-buster';
import { RouterProvider } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';

import { router } from '#/routes';
import { useSentry, useSetupAxios } from '#/services';
import { version } from '../package.json';

function App() {
  const queryClient = new QueryClient();

  const isCacheBusterEnable = !!Number(import.meta.env.VITE_CACHE_BUSTER);

  const enableAxiosInterceptor = useSetupAxios;
  const enableSentry = useSentry;

  useEffect(() => {
    enableAxiosInterceptor();
    enableSentry();
  }, []);

  return (
    <QueryClientProvider client={queryClient}>
      <CacheBuster currentVersion={version} isEnabled={isCacheBusterEnable} metaFileDirectory={'.'}>
        <RouterProvider router={router} />
      </CacheBuster>
      <ToastContainer />
      <ReactQueryDevtools />
    </QueryClientProvider>
  );
}

export default App;
