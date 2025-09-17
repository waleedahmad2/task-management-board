import { Comment } from '#/types/comment.types';

export const mockComments: Comment[] = [
  {
    id: 'comment-1',
    content: 'This task looks good! Let me know if you need any help with the implementation.',
    taskId: 'task-1',
    sender: {
      id: 'user-1',
      name: 'John Doe',
      email: 'john.doe@example.com',
      avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=32&h=32&fit=crop&crop=face',
    },
    createdAt: '2024-01-20T10:30:00Z',
    updatedAt: '2024-01-20T10:30:00Z',
  },
  {
    id: 'comment-2',
    content: "I think we should prioritize this task. It's blocking other features.",
    taskId: 'task-1',
    sender: {
      id: 'user-2',
      name: 'Jane Smith',
      email: 'jane.smith@example.com',
      avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=32&h=32&fit=crop&crop=face',
    },
    createdAt: '2024-01-20T11:15:00Z',
    updatedAt: '2024-01-20T11:15:00Z',
  },
  {
    id: 'comment-3',
    content: 'The design mockups are ready. You can find them in the design folder.',
    taskId: 'task-1',
    sender: {
      id: 'user-3',
      name: 'Mike Johnson',
      email: 'mike.johnson@example.com',
    },
    createdAt: '2024-01-20T14:20:00Z',
    updatedAt: '2024-01-20T14:20:00Z',
  },
  {
    id: 'comment-4',
    content: 'Great work on the authentication system! The implementation looks solid.',
    taskId: 'task-2',
    sender: {
      id: 'user-4',
      name: 'Sarah Wilson',
      email: 'sarah.wilson@example.com',
      avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=32&h=32&fit=crop&crop=face',
    },
    createdAt: '2024-01-21T09:45:00Z',
    updatedAt: '2024-01-21T09:45:00Z',
  },
  {
    id: 'comment-5',
    content: "I've reviewed the API documentation. Everything looks comprehensive.",
    taskId: 'task-3',
    sender: {
      id: 'user-5',
      name: 'David Brown',
      email: 'david.brown@example.com',
    },
    createdAt: '2024-01-22T16:30:00Z',
    updatedAt: '2024-01-22T16:30:00Z',
  },
  {
    id: 'comment-6',
    content: 'The database schema is complete and tested. Ready for production.',
    taskId: 'task-4',
    sender: {
      id: 'user-6',
      name: 'Lisa Davis',
      email: 'lisa.davis@example.com',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=32&h=32&fit=crop&crop=face',
    },
    createdAt: '2024-01-15T13:15:00Z',
    updatedAt: '2024-01-15T13:15:00Z',
  },
];
