import { JSX } from 'react';

import { LoginForm } from '#/components/forms/LoginForm';

/**
 * Login page component
 * Handles user login with email-only authentication
 */
export default function LoginPage(): JSX.Element {
  return (
    <div className="min-h-screen bg-gray-50">
      <LoginForm />
    </div>
  );
}
