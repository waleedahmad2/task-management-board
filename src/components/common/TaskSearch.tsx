import { JSX, useMemo } from 'react';

import { Task } from '#/types/task.types';
import GenericSearch from './GenericSearch';

interface TaskSearchProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectTask?: (task: Task) => void;
  tasks: Task[];
  className?: string;
}

/**
 * Task search component using the generic search
 * Searches through real task data
 */
const TaskSearch = ({ isOpen, onClose, onSelectTask, tasks, className = '' }: TaskSearchProps): JSX.Element => {
  const searchItems = useMemo(() => {
    return tasks.map(task => ({
      id: task.id,
      title: task.title,
      description: task.description,
      status: task.status,
      priority: task.priority,
      assignee: task.assignee?.name,
      dueDate: task.dueDate,
      originalTask: task, // Keep reference to original task
    }));
  }, [tasks]);

  const handleSelectItem = (item: typeof searchItems[0]): void => {
    onSelectTask?.(item.originalTask);
  };

  return (
    <GenericSearch
      isOpen={isOpen}
      onClose={onClose}
      onSelectItem={handleSelectItem}
      items={searchItems}
      placeholder='Search tasks...'
      title='Tasks'
      className={className}
      searchFields={['title', 'description', 'status', 'priority', 'assignee']}
    />
  );
};

export default TaskSearch;
