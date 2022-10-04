import { z } from 'zod';
import { OptionsOrGroups, GroupBase } from 'react-select';

export type LoginDataType = {
  email: string;
  password: string;
};

export type Options =
  | {
      value: number;
      label: string;
    }
  | {
      value: string;
      label: string;
    };

export type OptionsType = OptionsOrGroups<Options, GroupBase<Options>> | undefined;

// Error
const errorResponseSchema = z.object({
  response: z.object({
    config: z.object({
      baseURL: z.string(),
      url: z.string(),
    }),
    data: z.object({
      message: z.string(),
    }),
    status: z.number(),
  }),
});

export type ErrorResponseType = z.infer<typeof errorResponseSchema>;

export const isErrorResponse = (error: unknown): error is ErrorResponseType => errorResponseSchema.safeParse(error).success;
