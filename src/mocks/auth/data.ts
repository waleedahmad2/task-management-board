import { MockUser } from '#/types/auth/auth.types';

/**
 * Mock users for development - in a real app, this would come from an API
 */
export const MOCK_USERS: MockUser[] = [
  {
    id: '1',
    name: 'Admin User',
    email: 'admin@kanban.com',
    role: 'admin',
  },
  {
    id: '2',
    name: 'Member User',
    email: 'member@kanban.com',
    role: 'member',
  },
  {
    id: '3',
    name: 'John Doe',
    email: 'john.doe@example.com',
    role: 'member',
  },
  {
    id: '4',
    name: 'Jane Smith',
    email: 'jane.smith@example.com',
    role: 'admin',
  },
];
