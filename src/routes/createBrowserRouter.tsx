import React, { lazy, Suspense, JSX } from 'react';

import { Route, createBrowserRouter, createRoutesFromElements } from 'react-router-dom';

import { ROUTES } from '#/constants';
import { PrivateRoute } from '#/routes/PrivateRoute';
import { LoadingFallback } from '#/components/common/LoadingFallback';

const Home = lazy(() => import('#/pages/Home'));
const LoginPage = lazy(() => import('#/pages/LoginPage'));
const Unauthorized = lazy(() => import('#/pages/Unauthorized'));
const NotFoundPage = lazy(() => import('#/pages/NotFoundPage'));


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
      <Route path={ROUTES.HOME} element={createPrivateRoute(Home)} />
      <Route
        path={ROUTES.AUTH}
        element={
          <Suspense fallback={<LoadingFallback />}>
            <LoginPage />
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
      <Route
        path="*"
        element={
          <Suspense fallback={<LoadingFallback />}>
            <NotFoundPage />
          </Suspense>
        }
      />
    </>
  ),
  { basename: '/app' }
);
