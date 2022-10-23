import { z } from 'zod';

export const accountDataSchema = z.object({
  user_id: z.number(),
  first_name: z.string(),
  last_name: z.string(),
  full_name: z.string(),
  email: z.string(),
  profile_id: z.number(),
  dob: z.string(),
  gender: z.string(),
  mobile: z.string(),
  address: z.string(),
  preferred_name: z.string(),
  created_at: z.string(),
  roles: z.object({ ids: z.array(z.number()), nice_name: z.array(z.string()) }),
});

// Types
export type AccountDataType = z.infer<typeof accountDataSchema>;

// Guard
export const isAccountData = (data: unknown): data is AccountDataType => accountDataSchema.safeParse(data).success;
