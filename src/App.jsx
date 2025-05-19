import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { RouterProvider } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';

import { router } from '#/routes';
import { useSentry, useSetupAxios } from '#/services';

function App() {
  const queryClient = new QueryClient();

  useSetupAxios();
  useSentry();

  return (
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={router} />
      <ToastContainer />
      <ReactQueryDevtools />
    </QueryClientProvider>
  );
}

export default App;
