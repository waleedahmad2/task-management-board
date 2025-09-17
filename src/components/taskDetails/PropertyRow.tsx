import { JSX } from 'react';

import { LucideIcon } from 'lucide-react';

import { cn } from '#/lib/utils';

interface PropertyRowProps {
  icon: LucideIcon;
  label: string;
  value: string;
  className?: string;
  children?: JSX.Element;
  onClick?: () => void;
}

export const PropertyRow = ({
  icon: Icon,
  label,
  value,
  className = '',
  children,
  onClick,
}: PropertyRowProps): JSX.Element => (
  <div
    className={cn(
      'flex items-center space-x-3 p-2 rounded-lg hover:bg-gray-50 transition-colors duration-200',
      onClick && 'cursor-pointer hover:shadow-sm',
      className
    )}
    onClick={onClick}
  >
    <div className='w-7 h-7 bg-gray-100 rounded-lg flex items-center justify-center flex-shrink-0'>
      <Icon className='w-3.5 h-3.5 text-gray-600' />
    </div>
    <div className='flex-1 min-w-0'>
      <div className='text-sm font-medium text-gray-500 mb-0.5'>{label}</div>
      {children || <div className='text-sm text-gray-900 truncate'>{value}</div>}
    </div>
  </div>
);
