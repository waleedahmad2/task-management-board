import { JSX } from 'react';

import { FieldValues, Controller } from 'react-hook-form';

import { DatePicker } from '#/components/ui/datePicker';
import { FormFieldError } from '#/types/form.types';
import { DynamicFormFieldProps } from '#/types/forms';
import { setFieldValue } from './fieldCommands';

/**
 * Render date field using Shadcn DatePicker with proper form integration
 */
const DateField = <T extends FieldValues>(
  field: DynamicFormFieldProps<T>['field'],
  form: DynamicFormFieldProps<T>['form'],
  fieldError: FormFieldError | undefined
): JSX.Element => {
  const { control } = form;

  const handleDateChange = (date: Date | undefined): void => {
    const dateString = date ? date.toLocaleDateString('en-CA') : '';
    setFieldValue(form, field.name, dateString);
  };

  const renderDatePicker = ({
    field: { value, ...fieldProps },
  }: {
    field: { value: string; [key: string]: unknown };
  }): JSX.Element => (
    <DatePicker
      {...fieldProps}
      value={value ? new Date(value + 'T00:00:00') : undefined}
      onChange={handleDateChange}
      placeholder={field.placeholder}
      disabled={field.disabled}
      className={fieldError ? 'border-red-500' : ''}
    />
  );

  return <Controller name={field.name} control={control} rules={field.validation} render={renderDatePicker} />;
};

export default DateField;
