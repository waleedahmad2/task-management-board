import { JSX } from 'react';

import { FieldValues, Controller } from 'react-hook-form';

import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '#/components/ui/select';
import { FormFieldError } from '#/types/form.types';
import { DynamicFormFieldProps } from '#/types/forms';
import { setFieldValue } from './fieldCommands';

/**
 * Render select field with proper form integration
 */
const SelectField = <T extends FieldValues>(
  field: DynamicFormFieldProps<T>['field'],
  form: DynamicFormFieldProps<T>['form'],
  fieldError: FormFieldError | undefined
): JSX.Element => {
  const { control } = form;

  const handleValueChange = (newValue: string) => {
    setFieldValue(form, field.name, newValue);
  };

  const renderSelect = ({
    field: { value, ...fieldProps },
  }: {
    field: { value: string; [key: string]: unknown };
  }): JSX.Element => (
    <Select {...fieldProps} value={value || ''} onValueChange={handleValueChange} disabled={field.disabled}>
      <SelectTrigger
        className={`
          w-full transition-all duration-200
          ${
            fieldError
              ? 'border-red-300 focus:border-red-500 focus:ring-red-500/20'
              : 'border-gray-300 focus:border-indigo-500 focus:ring-indigo-500/20'
          }
          hover:border-gray-400
        `}
      >
        <SelectValue placeholder={field.placeholder} />
      </SelectTrigger>
      <SelectContent>
        {field.options?.map(option => (
          <SelectItem key={option.value} value={option.value}>
            {option.label}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );

  return <Controller name={field.name} control={control} rules={field.validation} render={renderSelect} />;
};

export default SelectField;
