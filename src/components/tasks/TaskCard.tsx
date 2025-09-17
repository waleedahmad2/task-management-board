import { JSX, useCallback } from 'react';

import { Calendar } from 'lucide-react';

import { Task } from '#/types/task.types';
import { cn, formatDate, isTaskOverdue } from '#/utils';
import TaskCardFooter from './TaskCardFooter';
import TaskCardHeader from './TaskCardHeader';
import TaskCardPriority from './TaskCardPriority';

interface TaskCardProps {
  task: Task;
  onClick?: (task: Task) => void;
  onEdit?: (task: Task) => void;
  onDelete?: (task: Task) => void;
  className?: string;
}

/**
 * Check if a task is overdue based on due date
 */

/**
 * TaskCard component - displays task information in a card format
 * Enhanced with better micro-interactions and visual hierarchy
 */
const TaskCard = ({ task, onClick, onEdit, onDelete, className = '' }: TaskCardProps): JSX.Element => {
  const { title, description, priority, dueDate, assignee } = task || {};

  const handleCardClick = useCallback((): void => {
    onClick?.(task);
  }, [onClick, task]);

  const handleEditClick = useCallback(
    (e: React.MouseEvent): void => {
      e.stopPropagation();
      onEdit?.(task);
    },
    [onEdit, task]
  );

  const handleDeleteClick = useCallback(
    (e: React.MouseEvent): void => {
      e.stopPropagation();
      onDelete?.(task);
    },
    [onDelete, task]
  );

  const isOverdue = isTaskOverdue(dueDate);

  return (
    <div
      className={cn(
        'group bg-white rounded-xl border border-gray-200 p-4 hover:border-indigo-300 transition-all duration-300 cursor-pointer relative overflow-hidden',
        'flex flex-col min-h-[140px]',
        isOverdue && 'border-red-200 bg-red-50/30',
        className
      )}
      onClick={handleCardClick}
    >
      {/* Subtle gradient overlay on hover */}
      <div className='absolute inset-0 bg-gradient-to-br from-indigo-50/0 to-purple-50/0 group-hover:from-indigo-50/30 group-hover:to-purple-50/20 transition-all duration-300 pointer-events-none' />

      <TaskCardHeader title={title} description={description} onEdit={handleEditClick} onDelete={handleDeleteClick} />

      <div className='mb-3 relative z-10 flex items-center gap-2'>
        <TaskCardPriority priority={priority} />
      </div>

      {/* Due date with better visual treatment */}
      <div className='mb-3 relative z-10'>
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

      <TaskCardFooter assignee={assignee} overdue={isOverdue} />
    </div>
  );
};

export default TaskCard;
