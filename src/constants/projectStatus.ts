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
