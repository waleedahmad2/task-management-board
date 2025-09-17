import { JSX } from 'react';

import { User } from 'lucide-react';

import { TASK_FOOTER_TEXT } from '#/constants/task';
import { cn } from '#/utils';

interface TaskCardFooterProps {
  assignee?: { name: string; id?: string } | null;
  overdue?: boolean;
  className?: string;
}

/**
 * Task card footer component displaying due date, assignee and overdue status
 */
const TaskCardFooter = ({ assignee, overdue = false, className = '' }: TaskCardFooterProps): JSX.Element => (
  <div
    className={cn(
      'flex items-center justify-between text-xs text-gray-500 pt-2 border-t border-gray-100 relative z-10',
      className
    )}
  >
    <div className='flex items-center space-x-3'>
      {assignee && (
        <div className='flex items-center space-x-1'>
          <User className='w-3 h-3' />
          <span className='truncate max-w-20'>{assignee.name}</span>
        </div>
      )}
    </div>
    <div className='flex items-center'>
      <span className={cn('text-xs font-medium', overdue ? 'text-red-600' : 'text-green-600')}>
        {overdue ? TASK_FOOTER_TEXT.OVERDUE : TASK_FOOTER_TEXT.ACTIVE}
      </span>
    </div>
  </div>
);

export default TaskCardFooter;
