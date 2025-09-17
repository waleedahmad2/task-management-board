import { JSX } from 'react';

import { Edit, Trash2 } from 'lucide-react';

import { Button } from '#/components/ui/button';
import { TASK_ACTIONS } from '#/constants/task';
import { useAuth } from '#/context';
import { cn, canDelete } from '#/utils';

interface TaskCardActionsProps {
  onEdit: () => void;
  onDelete: () => void;
  className?: string;
}

/**
 * Task card actions component with edit and delete buttons
 * Enhanced with better micro-interactions and visual feedback
 * Role-based access control: only admins can delete
 */
const TaskCardActions = ({ onEdit, onDelete, className = '' }: TaskCardActionsProps): JSX.Element => {
  const { user } = useAuth();
  const canUserDelete = canDelete(user?.role);

  return (
    <div
      className={cn(
        'opacity-0 group-hover:opacity-100 transition-all duration-200 flex items-center space-x-1',
        className
      )}
    >
      <Button
        onClick={onEdit}
        variant='ghost'
        size='sm'
        className='h-8 w-8 p-0 hover:bg-blue-50 hover:text-blue-600 transition-all duration-200 cursor-pointer'
        title={`${TASK_ACTIONS.EDIT} task`}
        aria-label={`${TASK_ACTIONS.EDIT} task`}
      >
        <Edit className='w-3.5 h-3.5' />
      </Button>
      {canUserDelete && (
        <Button
          onClick={onDelete}
          variant='ghost'
          size='sm'
          className='h-8 w-8 p-0 hover:bg-red-50 hover:text-red-600 transition-all duration-200 cursor-pointer'
          title={`${TASK_ACTIONS.DELETE} task`}
          aria-label={`${TASK_ACTIONS.DELETE} task`}
        >
          <Trash2 className='w-3.5 h-3.5' />
        </Button>
      )}
    </div>
  );
};

export default TaskCardActions;
