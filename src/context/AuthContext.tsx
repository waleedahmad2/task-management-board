import { createContext, useContext, useState, ReactNode } from 'react';

import { ACCESS_TOKEN } from '#/constants';
import { User } from '#/types/auth/auth.types';
import { getLocalStorageItem, setLocalStorageItem, removeLocalStorageItem } from '#/utils';

interface AuthContextType {
  user: User | null;
  token: string | null;
  isAuthenticated: boolean;
  login: (newToken: string, userData?: User) => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | null>(null);

interface AuthProviderProps {
  children: ReactNode;
}

export function AuthProvider({ children }: AuthProviderProps) {
  const localStorageToken = getLocalStorageItem(ACCESS_TOKEN) as string | null;
  const localStorageUser = getLocalStorageItem('USER_DATA') as User | null;

  const [token, setToken] = useState<string | null>(localStorageToken);
  const [user, setUser] = useState<User | null>(localStorageUser);

  const login = (newToken: string, userData?: User): void => {
    setToken(newToken);
    setLocalStorageItem(ACCESS_TOKEN, newToken);

    if (userData) {
      setUser(userData);
      setLocalStorageItem('USER_DATA', userData);
    }
  };

  const logout = (): void => {
    removeLocalStorageItem(ACCESS_TOKEN);
    removeLocalStorageItem('USER_DATA');
    setToken(null);
    setUser(null);
  };

  const isAuthenticated = !!token;

  return (
    <AuthContext.Provider
      value={{
        user,
        token,
        isAuthenticated,
        login,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (!context) throw new Error('useAuth must be used within an AuthProvider');
  return context;
};
