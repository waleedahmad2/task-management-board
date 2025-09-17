import { JSX } from 'react';

import { Edit, Trash2 } from 'lucide-react';

import { TASK_ACTIONS } from '#/constants/task';
import { cn } from '#/utils';

interface TaskCardActionsProps {
  onEdit: () => void;
  onDelete: () => void;
  className?: string;
}

/**
 * Task card actions component with edit and delete buttons
 */
const TaskCardActions = ({ onEdit, onDelete, className = '' }: TaskCardActionsProps): JSX.Element => (
  <div
    className={cn(
      'opacity-0 group-hover:opacity-100 transition-opacity duration-200 flex items-center space-x-0.5',
      className
    )}
  >
    <button
      onClick={onEdit}
      className='p-1.5 rounded-md hover:bg-white/80 transition-colors duration-200 shadow-sm'
      title={`${TASK_ACTIONS.EDIT} task`}
      aria-label={`${TASK_ACTIONS.EDIT} task`}
    >
      <Edit className='w-3 h-3 text-gray-600 hover:text-gray-800' />
    </button>
    <button
      onClick={onDelete}
      className='p-1.5 rounded-md hover:bg-red-50 transition-colors duration-200 shadow-sm'
      title={`${TASK_ACTIONS.DELETE} task`}
      aria-label={`${TASK_ACTIONS.DELETE} task`}
    >
      <Trash2 className='w-3 h-3 text-gray-600 hover:text-red-600' />
    </button>
  </div>
);

export default TaskCardActions;
