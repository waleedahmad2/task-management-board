import { JSX } from 'react';

import { FieldValues } from 'react-hook-form';

import { Input } from '#/components/ui/Input';
import { FormFieldError } from '#/types/form.types';
import { DynamicFormFieldProps } from '#/types/forms';

/**
 * Enhanced default input field with better micro-interactions
 * Clear focus states, better error handling, and visual feedback
 */
const DefaultField = <T extends FieldValues>(
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
    className={`
      w-full transition-all duration-200
      ${
        fieldError
          ? 'border-red-300 focus:border-red-500 focus:ring-red-500/20'
          : 'border-gray-300 focus:border-indigo-500 focus:ring-indigo-500/20'
      }
      hover:border-gray-400
    `}
  />
);

export default DefaultField;
