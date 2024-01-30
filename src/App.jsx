import { useState } from 'react';
import { RouterProvider } from 'react-router-dom';
import { router } from '@routes';
import { useSentry, useSetupAxios } from '@services';
import { AppContext } from '@useContext';

function App() {
  useSetupAxios();
  useSentry();

  // eslint-disable-next-line no-unused-vars
  const [permissions, setPermissions] = useState('');

  return (
    <AppContext.Provider value={permissions}>
      <RouterProvider router={router} />
    </AppContext.Provider>
  );
}

export default App;
