import { z } from 'zod';

// Schemas
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

export const schoolSchema = schoolDataSchema.omit({ id: true, created_at: true, updated_at: true });

// Types
export type SchoolListType = z.infer<typeof schoolListSchema>;

export type SchoolType = z.infer<typeof schoolSchema>;

// Guards
export const isSchoolData = (data): data is SchoolType => schoolSchema.safeParse(data).success;

export const isSchoolListData = (data: unknown): data is SchoolListType => schoolListSchema.safeParse(data).success;
