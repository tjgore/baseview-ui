import Avatar from 'boring-avatars';
import { useQuery } from '@tanstack/react-query';
import { EnvelopeOpenIcon, PhoneIcon } from '@heroicons/react/24/solid';
import { useRouter } from 'next/router';
import { NextPageWithLayout } from '@/pages/_app';
import { getLayout } from '@/components/Layouts/UserLayout';
import useAuth from '@/hooks/useAuth';
import PageHeader from '@/components/PageHeader';
import { accounts as accountsApi } from '@/utils/api';
import QueryStatus from '@/components/QueryStatus';
import { AccountDataType, isAccountData } from '@/types/accounts';
import Button from '@/components/Button';

const ViewAccount: NextPageWithLayout = () => {
  useAuth({ middleware: 'auth' });
  const router = useRouter();
  const { id: schoolId, userId } = router.query;
  const accountQuery = useQuery(['profile'], () => accountsApi.find(schoolId as string, userId as string));

  const account: AccountDataType | null = isAccountData(accountQuery.data) ? accountQuery.data : null;

  return (
    <main className="mx-auto max-w-4xl">
      <PageHeader title="View Account" />
      <div className="mx-auto max-w-4xl pb-5 sm:px-6 lg:px-8">
        <div className="px-4 pb-3 sm:px-0">
          <div className="flex h-10 items-center">
            <QueryStatus
              isLoading={accountQuery.isLoading}
              isFetching={accountQuery.isFetching}
              error={accountQuery.error}
            />
          </div>
          {account && !accountQuery.isLoading && !accountQuery.isFetching && (
            <>
              <div className="mb-8 rounded-lg bg-white px-5 pt-8 pb-5 shadow-sm ">
                <div className="flex flex-col sm:flex-row">
                  <div className="mr-8 mb-5 flex h-[7rem] w-[7rem] items-center justify-center overflow-hidden rounded-full bg-blue-600">
                    <Avatar
                      size={124}
                      name={account.full_name}
                      variant="beam"
                      colors={['#2563eb', '#4f46e5', '#0f172a']}
                    />
                  </div>
                  <div>
                    <div className="flex flex-wrap items-center text-lg font-semibold leading-6 text-gray-900">
                      <p className="mr-3 mb-1 text-2xl font-bold sm:mb-0">{account.full_name}</p>
                      {account.roles.nice_name.map(niceName => (
                        <div
                          key={niceName}
                          className="mt-1 mr-1 flex h-5 items-center justify-center rounded-lg bg-green-100 px-2 text-xs text-green-600">
                          {niceName}
                        </div>
                      ))}
                    </div>

                    <div className="flex w-full flex-wrap items-center pt-1">
                      <div className="mr-4 mb-1 flex items-center text-gray-500">
                        <EnvelopeOpenIcon className="mr-2 h-4 w-4 text-gray-400" />
                        <p>{account.email}</p>
                      </div>
                      <div className="mb-1 flex items-center pr-4 text-gray-500">
                        <PhoneIcon className="mr-2 h-4 w-4 text-gray-400" />
                        {account.mobile}
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="mb-8 rounded-lg border bg-white shadow-sm">
                <div className="flex items-center justify-between border-b px-5 pt-5 pb-3 sm:px-10">
                  <div>
                    <h3 className="text-xl font-medium leading-6 text-gray-900">Personal Information</h3>
                    <p className="mt-1 text-xs text-gray-500">Details about the user.</p>
                  </div>
                  <div>
                    <Button
                      text="Edit"
                      color="secondary"
                    />
                  </div>
                </div>
                <div className="px-5 py-6 sm:px-10">
                  <div className="grid grid-cols-6 gap-6">
                    <div className="col-span-6 sm:col-span-3">
                      <dt className="block font-semibold text-gray-800">First name</dt>
                      <dd>{account.first_name}</dd>
                    </div>

                    <div className="col-span-6 sm:col-span-3">
                      <dt className="block font-semibold text-gray-800">First name</dt>
                      <dd>{account.last_name}</dd>
                    </div>

                    <div className="col-span-6 sm:col-span-3">
                      <dt className="block font-semibold text-gray-800">Email Address</dt>
                      <dd>{account.email}</dd>
                    </div>

                    <div className="col-span-6 sm:col-span-3">
                      <dt className="block font-semibold text-gray-800">Preferred Name</dt>
                      <dd>{account.preferred_name}</dd>
                    </div>

                    <div className="col-span-6 sm:col-span-3">
                      <dt className="block font-semibold text-gray-800">Gender</dt>
                      <dd>{account.gender}</dd>
                    </div>

                    <div className="col-span-6 sm:col-span-3">
                      <dt className="block font-semibold text-gray-800">DOB</dt>
                      <dd>{account.dob}</dd>
                    </div>

                    <div className="col-span-6 sm:col-span-3">
                      <dt className="block font-semibold text-gray-800">Mobile</dt>
                      <dd>{account.mobile}</dd>
                    </div>

                    <div className="col-span-6 sm:col-span-3">
                      <dt className="block font-semibold text-gray-800">Address</dt>
                      <dd>{account.address}</dd>
                    </div>
                  </div>
                </div>
              </div>

              <div className="mb-8 rounded-lg border bg-white shadow-sm">
                <div className="flex items-center justify-between border-b px-5 pt-5 pb-3 sm:px-10">
                  <div>
                    <h3 className="text-xl font-medium leading-6 text-gray-900">Permissions</h3>
                    <p className="mt-1 text-xs text-gray-500">A users access information</p>
                  </div>
                  <div>
                    <Button
                      text="Edit"
                      color="secondary"
                    />
                  </div>
                </div>
                <div className="px-5 py-6 sm:px-10">
                  <div className="grid grid-cols-6 gap-6">
                    <div className="col-span-6 sm:col-span-3">
                      <dt className="block font-semibold text-gray-800">Roles</dt>
                      <dd className="flex items-center">
                        {account.roles.nice_name.map(niceName => (
                          <div
                            key={niceName}
                            className="mt-1 mr-1 flex h-5 items-center justify-center rounded-lg bg-green-100 px-2 text-xs text-green-600">
                            {niceName}
                          </div>
                        ))}
                      </dd>
                    </div>
                  </div>
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </main>
  );
};

ViewAccount.getLayout = getLayout;

export default ViewAccount;
