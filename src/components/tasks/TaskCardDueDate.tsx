import { JSX } from 'react';

import { Calendar } from 'lucide-react';

import { cn, formatDate, isTaskOverdue } from '#/utils';

interface TaskCardDueDateProps {
  dueDate?: string;
  className?: string;
}

/**
 * TaskCardDueDate component - displays task due date with visual indicators
 */
const TaskCardDueDate = ({ dueDate, className = '' }: TaskCardDueDateProps): JSX.Element => {
  const isOverdue = isTaskOverdue(dueDate);

  return (
    <div className={cn('mb-3 relative z-10', className)}>
      <div className='flex items-center justify-between'>
        <div className='flex items-center space-x-2'>
          <div className='flex items-center space-x-1.5'>
            <Calendar className={cn('w-3.5 h-3.5', isOverdue ? 'text-red-500' : 'text-gray-400')} />
            <span className='text-xs font-medium text-gray-600'>Due</span>
          </div>
          {dueDate ? (
            <span
              className={cn(
                'px-2 py-1 text-xs font-medium rounded-full',
                isOverdue
                  ? 'bg-red-100 text-red-700 border border-red-200'
                  : 'bg-gray-100 text-gray-600 border border-gray-200'
              )}
            >
              {formatDate(dueDate)}
            </span>
          ) : (
            <span className='text-xs text-gray-400 italic'>No due date</span>
          )}
        </div>
      </div>
    </div>
  );
};

export default TaskCardDueDate;
