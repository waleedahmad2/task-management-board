import { Navigate } from 'react-router-dom';
import { ROUTES } from '@routes';
import { getLocalStorageItem } from '@utils';
import { ACCESS_TOKEN } from '@constants';

export function PrivateRoute({ children }) {
  if (!getLocalStorageItem(ACCESS_TOKEN)) return <Navigate to={ROUTES.UN_AUTHORIZED} replace />;

  return children;
}
