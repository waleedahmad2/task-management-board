import { http, HttpResponse } from 'msw';

import { MOCK_USERS } from './data';
import { LoginRequest, LoginResponse, User } from '#/types/auth/auth.types';

/**
 * Auth handlers for MSW
 */
export const authHandlers = [
  // Login endpoint
  http.post('/api/auth/login', async ({ request }) => {
    const { email } = await request.json() as LoginRequest;
    
    // Find user by email
    const user = MOCK_USERS.find(u => u.email === email);
    
    if (!user) {
      return HttpResponse.json(
        { error: 'Invalid credentials' },
        { status: 401 }
      );
    }

    // Generate a mock token
    const token = `mock-token-${user.id}-${Date.now()}`;
    
    const response: LoginResponse = {
      token,
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        role: user.role,
      },
    };

    return HttpResponse.json(response);
  }),

  // Validate token endpoint
  http.get('/api/auth/validate', async ({ request }) => {
    const authHeader = request.headers.get('Authorization');
    
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return HttpResponse.json(
        { error: 'No token provided' },
        { status: 401 }
      );
    }

    const token = authHeader.replace('Bearer ', '');
    
    // Extract user ID from mock token
    const userId = token.split('-')[2];
    const user = MOCK_USERS.find(u => u.id === userId);
    
    if (!user) {
      return HttpResponse.json(
        { error: 'Invalid token' },
        { status: 401 }
      );
    }

    const userResponse: User = {
      id: user.id,
      name: user.name,
      email: user.email,
      role: user.role,
    };

    return HttpResponse.json(userResponse);
  }),

  // Logout endpoint
  http.post('/api/auth/logout', () => {
    return HttpResponse.json({ message: 'Logged out successfully' });
  }),
];