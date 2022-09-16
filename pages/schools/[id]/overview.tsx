import { useRouter } from 'next/router';
import { NextPageWithLayout } from '../../_app';
import useAuth from '../../../hooks/useAuth';
import { getLayout } from '../../../components/Layouts/UserLayout';
import PageLoading from '../../../components/Loading/Page';

const Overview: NextPageWithLayout = () => {
  const { isLoading, error } = useAuth({ middleware: 'auth' });
  const router = useRouter();
  const { id } = router.query;

  if (isLoading || error) {
    return <PageLoading dark />;
  }

  return (
    <>
      <header className="bg-white shadow-sm">
        <div className="mx-auto max-w-7xl p-4 sm:px-6 lg:px-8">
          <h1 className="text-lg font-semibold leading-6 text-gray-900">School Overview {id}</h1>
        </div>
      </header>
      <main>
        <div className="mx-auto max-w-7xl py-6 sm:px-6 lg:px-8">
          {/* Replace with your content */}
          <div className="p-4 sm:px-0">
            <div className="h-96 rounded-lg border-4 border-dashed border-gray-200" />
          </div>
          {/* /End replace */}
        </div>
      </main>
    </>
  );
};

Overview.getLayout = getLayout;

export default Overview;
