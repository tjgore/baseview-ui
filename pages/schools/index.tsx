import Link from 'next/link';
import { useQuery } from '@tanstack/react-query';
import { isEmpty } from 'lodash';
import { HomeModernIcon } from '@heroicons/react/24/outline';
import { EnvelopeOpenIcon, MapPinIcon, PhoneIcon } from '@heroicons/react/24/solid';
import { getLayout } from '@/components/Layouts/UserLayout';
import QueryStatus from '@/components/QueryStatus';
import { schools as schoolsApi } from '@/utils/api/index';
import useAuth from '@/hooks/useAuth';
import type { NextPageWithLayout } from '@/pages/_app';
import { isSchoolListData } from '@/types/schools';

const Overview: NextPageWithLayout = () => {
  useAuth({ middleware: 'auth' });
  const { data, error, isLoading, isFetching } = useQuery(['schools'], schoolsApi.all);

  const schools = isSchoolListData(data) ? data : null;
  const hasSchool = schools && !isEmpty(schools);

  return (
    <>
      <header className="bg-white shadow-sm">
        <div className="mx-auto max-w-7xl p-5 sm:px-6 lg:px-8">
          <div className="md:flex md:items-center md:justify-between">
            <div className="min-w-0 flex-1">
              <h2 className="text-2xl font-semibold leading-7 text-gray-900 sm:truncate sm:tracking-tight">My Schools</h2>
              <p className="pt-1 text-sm text-gray-500 md:block">A listing of all the schools you belong to.</p>
            </div>
            <div className="mt-4 flex md:mt-0 md:ml-4">
              <Link href="/schools/create">
                <a
                  className="inline-flex items-center rounded-md border border-transparent bg-blue-600 px-4 py-2 text-sm
                  font-medium text-white shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-1 focus:ring-blue-400 focus:ring-offset-2">
                  Create School
                </a>
              </Link>
            </div>
          </div>
        </div>
      </header>
      <main>
        <div className="mx-auto max-w-7xl pb-5 sm:px-6 lg:px-8">
          <div className="px-4 pb-3 sm:px-0 ">
            <div className="flex h-10 items-center">
              <QueryStatus
                isLoading={isLoading}
                isFetching={isFetching}
                error={error}
              />
            </div>
            {hasSchool &&
              schools.map(school => (
                <div
                  key={school.id}
                  className="mb-8 rounded-lg border bg-white px-5 pt-5 pb-4 shadow-sm md:px-5 md:pt-8">
                  <div className="flex flex-col sm:flex-row">
                    <div className="mr-8 mb-2 flex h-24 w-24 items-center justify-center rounded-md border-2 bg-gray-200 sm:mb-0">
                      <HomeModernIcon
                        name="school"
                        className="m-auto h-8 w-8 text-gray-600"
                      />
                    </div>
                    <div className="flex w-full flex-col md:flex-row">
                      <div className="w-full pt-1">
                        <Link href={`/schools/${school.id}/overview`}>
                          <a className="block text-lg font-semibold leading-6 text-gray-900 hover:underline">{school.name}</a>
                        </Link>
                        <div className="flex w-full flex-wrap py-1">
                          <div className="mb-1 flex items-center pr-4 text-gray-500">
                            <EnvelopeOpenIcon className="mr-2 h-4 w-4 text-gray-400" />
                            {school.email}
                          </div>
                          <div className="mb-1 flex items-center pr-4 text-gray-500">
                            <PhoneIcon className="mr-2 h-4 w-4 text-gray-400" />
                            {school.phone}
                          </div>
                          <div className="mb-1 flex items-center text-gray-500">
                            <MapPinIcon className="mr-2 h-4 w-4 text-gray-400" />
                            {school.address}
                          </div>
                        </div>

                        <p className="mb-6 w-full pt-1 text-sm md:w-2/3">{school.about ?? school.slogan ?? <span className="text-xs">No introduction was provided</span>}</p>
                      </div>
                    </div>
                  </div>
                  <div className="flex flex-row items-center justify-end">
                    <Link href={`/schools/${school.id}/edit`}>
                      <a
                        className="ml-1 inline-flex items-center rounded-sm bg-gray-200 px-4 py-1 text-xs font-semibold
                            text-gray-700 shadow-sm hover:bg-gray-300 focus:outline-none focus:ring-1 focus:ring-blue-500">
                        Edit
                      </a>
                    </Link>
                  </div>
                </div>
              ))}
            {!hasSchool && !isLoading && (
              <div className="mb-5">
                <div className="my-20 text-center">
                  <div className="flex justify-center">
                    <HomeModernIcon className="h-10 w-10 text-gray-600" />
                  </div>

                  <h3 className="mt-2 text-2xl font-semibold text-gray-900">No School</h3>
                  <p className="mt-1 text-sm text-gray-500">Get started by creating a new school.</p>
                  <div className="mt-6">
                    <Link href="/schools/create">
                      <a
                        type="button"
                        className="inline-flex items-center rounded-md border border-transparent bg-blue-600 px-4 py-2 text-sm
                      font-medium text-white shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2">
                        New School
                      </a>
                    </Link>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </main>
    </>
  );
};

Overview.getLayout = getLayout;

export default Overview;
