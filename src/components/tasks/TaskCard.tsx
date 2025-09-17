import { JSX, useCallback } from 'react';

import { Calendar } from 'lucide-react';

import { Task } from '#/types/task.types';
import { cn, formatDate } from '#/utils';
import TaskCardFooter from './TaskCardFooter';
import TaskCardHeader from './TaskCardHeader';
import TaskCardPriority from './TaskCardPriority';
import TaskCardStatus from './TaskCardStatus';

interface TaskCardProps {
  task: Task;
  onClick?: (task: Task) => void;
  onEdit?: (task: Task) => void;
  onDelete?: (task: Task) => void;
  className?: string;
}

/**
 * Displays a task card with priority, status, and action buttons.
 * Shows task details in a card format with hover effects and click handlers.
 */

/**
 * Check if a task is overdue based on due date
 */
const isTaskOverdue = (dueDate?: string | null): boolean => {
  if (!dueDate) return false;

  try {
    const due = new Date(dueDate);
    const today = new Date();
    today.setHours(23, 59, 59, 999);

    // Check if the date is valid
    if (isNaN(due.getTime())) return false;

    return due < today;
  } catch {
    return false;
  }
};

/**
 * TaskCard component - displays task information in a card format
 * Follows ProjectCard design patterns with fixed dimensions
 */
const TaskCard = ({ task, onClick, onEdit, onDelete, className = '' }: TaskCardProps): JSX.Element => {
  const { title, description, priority, dueDate, assignee, status } = task || {};

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
        'group bg-white rounded-lg border border-gray-200 p-4 hover:shadow-md hover:border-indigo-200 transition-all duration-300 cursor-pointer relative overflow-hidden',
        ' flex flex-col', // Fixed dimensions and layout
        className
      )}
      onClick={handleCardClick}
    >
      <div className='absolute inset-0 bg-gradient-to-br from-indigo-50/0 to-purple-50/0 group-hover:from-indigo-50/50 group-hover:to-purple-50/30 transition-all duration-300 pointer-events-none' />

      <TaskCardHeader title={title} description={description} onEdit={handleEditClick} onDelete={handleDeleteClick} />

      <div className='mb-3 relative z-10'>
        <TaskCardPriority priority={priority} />
        <TaskCardStatus status={status} />
      </div>

      <div className='mb-3 relative z-10'>
        <div className='flex items-center justify-between'>
          <div className='flex items-center'>
            <Calendar className='w-3 h-3 text-gray-500 mr-1.5' />
            <span className='text-xs font-medium text-gray-600'>Due</span>
            {dueDate && (
              <span
                className={cn(
                  'ml-1.5 px-1.5 py-0.5 text-xs font-medium rounded-full',
                  isOverdue ? 'bg-red-100 text-red-600' : 'bg-gray-100 text-gray-600'
                )}
              >
                {formatDate(dueDate)}
              </span>
            )}
          </div>
        </div>
      </div>

      <TaskCardFooter assignee={assignee} overdue={isOverdue} />
    </div>
  );
};

export default TaskCard;
