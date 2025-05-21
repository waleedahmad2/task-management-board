import { Navigate } from 'react-router-dom';

import { ROUTES } from '#/constants';
import { useAuth } from '#/context';

export function PrivateRoute({ children }) {
  const { token } = useAuth();

  if (token) return children;

  return <Navigate to={ROUTES.UN_AUTHORIZED} replace />;
}
