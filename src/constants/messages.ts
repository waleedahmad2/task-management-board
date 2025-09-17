/**
 * Application message constants
 * Centralized message management for forms, toasts, and UI
 */
export const MESSAGES = {
  // Authentication messages
  AUTH: {
    LOGIN_SUCCESS: 'Login successful! Welcome to Kanban Board',
    LOGIN_ERROR: 'Login failed. Please try again.',
    LOGOUT_SUCCESS: 'Logged out successfully',
    INVALID_EMAIL: 'Please enter a valid email address',
    EMAIL_NOT_FOUND: 'Email not found! User does not exist',
    EMAIL_REQUIRED: 'Email is required',
  },

  // Task messages
  TASK: {
    CREATE_SUCCESS: 'Task created successfully!',
    UPDATE_SUCCESS: 'Task updated successfully!',
    DELETE_SUCCESS: 'Task deleted successfully!',
    CREATE_ERROR: 'Failed to create task. Please try again.',
    UPDATE_ERROR: 'Failed to update task. Please try again.',
    DELETE_ERROR: 'Failed to delete task. Please try again.',
    EDITING_MODE: 'You are editing this task. Make your changes and save.',
  },

  // Form validation messages
  VALIDATION: {
    REQUIRED: 'This field is required',
    EMAIL_INVALID: 'Please enter a valid email address',
    MIN_LENGTH: (min: number) => `Must be at least ${min} characters`,
    MAX_LENGTH: (max: number) => `Must be no more than ${max} characters`,
  },

  // General messages
  GENERAL: {
    LOADING: 'Loading...',
    SUCCESS: 'Operation completed successfully',
    ERROR: 'An error occurred. Please try again.',
    NO_DATA: 'No data available',
  },
} as const;
