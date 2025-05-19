import { useEffect } from 'react';

import * as Sentry from '@sentry/react';
import { reactRouterV6BrowserTracingIntegration } from '@sentry/react';
import { createRoutesFromChildren, matchRoutes, useLocation, useNavigationType } from 'react-router-dom';

const useSentry = () => {
  const enableSentry = Boolean(Number(import.meta.env.VITE_SENTRY)) && Boolean(import.meta.env.VITE_SENTRY_DSN);

  if (enableSentry) {
    Sentry.init({
      dsn: import.meta.env.VITE_SENTRY_DSN,
      integrations: [
        reactRouterV6BrowserTracingIntegration({
          useEffect,
          useLocation,
          useNavigationType,
          createRoutesFromChildren,
          matchRoutes,
        }),
      ],
      tracesSampleRate: import.meta.env.VITE_SENTRY_SAMPLE_RATE,
      replaysSessionSampleRate: import.meta.env.VITE_SENTRY_REPLAYS_SESSION_SAMPLE_RATE,
      replaysOnErrorSampleRate: import.meta.env.VITE_REPLAYS_ON_ERROR_SAMPLE_RATE,
    });
  }
};

export default useSentry;
