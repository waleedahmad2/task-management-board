import { JSX } from 'react';

import { Button } from '#/components/ui/Button';
import { DynamicFormSubmitButtonProps } from '#/types/forms';

/**
 * Submit button component for dynamic forms
 * Uses shadcn Button component with loading state
 */
export function DynamicFormSubmitButton({
  isLoading = false,
  disabled = false,
  children,
  className = '',
  variant = 'default',
  size = 'default',
  ...props
}: DynamicFormSubmitButtonProps): JSX.Element {
  return (
    <Button
      type='submit'
      disabled={disabled || isLoading}
      className={className}
      variant={variant}
      size={size}
      {...props}
    >
      {isLoading ? (
        <div className='flex items-center space-x-2'>
          <div className='animate-spin rounded-full h-4 w-4 border-b-2 border-white' />
          <span>Loading...</span>
        </div>
      ) : (
        children || 'Submit'
      )}
    </Button>
  );
}
