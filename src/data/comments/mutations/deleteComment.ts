import { performRequest } from '../../../services/apiClient';

export interface DeleteCommentParams {
  commentId: string;
}

export const deleteComment = async ({ commentId }: DeleteCommentParams): Promise<void> => {
  return performRequest<void>({
    method: 'DELETE',
    url: `/comments/${commentId}`,
  });
};
