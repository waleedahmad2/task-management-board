import { JSX } from 'react';

import { FieldValues, Controller } from 'react-hook-form';

import { DatePicker } from '#/components/ui/datePicker';
import { FormFieldError } from '#/types/form.types';
import { DynamicFormFieldProps } from '#/types/forms';

/**
 * Render date field using Shadcn DatePicker with proper form integration
 */
const renderDateField = <T extends FieldValues>(
  field: DynamicFormFieldProps<T>['field'],
  form: DynamicFormFieldProps<T>['form'],
  fieldError: FormFieldError | undefined
): JSX.Element => {
  const { control, setValue, trigger } = form;

  const handleDateChange = (date: Date | undefined): void => {
    const dateString = date?.toISOString().split('T')[0] || '';
    setValue(field.name as string, dateString as string, { shouldValidate: true });
    trigger(field.name as string);
  };

  const renderDatePicker = ({
    field: { value, ...fieldProps },
  }: {
    field: { value: string; [key: string]: unknown };
  }): JSX.Element => (
    <DatePicker
      {...fieldProps}
      value={value ? new Date(value) : undefined}
      onChange={handleDateChange}
      placeholder={field.placeholder}
      disabled={field.disabled}
      className={fieldError ? 'border-red-500' : ''}
    />
  );

  return <Controller name={field.name} control={control} rules={field.validation} render={renderDatePicker} />;
};

export default renderDateField;
