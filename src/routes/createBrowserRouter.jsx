import { Route, createBrowserRouter, createRoutesFromElements } from 'react-router-dom';

import { Home } from '#/pages/home';
import { Unauthorized } from '#/pages/unauthorized';
import { PrivateRoute } from '#/routes';
import { ROUTES } from '#/constants';

// eslint-disable-next-line no-unused-vars
const createPrivateRoute = Component => {
  return (
    <PrivateRoute>
      <Component />
    </PrivateRoute>
  );
};

export const router = createBrowserRouter(
  createRoutesFromElements(
    <>
      <Route path={ROUTES.HOME} element={<Home />} />
      <Route path={ROUTES.UN_AUTHORIZED} element={<Unauthorized />} />
    </>
  ),
  { basename: '/app' }
);
