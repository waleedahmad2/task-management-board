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
          <p className='text-sm text-red-600 flex items-center gap-1' role='alert'>
            <svg className='w-4 h-4 flex-shrink-0' fill='currentColor' viewBox='0 0 20 20'>
              <path
                fillRule='evenodd'
                d='M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z'
                clipRule='evenodd'
              />
            </svg>
            {fieldError.message as string}
          </p>
        )}
      </div>
    );
  }

  return (
    <div className={`space-y-2 ${className}`}>
      {/* Enhanced Label with better visual hierarchy */}
      {field.label && (
        <div className='space-y-1'>
          <label htmlFor={field.name as string} className='block text-sm font-semibold text-gray-900'>
            {field.label}
            {field.required && <span className='text-red-500 ml-1'>*</span>}
          </label>
          {field.description && <p className='text-xs text-gray-500 leading-relaxed'>{field.description}</p>}
        </div>
      )}

      {/* Field with enhanced styling */}
      <div className='relative'>
        {renderField(field, form, fieldError ? { message: (fieldError.message as string) || '' } : undefined)}
      </div>

      {/* Enhanced Error message */}
      {fieldError && (
        <p className='text-sm text-red-600 flex items-center gap-1' role='alert'>
          <svg className='w-4 h-4 flex-shrink-0' fill='currentColor' viewBox='0 0 20 20'>
            <path
              fillRule='evenodd'
              d='M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z'
              clipRule='evenodd'
            />
          </svg>
          {fieldError.message as string}
        </p>
      )}
    </div>
  );
}
