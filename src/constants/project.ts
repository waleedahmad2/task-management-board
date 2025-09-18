import { STATUS_DOT_COLORS } from './colors';

export const STATUS_CONFIG = {
  active: {
    label: 'Active Projects',
    description: 'Currently active projects',
    color: 'green',
  },
  draft: {
    label: 'Draft Projects',
    description: 'Projects in draft status',
    color: 'yellow',
  },
  archived: {
    label: 'Archived Projects',
    description: 'Archived projects',
    color: 'gray',
  },
} as const;

/**
 * Project status arrays and labels
 */
export const PROJECT_STATUSES = ['active', 'draft', 'archived'] as const;
export const STATUS_LABELS = {
  active: 'Active Projects',
  draft: 'Draft Projects',
  archived: 'Archived Projects',
} as const;

/**
 * Get status dot color class
 */
export const getStatusDotColor = (status: keyof typeof STATUS_DOT_COLORS): string => {
  return STATUS_DOT_COLORS[status] || STATUS_DOT_COLORS.archived;
};

/**
 * Projects table columns configuration
 */
export const PROJECT_TABLE_COLUMNS = [
  { key: 'name', header: 'Project Name', width: '25%' },
  { key: 'owner', header: 'Owner', width: '20%' },
  { key: 'members', header: 'Team Members', width: '15%' },
  { key: 'createdAt', header: 'Created', width: '15%' },
  { key: 'updatedAt', header: 'Last Updated', width: '15%' },
  { key: 'status', header: 'Status', width: '10%' },
] as const;

/**
 * View type constants
 */
export const VIEW_TYPES = {
  TABLE: 'table',
  CARD: 'card',
} as const;

export type ViewType = (typeof VIEW_TYPES)[keyof typeof VIEW_TYPES];

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
