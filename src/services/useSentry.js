import { useEffect } from 'react';

import * as Sentry from '@sentry/react';
import { createRoutesFromChildren, matchRoutes, useLocation, useNavigationType } from 'react-router-dom';

export const useSentry = () => {
  const enableSentry = !!Number(import.meta.env.VITE_SENTRY) && !!import.meta.env.VITE_SENTRY_DSN;

  if (enableSentry) {
    Sentry.init({
      dsn: import.meta.env.VITE_SENTRY_DSN,
      integrations: [
        new Sentry.BrowserTracing({
          routingInstrumentation: Sentry.reactRouterV6Instrumentation(
            useEffect,
            useLocation,
            useNavigationType,
            createRoutesFromChildren,
            matchRoutes
          ),
        }),
      ],
      tracesSampleRate: import.meta.env.VITE_SENTRY_SAMPLE_RATE,
      replaysSessionSampleRate: import.meta.env.VITE_SENTRY_REPLAYS_SESSION_SAMPLE_RATE,
      replaysOnErrorSampleRate: import.meta.env.VITE_REPLAYS_ON_ERROR_SAMPLE_RATE,
    });
  }
};
