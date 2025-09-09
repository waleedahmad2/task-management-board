import { JSX } from 'react';

import { LucideIcon } from 'lucide-react';

/**
 * Props for SidebarListItem component
 */
interface SidebarListItemProps {
  icon: LucideIcon;
  label: string;
  description: string;
  isActive: boolean;
  onClick: () => void;
}

/**
 * Individual sidebar navigation item component
 */
const SidebarListItem = ({ icon: Icon, label, description, isActive, onClick }: SidebarListItemProps): JSX.Element => (
  <button
    onClick={onClick}
    className={`w-full flex items-center space-x-3 px-3 py-2 rounded-lg text-left transition-colors duration-200 cursor-pointer ${
      isActive
        ? 'bg-indigo-100 text-indigo-700 border border-indigo-200'
        : 'text-gray-700 hover:bg-gray-100 hover:text-gray-900'
    }`}
  >
    <Icon className='h-5 w-5' />
    <div className='flex-1 min-w-0'>
      <p className='text-sm font-medium'>{label}</p>
      <p className='text-xs text-gray-500'>{description}</p>
    </div>
  </button>
);

export default SidebarListItem;
