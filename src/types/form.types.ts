/**
 * Form-related types
 */

export interface FormFieldError {
  message: string;
  type?: string;
}

export interface FormErrors {
  [fieldName: string]: FormFieldError | undefined;
}

export interface FieldRendererProps {
  field: {
    name: string;
    type: string;
    label: string;
    placeholder?: string;
    required?: boolean;
    options?: Array<{ value: string; label: string }>;
  };
  value: unknown;
  onChange: (value: unknown) => void;
  fieldError: FormFieldError | undefined;
  className?: string;
}

export interface DynamicFormField {
  name: string;
  type: 'text' | 'email' | 'password' | 'textarea' | 'select' | 'date' | 'number';
  label: string;
  placeholder?: string;
  required?: boolean;
  validation?: Record<string, unknown>;
  options?: Array<{ value: string; label: string }>;
  defaultValue?: unknown;
}

export interface FormSubmitData {
  [key: string]: unknown;
}
