import { JSX } from 'react';

import { FieldValues } from 'react-hook-form';

import { Textarea } from '#/components/ui';
import { FormFieldError } from '#/types/form.types';
import { DynamicFormFieldProps } from '#/types/forms';
import { cn } from '#/utils';

/**
 * Render textarea field
 */
const renderTextareaField = <T extends FieldValues>(
  field: DynamicFormFieldProps<T>['field'],
  form: DynamicFormFieldProps<T>['form'],
  fieldError: FormFieldError | undefined
): JSX.Element => (
  <Textarea
    {...form.register(field.name, field.validation)}
    placeholder={field.placeholder}
    disabled={field.disabled}
    rows={field.rows || 4}
    defaultValue={(field.defaultValue as string) || ''}
    className={cn('resize-none', fieldError && 'border-red-500 focus-visible:ring-red-500')}
  />
);

export default renderTextareaField;
