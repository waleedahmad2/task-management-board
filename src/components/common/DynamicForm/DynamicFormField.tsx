import { JSX } from 'react';

import { FieldValues } from 'react-hook-form';

import { DynamicFormFieldProps } from '#/types/forms';
import { renderField } from './fieldRenderers';

/**
 * DynamicFormField component that renders input fields
 * Uses modular render functions for better maintainability
 */
export function DynamicFormField<T extends FieldValues = FieldValues>({
  field,
  form,
  className = '',
}: DynamicFormFieldProps<T>): JSX.Element {
  const fieldError = form.formState.errors[field.name];

  // Custom render function
  if (field.render) {
    return (
      <div className={`space-y-2 ${className}`}>
        {field.render({ field, form, className })}
        {fieldError && (
          <p className='text-sm text-red-600' role='alert'>
            {fieldError.message as string}
          </p>
        )}
      </div>
    );
  }

  return (
    <div className={`space-y-2 ${className}`}>
      {/* Label */}
      {field.label && (
        <label htmlFor={field.name as string} className='block text-sm font-medium text-gray-700'>
          {field.label}
          {field.required && <span className='text-red-500 ml-1'>*</span>}
        </label>
      )}
      {renderField(field, form, fieldError ? { message: (fieldError.message as string) || '' } : undefined)}

      {/* Error message */}
      {fieldError && (
        <p className='text-sm text-red-600' role='alert'>
          {fieldError.message as string}
        </p>
      )}
    </div>
  );
}
