import { JSX } from 'react';

import { TASK_STATUS_LABELS, TASK_STATUS_COLORS } from '#/constants/task';
import { cn } from '#/utils';

interface TaskCardStatusProps {
  status?: string;
  className?: string;
}

/**
 * Task card status component
 */
const TaskCardStatus = ({ status, className = '' }: TaskCardStatusProps): JSX.Element => {
  const getStatusConfig = (status?: string) => {
    switch (status?.toLowerCase()) {
      case 'completed':
      case 'done':
        return {
          color: TASK_STATUS_COLORS.COMPLETED,
          label: TASK_STATUS_LABELS.done,
        };
      case 'in-progress':
      case 'in_progress':
        return {
          color: TASK_STATUS_COLORS.IN_PROGRESS,
          label: TASK_STATUS_LABELS['in-progress'],
        };
      case 'todo':
      case 'pending':
        return {
          color: TASK_STATUS_COLORS.TODO,
          label: TASK_STATUS_LABELS.backlog,
        };
      default:
        return {
          color: TASK_STATUS_COLORS.DEFAULT,
          label: status || TASK_STATUS_LABELS.backlog,
        };
    }
  };

  const statusConfig = getStatusConfig(status);

  return (
    <div className={cn('flex items-center', className)}>
      <div className='flex items-center gap-1.5'>
        <span className={cn('px-1.5 py-0.5 text-xs font-medium rounded-full', statusConfig.color)}>
          {statusConfig.label}
        </span>
      </div>
    </div>
  );
};

export default TaskCardStatus;
