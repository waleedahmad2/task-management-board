import React, { lazy, Suspense, JSX } from 'react';

import { Route, createBrowserRouter, createRoutesFromElements, Navigate } from 'react-router-dom';

import { LoadingFallback } from '#/components/common/LoadingFallback';
import { ROUTES } from '#/constants';
import { PrivateRoute } from '#/routes/PrivateRoute';
import { Layout } from '#/components/layout/Layout';
import { appSidebarRoutes } from '#/routes/appSidebarRoutes';

const LoginPage = lazy(() => import('#/pages/LoginPage'));
const Unauthorized = lazy(() => import('#/pages/UnauthorizedPage'));
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
      {/* Auth routes */}
      <Route
        path={ROUTES.AUTH}
        element={
          <Suspense fallback={<LoadingFallback />}>
            <LoginPage />
          </Suspense>
        }
      />

      {/* Protected app routes with layout */}
      <Route path={ROUTES.HOME} element={createPrivateRoute(Layout)}>
        {/* Default redirect to Projects */}
        <Route index element={<Navigate to={ROUTES.PROJECTS} replace />} />
        {appSidebarRoutes.map(({ path, Component }) => (
          <Route
            key={path}
            path={path}
            element={
              <Suspense fallback={<LoadingFallback />}>
                <Component />
              </Suspense>
            }
          />
        ))}
      </Route>

      {/* Unauthorized */}
      <Route
        path={ROUTES.UN_AUTHORIZED}
        element={
          <Suspense fallback={<LoadingFallback />}>
            <Unauthorized />
          </Suspense>
        }
      />

      {/* 404 */}
      <Route
        path='*'
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
