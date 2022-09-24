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

const schoolDataSchema = z.object({
  id: z.number(),
  name: z.string(),
  address: z.string(),
  email: z.string().email(),
  phone: z.string(),
  website: z.string().nullable().or(z.string().url()),
  principal: z.string(),
  vice_principal: z.string().nullable(),
  slogan: z.string().nullable(),
  about: z.string().nullable(),
  created_at: z.string(),
  updated_at: z.string(),
});

export const schoolListSchema = schoolDataSchema.array();

export type SchoolListType = z.infer<typeof schoolListSchema>;

export const schoolSchema = schoolDataSchema.omit({ id: true, created_at: true, updated_at: true });

export type SchoolType = z.infer<typeof schoolSchema>;

export const isSchoolData = (data): data is SchoolType => schoolSchema.safeParse(data).success;
