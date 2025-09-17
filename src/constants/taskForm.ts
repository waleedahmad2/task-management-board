import { DynamicFormField } from '#/types/forms';
import { TaskFormData, TaskStatus, TaskPriority } from '#/types/task.types';
import { FIELD_TYPES } from './formFields';
import { TASK_PRIORITIES_CONFIG, TASK_STATUS_LABELS } from './task';

/**
 * Task form field configuration
 */
export const TASK_FORM_FIELDS = (
  initialData: Partial<TaskFormData> = {},
  defaultStatus: TaskStatus = 'backlog',
  assignees: Array<{ id: string; name: string }> = [],
  userId?: string
): DynamicFormField<TaskFormData>[] => [
  {
    name: 'title',
    type: FIELD_TYPES.TEXT,
    label: 'Task Title',
    placeholder: 'Enter a descriptive title for the task',
    required: true,
    className: 'w-full',
    defaultValue: initialData.title || '',
  },
  {
    name: 'description',
    type: FIELD_TYPES.TEXTAREA,
    label: 'Description',
    placeholder: 'Provide detailed description of what needs to be done',
    required: true,
    rows: 4,
    className: 'w-full',
    defaultValue: initialData.description || '',
  },
  {
    name: 'priority',
    type: FIELD_TYPES.SELECT,
    label: 'Priority Level',
    required: true,
    placeholder: 'Select priority level',
    options: TASK_PRIORITIES_CONFIG.map(({ value, label }) => ({
      value,
      label,
    })),
    className: 'w-full',
    defaultValue: (initialData.priority as TaskPriority) || 'medium',
  },
  {
    name: 'status',
    type: FIELD_TYPES.SELECT,
    label: 'Status',
    required: true,
    placeholder: 'Select task status',
    options: Object.entries(TASK_STATUS_LABELS).map(([value, label]) => ({
      value,
      label,
    })),
    className: 'w-full',
    defaultValue: (initialData.status as TaskStatus) || defaultStatus,
  },
  {
    name: 'dueDate',
    type: FIELD_TYPES.DATE,
    label: 'Due Date',
    required: true,
    className: 'w-full',
    defaultValue: initialData.dueDate || '',
  },
  {
    name: 'assigneeId',
    type: FIELD_TYPES.SELECT,
    label: 'Assignee',
    required: false,
    placeholder: 'Select team member',
    options: assignees.map(({ id, name }) => ({
      value: id,
      label: name,
    })),
    className: 'w-full',
    defaultValue: initialData.assigneeId || userId || '',
  },
];
