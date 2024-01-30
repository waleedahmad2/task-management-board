import { ACCESS_TOKEN } from '@constants';
import { ROUTES } from '@routes';
import { getLocalStorageItem } from '@utils';
import { Navigate } from 'react-router-dom';

export function PrivateRoute({ children }) {
  if (!getLocalStorageItem(ACCESS_TOKEN)) return <Navigate to={ROUTES.UN_AUTHORIZED} replace />;

  return children;
}
