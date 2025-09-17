import { JSX } from 'react';

import { FieldValues } from 'react-hook-form';

import { Button } from '#/components/ui';
import { DynamicFormProps } from '#/types/forms';
import { DynamicFormField } from './DynamicFormField';
import { DynamicFormSubmitButton } from './DynamicFormSubmitButton';

/**
 * DynamicForm component that renders form fields dynamically
 * Handles both grouped and ungrouped field layouts
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
  onCancel,
  inlineSubmit = false,
}: DynamicFormProps<T>): JSX.Element {
  const { handleSubmit } = form;

  // Group fields by logical sections for task forms
  const basicFields = fields.filter(field => ['title', 'description'].includes(field.name as string));

  const configFields = fields.filter(field => ['priority', 'status'].includes(field.name as string));

  const timelineFields = fields.filter(field => ['dueDate', 'assigneeId'].includes(field.name as string));

  // Get fields that don't fit into any group (like login forms)
  const otherFields = fields.filter(
    field => !['title', 'description', 'priority', 'status', 'dueDate', 'assigneeId'].includes(field.name as string)
  );

  // Check if this is a simple form (like login) that shouldn't be grouped
  const isSimpleForm =
    otherFields.length > 0 && basicFields.length === 0 && configFields.length === 0 && timelineFields.length === 0;

  return (
    <form id='task-form' onSubmit={handleSubmit(onSubmit)} className={`space-y-6 ${className}`} noValidate>
      {isSimpleForm ? (
        // Simple form layout (like login)
        <div className='space-y-4'>
          {otherFields.map(field => (
            <DynamicFormField key={field.name as string} field={field} form={form} />
          ))}
        </div>
      ) : (
        // Grouped form layout (like task forms)
        <>
          {/* Basic Information Section */}
          {basicFields.length > 0 && (
            <div className='space-y-4'>
              <div className='border-b border-gray-200 pb-2'>
                <h4 className='text-sm font-semibold text-gray-900 uppercase tracking-wide'>Basic Information</h4>
              </div>
              <div className='space-y-4'>
                {basicFields.map(field => (
                  <DynamicFormField key={field.name as string} field={field} form={form} />
                ))}
              </div>
            </div>
          )}

          {/* Task Configuration Section */}
          {configFields.length > 0 && (
            <div className='space-y-4'>
              <div className='border-b border-gray-200 pb-2'>
                <h4 className='text-sm font-semibold text-gray-900 uppercase tracking-wide'>Task Configuration</h4>
              </div>
              <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
                {configFields.map(field => (
                  <DynamicFormField key={field.name as string} field={field} form={form} />
                ))}
              </div>
            </div>
          )}

          {/* Timeline & Assignment Section */}
          {timelineFields.length > 0 && (
            <div className='space-y-4'>
              <div className='border-b border-gray-200 pb-2'>
                <h4 className='text-sm font-semibold text-gray-900 uppercase tracking-wide'>Timeline & Assignment</h4>
              </div>
              <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
                {timelineFields.map(field => (
                  <DynamicFormField key={field.name as string} field={field} form={form} />
                ))}
              </div>
            </div>
          )}

          {/* Other fields that don't fit into groups */}
          {otherFields.length > 0 && (
            <div className='space-y-2'>
              {otherFields.map(field => (
                <DynamicFormField key={field.name as string} field={field} form={form} />
              ))}
            </div>
          )}
        </>
      )}

      {/* Submit button */}
      {showSubmitButton && (
        <div className={`flex ${inlineSubmit ? 'items-center justify-between' : 'justify-end'} `}>
          {onCancel && (
            <Button
              type='button'
              variant='outline'
              size='default'
              onClick={onCancel}
              disabled={isLoading}
              className='px-6'
            >
              Cancel
            </Button>
          )}
          <DynamicFormSubmitButton isLoading={isLoading} disabled={isLoading} {...submitButtonProps}>
            {submitLabel}
          </DynamicFormSubmitButton>
        </div>
      )}
    </form>
  );
}
