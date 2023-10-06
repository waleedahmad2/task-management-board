import * as Sentry from '@sentry/react';
import {QueryClient, QueryClientProvider} from '@tanstack/react-query';
import {ReactQueryDevtools} from '@tanstack/react-query-devtools';
import React, {useEffect, useLocation, useNavigationType, createRoutesFromChildren, matchRoutes} from 'react';
import CacheBuster from 'react-cache-buster';
import ReactDOM from 'react-dom/client';
import {createBrowserRouter, RouterProvider} from 'react-router-dom';
import {ToastContainer} from 'react-toastify';

import App from './App.jsx';
import ErrorPage from './ErrorPage.jsx';
import {version} from '../package.json';


const queryClient = new QueryClient();

if (!import.meta.env.VITE_SENTRY_DSN) {
  Sentry.init({
    dsn: import.meta.env.VITE_SENTRY_DSN,
    integrations: [
      new Sentry.BrowserTracing({
        // See docs for support of different versions of variation of react router
        // https://docs.sentry.io/platforms/javascript/guides/react/configuration/integrations/react-router/
        routingInstrumentation: Sentry.reactRouterV6Instrumentation(
          useEffect,
          useLocation,
          useNavigationType,
          createRoutesFromChildren,
          matchRoutes
        ),
      }),
      new Sentry.Replay(),
    ],
    // Transactions for performance monitoring.
    tracesSampleRate: import.meta.env.VITE_SENTRY_SAMPLE_RATE,
    // Capture replay for sessions,
    replaysSessionSampleRate: import.meta.env.VITE_SENTRY_REPLAYS_SESSION_SAMPLE_RATE,
    // Capture sessions with an error
    replaysOnErrorSampleRate: import.meta.env.VITE_REPLAYS_ON_ERROR_SAMPLE_RATE,
  });
}

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

const isCacheBusterEnable = ['stage', 'prod'].includes(import.meta.env.VITE_ENV);

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
