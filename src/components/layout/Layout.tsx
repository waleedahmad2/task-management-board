import { JSX } from 'react';

import { Outlet } from 'react-router-dom';

import { Sidebar } from '../sidebar';

/**
 * Main layout component that wraps the application
 * Provides sidebar navigation and main content area using Outlet
 */
const Layout = (): JSX.Element => {
  return (
    <div className='flex h-screen bg-gray-50'>
      {/* Sidebar */}
      <Sidebar />

      {/* Main Content */}
      <main className='flex-1 overflow-auto'>
        <div className='h-full'>
          <Outlet />
        </div>
      </main>
    </div>
  );
};

export default Layout;
