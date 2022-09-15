import { useEffect } from 'react';
import useAuth from '../hooks/useAuth';

const Logout = () => {
  const { logout } = useAuth({ middleware: 'auth' });

  useEffect(() => {
    (async () => {
      try {
        await logout();
      } catch (err) {
        console.log(err);
      }
    })();
  }, [logout]);

  return (
    <div className="flex min-h-screen w-full items-center justify-center">
      <p className="text-3xl font-semibold">Logging out now</p>
    </div>
  );
};

export default Logout;
