import { JSX } from 'react';

import { Calendar, User, Clock, Target, Flag, Timer } from 'lucide-react';

import { Task } from '#/types';
import { formatDate } from '#/utils';
import { PropertyRow } from './PropertyRow';

interface TaskPropertiesProps {
  task: Task;
}

export const TaskProperties = ({ task }: TaskPropertiesProps): JSX.Element => {
  return (
    <div className='space-y-2 mb-8'>
      {/* Row 1 */}
      <div className='grid grid-cols-2 gap-8'>
        {/* Status */}
        <PropertyRow icon={Target} label='Status' value={task?.status || 'No status'} />

        {/* Assignees */}
        <PropertyRow icon={User} label='Assignees' value={task?.assignee?.name || 'Unassigned'} />
      </div>

      {/* Row 2 */}
      <div className='grid grid-cols-2 gap-8'>
        {/* Dates */}
        <PropertyRow icon={Calendar} label='Dates' value={task?.dueDate ? formatDate(task.dueDate) : 'No due date'} />

        {/* Priority */}
        <PropertyRow icon={Flag} label='Priority' value={task?.priority || 'No priority'} />
      </div>

      {/* Row 3 */}
      <div className='grid grid-cols-2 gap-8'>
        {/* Time Estimate */}
        <PropertyRow icon={Timer} label='Time Estimate' value='25h' />

        {/* Track Time */}
        <PropertyRow icon={Clock} label='Track Time' value='25h 38m' />
      </div>
    </div>
  );
};
