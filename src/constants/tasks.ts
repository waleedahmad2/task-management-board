/**
 * Tasks-related constants
 */

export const TASKS_CONSTANTS = {
  DEFAULT_PAGE_SIZE: 5,
  MAX_PAGE_SIZE: 50,
  MIN_PAGE_SIZE: 3,
} as const;

export const TASKS_CONFIG = {
  INFINITE_SCROLL: {
    PAGE_SIZE: TASKS_CONSTANTS.DEFAULT_PAGE_SIZE,
    SCROLL_THRESHOLD: 100, // pixels from bottom to trigger load
  },
} as const;
