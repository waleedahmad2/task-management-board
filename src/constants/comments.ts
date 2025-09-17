/**
 * Comments-related constants
 */

export const COMMENTS_CONSTANTS = {
  DEFAULT_PAGE_SIZE: 10,
  MAX_PAGE_SIZE: 50,
  MIN_PAGE_SIZE: 5,
} as const;

export const COMMENTS_CONFIG = {
  INFINITE_SCROLL: {
    PAGE_SIZE: COMMENTS_CONSTANTS.DEFAULT_PAGE_SIZE,
    SCROLL_THRESHOLD: 100, // pixels from bottom to trigger load
  },
} as const;
