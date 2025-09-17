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

export const PROJECT_COLUMN_TYPES = {
  NAME: 'name',
  OWNER: 'owner',
  MEMBERS: 'members',
  CREATED_AT: 'createdAt',
  UPDATED_AT: 'updatedAt',
  STATUS: 'status',
} as const;

export type ProjectColumnType = (typeof PROJECT_COLUMN_TYPES)[keyof typeof PROJECT_COLUMN_TYPES];

export const PROJECT_TABLE_CONFIG = {
  VISIBLE_MEMBERS_LIMIT: 3,
  CARD_VISIBLE_MEMBERS_LIMIT: 5,
} as const;
