/**
 * Projects-related constants
 */

export const PROJECTS_CONSTANTS = {
  DEFAULT_PAGE_SIZE: 8,
  MAX_PAGE_SIZE: 50,
  MIN_PAGE_SIZE: 5,
} as const;

export const PROJECTS_CONFIG = {
  INFINITE_SCROLL: {
    PAGE_SIZE: PROJECTS_CONSTANTS.DEFAULT_PAGE_SIZE,
    SCROLL_THRESHOLD: 100, // pixels from bottom to trigger load
  },
} as const;
