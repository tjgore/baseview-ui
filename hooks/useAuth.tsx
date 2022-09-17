import { useCallback, useEffect } from 'react';
import { useRouter } from 'next/router';
import useUser from './useUser';

type UseAuthType = {
  middleware?: string;
};

const useAuth = ({ middleware }: UseAuthType = {}) => {
  const { user, isLoading, isFetching, error, refetchUser } = useUser();
  const router = useRouter();

  const redirectIfAuth = useCallback(() => {
    router.push('/schools');
  }, [router]);

  /**
   * If the user is on a public page but has a user, send them to their own dashboard
   */
  useEffect(() => {
    if (middleware === 'guest' && user && !error) redirectIfAuth();
  }, [user, error, middleware, redirectIfAuth]);

  /**
   * If the user is on a protected page but the user request errored out, kick them to login
   */
  useEffect(() => {
    if (middleware === 'auth' && error) router.push('/login');
  }, [middleware, error, router]);

  return {
    user,
    isLoading,
    isFetching,
    error,
    refetchUser,
  };
};

export default useAuth;
