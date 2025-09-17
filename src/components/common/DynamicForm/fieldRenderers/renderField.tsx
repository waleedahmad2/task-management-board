import { JSX } from 'react';

import { FieldValues } from 'react-hook-form';

import { FIELD_TYPES } from '#/constants';
import { FormFieldError } from '#/types/form.types';
import { DynamicFormFieldProps } from '#/types/forms';
import renderDateField from './renderDateField';
import renderDefaultField from './renderDefaultField';
import renderSelectField from './renderSelectField';
import renderTextareaField from './renderTextareaField';

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
      return renderTextareaField(field, form, fieldError);

    case FIELD_TYPES.SELECT:
      return renderSelectField(field, form, fieldError);

    case FIELD_TYPES.DATE:
      return renderDateField(field, form, fieldError);

    default:
      return renderDefaultField(field, form, fieldError);
  }
};

export default renderField;
