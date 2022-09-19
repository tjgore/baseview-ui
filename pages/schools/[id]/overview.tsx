import Link from 'next/link';
import { ChevronRightIcon } from '@heroicons/react/20/solid';
import { toast } from 'react-toastify';
import { NextPageWithLayout } from '../../_app';
import useAuth from '../../../hooks/useAuth';
import { getLayout } from '../../../components/Layouts/UserLayout';
import PageLoading from '../../../components/Loading/Page';

const Overview: NextPageWithLayout = () => {
  const { isLoading, error } = useAuth({ middleware: 'auth' });

  if (isLoading || error) {
    return <PageLoading dark />;
  }

  return (
    <>
      <header className="bg-white shadow-sm">
        <div className="mx-auto max-w-7xl p-4 sm:px-6 lg:px-8">
          <div>
            <div>
              <nav
                className="flex"
                aria-label="Breadcrumb">
                <ol
                  role="list"
                  className="flex flex-wrap items-center space-x-2 md:space-x-4 lg:flex-nowrap">
                  <li>
                    <div className="flex">
                      <a
                        href="#"
                        className="truncate text-sm font-medium text-gray-500 hover:text-gray-700">
                        Software Academy of Antigua
                      </a>
                    </div>
                  </li>
                  <li>
                    <div className="flex items-center">
                      <ChevronRightIcon
                        className="h-5 w-5 shrink-0 text-gray-400"
                        aria-hidden="true"
                      />
                      <a
                        href="#"
                        className="ml-4 text-sm font-medium text-gray-500 hover:text-gray-700">
                        Overview
                      </a>
                    </div>
                  </li>
                </ol>
              </nav>
            </div>
            <div className="mt-2 md:flex md:items-center md:justify-between">
              <div className="min-w-0 flex-1">
                <h2 className="text-2xl font-bold leading-7 text-gray-900 sm:truncate sm:text-3xl sm:tracking-tight">School&apos;s Overview</h2>
              </div>
              <div className="mt-4 flex shrink-0 md:mt-0 md:ml-4">
                <button
                  onClick={() => toast.info('Wow so easy!')}
                  type="button"
                  className="mr-3 inline-flex items-center rounded-md border border-transparent bg-blue-600 px-4 py-2
                  text-sm font-semibold text-white shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2">
                  Test Toast
                </button>

                <Link href="/schools/1/invite">
                  <button
                    onClick={() => toast('Wow so easy!')}
                    type="button"
                    className="inline-flex items-center rounded-md border border-transparent bg-blue-600 px-4 py-2
                  text-sm font-semibold text-white shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2">
                    Invite
                  </button>
                </Link>
                <Link href="/schools">
                  <button
                    type="button"
                    className="ml-3 inline-flex items-center rounded-md bg-gray-200 px-4 py-2 text-sm font-semibold
                    text-gray-700 shadow-sm hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2">
                    Schools
                  </button>
                </Link>
              </div>
            </div>
          </div>
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
