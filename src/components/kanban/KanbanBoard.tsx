import { JSX, ReactNode } from 'react';

import { cn } from '#/utils';

interface KanbanBoardProps {
  children: ReactNode;
  className?: string;
}

const KanbanBoard = ({ children, className = '' }: KanbanBoardProps): JSX.Element => (
  <div className={cn('px-6 pb-6 h-full bg-gray-50', className)}>
    <div className='flex gap-6 h-full'>{children}</div>
  </div>
);

export default KanbanBoard;
