import { JSX, useEffect, useMemo } from 'react';

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';

import { DynamicForm, Button } from '#/components';
import { TASK_MODAL_MODES, TASK_MODAL_TITLES, TASK_FORM_FIELDS } from '#/constants';
import { useAuth } from '#/context';
import { mockAssignees } from '#/mocks/tasks/data';
import { taskFormSchema, TaskFormData } from '#/schemas';
import type { DynamicFormField as DynamicFormFieldDef } from '#/types/forms';
import { TaskStatus, TaskPriority } from '#/types/task.types';

interface TaskFormProps {
  onSubmit: (data: TaskFormData) => void;
  onCancel: () => void;
  isLoading?: boolean;
  initialData?: Partial<TaskFormData>;
  defaultStatus?: TaskStatus;
  submitLabel?: string;
}

/**
 * Form component for creating and editing tasks with validation.
 * Includes fields for title, description, priority, status, due date, and assignee.
 */

const TaskForm = ({
  onSubmit,
  onCancel,
  isLoading = false,
  initialData = {},
  defaultStatus = 'backlog',
  submitLabel = TASK_MODAL_TITLES[TASK_MODAL_MODES.CREATE],
}: TaskFormProps): JSX.Element => {
  const { user } = useAuth();

  // Format date for HTML date input (YYYY-MM-DD)
  const formatDateForInput = (dateString: string) => {
    if (!dateString) return '';
    const date = new Date(dateString);
    return date.toISOString().split('T')[0];
  };

  // Create assignees list with current user included
  const assignees = useMemo(() => {
    if (!user) return mockAssignees;

    const { id: userId, name: userName, email: userEmail } = user;

    // Check if current user is already in mockAssignees
    const userExists = mockAssignees.some(assignee => assignee.id === userId);

    if (userExists) {
      return mockAssignees;
    }

    // Add current user to the list
    return [{ id: userId, name: userName, email: userEmail }, ...mockAssignees];
  }, [user]);

  const form = useForm<TaskFormData>({
    resolver: zodResolver(taskFormSchema),
    defaultValues: {
      title: initialData.title || '',
      description: initialData.description || '',
      priority: initialData.priority || 'medium',
      status: initialData.status || defaultStatus,
      dueDate: initialData.dueDate || '',
      assigneeId: initialData.assigneeId || user?.id || '',
    },
  });

  // Reset form when initialData changes (for edit mode)
  useEffect(() => {
    const {
      title = '',
      description = '',
      priority = 'medium',
      status = defaultStatus,
      dueDate = '',
      assigneeId = user?.id || '',
    } = initialData;

    const formData = {
      title,
      description,
      priority: priority as TaskPriority,
      status: status as TaskStatus,
      dueDate: dueDate ? formatDateForInput(dueDate) : '',
      assigneeId,
    };

    form.reset(formData);
  }, [initialData, form, defaultStatus, user?.id]);

  const fields: DynamicFormFieldDef<TaskFormData>[] = TASK_FORM_FIELDS(initialData, defaultStatus, assignees, user?.id);

  return (
    <div className='space-y-6'>
      <DynamicForm
        fields={fields}
        form={form}
        onSubmit={onSubmit}
        submitLabel={submitLabel}
        isLoading={isLoading}
        submitButtonProps={{
          className: 'w-full',
        }}
      />

      <div className='flex justify-end space-x-3'>
        <Button
          variant='ghost'
          onClick={onCancel}
          className='px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500'
          disabled={isLoading}
        >
          Cancel
        </Button>
      </div>
    </div>
  );
};

export default TaskForm;
