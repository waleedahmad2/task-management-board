import { JSX } from 'react';

import { Modal } from '#/components/common';
import { TASK_MODAL_MODES, TASK_MODAL_TITLES, TASK_MODAL_DESCRIPTIONS } from '#/constants/task';
import { TaskFormData } from '#/schemas/taskFormSchema';
import { TaskStatus } from '#/types/task.types';
import TaskForm from './TaskForm';

interface TaskModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: TaskFormData) => void;
  isLoading?: boolean;
  initialData?: Partial<TaskFormData>;
  defaultStatus?: TaskStatus;
  title?: string;
  description?: string;
}

const TaskModal = ({
  isOpen,
  onClose,
  onSubmit,
  isLoading = false,
  initialData = {},
  defaultStatus = 'backlog',
  title = TASK_MODAL_TITLES[TASK_MODAL_MODES.CREATE],
  description = TASK_MODAL_DESCRIPTIONS[TASK_MODAL_MODES.CREATE],
}: TaskModalProps): JSX.Element => {
  return (
    <Modal isOpen={isOpen} onClose={onClose} title={title} description={description} maxWidth='2xl'>
      <div className='max-h-[70vh] overflow-y-auto'>
        <TaskForm
          onSubmit={onSubmit}
          onCancel={onClose}
          isLoading={isLoading}
          initialData={initialData}
          defaultStatus={defaultStatus}
          submitLabel={title}
        />
      </div>
    </Modal>
  );
};

export default TaskModal;
