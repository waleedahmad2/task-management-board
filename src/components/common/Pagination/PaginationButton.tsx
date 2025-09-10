import { JSX } from 'react';

import { cn } from '#/utils';

/**
 * Props for PaginationButton component
 */
interface PaginationButtonProps {
  onClick: () => void;
  disabled?: boolean;
  active?: boolean;
  children: React.ReactNode;
  className?: string;
}

/**
 * Reusable pagination button component
 */
const PaginationButton = ({
  onClick,
  disabled = false,
  active = false,
  children,
  className = '',
}: PaginationButtonProps): JSX.Element => (
  <button
    onClick={onClick}
    disabled={disabled}
    className={cn(
      'px-3 py-2 text-sm font-medium rounded-md transition-colors duration-150',
      active
        ? 'bg-indigo-600 text-white'
        : disabled
          ? 'text-gray-400 cursor-not-allowed'
          : 'text-gray-700 hover:bg-gray-100 hover:text-gray-900',
      className
    )}
  >
    {children}
  </button>
);

export default PaginationButton;
