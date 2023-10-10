import {QueryClient, QueryClientProvider} from '@tanstack/react-query';
import {ReactQueryDevtools} from '@tanstack/react-query-devtools';
import React from 'react';
import CacheBuster from 'react-cache-buster';
import ReactDOM from 'react-dom/client';
import {createBrowserRouter, RouterProvider} from 'react-router-dom';
import {ToastContainer} from 'react-toastify';

import App from './App.jsx';
import ErrorPage from './ErrorPage.jsx';
import {version} from '../package.json';

const queryClient = new QueryClient();
const router = createBrowserRouter(
  [
    {
      path: '/',
      element: <App />,
      errorElement: <ErrorPage />,
    },
  ],
  {basename: '/app'}
);

const isCacheBusterEnable = import.meta.env.VITE_CACHE_BUSTER === 'enable' ? true : false;

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <CacheBuster
        currentVersion={version}
        isEnabled={isCacheBusterEnable}
        isVerboseMode={false}
        metaFileDirectory={'.'}
      >
        <RouterProvider router={router} />
      </CacheBuster>
      <ToastContainer />
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  </React.StrictMode>
);
