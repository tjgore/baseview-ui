import { z } from 'zod';

// Profiles
const profileSchema = z.object({
  id: z.number(),
  first_name: z.string(),
  last_name: z.string(),
  imageUrl: z.string().nullish(),
  email: z.string().email(),
  email_verified_at: z.string().nullish(),
  profile: z.object({
    id: z.number(),
    user_id: z.number(),
    general: z.object({
      preferred_name: z.string(),
      gender: z.string(),
      dob: z.string(),
      mobile: z.string().nullish(),
      address: z.string(),
    }),
  }),
  roles: z
    .object({
      id: z.number(),
      name: z.string(),
      nice_name: z.string(),
    })
    .array(),
});

// Types
export type ProfileType = z.infer<typeof profileSchema>;

export type FormattedProfileType = {
  mobile?: string | null | undefined;
  last_name: string;
  first_name: string;
  preferred_name: string;
  gender: string;
  dob: string;
  email: string;
  address: string;
  id: number;
  roles: {
    id: number;
    name: string;
    nice_name: string;
  }[];
  user_id: number;
  fullName: string;
};

export type ProfileFormType = {
  mobile?: string | null | undefined;
  last_name: string;
  first_name: string;
  preferred_name: string;
  gender: string;
  dob: string;
  email: string;
  address: string;
};

// Guard
export const isProfile = (data: unknown): data is ProfileType => profileSchema.safeParse(data).success;
