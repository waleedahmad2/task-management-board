import { JSX } from 'react';

import { FieldValues } from 'react-hook-form';

import { Input } from '#/components/ui/Input';
import { FormFieldError } from '#/types/form.types';
import { DynamicFormFieldProps } from '#/types/forms';

/**
 * Render default input field
 */
const renderDefaultField = <T extends FieldValues>(
  field: DynamicFormFieldProps<T>['field'],
  form: DynamicFormFieldProps<T>['form'],
  fieldError: FormFieldError | undefined
): JSX.Element => (
  <Input
    {...form.register(field.name, field.validation)}
    type={field.type}
    placeholder={field.placeholder}
    disabled={field.disabled}
    min={field.min}
    max={field.max}
    step={field.step}
    className={fieldError ? 'border-red-500' : ''}
  />
);

export default renderDefaultField;
