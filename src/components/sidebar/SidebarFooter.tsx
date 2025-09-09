import { JSX } from 'react';
import { useNavigate } from 'react-router-dom';
import { LogOut } from 'lucide-react';

import { ROUTES } from '#/constants';
import { useAuth } from '#/context';

/**
 * Sidebar footer component with user info and logout
 */
const SidebarFooter = (): JSX.Element => {
  const navigate = useNavigate();
  const { user, logout } = useAuth();

  /**
   * Handles user logout
   */
  const handleLogout = (): void => {
    logout();
    navigate(ROUTES.AUTH);
  };

  return (
    <div className="p-4 border-t border-gray-200 space-y-4">
      {/* User Info */}
      <div className="flex items-center space-x-3">
        <div className="h-10 w-10 rounded-full bg-indigo-100 flex items-center justify-center">
          <span className="text-indigo-600 font-medium text-sm">
            {user?.email?.charAt(0).toUpperCase() || 'U'}
          </span>
        </div>
        <div className="flex-1 min-w-0">
          <p className="text-sm font-medium text-gray-900 truncate">
            {user?.email || 'User'}
          </p>
          <p className="text-xs text-gray-500 capitalize">
            {user?.role || 'Member'}
          </p>
        </div>
      </div>

      {/* Logout Button */}
      <button
        onClick={handleLogout}
        className="w-full flex items-center space-x-3 px-3 py-2 rounded-lg text-left text-gray-700 hover:bg-red-50 hover:text-red-700 transition-colors duration-200"
      >
        <LogOut className="h-5 w-5" />
        <span className="text-sm font-medium">Logout</span>
      </button>
    </div>
  );
};

export default SidebarFooter;
