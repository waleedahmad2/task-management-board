import { z } from 'zod';

import { TASK_PRIORITIES, TASK_STATUSES } from '#/constants/task';

export const taskFormSchema = z.object({
  title: z.string().min(1, 'Title is required').max(100, 'Title must be less than 100 characters'),
  description: z.string().min(1, 'Description is required').max(500, 'Description must be less than 500 characters'),
  priority: z.enum(TASK_PRIORITIES as [string, ...string[]], {
    required_error: 'Priority is required',
  }),
  status: z.enum(TASK_STATUSES as [string, ...string[]], {
    required_error: 'Status is required',
  }),
  dueDate: z.string().min(1, 'Due date is required'),
  assigneeId: z.string().optional(),
});

export type TaskFormData = z.infer<typeof taskFormSchema>;
