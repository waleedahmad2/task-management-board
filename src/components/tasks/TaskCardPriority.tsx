import { JSX } from 'react';

import { AlertCircle } from 'lucide-react';

import { TASK_PRIORITIES_CONFIG } from '#/constants/task';
import { TaskPriority } from '#/types/task.types';
import { cn } from '#/utils';

interface TaskCardPriorityProps {
  priority?: TaskPriority;
  className?: string;
}

/**
 * Task card priority component
 */
const TaskCardPriority = ({ priority, className = '' }: TaskCardPriorityProps): JSX.Element => {
  const config = priority ? TASK_PRIORITIES_CONFIG.find(p => p.value === priority) : null;
  const priorityConfig = {
    color: config?.color || 'text-gray-500',
    label: config?.label || 'Unknown',
    icon: priority === 'urgent' ? AlertCircle : undefined,
  };

  return (
    <div className={cn('flex items-center justify-between mb-2', className)}>
      <div className='flex items-center'>
        {priorityConfig.icon && <priorityConfig.icon className='w-3 h-3 text-gray-500 mr-1.5' />}
        <span className='text-xs font-medium text-gray-600'>Priority</span>
        <span className='ml-1.5 px-1.5 py-0.5 text-xs font-medium bg-gray-100 text-gray-600 rounded-full'>
          {priorityConfig.label}
        </span>
      </div>
    </div>
  );
};

export default TaskCardPriority;
