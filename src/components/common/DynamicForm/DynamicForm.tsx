import { JSX } from 'react';

import { FieldValues } from 'react-hook-form';

import { DynamicFormProps } from '#/types/forms';
import { DynamicFormField } from './DynamicFormField';
import { DynamicFormSubmitButton } from './DynamicFormSubmitButton';

/**
 *
 * Main DynamicForm component that renders form fields dynamically
 * Uses shadcn components for consistent UI
 */
export function DynamicForm<T extends FieldValues = FieldValues>({
  fields,
  form,
  onSubmit,
  submitLabel = 'Submit',
  isLoading = false,
  className = '',
  showSubmitButton = true,
  submitButtonProps = {},
}: DynamicFormProps<T>): JSX.Element {
  const { handleSubmit } = form;

  return (
    <form onSubmit={handleSubmit(onSubmit)} className={`space-y-6 ${className}`} noValidate>
      {/* Render all form fields */}
      {fields.map(field => (
        <DynamicFormField key={field.name as string} field={field} form={form} />
      ))}

      {/* Submit button */}
      {showSubmitButton && (
        <div className='flex justify-end'>
          <DynamicFormSubmitButton isLoading={isLoading} disabled={isLoading} {...submitButtonProps}>
            {submitLabel}
          </DynamicFormSubmitButton>
        </div>
      )}
    </form>
  );
}
