import { z } from 'zod';

const accountDataSchema = z.object({
  user_id: z.number(),
  first_name: z.string(),
  last_name: z.string(),
  full_name: z.string(),
  email: z.string(),
  profile_id: z.number(),
  dob: z.string(),
  gender: z.string(),
  mobile: z.string().nullable(),
  address: z.string(),
  preferred_name: z.string(),
  created_at: z.string(),
  roles: z.object({ ids: z.array(z.number()), nice_name: z.array(z.string()) }),
});

export const accountCreatedSchema = z.object({
  first_name: z.string(),
  last_name: z.string(),
  email: z.string(),
  updated_at: z.string(),
  created_at: z.string(),
  id: z.number(),
});

// Types
export type AccountDataType = z.infer<typeof accountDataSchema>;

export type AccountCreatedType = z.infer<typeof accountCreatedSchema>;

export type AccountFormType = {
  first_name: string;
  last_name: string;
  preferred_name: string;
  gender: string;
  dob: string;
  email: string;
  mobile: string;
  address: string;
  roles: number[];
};

// Guard
export const isAccountData = (data: unknown): data is AccountDataType => accountDataSchema.safeParse(data).success;

export const isAccountCreatedData = (data: unknown): data is AccountCreatedType => accountCreatedSchema.safeParse(data).success;
