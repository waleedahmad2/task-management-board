import { FIELD_TYPES } from './formFields';

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

export const COMMENT_FORM_FIELDS = [
  {
    name: 'content',
    type: FIELD_TYPES.TEXTAREA,
    label: '',
    placeholder: 'Write a comment...',
    required: true,
    rows: 3,
    className: 'w-full resize-none focus:ring-0 focus:ring-offset-0 border-0 shadow-none',
  },
];
