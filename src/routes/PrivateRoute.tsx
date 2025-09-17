import { Navigate } from 'react-router-dom';

import { LoadingFallback } from '#/components/common/LoadingFallback';
import { ROUTES } from '#/constants';
import { useAuth } from '#/context';
import type { PrivateRouteProps } from '#/types/routes.types';

/**
 * Private route component that protects routes requiring authentication
 * Shows loading state while checking authentication
 * Redirects to auth page if not authenticated
 */
export function PrivateRoute({ children }: PrivateRouteProps) {
  const { isAuthenticated } = useAuth();

  // Redirect to auth page if not authenticated
  if (!isAuthenticated) {
    return <Navigate to={ROUTES.AUTH} replace />;
  }

  return <>{children}</>;
}
