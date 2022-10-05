import { z } from 'zod';
import { profileFormSchema } from '@/types/profiles';

// Invites
const inviteSchema = z
  .object({
    first_name: z.string(),
    last_name: z.string().nullable(),
    email: z.string().email(),
    role: z.number(),
    school: z.number(),
  })
  .or(z.object({}));

const inviteFormSchema = z.object({
  first_name: z.string(),
  last_name: z.string().nullable(),
  email: z.string().email(),
  role: z.object({
    value: z.number(),
    label: z.string(),
  }),
  school: z.object({
    value: z.number(),
    label: z.string(),
  }),
});

export type InviteType = z.infer<typeof inviteSchema>;

export type InviteFormType = z.infer<typeof inviteFormSchema>;

const inviteDataSchema = z.object({
  id: z.number(),
  school_id: z.number(),
  role_id: z.number(),
  created_by_id: z.number(),
  first_name: z.string(),
  last_name: z.string().nullish(),
  email: z.string(),
  token: z.string(),
  expires_at: z.string(),
  created_at: z.string(),
  updated_at: z.string(),
  accepted: z.boolean(),
});

export type InviteDataType = z.infer<typeof inviteDataSchema>;

export const isInviteData = (data: unknown): data is InviteDataType => inviteDataSchema.safeParse(data).success;

const invitationFormSchema = z
  .object({
    password: z.string(),
    password_confirmation: z.string(),
    gender: z.object({ label: z.string(), value: z.string() }),
  })
  .merge(profileFormSchema.omit({ gender: true }));

export type InvitationFormType = z.infer<typeof invitationFormSchema>;
