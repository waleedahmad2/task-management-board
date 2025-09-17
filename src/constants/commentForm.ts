import { FIELD_TYPES } from './formFields';

export const COMMENT_FORM_FIELDS = [
  {
    name: 'content',
    type: FIELD_TYPES.TEXTAREA,
    label: '',
    placeholder: 'Write a comment...',
    required: true,
    rows: 3,
    className: 'w-full resize-none',
  },
] as const;
