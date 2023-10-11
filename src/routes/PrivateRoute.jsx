import { getLocalStorageItem } from '@utils';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import { ROUTES } from './Routes';

const PrivateRoute = props => {
  const navigate = useNavigate();

  useEffect(() => {
    if (!getLocalStorageItem('accessToken')) {
      navigate(ROUTES.UN_AUTHORIZED, { replace: true });
    }
  }, []);

  const { children } = props;

  return children;
};

export default PrivateRoute;
