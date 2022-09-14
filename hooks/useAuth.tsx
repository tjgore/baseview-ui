import { useState, useEffect } from 'react';
import { useQuery } from '@tanstack/react-query';
import { auth } from '../services/api';
import { HttpRequestError } from '../services/HttpClient';
import { LoginDataType } from '../types';
import { UNAUTHENTICATED } from '../utils/constants';

type UseAuthType = {
  middleware: string;
};

// const redirectIfAuth = '/schools';

const useAuth = ({ middleware }: UseAuthType) => {
  const [errorStatus, setErrorStatus] = useState<unknown | null>(null);
  const {
    data: user,
    isLoading,
    isFetching,
    error,
  } = useQuery(['user'], auth.user, {
    staleTime: 5,
    retry: (failureCount, error: HttpRequestError) => error.response?.status !== UNAUTHENTICATED,
  });

  const login = async (data: LoginDataType) => {
    setErrorStatus(null);
    try {
      await auth.login(data);
    } catch (err) {
      // console.log('error', err);
      setErrorStatus(err);
    }
  };

  const logout = () => {
    return {};
  };

  useEffect(() => {
    if (middleware === 'auth' && user) {
      return;
      // redirect
    }
    // console.log('useEffect user and error change', user, error);
  }, [user, error]);

  return {
    user,
    errorStatus,
    isLoading,
    isFetching,
    login,
    logout,
  };
};

export default useAuth;
