import { useQuery } from '@tanstack/react-query';
import { auth } from '../services/api';
import { HttpRequestError } from '../services/HttpClient';
import { UNAUTHENTICATED } from '../utils/constants';

const useUser = () => {
  const {
    data: user,
    isLoading,
    isFetching,
    error,
    refetch: refetchUser,
  } = useQuery(['user'], auth.user, {
    staleTime: 10000,
    retry: (failureCount, error: HttpRequestError) => error.response?.status !== UNAUTHENTICATED,
  });

  return {
    user,
    isLoading,
    isFetching,
    error,
    refetchUser,
  };
};

export default useUser;
