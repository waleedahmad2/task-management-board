import { Home } from '@pages/home';
import { Unauthorized } from '@pages/unauthorized';
import { Route, createBrowserRouter, createRoutesFromElements } from 'react-router-dom';

import PrivateRoute from './PrivateRoute';
import { ROUTES } from './Routes';

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
      {/* <Route path={ROUTES.HOME} element={createPrivateRoute(Home)} /> */}
      <Route path={ROUTES.HOME} element={<Home />} />
      <Route path={ROUTES.UN_AUTHORIZED} element={<Unauthorized />} />
    </>
  ),
  { basename: '/app' }
);
