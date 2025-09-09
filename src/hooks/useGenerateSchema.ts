import { FieldValues } from 'react-hook-form';
import { z } from 'zod';

import { MESSAGES } from '#/constants';
import { DynamicFormField } from '#/types/forms';

/**
 * Hook for generating Zod schemas from dynamic form fields
 * @param fields - Array of form field configurations
 */
export function useGenerateSchema<T extends FieldValues = FieldValues>(fields: DynamicFormField<T>[]): z.ZodSchema<T> {
  const { VALIDATION } = MESSAGES;
  const { EMAIL_INVALID, REQUIRED } = VALIDATION;

  const schemaObject: Record<string, z.ZodTypeAny> = {};

  fields.forEach(field => {
    let fieldSchema: z.ZodTypeAny;

    switch (field.type) {
      case 'email':
        fieldSchema = z.string().email(EMAIL_INVALID);
        break;
      case 'number':
        fieldSchema = z.number();
        break;
      default:
        fieldSchema = z.string();
    }

    // Add required validation if field is required
    if (field.required) {
      fieldSchema = (fieldSchema as z.ZodString).min(1, REQUIRED);
    }

    // Add custom validation if provided
    if (field.validation) {
      Object.entries(field.validation).forEach(([key, value]) => {
        if (key === 'min' && typeof value === 'number') {
          fieldSchema = (fieldSchema as z.ZodString).min(value);
        } else if (key === 'max' && typeof value === 'number') {
          fieldSchema = (fieldSchema as z.ZodString).max(value);
        } else if (key === 'pattern' && typeof value === 'string') {
          fieldSchema = (fieldSchema as z.ZodString).regex(new RegExp(value));
        }
      });
    }

    schemaObject[field.name as string] = fieldSchema;
  });

  return z.object(schemaObject) as unknown as z.ZodSchema<T>;
}
