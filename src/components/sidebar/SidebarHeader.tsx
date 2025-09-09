import { JSX } from 'react';

/**
 * Sidebar header component with logo and branding
 */
const SidebarHeader = (): JSX.Element => (
  <div className="flex items-center justify-center h-16 border-b border-gray-200 bg-indigo-50">
    <div className="flex items-center space-x-2">
      <div className="h-8 w-8 rounded-lg bg-indigo-600 flex items-center justify-center text-white font-bold text-sm">
        K
      </div>
      <span className="font-semibold text-gray-900">Kanban Board</span>
    </div>
  </div>
);
export default SidebarHeader;


