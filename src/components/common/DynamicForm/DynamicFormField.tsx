import { JSX } from 'react';

import { FieldValues } from 'react-hook-form';

import { Input } from '#/components/ui/Input';
import { DynamicFormFieldProps } from '#/types/forms';

/**
 * DynamicFormField component that renders input fields
 * Uses shadcn Input component for consistent styling
 */
export function DynamicFormField<T extends FieldValues = FieldValues>({
  field,
  form,
  className = '',
}: DynamicFormFieldProps<T>): JSX.Element {
  const {
    register,
    formState: { errors },
  } = form;
  const fieldError = errors[field.name];

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
      <Input
        {...register(field.name, field.validation)}
        type={field.type}
        placeholder={field.placeholder}
        disabled={field.disabled}
        min={field.min}
        max={field.max}
        step={field.step}
        className={fieldError ? 'border-red-500' : ''}
      />

      {/* Error message */}
      {fieldError && (
        <p className='text-sm text-red-600' role='alert'>
          {fieldError.message as string}
        </p>
      )}
    </div>
  );
}
