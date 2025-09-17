import { JSX } from 'react';

import { FieldValues } from 'react-hook-form';

import { FIELD_TYPES } from '#/constants';
import { FormFieldError } from '#/types/form.types';
import { DynamicFormFieldProps } from '#/types/forms';
import DateField from './DateField';
import DefaultField from './DefaultField';
import SelectField from './SelectField';
import TextareaField from './TextareaField';

/**
 * Main field renderer function
 */
const renderField = <T extends FieldValues>(
  field: DynamicFormFieldProps<T>['field'],
  form: DynamicFormFieldProps<T>['form'],
  fieldError: FormFieldError | undefined
): JSX.Element => {
  switch (field.type) {
    case FIELD_TYPES.TEXTAREA:
      return TextareaField(field, form, fieldError);

    case FIELD_TYPES.SELECT:
      return SelectField(field, form, fieldError);

    case FIELD_TYPES.DATE:
      return DateField(field, form, fieldError);

    default:
      return DefaultField(field, form, fieldError);
  }
};

export default renderField;
