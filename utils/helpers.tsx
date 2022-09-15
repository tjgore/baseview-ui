/**
 * Clear Form fields
 *
 * @param resetField (name: string) => void
 * @param fields string[]
 */
export const resetForm = (resetField: (name: string) => void, fields: string[]) => {
  fields.forEach(field => {
    resetField(field);
  });
};

/**
 * Merge class names with conditions without the use of template literals
 * @param classes string[]
 * @returns string
 */
export const classNames = (...classes: string[]) => {
  return classes.filter(Boolean).join(' ');
};
