import { apiEndpoints } from '#/constants';
import { Comment, CommentFormData } from '#/types/comment.types';
import { performRequest } from '../../../services/apiClient';

export interface UpdateCommentParams {
  commentId: string;
  updates: Partial<CommentFormData>;
}

export const updateComment = async ({ commentId, updates }: UpdateCommentParams): Promise<Comment> => {
  return performRequest<Comment, Record<string, unknown>>({
    method: 'PUT',
    url: apiEndpoints.COMMENTS.UPDATE(commentId),
    payload: updates as Record<string, unknown>,
  });
};
