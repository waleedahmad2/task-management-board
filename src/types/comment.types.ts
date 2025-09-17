export interface Comment {
  id: string;
  content: string;
  taskId: string;
  sender: {
    id: string;
    name: string;
    email: string;
    avatar?: string;
  };
  createdAt: string;
  updatedAt: string;
}

export interface CommentFormData {
  content: string;
  taskId: string;
}

export interface CommentsResponse {
  data: Comment[];
  pagination: {
    page: number;
    pageSize: number;
    totalCount: number;
    totalPages: number;
    hasNextPage: boolean;
    hasPreviousPage: boolean;
  };
}
