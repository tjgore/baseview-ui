import { z } from 'zod';

export type LoginDataType = {
  email: string;
  password: string;
};

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
