import { createContext, useContext, useState, ReactNode } from 'react';

import { ACCESS_TOKEN } from '#/constants';
import { AuthService } from '#/services/authService';
import { User } from '#/types/auth/auth.types';
import { getLocalStorageItem, setLocalStorageItem, removeLocalStorageItem } from '#/utils/localStorage';

interface AuthContextType {
  user: User | null;
  token: string | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (newToken: string) => void;
  logout: () => void;
  isAdmin: () => boolean;
  isMember: () => boolean;
  canDelete: () => boolean;
  canCreateOrUpdate: () => boolean;
  getUserRole: () => string | null;
  getUserEmail: () => string | null;
  getUserId: () => string | null;
}

const AuthContext = createContext<AuthContextType | null>(null);

interface AuthProviderProps {
  children: ReactNode;
}

export function AuthProvider({ children }: AuthProviderProps) {
  const [user, setUser] = useState<User | null>(null);
  const [token, setToken] = useState<string | null>(() => getLocalStorageItem(ACCESS_TOKEN) as string | null);
  const [isLoading] = useState<boolean>(false);

  const login = (newToken: string): void => {
    setToken(newToken);
    setLocalStorageItem(ACCESS_TOKEN, newToken);

    AuthService.validateToken(newToken)
      .then(userData => userData && setUser(userData))
      .catch(error => {
        console.error('Token validation failed during login:', error);
        logout();
      });
  };

  const logout = (): void => {
    setUser(null);
    setToken(null);
    removeLocalStorageItem(ACCESS_TOKEN);
  };

  const isAuthenticated = user !== null && token !== null;

  const isAdmin = (): boolean => (user ? AuthService.isAdmin(user) : false);
  const isMember = (): boolean => (user ? AuthService.isMember(user) : false);
  const canDelete = (): boolean => (user ? AuthService.canDelete(user) : false);
  const canCreateOrUpdate = (): boolean => AuthService.canCreateOrUpdate();
  const getUserRole = (): string | null => user?.role || null;
  const getUserEmail = (): string | null => user?.email || null;
  const getUserId = (): string | null => user?.id || null;

  return (
    <AuthContext.Provider
      value={{
        user,
        token,
        isAuthenticated,
        isLoading,
        login,
        logout,
        isAdmin,
        isMember,
        canDelete,
        canCreateOrUpdate,
        getUserRole,
        getUserEmail,
        getUserId,
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
