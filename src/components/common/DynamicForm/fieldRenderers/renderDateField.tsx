import { JSX } from 'react';

import { FieldValues, Controller } from 'react-hook-form';

import { DatePicker } from '#/components/ui/datePicker';
import { FormFieldError } from '#/types/form.types';
import { DynamicFormFieldProps } from '#/types/forms';

/**
 * Render date field using Shadcn DatePicker
 */
const renderDateField = <T extends FieldValues>(
  field: DynamicFormFieldProps<T>['field'],
  form: DynamicFormFieldProps<T>['form'],
  fieldError: FormFieldError | undefined
): JSX.Element => {
  const { control } = form;

  const handleDateChange = (date: Date | undefined, onChange: (value: string) => void): void => {
    onChange(date?.toISOString().split('T')[0] || '');
  };

  const renderDatePicker = ({ field: { onChange, value, ...fieldProps } }: { field: { onChange: (value: string) => void; value: string; [key: string]: unknown } }): JSX.Element => (
    <DatePicker
      {...fieldProps}
      value={value ? new Date(value) : undefined}
      onChange={(date) => handleDateChange(date, onChange)}
      placeholder={field.placeholder}
      disabled={field.disabled}
      className={fieldError ? 'border-red-500' : ''}
    />
  );

  return (
    <Controller
      name={field.name}
      control={control}
      rules={field.validation}
      render={renderDatePicker}
    />
  );
};

export default renderDateField;
