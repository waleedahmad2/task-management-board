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
