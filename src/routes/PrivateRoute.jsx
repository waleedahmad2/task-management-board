import { ROUTES } from '@routes';
import { ACCESS_TOKEN, getLocalStorageItem } from '@utils';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

export function PrivateRoute({ children }) {
  const navigate = useNavigate();

  useEffect(() => {
    if (!getLocalStorageItem(ACCESS_TOKEN)) {
      navigate(ROUTES.UN_AUTHORIZED, { replace: true });
    }
  }, []);

  return children;
}
