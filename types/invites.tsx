import { z } from 'zod';
//import { profileFormSchema } from '@/types/profiles';

export type InviteType = {
  last_name: string | null;
  first_name: string;
  email: string;
  school: number;
  role: number;
};

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

// Invitation
export type InvitationFormType = {
  mobile?: string | null | undefined;
  first_name: string;
  last_name: string;
  email: string;
  password: string;
  password_confirmation: string;
  gender: string;
  preferred_name: string;
  dob: string;
  address: string;
};
