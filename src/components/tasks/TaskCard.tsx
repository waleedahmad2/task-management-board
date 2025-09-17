import { JSX, useCallback } from 'react';

import { Task } from '#/types';
import { cn, isTaskOverdue } from '#/utils';
import TaskCardDueDate from './TaskCardDueDate';
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

      <TaskCardDueDate dueDate={dueDate} />

      <TaskCardFooter assignee={assignee} overdue={isOverdue} />
    </div>
  );
};

export default TaskCard;
