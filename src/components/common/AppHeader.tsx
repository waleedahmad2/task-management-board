import { JSX, ReactNode } from 'react';

import { Keyboard } from 'lucide-react';

import { cn } from '#/utils';
import SearchInput from './SearchInput';
import ViewToggle, { ViewType } from './ViewToggle';

/**
 * Props for AppHeader component
 */
interface AppHeaderProps {
  title: string;
  description?: string;
  showSearch?: boolean;
  searchPlaceholder?: string;
  onSearch?: (value: string) => void;
  showViewToggle?: boolean;
  currentView?: ViewType;
  onViewChange?: (view: ViewType) => void;
  rightContent?: ReactNode;
  className?: string;
}

/**
 * Reusable app header component with title, description and optional search
 */
const AppHeader = ({
  title,
  description,
  showSearch = false,
  searchPlaceholder = 'Search...',
  onSearch,
  showViewToggle = false,
  currentView = 'table',
  onViewChange,
  rightContent,
  className = '',
}: AppHeaderProps): JSX.Element => (
  <div className={cn('flex items-center justify-between p-8', className)}>
    <div className='flex-1'>
      <h1 className='text-2xl font-bold text-gray-900'>{title}</h1>
      {description && <p className='text-gray-600 mt-2'>{description}</p>}
    </div>

    <div className='flex items-center space-x-4'>
      {showSearch && (
        <SearchInput
          placeholder={searchPlaceholder}
          onDebounce={onSearch || (() => undefined)}
          showClearButton={true}
          className='w-60'
        />
      )}

      {showViewToggle && onViewChange && <ViewToggle currentView={currentView} onViewChange={onViewChange} />}

      <div className='flex items-center space-x-2'>
        <div className='flex items-center space-x-1 text-xs text-gray-500'>
          <Keyboard className='w-3 h-3' />
          <span>Press ⌘+? for shortcuts</span>
        </div>
        {rightContent}
      </div>
    </div>
  </div>
);

export default AppHeader;
