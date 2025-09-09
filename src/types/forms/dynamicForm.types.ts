import { ReactNode } from 'react';
import { FieldValues, Path, UseFormReturn } from 'react-hook-form';

/**
 * Supported field types for dynamic forms (simplified for now)
 */
export type FieldType = 
  | 'text'
  | 'email'
  | 'password'
  | 'number';

/**
 * Dynamic form field configuration
 */
export interface DynamicFormField<T extends FieldValues = FieldValues> {
  name: Path<T>;
  type: FieldType;
  label?: string;
  placeholder?: string;
  description?: string;
  required?: boolean;
  disabled?: boolean;
  defaultValue?: unknown;
  validation?: Record<string, unknown>;
  
  // Field-specific properties
  min?: number; // for number input
  max?: number; // for number input
  step?: number; // for number input
  
  // Custom rendering
  render?: (props: DynamicFormFieldProps<T>) => ReactNode;
}

/**
 * Props for individual form fields
 */
export interface DynamicFormFieldProps<T extends FieldValues = FieldValues> {
  field: DynamicFormField<T>;
  form: UseFormReturn<T>;
  className?: string;
}

/**
 * Main dynamic form props
 */
export interface DynamicFormProps<T extends FieldValues = FieldValues> {
  fields: DynamicFormField<T>[];
  form: UseFormReturn<T>;
  onSubmit: (data: T) => void | Promise<void>;
  submitLabel?: string;
  isLoading?: boolean;
  className?: string;
  showSubmitButton?: boolean;
  submitButtonProps?: Record<string, unknown>;
}

/**
 * Form submit button props
 */
export interface DynamicFormSubmitButtonProps {
  isLoading?: boolean;
  disabled?: boolean;
  children?: ReactNode;
  className?: string;
  variant?: 'default' | 'destructive' | 'outline' | 'secondary' | 'ghost' | 'link';
  size?: 'default' | 'sm' | 'lg' | 'icon';
}
