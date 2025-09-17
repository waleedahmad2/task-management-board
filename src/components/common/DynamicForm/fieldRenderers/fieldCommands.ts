import { FieldValues, Path } from 'react-hook-form';

import { DynamicFormFieldProps } from '#/types/forms';

/**
 * Command function to set form field value and trigger validation
 */
export const setFieldValue = <T extends FieldValues>(
  form: DynamicFormFieldProps<T>['form'],
  fieldName: Path<T>,
  value: string
): void => {
  form.setValue(fieldName, value as Path<T> extends keyof T ? T[Path<T>] : never);
  form.trigger(fieldName);
};
