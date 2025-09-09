import { LoginRequest, LoginResponse, MockUser, UserRole } from '#/types/auth.types';

/**
 * Mock users for development - in a real app, this would come from an API
 */
const MOCK_USERS: MockUser[] = [
  {
    id: '1',
    email: 'admin@kanban.com',
    role: 'admin',
  },
  {
    id: '2',
    email: 'member@kanban.com',
    role: 'member',
  },
  {
    id: '3',
    email: 'john.doe@example.com',
    role: 'member',
  },
  {
    id: '4',
    email: 'jane.smith@example.com',
    role: 'admin',
  },
];

/**
 * Simulates API delay for realistic authentication flow
 */
const simulateApiDelay = (): Promise<void> => {
  return new Promise((resolve) => {
    setTimeout(resolve, 1000 + Math.random() * 1000); // 1-2 seconds delay
  });
};

/**
 * Validates email format
 */
const isValidEmail = (email: string): boolean => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

/**
 * Mock authentication service for email-only login
 */
export class AuthService {
  /**
   * Authenticates user with email only (no password required)
   */
  static async login(request: LoginRequest): Promise<LoginResponse> {
    await simulateApiDelay();

    // Validate email format
    if (!isValidEmail(request.email)) {
      throw new Error('Please enter a valid email address');
    }

    // Find user by email
    const user = MOCK_USERS.find((u) => u.email.toLowerCase() === request.email.toLowerCase());

    if (!user) {
      throw new Error('User not found. Please check your email address');
    }

    // Generate a mock token (in real app, this would come from the server)
    const token = `mock_token_${user.id}_${Date.now()}`;

    return {
      user: {
        id: user.id,
        email: user.email,
        role: user.role,
      },
      token,
    };
  }

  /**
   * Validates a stored token and returns user data
   */
  static async validateToken(token: string): Promise<LoginResponse['user'] | null> {
    await simulateApiDelay();

    // Extract user ID from mock token
    const tokenParts = token.split('_');
    if (tokenParts.length < 3 || tokenParts[0] !== 'mock' || tokenParts[1] !== 'token') {
      return null;
    }

    const userId = tokenParts[2];
    const user = MOCK_USERS.find((u) => u.id === userId);

    if (!user) {
      return null;
    }

    return {
      id: user.id,
      email: user.email,
      role: user.role,
    };
  }

  /**
   * Checks if user has admin role
   */
  static isAdmin(user: LoginResponse['user']): boolean {
    return user.role === 'admin';
  }

  /**
   * Checks if user has member role
   */
  static isMember(user: LoginResponse['user']): boolean {
    return user.role === 'member';
  }

  /**
   * Checks if user can perform delete operations
   */
  static canDelete(user: LoginResponse['user']): boolean {
    return user.role === 'admin';
  }

  /**
   * Checks if user can perform create/update operations
   */
  static canCreateOrUpdate(user: LoginResponse['user']): boolean {
    return true; // Both admin and member can create/update
  }
}
