import { JSX, useEffect, useMemo } from 'react';

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';

import { DynamicForm, showToast } from '#/components';
import { TASK_FORM_FIELDS, MESSAGES, REGEX } from '#/constants';
import { useAuth } from '#/context';
import { mockAssignees } from '#/mocks/tasks/data';
import { taskFormSchema, TaskFormData } from '#/schemas';
import { TaskStatus, TaskPriority } from '#/types';

interface TaskFormProps {
  onSubmit: (data: TaskFormData) => void;
  onCancel: () => void;
  isLoading?: boolean;
  initialData?: Partial<TaskFormData>;
  defaultStatus?: TaskStatus;
  submitLabel?: string;
  isEditMode?: boolean;
}

/**
 * Form component for creating and editing tasks
 * Clean form without duplicated headers or buttons
 */

const TaskForm = ({
  onSubmit,
  isLoading = false,
  initialData = {},
  defaultStatus = 'backlog',
  submitLabel,
  isEditMode = false,
}: TaskFormProps): JSX.Element => {
  const { DATE: DATE_REGEX } = REGEX;
  const { user } = useAuth();

  // Determine if we're in edit mode based on initialData or explicit prop
  const editMode = isEditMode || (initialData && Object.keys(initialData).length > 0);

  // Format date for HTML date input (YYYY-MM-DD)
  const formatDateForInput = (dateString: string) => {
    if (!dateString) return '';
    const date = new Date(dateString);
    return date.toISOString().split('T')[0];
  };

  // Format date for backend (ISO string)
  const formatDateForBackend = (dateString: string) => {
    if (!dateString) return '';
    if (dateString.match(DATE_REGEX)) {
      return new Date(dateString + 'T00:00:00Z').toISOString();
    }
    return dateString;
  };

  // Create assignees list with current user included
  const assignees = useMemo(() => mockAssignees, []);

  const form = useForm<TaskFormData>({
    resolver: zodResolver(taskFormSchema),
    defaultValues: {
      title: initialData.title || '',
      description: initialData.description || '',
      priority: initialData.priority || 'medium',
      status: initialData.status || defaultStatus,
      dueDate: initialData.dueDate ? formatDateForInput(initialData.dueDate) : '',
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
      assigneeId = '',
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

  const fields = TASK_FORM_FIELDS(initialData as Record<string, unknown>, defaultStatus, assignees, user?.id);

  // Enhanced submit handler to format date correctly and show success toast
  const handleSubmit = async (data: TaskFormData) => {
    try {
      const formattedData = {
        ...data,
        dueDate: formatDateForBackend(data.dueDate),
      };
      await onSubmit(formattedData);

      // Show success toast based on mode
      if (editMode) {
        showToast('success', MESSAGES.TASK.UPDATE_SUCCESS);
      } else {
        showToast('success', MESSAGES.TASK.CREATE_SUCCESS);
      }
    } catch (error) {
      // Show error toast and re-throw to ensure parent can handle it
      showToast('error', editMode ? MESSAGES.TASK.UPDATE_ERROR : MESSAGES.TASK.CREATE_ERROR);
      throw error; // Re-throw to ensure the parent wrapper can handle it
    }
  };

  // Determine submit label based on mode
  const getSubmitLabel = () => {
    if (submitLabel) return submitLabel;
    return editMode ? 'Update Task' : 'Create Task';
  };

  return (
    <div className='space-y-4'>
      <DynamicForm
        fields={fields}
        form={form}
        onSubmit={handleSubmit}
        submitLabel={getSubmitLabel()}
        isLoading={isLoading}
        submitButtonProps={{
          className: 'w-full cursor-pointer',
        }}
      />
    </div>
  );
};

export default TaskForm;
