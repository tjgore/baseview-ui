import { ErrorResponseType } from '@/types/index';
import { UNAUTHENTICATED, UNPROCESSABLE_ENTITY } from '../constants/index';

export const isUnauthenticatedError = (error: ErrorResponseType | null) => {
  return error?.response?.status === UNAUTHENTICATED;
};

export const isValidationError = (error: ErrorResponseType | null) => {
  return error?.response?.status === UNPROCESSABLE_ENTITY;
};

export const canHandleError = (error: ErrorResponseType | null) => {
  return isUnauthenticatedError(error) || isValidationError(error);
};

export const charLimit = (text: string | undefined, limit: number) => {
  if (text === undefined) {
    return text;
  }
  const updatedText = text.substring(0, limit).trimEnd();
  return text.length <= limit ? updatedText : `${updatedText}...`;
};

/** @TODO this is not used */
export const getDefaultValues = <T extends { [name in keyof T]: unknown }>(
  data: T,
): { [name: string]: string | number | { label: string; value: string } | { label: string; value: number } | undefined } => {
  const keys = Object.keys(data ?? {}) as Array<keyof T>;
  const defaults = {};
  keys.forEach(key => {
    defaults[key as string] = data[key] ?? '';
  });
  return defaults;
};

/**
 * Used to handle the datepicker components dates
 * @param value
 * @returns
 */
export const getDatePickerDate = (value: Date | string | { label: string; value: string } | null | undefined) => {
  if (typeof value === 'object' && value !== undefined) {
    return value;
  }
  return value ? new Date(`${value} 00:00`) : new Date();
};
