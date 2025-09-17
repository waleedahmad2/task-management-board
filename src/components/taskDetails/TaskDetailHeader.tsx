import { JSX } from 'react';

import { CustomBreadcrumb } from '#/components/common';
import { Task } from '#/types/task.types';

interface TaskDetailHeaderProps {
  task: Task;
  onNavigateToProjects: () => void;
  onBackToBoard: () => void;
}

export const TaskDetailHeader = ({ task, onNavigateToProjects, onBackToBoard }: TaskDetailHeaderProps): JSX.Element => {
  const breadcrumbItems = [
    {
      label: 'Projects',
      onClick: onNavigateToProjects,
    },
    {
      label: 'Project Board',
      onClick: onBackToBoard,
    },
    {
      label: task?.title || 'Task Detail',
      isCurrentPage: true,
    },
  ];

  return (
    <div className='border-b border-gray-200 px-6 py-3'>
      <div className='flex items-center justify-between'>
        <CustomBreadcrumb items={breadcrumbItems} />
      </div>
    </div>
  );
};
