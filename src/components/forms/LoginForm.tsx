import { JSX } from 'react';

import { useNavigate } from 'react-router-dom';

import { DynamicForm } from '#/components';
import { ROUTES } from '#/constants';
import { useLogin, useDynamicForm } from '#/hooks';
import { loginSchema, LoginFormData } from '#/schemas';
import type { DynamicFormField as DynamicFormFieldDef } from '#/types/forms';

/**
 * Props for the LoginForm component
 */
interface LoginFormProps {
  onLoginSuccess?: () => void;
}

/**
 * Login form component with email-only authentication using DynamicForm
 *
 * @param onLoginSuccess - Optional callback when login is successful
 */
export function LoginForm({ onLoginSuccess }: LoginFormProps): JSX.Element {
  const navigate = useNavigate();
  const { handleLogin, isSubmitting } = useLogin();

  // Define form fields array
  const fields: DynamicFormFieldDef<LoginFormData>[] = [
    {
      name: 'email',
      type: 'email',
      label: 'Email Address',
      placeholder: 'Enter your email address',
      required: true,
    },
  ];

  // Create form with validation
  const form = useDynamicForm(fields, loginSchema);

  /**
   * Handles form submission
   */
  const onSubmit = async (data: LoginFormData): Promise<void> => {
    try {
      await handleLogin(data, () => {
        form.reset();
        onLoginSuccess?.();
        // Navigate after successful login and state update
        navigate(ROUTES.HOME, { replace: true });
      });
    } catch (error) {
      console.error('Login error:', error);
    }
  };

  return (
    <div className='min-h-screen w-full bg-gradient-to-br from-indigo-50 via-white to-purple-50 flex items-center justify-center px-4 py-12'>
      <div className='w-full max-w-md'>
        <div className='bg-white/90 backdrop-blur border border-gray-200 shadow-xl rounded-xl p-8'>
          <div className='text-center mb-6'>
            <div className='mx-auto mb-3 h-10 w-10 rounded-full bg-indigo-600 flex items-center justify-center text-white font-semibold'>
              K
            </div>
            <h1 className='text-2xl font-bold text-gray-900'>Sign in to Kanban Board</h1>
            <p className='mt-1 text-sm text-gray-600'>Enter your email to access your workspace</p>
          </div>

          <DynamicForm
            fields={fields}
            form={form}
            onSubmit={onSubmit}
            submitLabel='Sign in'
            isLoading={isSubmitting}
            className='space-y-4'
            inlineSubmit={true}
            submitButtonProps={{
              className: 'w-full justify-center',
            }}
          />
        </div>
        <p className='mt-4 text-center text-xs text-gray-500'>
          By continuing, you agree to our Terms of Service and Privacy Policy.
        </p>
      </div>
    </div>
  );
}
