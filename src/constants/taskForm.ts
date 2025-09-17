import { DynamicFormField } from '#/types/forms';
import { TaskFormData, TaskStatus, TaskPriority } from '#/types/task.types';
import { FIELD_TYPES } from './formFields';
import { TASK_PRIORITIES_CONFIG, TASK_STATUS_LABELS } from './task';

/**
 * Enhanced task form field configuration with better UX
 * Clear labels, helpful placeholders, and logical grouping
 */
export const TASK_FORM_FIELDS = (
  initialData: Partial<TaskFormData> = {},
  defaultStatus: TaskStatus = 'backlog',
  assignees: Array<{ id: string; name: string }> = [],
  userId?: string
): DynamicFormField<TaskFormData>[] => [
  // Basic Information Section
  {
    name: 'title',
    type: FIELD_TYPES.TEXT,
    label: 'Task Title',
    placeholder: 'What needs to be done?',
    required: true,
    className: 'w-full',
    defaultValue: initialData.title || '',
    helpText: 'Be specific and descriptive. This will be the main identifier for your task.',
  },
  {
    name: 'description',
    type: FIELD_TYPES.TEXTAREA,
    label: 'Description',
    placeholder: 'Provide details about what needs to be accomplished, any requirements, or context...',
    required: true,
    rows: 4,
    className: 'w-full',
    defaultValue: initialData.description || '',
    helpText: 'Include any important details, requirements, or context that will help complete this task.',
  },

  // Task Configuration Section
  {
    name: 'priority',
    type: FIELD_TYPES.SELECT,
    label: 'Priority Level',
    required: true,
    placeholder: 'How urgent is this task?',
    options: TASK_PRIORITIES_CONFIG.map(({ value, label }) => ({
      value,
      label,
    })),
    className: 'w-full',
    defaultValue: (initialData.priority as TaskPriority) || 'medium',
    helpText: 'Choose the priority level based on urgency and importance.',
  },
  {
    name: 'status',
    type: FIELD_TYPES.SELECT,
    label: 'Current Status',
    required: true,
    placeholder: 'What stage is this task in?',
    options: Object.entries(TASK_STATUS_LABELS).map(([value, label]) => ({
      value,
      label,
    })),
    className: 'w-full',
    defaultValue: (initialData.status as TaskStatus) || defaultStatus,
    helpText: 'Select the current status of this task in your workflow.',
  },

  // Timeline & Assignment Section
  {
    name: 'dueDate',
    type: FIELD_TYPES.DATE,
    label: 'Due Date',
    required: true,
    className: 'w-full',
    defaultValue: initialData.dueDate || '',
    helpText: 'When should this task be completed?',
  },
  {
    name: 'assigneeId',
    type: FIELD_TYPES.SELECT,
    label: 'Assigned To',
    required: false,
    placeholder: 'Who will work on this task?',
    options: assignees.map(({ id, name }) => ({
      value: id,
      label: name,
    })),
    className: 'w-full',
    defaultValue: initialData.assigneeId || userId || '',
    helpText: 'Select the team member responsible for this task. Leave empty if unassigned.',
  },
];
