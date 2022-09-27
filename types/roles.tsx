import { z } from 'zod';

// Schema
const roleSchema = z.object({
  id: z.number(),
  name: z.string(),
  nice_name: z.string(),
});

export const roleListSchema = roleSchema.array();

// Types
export type RoleListType = z.infer<typeof roleListSchema>;

// Guard
export const isRoleList = (data: unknown): data is RoleListType => roleListSchema.safeParse(data).success;
