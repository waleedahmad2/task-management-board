import { zodResolver } from '@hookform/resolvers/zod';
import { useForm, UseFormReturn, FieldValues } from 'react-hook-form';
import { z } from 'zod';

import { DynamicFormField } from '#/types/forms';
import { useGenerateSchema } from './useGenerateSchema';

/**
 * Creates dynamic forms with automatic validation and field management.
 * @param fields - Form field configurations array
 * @param schema - Optional Zod validation schema
 * @param defaultValues - Initial form values
 * @returns React Hook Form instance with validation
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
    defaultValues: defaultValues as T,
    mode: 'onBlur',
  });

  return form as unknown as UseFormReturn<T>;
}
