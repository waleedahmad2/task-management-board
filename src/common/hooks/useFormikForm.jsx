import { useFormik } from 'formik';

export function useFormikForm(initialValues, onSubmit, validationSchema) {
  const formik = useFormik({
    initialValues,
    onSubmit,
    validationSchema,
  });

  const clearForm = () => formik.resetForm();

  const setFieldValue = (fieldName, value) => formik.setFieldValue(fieldName, value);

  const getFieldError = fieldName => formik.touched[fieldName] && formik.errors[fieldName];

  const isFieldTouched = fieldName => formik.touched[fieldName];

  return {
    ...formik,
    clearForm,
    setFieldValue,
    getFieldError,
    isFieldTouched,
  };
}
