import { ReactNode } from 'react';

import { Navigate } from 'react-router-dom';

import { ROUTES } from '#/constants';
import { useAuth } from '#/context';

interface PrivateRouteProps {
  children: ReactNode;
}

export function PrivateRoute({ children }: PrivateRouteProps) {
  const { token } = useAuth();

  if (token) return children;

  return <Navigate to={ROUTES.UN_AUTHORIZED} replace />;
}
