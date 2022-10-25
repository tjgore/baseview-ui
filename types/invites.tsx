import { z } from 'zod';

export type InviteType = {
  last_name: string | null;
  first_name: string;
  email: string;
  school: number;
  role: number;
};

const inviteDataSchema = z.object({
  user_id: z.number().nullish(),
  first_name: z.string(),
  last_name: z.string().nullish(),
  email: z.string(),
  dob: z.string().nullish(),
  gender: z.string().nullish(),
  mobile: z.string().nullish(),
  address: z.string().nullish(),
  preferred_name: z.string().nullish(),
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
