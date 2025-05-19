import { createContext, useContext, useState, useEffect } from 'react';

import { ACCESS_TOKEN } from '#/utils/constants';
import { getLocalStorageItem, setLocalStorageItem, removeLocalStorageItem } from '#/utils/localStorage';

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const localStorageToken = getLocalStorageItem(ACCESS_TOKEN);
  const [token, setToken] = useState(localStorageToken);

  const login = newToken => {
    setToken(newToken);
    setLocalStorageItem(ACCESS_TOKEN, newToken);
  };

  const logout = () => {
    setToken(null);
    removeLocalStorageItem(ACCESS_TOKEN);
  };

  useEffect(() => {
    if (localStorageToken !== token) setToken(localStorageToken);
  }, [localStorageToken]);

  return <AuthContext.Provider value={{ token, login, logout }}>{children}</AuthContext.Provider>;
}

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error('useAuth must be used within an AuthProvider');
  return context;
};
