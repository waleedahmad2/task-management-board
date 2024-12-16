import { Navigate } from 'react-router-dom';

import { ACCESS_TOKEN } from '#/utils/constants';
import { ROUTES } from '#/routes';
import { getLocalStorageItem } from '#/utils/localStorage';

export function PrivateRoute({ children }) {
  if (getLocalStorageItem(ACCESS_TOKEN)) return children;

  return <Navigate to={ROUTES.UN_AUTHORIZED} replace />;
}
