import { z } from 'zod';

// Profiles
const profileSchema = z.object({
  id: z.number(),
  first_name: z.string(),
  last_name: z.string(),
  imageUrl: z.string().nullish(),
  email: z.string().email(),
  email_verified_at: z.boolean().nullish(),
  profile: z.object({
    id: z.number(),
    user_id: z.number(),
    general: z.object({
      preferred_name: z.string(),
      gender: z.string(),
      dob: z.string(),
      mobile: z.string(),
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

const formattedProfileSchema = z.object({
  id: z.number(),
  user_id: z.number(),
  first_name: z.string(),
  last_name: z.string(),
  email: z.string().email(),
  preferred_name: z.string(),
  gender: z.string(),
  dob: z.string(),
  mobile: z.string(),
  address: z.string(),
  roles: z
    .object({
      id: z.number(),
      name: z.string(),
      nice_name: z.string(),
    })
    .array(),
});

export const profileFormSchema = z.object({
  first_name: z.string(),
  last_name: z.string(),
  email: z.string().email(),
  preferred_name: z.string(),
  gender: z.string(),
  dob: z.string(),
  mobile: z.string(),
  address: z.string(),
});

// Types
export type ProfileType = z.infer<typeof profileSchema>;

export type FormattedProfileType = z.infer<typeof formattedProfileSchema>;

export type ProfileFormType = z.infer<typeof profileFormSchema>;

// Guard
export const isProfile = (data: unknown): data is ProfileType => profileSchema.safeParse(data).success;
