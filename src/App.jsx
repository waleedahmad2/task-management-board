import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { RouterProvider } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';

import { AuthProvider } from '#/context';
import { router } from '#/routes';
import { useSetupAxios, useSentry } from '#/hooks';

function AppContent() {
  const queryClient = new QueryClient();
  useSetupAxios();
  return (
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={router} />
      <ToastContainer />
      <ReactQueryDevtools />
    </QueryClientProvider>
  );
}

function App() {
  useSentry();

  return (
    <AuthProvider>
      <AppContent />
    </AuthProvider>
  );
}

export default App;
