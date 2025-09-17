import { JSX } from 'react';

import { AlertCircle, Clock, Zap, CheckCircle } from 'lucide-react';

import { getTaskPriorityStyle } from '#/constants/task';
import { TaskPriority } from '#/types/task.types';
import { cn } from '#/utils';

interface TaskCardPriorityProps {
  priority?: TaskPriority;
  className?: string;
}

/**
 * Task card priority component with professional design system
 */
const TaskCardPriority = ({ priority, className = '' }: TaskCardPriorityProps): JSX.Element => {
  // Icon mapping for each priority
  const priorityIcons = {
    low: CheckCircle,
    medium: Clock,
    high: Zap,
    urgent: AlertCircle,
  };

  const currentStyle = getTaskPriorityStyle(priority);
  const IconComponent = priority ? priorityIcons[priority] : Clock;

  return (
    <div className={cn('flex items-center gap-2', className)}>
      <div className={cn(
        'flex items-center gap-1.5 px-2 py-1 rounded-md border transition-all duration-200',
        currentStyle.bgColor,
        currentStyle.borderColor
      )}>
        <IconComponent className={cn('w-3 h-3', currentStyle.iconColor)} />
        <span className={cn('text-xs font-semibold', currentStyle.textColor)}>
          {currentStyle.label}
        </span>
      </div>
    </div>
  );
};

export default TaskCardPriority;
