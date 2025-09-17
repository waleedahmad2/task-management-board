/**
 * User role types for role-based access control
 */
export type UserRole = 'admin' | 'member';

/**
 * User interface representing the authenticated user
 */
export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
}

/**
 * Authentication context interface
 */
export interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  login: (email: string) => Promise<void>;
  logout: () => void;
  isLoading: boolean;
}

/**
 * Login request interface
 */
export interface LoginRequest extends Record<string, unknown> {
  email: string;
}

/**
 * Login response interface
 */
export interface LoginResponse {
  user: User;
  token: string;
}

/**
 * Mock user data for development
 */
export interface MockUser {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  password?: never; // No password needed for email-only auth
}
