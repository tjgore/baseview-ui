import { useQuery } from '@tanstack/react-query';
import { z } from 'zod';
import { auth } from '@/utils/api/index';
import { ErrorResponseType } from '@/types/index';
import { isUnauthenticatedError } from '@/utils/helpers';

const userSchema = z.object({
  user: z.object({
    id: z.number(),
    first_name: z.string(),
    last_name: z.string(),
    imageUrl: z.string().nullish(),
    email: z.string().email(),
    email_verified_at: z.boolean().nullish(),
  }),
  roles: z
    .object({
      id: z.number(),
      name: z.string(),
      nice_name: z.string(),
    })
    .array(),
});

const RETRY_REQUEST = 3;
const STALE_MILLISECONDS = 60000;

export type User = z.infer<typeof userSchema>;

export const isUserType = (data: unknown): data is User => userSchema.safeParse(data).success;

const useUser = () => {
  const {
    data,
    isLoading,
    isFetching,
    error,
    refetch: refetchUser,
  } = useQuery(['user'], auth.user, {
    staleTime: STALE_MILLISECONDS,
    retry: (failureCount, error: ErrorResponseType) => !isUnauthenticatedError(error) && failureCount < RETRY_REQUEST,
  });

  const userData = isUserType(data) ? { ...data.user, roles: data.roles } : null;

  return {
    user: userData,
    isLoading,
    isFetching,
    error,
    refetchUser,
  };
};

export default useUser;
