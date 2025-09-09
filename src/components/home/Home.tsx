import { JSX } from 'react';

import { useAuth } from '#/context';
import { LoadingFallback } from '#/components/common/LoadingFallback';

/**
 * Home page — minimal welcome screen
 */
const Home = (): JSX.Element => {
  const { user, isLoading } = useAuth();

  if (isLoading) {
    return <LoadingFallback />;
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-white px-4">
      <div className="text-center">
        <h1 className="text-3xl font-bold text-gray-900">Welcome to Kanban Board</h1>
        {user?.email && (
          <p className="mt-2 text-gray-600">{user.email}</p>
        )}
      </div>
    </div>
  );
};

export default Home;
