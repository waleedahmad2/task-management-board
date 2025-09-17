import { JSX } from 'react';

import { Task } from '#/types/task.types';
import { TaskDescription } from './TaskDescription';
import { TaskProperties } from './TaskProperties';
import { TaskTitle } from './TaskTitle';

interface TaskDetailContentProps {
  task: Task;
  onOpenCommentsDrawer?: () => void;
}

export const TaskDetailContent = ({ task, onOpenCommentsDrawer }: TaskDetailContentProps): JSX.Element => {
  return (
    <>
      <TaskTitle task={task} onOpenCommentsDrawer={onOpenCommentsDrawer} />

      <TaskProperties task={task} />

      <TaskDescription task={task} />
    </>
  );
};
