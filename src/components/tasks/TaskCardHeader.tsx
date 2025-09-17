import { JSX } from 'react';

import { cn } from '#/utils';
import TaskCardActions from './TaskCardActions';

interface TaskCardHeaderProps {
  title: string;
  description?: string;
  onEdit: (e: React.MouseEvent) => void;
  onDelete: (e: React.MouseEvent) => void;
  className?: string;
}

/**
 * Task card header component with title, description and actions
 */
const TaskCardHeader = ({ title, description, onEdit, onDelete, className = '' }: TaskCardHeaderProps): JSX.Element => (
  <div className={cn('flex items-start justify-between mb-3 relative z-10', className)}>
    <div className='flex-1 pr-3'>
      <h3 className='text-sm font-semibold text-gray-900 mb-1 group-hover:text-indigo-700 transition-colors duration-200 line-clamp-2'>
        {title || 'Untitled Task'}
      </h3>
      {description && <p className='text-xs text-gray-600 leading-snug line-clamp-2'>{description}</p>}
    </div>

    <TaskCardActions onEdit={onEdit} onDelete={onDelete} />
  </div>
);

export default TaskCardHeader;
