export const FEATURE_FLAGS = {
  ENABLE_REALTIME: 'enableRealtime',
  ENABLE_ASSIGNEES: 'enableAssignees',
} as const;

export const FEATURE_FLAG_LABELS = {
  [FEATURE_FLAGS.ENABLE_REALTIME]: 'Enable Realtime Updates',
  [FEATURE_FLAGS.ENABLE_ASSIGNEES]: 'Enable Assignees',
} as const;

export const FEATURE_FLAG_DESCRIPTIONS = {
  [FEATURE_FLAGS.ENABLE_REALTIME]:
    'When ON → the board listens for incoming events and updates automatically. When OFF → the board does not subscribe; user must refresh manually to see changes.',
  [FEATURE_FLAGS.ENABLE_ASSIGNEES]:
    'When ON → task form shows an "Assignee" field, and tasks display assigned user. When OFF → the assignee field is hidden, and tasks just show title/priority.',
} as const;

export const FEATURE_FLAG_DEFAULTS = {
  [FEATURE_FLAGS.ENABLE_REALTIME]: true,
  [FEATURE_FLAGS.ENABLE_ASSIGNEES]: true,
} as const;

export type FeatureFlagKey = (typeof FEATURE_FLAGS)[keyof typeof FEATURE_FLAGS];
export type FeatureFlags = Record<FeatureFlagKey, boolean>;
