import { ErrorResponseType } from '@/types/index';
import { UNAUTHENTICATED, UNPROCESSABLE_ENTITY } from './constants';

/**
 * Merge class names with conditions without the use of template literals
 * @param classes string[]
 * @returns string
 */
export const classNames = (...classes: string[]) => {
  return classes.filter(Boolean).join(' ');
};

export const isUnauthenticatedError = (error: ErrorResponseType | null) => {
  return error?.response?.status === UNAUTHENTICATED;
};

export const isValidationError = (error: ErrorResponseType | null) => {
  return error?.response?.status === UNPROCESSABLE_ENTITY;
};

export const canHandleError = (error: ErrorResponseType | null) => {
  return isUnauthenticatedError(error) || isValidationError(error);
};

export const charLimit = (text: string, limit: number) => {
  const textStart = 0;
  const updatedText = text.substring(textStart, limit).trimEnd();
  return updatedText.length <= limit ? updatedText : `${updatedText}...`;
};

export const getDefaultValues = <T extends { [name in keyof T]: unknown }>(data: T): { [name: string]: string | number | undefined } => {
  const keys = Object.keys(data ?? {}) as Array<keyof T>;
  const defaults = {};
  keys.forEach(key => {
    defaults[key as string] = data[key] ?? '';
  });
  return defaults;
};
