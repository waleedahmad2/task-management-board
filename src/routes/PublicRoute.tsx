import { Navigate } from 'react-router-dom';

import { ROUTES } from '#/constants';
import { useAuth } from '#/context';
import type { PublicRouteProps } from '#/types/routes.types';

/**
 * Public route component that redirects authenticated users away from auth pages
 * Redirects to home page if already authenticated
 */
export function PublicRoute({ children }: PublicRouteProps) {
  const { isAuthenticated } = useAuth();

  // Redirect to home page if already authenticated
  if (isAuthenticated) {
    return <Navigate to={ROUTES.HOME} replace />;
  }

  return <>{children}</>;
}
