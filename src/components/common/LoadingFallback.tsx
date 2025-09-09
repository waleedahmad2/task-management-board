import { JSX } from 'react';

/**
 * Loading fallback component with spinner
 * Used for showing loading states throughout the application
 */
export function LoadingFallback(): JSX.Element {
  return (
    <div className="flex items-center justify-center h-screen">
      <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-indigo-600" />
    </div>
  );
}
