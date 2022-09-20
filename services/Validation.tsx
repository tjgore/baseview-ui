import Validator from 'validatorjs';

type ObjectType = {
  [name: string]: string;
};

type FormFields = {
  [name: string]: { id?: string; rules: string; validate?: { validate: (value: string) => string | boolean } };
};

type FieldValidation = {
  [name: string]: { id: string; rules: string; validate?: { validate: (value: string) => string | boolean } };
};

/**
 * Validates a single form field @TODO debounce this
 * @param fieldData
 * @param rules
 * @param messages
 * @returns string | boolean
 */
export const validateField = (fieldData: { [name: string]: unknown }, rules: ObjectType, messages?: ObjectType) => {
  const fieldName = Object.keys(fieldData)[0];

  const validation = new Validator(fieldData, rules, messages);
  return validation.passes() || validation.errors.first(fieldName);
};

/**
 * Add validation to a single field
 * @param field
 * @param name
 * @returns
 */
const addFieldValidation = (field: { id?: string; rules: string }, name: string) => {
  const rules = { [name]: field.rules };
  return {
    id: field.id ?? name,
    rules: field.rules,
    validate: { validate: (value: string) => validateField({ [name]: value }, rules) },
  };
};

/**
 * Add validation to all form fields
 * @param formFields
 */
export const addValidation = (formFields: FormFields) => {
  const fields = Object.keys(formFields);
  const formWithValidation = { ...formFields } as FieldValidation;

  fields.forEach(name => {
    const field = formFields[name];

    formWithValidation[name] = addFieldValidation(field, name);
  });

  return formWithValidation;
};
