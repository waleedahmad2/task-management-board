import { Navigate } from 'react-router-dom';

import { useAuth } from '#/context';
import { ROUTES } from '#/routes';

export function PrivateRoute({ children }) {
  const { token } = useAuth();

  if (token) return children;

  return <Navigate to={ROUTES.UN_AUTHORIZED} replace />;
}
