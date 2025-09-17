import { JSX } from 'react';

import { FieldValues } from 'react-hook-form';

import { Textarea } from '#/components/ui/textarea';
import { FormFieldError } from '#/types/form.types';
import { DynamicFormFieldProps } from '#/types/forms';

/**
 * Render textarea field
 */
const TextareaField = <T extends FieldValues>(
  field: DynamicFormFieldProps<T>['field'],
  form: DynamicFormFieldProps<T>['form'],
  fieldError: FormFieldError | undefined
): JSX.Element => (
  <Textarea
    {...form.register(field.name, field.validation)}
    placeholder={field.placeholder}
    disabled={field.disabled}
    rows={field.rows || 4}
    className={fieldError ? 'border-red-500' : ''}
  />
);

export default TextareaField;
