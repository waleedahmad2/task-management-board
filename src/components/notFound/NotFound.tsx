import { JSX } from 'react';

import { useNavigate } from 'react-router-dom';

import { ROUTES } from '#/constants';

/**
 * 404 Not Found page component
 * Displays when user navigates to a non-existent route
 */
const NotFound = (): JSX.Element => {
  const navigate = useNavigate();

  const handleGoHome = (): void => {
    navigate(ROUTES.HOME, { replace: true });
  };

  const handleGoBack = (): void => {
    navigate(-1);
  };

  return (
    <div className='min-h-screen flex items-center justify-center bg-gray-50 px-4'>
      <div className='text-center'>
        <div className='mb-8'>
          <h1 className='text-9xl font-bold text-gray-300'>404</h1>
          <h2 className='text-2xl font-semibold text-gray-900 mb-4'>Page Not Found</h2>
          <p className='text-gray-600 mb-8'>The page you're looking for doesn't exist or has been moved.</p>
        </div>

        <div className='space-x-4'>
          <button
            onClick={handleGoHome}
            className='inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-colors duration-200'
          >
            Go to Home
          </button>

          <button
            onClick={handleGoBack}
            className='inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-colors duration-200'
          >
            Go Back
          </button>
        </div>
      </div>
    </div>
  );
};
export default NotFound;
