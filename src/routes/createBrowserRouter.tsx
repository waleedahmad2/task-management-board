import React, { lazy, Suspense, JSX } from 'react';

import { Route, createBrowserRouter, createRoutesFromElements, Navigate } from 'react-router-dom';

import { LoadingFallback } from '#/components/common';
import { Layout } from '#/components/layout';
import { ROUTES } from '#/constants';
import { appSidebarRoutes } from '#/routes/appSidebarRoutes';
import { PrivateRoute } from '#/routes/PrivateRoute';
import { PublicRoute } from '#/routes/PublicRoute';

const LoginPage = lazy(() => import('#/pages/LoginPage'));
const Unauthorized = lazy(() => import('#/pages/UnauthorizedPage'));
const NotFoundPage = lazy(() => import('#/pages/NotFoundPage'));
const ProjectBoardPage = lazy(() => import('#/pages/ProjectBoardPage'));
const TaskDetailPage = lazy(() => import('#/pages/TaskDetailPage'));

export const createPrivateRoute = (Component: React.ComponentType): JSX.Element => {
  return (
    <PrivateRoute>
      <Suspense fallback={<LoadingFallback />}>
        <Component />
      </Suspense>
    </PrivateRoute>
  );
};

export const createPublicRoute = (Component: React.ComponentType): JSX.Element => {
  return (
    <PublicRoute>
      <Suspense fallback={<LoadingFallback />}>
        <Component />
      </Suspense>
    </PublicRoute>
  );
};

export const router = createBrowserRouter(
  createRoutesFromElements(
    <>
      {/* Auth routes */}
      <Route
        path={ROUTES.AUTH}
        element={createPublicRoute(LoginPage)}
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

        {/* Project Board Route */}
        <Route path={ROUTES.PROJECT_BOARD} element={createPrivateRoute(ProjectBoardPage)} />
        
        {/* Task Detail Route */}
        <Route path={ROUTES.TASK_DETAIL} element={createPrivateRoute(TaskDetailPage)} />
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
