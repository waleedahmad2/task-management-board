import { http, HttpResponse } from 'msw';

import { apiEndpoints } from '#/constants/apiEndpoints';
import { CommentFormData } from '#/schemas/commentFormSchema';
import { Comment } from '#/types/comment.types';
import { mockComments } from './data';

// In-memory storage for comments (simulates database)
let comments = [...mockComments];

export const commentHandlers = [
  // Get comments for a task with pagination
  http.get(apiEndpoints.COMMENTS.LIST, ({ request }) => {
    const url = new URL(request.url);
    const taskId = url.searchParams.get('taskId');
    const page = parseInt(url.searchParams.get('page') || '1');
    const pageSize = parseInt(url.searchParams.get('pageSize') || '10');

    const taskComments = comments.filter(comment => comment.taskId === taskId);

    const startIndex = (page - 1) * pageSize;
    const endIndex = startIndex + pageSize;
    const paginatedComments = taskComments.slice(startIndex, endIndex);

    return HttpResponse.json({
      data: paginatedComments,
      pagination: {
        page,
        pageSize,
        totalCount: taskComments.length,
        totalPages: Math.ceil(taskComments.length / pageSize),
        hasNextPage: endIndex < taskComments.length,
        hasPreviousPage: page > 1,
      },
    });
  }),

  // Get a single comment
  http.get(`${apiEndpoints.COMMENTS.LIST}/:commentId`, ({ params }) => {
    const { commentId } = params;
    const comment = comments.find(c => c.id === commentId);

    if (!comment) {
      return HttpResponse.json({ error: 'Comment not found' }, { status: 404 });
    }

    return HttpResponse.json(comment);
  }),

  // Create a new comment
  http.post(apiEndpoints.COMMENTS.LIST, async ({ request }) => {
    const body = (await request.json()) as CommentFormData & {
      taskId: string;
      sender: {
        id: string;
        name: string;
        email: string;
      };
    };

    const newComment: Comment = {
      id: `comment-${Date.now()}`,
      content: body.content,
      taskId: body.taskId,
      sender: body.sender,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    comments.push(newComment);

    return HttpResponse.json(newComment, { status: 201 });
  }),

  // Update a comment
  http.put(`${apiEndpoints.COMMENTS.LIST}/:commentId`, async ({ params, request }) => {
    const { commentId } = params;
    const body = (await request.json()) as Partial<CommentFormData>;

    const commentIndex = comments.findIndex(c => c.id === commentId);

    if (commentIndex === -1) {
      return HttpResponse.json({ error: 'Comment not found' }, { status: 404 });
    }

    const updatedComment: Comment = {
      ...comments[commentIndex],
      content: body.content || comments[commentIndex].content,
      updatedAt: new Date().toISOString(),
    };

    comments[commentIndex] = updatedComment;

    return HttpResponse.json(updatedComment);
  }),

  // Delete a comment
  http.delete(`${apiEndpoints.COMMENTS.LIST}/:commentId`, ({ params }) => {
    const { commentId } = params;
    const commentIndex = comments.findIndex(c => c.id === commentId);

    if (commentIndex === -1) {
      return HttpResponse.json({ error: 'Comment not found' }, { status: 404 });
    }

    comments.splice(commentIndex, 1);

    return HttpResponse.json({ message: 'Comment deleted successfully' });
  }),
];
