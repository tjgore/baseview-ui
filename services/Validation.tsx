import Validator from 'validatorjs';

type ObjectType = {
  [name: string]: string;
};

type FormFields<U> = { [name: string]: { id?: U; rules: string } };

type FieldValidation<U> = {
  [name: string]: { id: U; rules: string; validate?: { validate: (value: string | null) => string | boolean } };
};

type AddValidationType = <K extends keyof T, T extends FormFields<K>>(formFields: T) => FieldValidation<K>;

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
const addFieldValidation = <K extends keyof T, T extends { id?: K; rules: string }>(field: T, name: string) => {
  const rules = { [name]: field.rules };
  return {
    id: field.id ?? name,
    rules: field.rules,
    validate: { validate: (value: string | null) => validateField({ [name]: value }, rules) },
  };
};

/**
 * Add validation to all form fields
 * @param formFields
 */
export const addValidation: AddValidationType = formFields => {
  const fields = Object.keys(formFields);

  const formWithValidation = {};

  fields.forEach(name => {
    const field = formFields[name];

    formWithValidation[name] = addFieldValidation(field, name);
  });

  return formWithValidation;
};
