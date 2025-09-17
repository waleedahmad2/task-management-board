import { UserRole } from '#/types/auth/auth.types';

/**
 * Simple permission utilities for role-based access control
 */
export const canDelete = (userRole: UserRole | undefined): boolean => {
  return userRole === 'admin';
};

export const canCreate = (userRole: UserRole | undefined): boolean => {
  return userRole === 'admin';
};

export const canUpdate = (userRole: UserRole | undefined): boolean => {
  return userRole === 'admin' || userRole === 'member';
};

export const canView = (userRole: UserRole | undefined): boolean => {
  return userRole === 'admin' || userRole === 'member';
};
