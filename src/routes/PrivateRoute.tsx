import { Navigate } from 'react-router-dom';

import { ROUTES } from '#/constants';
import { useAuth } from '#/context';
import { LoadingFallback } from '#/components/common/LoadingFallback';
import type { PrivateRouteProps } from '#/types/routes.types';

/**
 * Private route component that protects routes requiring authentication
 * Shows loading state while checking authentication
 * Redirects to auth page if not authenticated
 */
export function PrivateRoute({ children }: PrivateRouteProps) {
  const { isAuthenticated, isLoading } = useAuth();

  // Show loading state while checking authentication
  if (isLoading) {
    return <LoadingFallback />;
  }

  // Redirect to auth page if not authenticated
  if (!isAuthenticated) {
    return <Navigate to={ROUTES.AUTH} replace />;
  }

  return <>{children}</>;
}
