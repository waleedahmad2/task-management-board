import { JSX, ReactNode } from 'react';

import { cn } from '#/utils';

interface KanbanColumnProps {
  title: string;
  count?: number;
  dotColorClass?: string;
  children: ReactNode;
  className?: string;
}

const KanbanColumn = ({
  title,
  count = 0,
  dotColorClass = 'bg-gray-500',
  children,
  className = '',
}: KanbanColumnProps): JSX.Element => (
  <div className={cn('flex-shrink-0 w-80', className)}>
    <div className='flex items-center justify-between mb-3'>
      <div className='flex items-center space-x-2'>
        <div className={cn('w-3 h-3 rounded-full', dotColorClass)} />
        <h3 className='text-sm font-semibold text-gray-700 uppercase tracking-wide'>{title}</h3>
      </div>
      <span className='text-xs text-gray-500 bg-gray-100 px-2 py-1 rounded-full'>{count}</span>
    </div>

    <div className='space-y-3 min-h-[400px]'>{children}</div>
  </div>
);

export default KanbanColumn;
