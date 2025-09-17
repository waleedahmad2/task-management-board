import { JSX } from 'react';

import { Task } from '#/types/task.types';

interface TaskDescriptionProps {
  task: Task;
}

export const TaskDescription = ({ task }: TaskDescriptionProps): JSX.Element => (
  <div className='mb-6'>
    <div className='space-y-2'>
      <h3 className='text-lg font-semibold text-gray-900'>Description</h3>
      <div className='bg-gray-50 rounded-lg p-4 border border-gray-200'>
        <p className='text-sm text-gray-700 leading-relaxed'>{task?.description || 'No description provided'}</p>
      </div>
    </div>
  </div>
);
