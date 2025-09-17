import { JSX } from 'react';

import { MessageSquare } from 'lucide-react';

import { Button } from '#/components/ui';
import { Task } from '#/types/task.types';

interface TaskTitleProps {
  task: Task;
  onOpenCommentsDrawer?: () => void;
}

export const TaskTitle = ({ task, onOpenCommentsDrawer }: TaskTitleProps): JSX.Element => (
  <div className='mb-6'>
    <div className='flex items-start justify-between group'>
      <div className='flex-1 min-w-0'>
        <h1 className='text-3xl font-bold text-gray-900 group-hover:text-indigo-700 transition-colors duration-200'>
          {task?.title || 'Untitled Task'}
        </h1>
      </div>
      <div className='flex items-center space-x-2 ml-4'>
        {onOpenCommentsDrawer && (
          <Button
            onClick={onOpenCommentsDrawer}
            variant='outline'
            size='sm'
            className='flex items-center space-x-2 text-gray-600 hover:text-gray-900 hover:bg-gray-50'
          >
            <MessageSquare className='w-4 h-4' />
            <span className='hidden sm:inline'>Comments</span>
          </Button>
        )}
      </div>
    </div>
  </div>
);
