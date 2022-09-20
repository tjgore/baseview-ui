import Link from 'next/link';
import { z } from 'zod';
import { useQuery } from '@tanstack/react-query';
import { HomeModernIcon } from '@heroicons/react/24/outline';
import { getLayout } from '@/components/Layouts/UserLayout';
import { schools as schoolsApi } from '@/utils/api/index';
import useAuth from '@/hooks/useAuth';
import LoadingText from '@/components/Loading/Text';
import ErrorText from '@/components/Error/Text';
import type { NextPageWithLayout } from '../_app';

const schoolSchema = z
  .object({
    id: z.number(),
    name: z.string(),
    address: z.string(),
    email: z.string(),
    phone: z.string(),
    website: z.string(),
    principal: z.string(),
    vice_principal: z.string().nullable(),
    slogan: z.string().nullable(),
    about: z.string().nullable(),
    created_at: z.string(),
    updated_at: z.string(),
  })
  .array();

type SchoolData = z.infer<typeof schoolSchema>;

const isSchoolData = (data: unknown): data is SchoolData => schoolSchema.safeParse(data).success;

const Overview: NextPageWithLayout = () => {
  useAuth({ middleware: 'auth' });
  const { data, error, isLoading, isFetching } = useQuery(['schools'], schoolsApi.all);

  const schools = isSchoolData(data) ? data : null;
  const showStateCard = isLoading || isFetching || !!error;

  return (
    <>
      <header className="bg-white shadow-sm">
        <div className="mx-auto max-w-7xl p-4 sm:px-6 lg:px-8">
          <div className="md:flex md:items-center md:justify-between">
            <div className="min-w-0 flex-1">
              <h2 className="text-2xl font-bold leading-7 text-gray-900 sm:truncate sm:text-3xl sm:tracking-tight">My Schools</h2>
              <p className="pt-1 text-sm text-gray-500 md:block">A listing of all the schools you belong to.</p>
            </div>
            <div className="mt-4 flex md:mt-0 md:ml-4">
              <button
                type="button"
                className="inline-flex items-center rounded-md border border-transparent bg-blue-600 px-4 py-2 text-sm
                font-medium text-white shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-offset-2">
                Add School
              </button>
            </div>
          </div>
        </div>
      </header>
      <main>
        <div className="mx-auto max-w-7xl pb-5 sm:px-6 lg:px-8">
          <div className="px-4 py-3 sm:px-0">
            <div className="min-h-[3rem]">
              {showStateCard && (
                <div className={`flex items-center rounded-lg border ${error ? 'border-red-100 bg-red-50' : 'border-blue-100 bg-blue-50'} px-3 py-1 shadow-sm`}>
                  <>
                    {isLoading && <LoadingText />}
                    {isFetching && !isLoading && <LoadingText text="Refreshing" />}
                    {error && <ErrorText />}
                  </>
                </div>
              )}
            </div>

            {schools ? (
              schools.map(school => (
                <div
                  key={school.id}
                  className="mb-5 rounded-lg border bg-white p-5 shadow-sm">
                  <div className="flex flex-row">
                    <HomeModernIcon
                      name="school"
                      className="mr-4 hidden h-8 w-8 text-gray-600 md:block"
                    />
                    <div className="flex flex-col md:flex-row">
                      <div className="w-full">
                        <Link href={`/schools/${school.id}/overview`}>
                          <a className="text-lg font-semibold leading-6 text-gray-900">{school.name}</a>
                        </Link>
                        <p className="mb-6 w-full pt-1 text-sm text-gray-500 md:w-2/3">{school.about}</p>

                        <div className="mb-2 flex flex-col leading-6 lg:mb-2 lg:flex-row">
                          <p className="w-1/2 font-medium text-gray-700 lg:w-1/5">Email</p>
                          <p className="text-gray-500">{school.email}</p>
                        </div>
                        <div className="mb-2 flex flex-col leading-6 lg:mb-2 lg:flex-row">
                          <p className="w-1/2 font-medium text-gray-700 lg:w-1/5">Phone</p>
                          <p className="text-gray-500">{school.phone}</p>
                        </div>
                        <div className="mb-2 flex flex-col leading-6 lg:mb-2 lg:flex-row">
                          <p className="w-1/2 font-medium text-gray-700 lg:w-1/5">Address</p>
                          <p className="text-gray-500">{school.address}</p>
                        </div>
                      </div>
                      <div className="flex flex-row items-start justify-center">
                        <Link href="/schools">
                          <button
                            type="button"
                            className="ml-2 inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-1 text-sm font-semibold
                    text-gray-700 shadow-sm hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2">
                            Edit
                          </button>
                        </Link>
                        <Link href="/schools">
                          <button
                            type="button"
                            className="ml-2 inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-1 text-sm font-semibold
                          text-gray-700 shadow-sm hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2">
                            View
                          </button>
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <div className="mb-5 hidden rounded-lg border bg-white shadow-sm">
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
