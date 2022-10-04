import Validator from 'validatorjs';

type ObjectType = {
  [name: string]: string;
};

export type ValueType = string | { label: string; value: string } | { label: string; value: number } | number | null | undefined;

type FormFields<U> = { [name: string]: { id?: U; rules: string } };

type FieldValidation<U> = {
  [name: string]: { id: U; rules: string; validate?: { validate: (value: ValueType) => string | boolean } };
};

type FieldDataType = { [name: string]: ValueType };

type AddValidationType = <K extends keyof T, T extends FormFields<K>>(formFields: T) => FieldValidation<K>;

/**
 * Validates a single form field @TODO debounce this
 * @param fieldData
 * @param rules
 * @param messages
 * @returns string | boolean | undefined
 */
export const validateField = (fieldData: FieldDataType, rules: ObjectType, messages?: ObjectType) => {
  const fieldName = Object.keys(fieldData)[0];
  const data = fieldData[fieldName];

  if (data && typeof data === 'object' && 'value' in data) {
    fieldData[fieldName] = data.value;
  }

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
    validate: {
      validate: (value: ValueType) => validateField({ [name]: value }, rules),
    },
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
