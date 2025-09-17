/**
 * Form field type constants
 */
export const FIELD_TYPES = {
  TEXT: 'text',
  EMAIL: 'email',
  PASSWORD: 'password',
  NUMBER: 'number',
  TEXTAREA: 'textarea',
  SELECT: 'select',
  DATE: 'date',
} as const;

/**
 * Form field type for TypeScript
 */
export type FieldType = (typeof FIELD_TYPES)[keyof typeof FIELD_TYPES];
