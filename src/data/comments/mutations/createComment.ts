import { Comment, CommentFormData } from '#/types/comment.types';
import { performRequest } from '../../../services/apiClient';

export interface CreateCommentParams {
  formData: CommentFormData;
  taskId: string;
  sender: {
    id: string;
    name: string;
    email: string;
  };
}

export const createComment = async ({ formData, taskId, sender }: CreateCommentParams): Promise<Comment> => {
  const result = await performRequest<Comment, Record<string, unknown>>({
    method: 'POST',
    url: '/comments',
    payload: {
      content: formData.content,
      taskId,
      sender,
    } as Record<string, unknown>,
  });

  return result;
};
