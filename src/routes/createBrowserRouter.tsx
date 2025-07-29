import React, { lazy, Suspense, JSX } from 'react';

import { Route, createBrowserRouter, createRoutesFromElements } from 'react-router-dom';

import { ROUTES } from '#/constants';
import { PrivateRoute } from '#/routes/PrivateRoute';

const Home = lazy(() => import('#/pages/Home'));
const Unauthorized = lazy(() => import('#/pages/Unauthorized'));

// replace this with your own loading component
const LoadingFallback = (): JSX.Element => (
  <div className='flex items-center justify-center h-screen'>
    <div className='animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary' />
  </div>
);

export const createPrivateRoute = (Component: React.ComponentType): JSX.Element => {
  return (
    <PrivateRoute>
      <Suspense fallback={<LoadingFallback />}>
        <Component />
      </Suspense>
    </PrivateRoute>
  );
};

export const router = createBrowserRouter(
  createRoutesFromElements(
    <>
      <Route
        path={ROUTES.HOME}
        element={
          <Suspense fallback={<LoadingFallback />}>
            <Home />
          </Suspense>
        }
      />
      <Route
        path={ROUTES.UN_AUTHORIZED}
        element={
          <Suspense fallback={<LoadingFallback />}>
            <Unauthorized />
          </Suspense>
        }
      />
    </>
  ),
  { basename: '/app' }
);
