import { JSX, ReactNode } from 'react';

import { cn } from '#/utils';
import SearchInput from './SearchInput';
import ViewToggle, { ViewType } from './ViewToggle';

/**
 * Props for AppHeader component
 */
interface AppHeaderProps {
  title: string;
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
  showSearch = false,
  searchPlaceholder = 'Search...',
  onSearch,
  showViewToggle = false,
  currentView = 'table',
  onViewChange,
  className = '',
}: AppHeaderProps): JSX.Element => (
  <div className={cn('flex items-center justify-between p-8', className)}>
    <div className='flex-1'>
      <h1 className='text-2xl font-bold text-gray-900'>{title}</h1>
    </div>

    <div className='flex items-center space-x-4'>
      {showSearch && (
        <SearchInput
          placeholder={searchPlaceholder}
          onDebounce={onSearch || (() => undefined)}
          showClearButton={true}
          className='w-60 h-9'
        />
      )}

      {showViewToggle && onViewChange && <ViewToggle currentView={currentView} onViewChange={onViewChange} />}
    </div>
  </div>
);

export default AppHeader;
