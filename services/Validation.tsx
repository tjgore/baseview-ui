import Validator from 'validatorjs';

type ObjectType = {
  [name: string]: string;
};

export const validateField = (fieldData: { [name: string]: unknown }, rules: string, messages?: ObjectType) => {
  const fieldName = Object.keys(fieldData)[0];

  const validation = new Validator(fieldData, { [fieldName]: rules }, messages);
  console.log('valiate it', validation.passes(), validation.errors.first(fieldName));
  return validation.passes() || validation.errors.first(fieldName);
};
