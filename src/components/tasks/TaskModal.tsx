import { JSX } from 'react';

import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '#/components/ui/dialog';
import { TaskFormData } from '#/schemas';
import { TaskStatus } from '#/types';
import TaskForm from './TaskForm';

interface TaskModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: TaskFormData) => void;
  isLoading?: boolean;
  initialData?: Partial<TaskFormData>;
  defaultStatus?: TaskStatus;
  isEditMode?: boolean;
}

/**
 * Modal component for creating and editing tasks
 * Shows different titles and descriptions based on mode
 */
const TaskModal = ({
  isOpen,
  onClose,
  onSubmit,
  isLoading = false,
  initialData = {},
  defaultStatus = 'backlog',
  isEditMode = false,
}: TaskModalProps): JSX.Element => {
  // Determine if we're in edit mode
  const editMode = isEditMode || (initialData && Object.keys(initialData).length > 0);

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className='sm:max-w-[600px] h-[80vh] flex flex-col'>
        {/* Fixed Header */}
        <DialogHeader className='flex-shrink-0'>
          <DialogTitle>{editMode ? 'Edit Task' : 'Create New Task'}</DialogTitle>
          <DialogDescription>
            {editMode
              ? 'Update the task details below. All fields are required.'
              : 'Fill in the details to create a new task. All fields are required.'}
          </DialogDescription>
        </DialogHeader>

        {/* Scrollable Content */}
        <div className='flex-1 overflow-y-auto min-h-0'>
          <TaskForm
            onSubmit={onSubmit}
            onCancel={onClose}
            isLoading={isLoading}
            initialData={initialData}
            defaultStatus={defaultStatus}
            isEditMode={editMode}
          />
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default TaskModal;
