import { JSX } from 'react';

import { FieldValues } from 'react-hook-form';

import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '#/components/ui';
import { FormFieldError } from '#/types/form.types';
import { DynamicFormFieldProps } from '#/types/forms';
import { setFieldValue } from './fieldCommands';

/**
 * Render select field using Shadcn Select
 */
const renderSelectField = <T extends FieldValues>(
  field: DynamicFormFieldProps<T>['field'],
  form: DynamicFormFieldProps<T>['form'],
  fieldError: FormFieldError | undefined
): JSX.Element => {
  // Get current value from form state, with fallback to defaultValue
  const currentValue = form.watch(field.name) || field.defaultValue || '';

  const handleChange = (selectedValue: string): void => {
    setFieldValue(form, field.name, selectedValue);
  };

  const renderSelectItem = (option: { value: string; label: string }): JSX.Element => (
    <SelectItem key={option.value} value={option.value}>
      {option.label}
    </SelectItem>
  );

  return (
    <Select value={currentValue} onValueChange={handleChange}>
      <SelectTrigger className={fieldError ? 'border-red-500' : ''}>
        <SelectValue placeholder={field.placeholder || 'Select an option'} />
      </SelectTrigger>
      <SelectContent>
        {field.options?.map(renderSelectItem)}
      </SelectContent>
    </Select>
  );
};

export default renderSelectField;
