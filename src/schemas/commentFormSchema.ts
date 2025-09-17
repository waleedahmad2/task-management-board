import { z } from 'zod';

export const commentFormSchema = z.object({
  content: z.string().min(1, 'Comment is required').max(500, 'Comment must be less than 500 characters'),
});

export type CommentFormData = z.infer<typeof commentFormSchema>;
