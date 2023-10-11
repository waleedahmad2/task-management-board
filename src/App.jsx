import { router } from '@routes';
import { useSentry, useSetupAxios } from '@services';
import { RouterProvider } from 'react-router-dom';

function App() {
  useSetupAxios();
  useSentry();

  return <RouterProvider router={router} />;
}

export default App;
