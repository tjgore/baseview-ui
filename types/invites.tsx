import { z } from 'zod';

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
