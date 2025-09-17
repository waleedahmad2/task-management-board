import { showToast } from '#/components';
import { MESSAGES } from '#/constants';
import { useAuth } from '#/context';
import { useLoginMutation, useLogoutMutation } from '#/data/auth';
import { LoginFormData } from '#/schemas';

/**
 * Manages user authentication login and logout functionality using React Query.
 * @returns Object with login state and authentication handlers
 */
export function useLogin() {
  const { AUTH } = MESSAGES;
  const { LOGIN_SUCCESS, LOGIN_ERROR, LOGOUT_SUCCESS } = AUTH;

  const { login, logout } = useAuth();

  const loginMutation = useLoginMutation();
  const logoutMutation = useLogoutMutation();

  const handleLogin = async (data: LoginFormData, onSuccess?: () => void): Promise<void> => {
    try {
      const response = await loginMutation.mutateAsync({ email: data.email });
      login(response.token, response.user);

      showToast('success', LOGIN_SUCCESS);
      onSuccess?.();
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : LOGIN_ERROR;
      showToast('error', errorMessage);
      throw error;
    }
  };

  const handleLogout = async (): Promise<void> => {
    try {
      await logoutMutation.mutateAsync();
      logout();
      showToast('success', LOGOUT_SUCCESS);
    } catch {
      // Even if logout fails on server, clear local state
      logout();
      showToast('success', LOGOUT_SUCCESS);
    }
  };

  return {
    isSubmitting: loginMutation.isPending,
    handleLogin,
    handleLogout,
  };
}
