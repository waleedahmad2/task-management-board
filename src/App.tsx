import { JSX } from 'react';

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { ErrorBoundary } from 'react-error-boundary';
import { RouterProvider } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';

import { ErrorFallback } from '#/components';
import { TooltipProvider } from '#/components/ui/tooltip';
import { router } from '#/routes';
import { AuthProvider, FeatureFlagProvider } from './context';

function App(): JSX.Element {
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        retry: false,
        refetchOnWindowFocus: false,
      },
    },
  });

  return (
    <ErrorBoundary FallbackComponent={ErrorFallback} onReset={() => window.location.reload()}>
      <QueryClientProvider client={queryClient}>
        <AuthProvider>
          <FeatureFlagProvider>
            <TooltipProvider>
              <RouterProvider router={router} />
              <ToastContainer />
              {/* <ReactQueryDevtools /> */}
            </TooltipProvider>
          </FeatureFlagProvider>
        </AuthProvider>
      </QueryClientProvider>
    </ErrorBoundary>
  );
}

export default App;
