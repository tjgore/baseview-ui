import { UNAUTHENTICATED, UNPROCESSABLE_ENTITY } from './constants';
import type { HttpRequestError } from '../services/HttpClient';
import { ErrorResponseType } from '../types';
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

export const isUnathenticatedError = (error: HttpRequestError | ErrorResponseType | null) => {
  return error?.response?.status === UNAUTHENTICATED;
};

export const isInvalidResponse = (error: HttpRequestError | ErrorResponseType | null) => {
  return error?.response?.status === UNPROCESSABLE_ENTITY;
};

export const canHandleError = (error: HttpRequestError | ErrorResponseType | null) => {
  return isUnathenticatedError(error) || isInvalidResponse(error);
};

export const charLimit = (text: string, limit: number) => {
  const textStart = 0;
  const updatedText = text.substring(textStart, limit).trimEnd();
  return `${updatedText}...`;
};
