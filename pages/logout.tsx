import { useEffect, useCallback } from 'react';
import { useRouter } from 'next/router';
import useAuth from '../hooks/useAuth';
import { auth } from '../utils/api';
import Spinner from '../components/Spinner';

const Logout = () => {
  const router = useRouter();
  const { user, isLoading, isFetching } = useAuth({ middleware: 'auth' });

  const goToLogin = () => (window.location.pathname = '/login');

  const hasFetchedUser = !isLoading && !isFetching && user;

  const logout = useCallback(async () => {
    try {
      await auth.logout();
      goToLogin();
    } catch (err) {
      // Toast user with error
      router.back();
    }
  }, [router]);

  useEffect(() => {
    (async () => {
      if (hasFetchedUser) await logout();
    })();
  }, [user, hasFetchedUser, logout]);

  return (
    <div className="flex min-h-screen w-full flex-col items-center justify-center">
      <Spinner className="mx-auto h-10 w-10 text-gray-900" />
      <p className="text-3xl font-semibold">Logging out now</p>
    </div>
  );
};

export default Logout;
