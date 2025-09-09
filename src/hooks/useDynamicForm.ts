import { zodResolver } from '@hookform/resolvers/zod';
import { useForm, UseFormReturn, FieldValues } from 'react-hook-form';
import { z } from 'zod';

import { DynamicFormField } from '#/types/forms';
import { useGenerateSchema } from './useGenerateSchema';

/**
 * Hook for creating dynamic forms with validation
 * @param fields - Array of form field configurations
 * @param schema - Zod schema for validation (optional)
 * @param defaultValues - Default values for the form
 */
export function useDynamicForm<T extends FieldValues = FieldValues>(
  fields: DynamicFormField<T>[],
  schema?: z.ZodSchema<T>,
  defaultValues?: Partial<T>
): UseFormReturn<T> {
  const generatedSchema = useGenerateSchema(fields);
  const finalSchema = schema || generatedSchema;

  const form = useForm<T>({
    resolver: zodResolver(finalSchema),
    defaultValues: defaultValues as Partial<T>,
    mode: 'onBlur',
  });

  return form as unknown as UseFormReturn<T>;
}
