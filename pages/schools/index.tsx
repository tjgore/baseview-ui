import Link from 'next/link';
import { HomeModernIcon } from '@heroicons/react/24/outline';
import type { NextPageWithLayout } from '../_app';
import useAuth from '../../hooks/useAuth';
import { getLayout } from '../../components/Layouts/UserLayout';
import PageLoading from '../../components/Loading/Page';
import { canHandleError } from '../../utils/helpers';
import Error from '../../components/Error';

const Overview: NextPageWithLayout = () => {
  const { isLoading, error } = useAuth({ middleware: 'auth' });

  if (isLoading || canHandleError(error)) {
    return <PageLoading dark />;
  }

  if (error && !canHandleError(error)) {
    return <Error dark />;
  }

  return (
    <>
      <header className="bg-white shadow-sm">
        <div className="mx-auto max-w-7xl p-4 sm:px-6 lg:px-8">
          <div className="md:flex md:items-center md:justify-between">
            <div className="min-w-0 flex-1">
              <h2 className="text-2xl font-bold leading-7 text-gray-900 sm:truncate sm:text-3xl sm:tracking-tight">My Schools</h2>
            </div>
            <div className="mt-4 flex md:mt-0 md:ml-4">
              <button
                type="button"
                className="mx-3 inline-flex items-center rounded-md border border-transparent bg-blue-600 px-4 py-2 text-sm
                font-medium text-white shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-offset-2">
                Add School
              </button>
            </div>
          </div>
        </div>
      </header>
      <main>
        <div className="mx-auto max-w-7xl py-6 sm:px-6 lg:px-8">
          {/* Replace with your content */}
          <div className="p-4 sm:px-0">
            <div className="mb-5 rounded-lg border bg-white shadow-sm">
              <div className="my-20 text-center">
                <div className="flex justify-center">
                  <HomeModernIcon className="h-10 w-10 text-gray-600" />
                </div>

                <h3 className="mt-2 text-2xl font-semibold text-gray-900">No School</h3>
                <p className="mt-1 text-sm text-gray-500">Get started by creating a new school.</p>
                <div className="mt-6">
                  <button
                    type="button"
                    className="inline-flex items-center rounded-md border border-transparent bg-blue-600 px-4 py-2 text-sm
                    font-medium text-white shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2">
                    New School
                  </button>
                </div>
              </div>
              <div className="my-5 flex justify-center">
                <Link href="/schools/1/overview">
                  <a className="rounded-md bg-gray-200 py-2 px-4 font-semibold">Go to school</a>
                </Link>
              </div>
            </div>

            <div className="mb-32 rounded-lg border bg-white p-5 shadow-sm">
              <div className="flex flex-row">
                <HomeModernIcon
                  name="school"
                  className="mr-4 hidden h-8 w-8 text-gray-600 md:block"
                />
                <div className="w-full text-sm">
                  <h1 className="mb-1 text-lg leading-6 text-black">Island Scholars of Antigua</h1>
                  <p className="mb-6 w-3/4 text-sm text-gray-500">
                    Academic excelence with biblical values. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna
                    aliqua.
                  </p>

                  <div className="mb-2 flex flex-col leading-6 lg:mb-2 lg:flex-row">
                    <p className="w-1/2 font-medium text-gray-700 lg:w-1/5">Address</p>
                    <p className="text-gray-500">St.John&rsquo;s Antigua</p>
                  </div>
                  <div className="mb-2 flex flex-col leading-6 lg:mb-2 lg:flex-row">
                    <p className="w-1/2 font-medium text-gray-700 lg:w-1/5">Email</p>
                    <p className="text-gray-500">scholares@antigua.com</p>
                  </div>
                  <div className="mb-2 flex flex-col leading-6 lg:mb-2 lg:flex-row">
                    <p className="w-1/2 font-medium text-gray-700 lg:w-1/5">Phone</p>
                    <p className="text-gray-500">443-673-2705</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
          {/* /End replace */}
        </div>
      </main>
    </>
  );
};

Overview.getLayout = getLayout;

export default Overview;
