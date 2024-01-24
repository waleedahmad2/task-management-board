import { router } from '@routes';
import { useSentry, useSetupAxios } from '@services';
import { AppContext } from '@useContext';
import { isEmpty } from 'lodash';
import { useEffect, useState } from 'react';
import { RouterProvider } from 'react-router-dom';

function App() {
  useSetupAxios();
  useSentry();

  // eslint-disable-next-line no-unused-vars
  const [permissions, setPermissions] = useState('');

  useEffect(() => {
    console.log(isEmpty({}));
  }, []);

  return (
    <AppContext.Provider value={permissions}>
      <RouterProvider router={router} />
    </AppContext.Provider>
  );
}

export default App;
