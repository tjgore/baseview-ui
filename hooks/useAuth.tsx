import { useCallback, useEffect } from 'react';
import { useRouter } from 'next/router';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { auth } from '../services/api';
import { HttpRequestError } from '../services/HttpClient';
import { LoginDataType } from '../types';
import { UNAUTHENTICATED } from '../utils/constants';

type UseAuthType = {
  middleware: string;
};

const redirectIfAuth = '/schools/1/overview';

const useAuth = ({ middleware }: UseAuthType) => {
  const router = useRouter();

  const queryClient = useQueryClient();
  const {
    data: user,
    isLoading,
    isFetching,
    error,
  } = useQuery(['user'], auth.user, {
    staleTime: 60,
    retry: (failureCount, error: HttpRequestError) => error.response?.status !== UNAUTHENTICATED,
  });

  const login = async (data: LoginDataType) => {
    await auth.login(data);
    queryClient.invalidateQueries(['user']);
  };

  const logout = useCallback(async () => {
    try {
      await auth.logout();
    } catch (err) {
      console.log('logout error', err);
    }
    window.location.pathname = '/login';
  }, []);

  useEffect(() => {
    if (middleware === 'guest' && redirectIfAuth && user) router.push(redirectIfAuth);
    if (middleware === 'auth' && error) router.push('/logout');
  }, [user, error, middleware, router]);

  return {
    user,
    isLoading,
    isFetching,
    login,
    logout,
  };
};

export default useAuth;
