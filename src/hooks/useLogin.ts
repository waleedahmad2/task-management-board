import { useState } from 'react';

import { showToast } from '#/components/common';
import { MESSAGES } from '#/constants';
import { useAuth } from '#/context';
import { LoginFormData } from '#/schemas/authSchema';
import { AuthService } from '#/services/authService';

export function useLogin() {
  const { AUTH } = MESSAGES;

  const { LOGIN_SUCCESS, LOGIN_ERROR, LOGOUT_SUCCESS } = AUTH;

  const { login, logout } = useAuth();
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);

  const handleLogin = async (data: LoginFormData, onSuccess?: () => void): Promise<void> => {
    setIsSubmitting(true);

    try {
      const response = await AuthService.login({ email: data.email });
      await login(response.token);
      showToast('success', LOGIN_SUCCESS);
      onSuccess?.();
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : LOGIN_ERROR;
      showToast('error', errorMessage);
      throw error;
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleLogout = (): void => {
    logout();
    showToast('success', LOGOUT_SUCCESS);
  };

  return {
    isSubmitting,
    handleLogin,
    handleLogout,
  };
}
