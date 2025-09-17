export const TASK_STATUSES = ['backlog', 'in-progress', 'review', 'done'] as const;
export const TASK_STATUS_ORDER = ['backlog', 'in-progress', 'review', 'done'] as const;
export const TASK_PRIORITIES = ['low', 'medium', 'high', 'urgent'] as const;

export const TASK_STATUS_LABELS = {
  backlog: 'Backlog',
  'in-progress': 'In Progress',
  review: 'Review',
  done: 'Done',
} as const;

export const TASK_PRIORITY_LABELS = {
  low: 'Low',
  medium: 'Medium',
  high: 'High',
  urgent: 'Urgent',
} as const;

export const TASK_PRIORITY_COLORS = {
  low: 'bg-green-100 text-green-800 border-green-200',
  medium: 'bg-yellow-100 text-yellow-800 border-yellow-200',
  high: 'bg-orange-100 text-orange-800 border-orange-200',
  urgent: 'bg-red-100 text-red-800 border-red-200',
} as const;

export const TASK_STATUS_DOT_COLORS = {
  backlog: 'bg-gray-400',
  'in-progress': 'bg-blue-400',
  review: 'bg-yellow-400',
  done: 'bg-green-400',
} as const;

export const TASK_PRIORITIES_CONFIG = [
  { value: 'low', label: 'Low', color: 'text-green-600' },
  { value: 'medium', label: 'Medium', color: 'text-yellow-600' },
  { value: 'high', label: 'High', color: 'text-orange-600' },
  { value: 'urgent', label: 'Urgent', color: 'text-red-600' },
] as const;

// Task Action Constants
export const TASK_ACTIONS = {
  EDIT: 'edit',
  DELETE: 'delete',
} as const;

export const TASK_ACTION_LABELS = {
  [TASK_ACTIONS.EDIT]: 'Edit',
  [TASK_ACTIONS.DELETE]: 'Delete',
} as const;

// Task Modal Constants
export const TASK_MODAL_MODES = {
  CREATE: 'create',
  EDIT: 'edit',
} as const;

export const TASK_MODAL_TITLES = {
  [TASK_MODAL_MODES.CREATE]: 'Create New Task',
  [TASK_MODAL_MODES.EDIT]: 'Edit Task',
} as const;

export const TASK_MODAL_DESCRIPTIONS = {
  [TASK_MODAL_MODES.CREATE]: 'Fill in the details to create a new task',
  [TASK_MODAL_MODES.EDIT]: 'Update the task details below',
} as const;

// Task card status colors
export const TASK_STATUS_COLORS = {
  COMPLETED: 'bg-green-100 text-green-600',
  IN_PROGRESS: 'bg-yellow-100 text-yellow-600',
  TODO: 'bg-blue-100 text-blue-600',
  DEFAULT: 'bg-gray-100 text-gray-600',
} as const;

// Task card footer text
export const TASK_FOOTER_TEXT = {
  OVERDUE: 'Overdue',
  ACTIVE: 'Active Task',
} as const;
