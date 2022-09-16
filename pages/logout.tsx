import { useEffect, useCallback } from 'react';
import { useRouter } from 'next/router';
import useAuth from '../hooks/useAuth';
import { auth } from '../services/api';

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
    <div className="flex min-h-screen w-full items-center justify-center">
      <p className="text-3xl font-semibold">Logging out now</p>
    </div>
  );
};

export default Logout;
