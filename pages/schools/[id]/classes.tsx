import { ChevronRightIcon } from '@heroicons/react/20/solid';
import { NextPageWithLayout } from '@/pages/_app';
import { getLayout } from '@/components/Layouts/UserLayout';

const Classes: NextPageWithLayout = () => {
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
                  className="flex flex-wrap items-center space-x-2 lg:flex-nowrap">
                  <li>
                    <div className="flex">
                      <a
                        href="#"
                        className="truncate text-sm font-medium text-gray-500 hover:text-gray-700">
                        Kuhn Ltd
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
                        className="ml-2 text-sm font-medium text-gray-500 hover:text-gray-700">
                        Classes
                      </a>
                    </div>
                  </li>
                </ol>
              </nav>
            </div>
            <div className="mt-1 md:flex md:items-center md:justify-between">
              <div className="min-w-0 flex-1">
                <h2 className="text-2xl font-semibold leading-7 text-gray-900 sm:truncate sm:tracking-tight">Classes</h2>
              </div>
            </div>
          </div>
        </div>
      </header>
      <main>
        <div className="mx-auto max-w-7xl pb-5 sm:px-6 lg:px-8">
          <div className="px-4 pb-3 sm:px-0">
            <div className="flex h-10 items-center">
              {/*  <QueryStatus
                isLoading={profileQuery.isLoading}
                isFetching={profileQuery.isFetching}
                error={profileQuery.error}
              /> */}
            </div>
            <div className="overflow-hidden rounded-lg border bg-white px-10 py-5 shadow-sm">Classes Page</div>
          </div>
        </div>
      </main>
    </>
  );
};

Classes.getLayout = getLayout;

export default Classes;
