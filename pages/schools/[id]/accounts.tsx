/* eslint-disable max-lines */
import { useEffect, useState, useMemo } from 'react';
import { z } from 'zod';
import { debounce, isEmpty, omitBy } from 'lodash';
import Avatar from 'boring-avatars';
import ctl from '@netlify/classnames-template-literals';
import Link from 'next/link';
import { useRouter, NextRouter } from 'next/router';
import queryString from 'query-string';
import { useQuery } from '@tanstack/react-query';
import { MagnifyingGlassIcon } from '@heroicons/react/20/solid';
import { NextPageWithLayout } from '@/pages/_app';
import { getLayout } from '@/components/Layouts/UserLayout';
import useAuth from '@/hooks/useAuth';
import PageHeader from '@/components/PageHeader';
import Button from '@/components/Button';
import { ROLES } from '@/utils/constants/roles';
import { RoleListType } from '@/types/roles';
import { accounts as accountsApi } from '@/utils/api';
import QueryStatus from '@/components/QueryStatus';

type TabsType = {
  name: string;
  link: string;
  query: {
    id?: string;
    role: string;
    limit: string;
    search?: string;
  };
  current: boolean;
  roles: string[];
}[];

const tabs: TabsType = [
  {
    name: 'All Students',
    link: 'role=student&limit=all',
    query: { role: 'student', limit: 'all' },
    current: true,
    roles: ROLES.TEACHER_AND_UP,
  },
  {
    name: 'My Students',
    link: 'role=student&limit=my',
    query: { role: 'student', limit: 'my' },
    current: false,
    roles: [ROLES.TEACHER],
  },
  {
    name: 'All Teachers',
    link: 'role=teacher&limit=all',
    query: { role: 'teacher', limit: 'all' },
    current: false,
    roles: [ROLES.STUDENT, ...ROLES.TEACHER_AND_UP],
  },
  {
    name: 'My Teachers',
    link: 'role=teacher&limit=my',
    query: { role: 'teacher', limit: 'my' },
    current: false,
    roles: [ROLES.STUDENT],
  },
  {
    name: 'Admins',
    link: 'role=admin&limit=all',
    query: { role: 'admin', limit: 'all' },
    current: false,
    roles: ROLES.TEACHER_AND_UP,
  },
];

const getRoleTabs = (roles: RoleListType | undefined) => {
  return tabs.filter(tab => {
    const roleName = roles?.[0].nice_name ?? '';
    return tab.roles.includes(roleName);
  });
};

const setCurrentTab = (userTabs: TabsType, router: NextRouter) => {
  const { query } = router;
  const { id: schoolId, search } = query;

  userTabs.map(tab => {
    const match = query.role === tab.query.role && query.limit === tab.query.limit;
    tab.current = match ? true : false;
    tab.query.id = schoolId as string;
    if (search) {
      tab.query.search = search as string;
    } else {
      delete tab.query.search;
    }
  });
};

const accountsResponseSchema = z.object({
  current_page: z.number(),
  data: z.array(
    z.object({
      first_name: z.string(),
      last_name: z.string(),
      email: z.string(),
      role: z.string(),
    }),
  ),
  first_page_url: z.string(),
  from: z.number(),
  last_page: z.number(),
  last_page_url: z.string(),
  links: z.array(z.union([z.object({ url: z.null(), label: z.string(), active: z.boolean() }), z.object({ url: z.string(), label: z.string(), active: z.boolean() })])),
  next_page_url: z.null(),
  path: z.string(),
  per_page: z.number(),
  prev_page_url: z.null(),
  to: z.number(),
  total: z.number(),
});

type AccountsResponseType = z.infer<typeof accountsResponseSchema>;

const isAccountsResponse = (data: unknown): data is AccountsResponseType => accountsResponseSchema.safeParse(data).success;

const Accounts: NextPageWithLayout = () => {
  const { user } = useAuth({ middleware: 'auth' });
  const router = useRouter();
  const { query } = router;
  const { id: schoolId, role, limit, search = '' } = query;
  const [searchInput, setSearch] = useState(search ?? '');

  const cleanQueryObject = omitBy({ role, limit, search }, data => !data);
  const apiQueryString = queryString.stringify(cleanQueryObject);

  const {
    data: accountsResult,
    isLoading,
    isFetching,
    error,
  } = useQuery(['accounts', query], () => accountsApi.get(schoolId as string, apiQueryString), { staleTime: 5000, enabled: !!role });

  const accounts: AccountsResponseType | null = isAccountsResponse(accountsResult) ? accountsResult : null;

  const userTabs = getRoleTabs(user?.roles);
  setCurrentTab(userTabs, router);

  /**
   * If filters not set, set the first available tab filter
   */
  useEffect(() => {
    if (isEmpty(role)) {
      router.push({
        query: userTabs[0].query,
      });
    }
  }, [role, router, userTabs]);

  /**
   * Debounce Search field
   */
  const debouncedSearch = useMemo(
    () =>
      debounce((value: string) => {
        const queryString = omitBy({ ...query, search: value }, data => !data);
        router.push({
          query: queryString,
        });
      }, 500),
    [query, router],
  );

  const handleSearch = (value: string) => {
    setSearch(value);
    debouncedSearch(value);
  };

  return (
    <>
      <main>
        <PageHeader
          title="Account Page"
          actions={<Button text="Create New" />}
        />

        <div className="mx-auto max-w-7xl pb-5 sm:px-6 lg:px-8">
          <div className="mt-8 mb-0 flex flex-col items-center overflow-hidden px-4 sm:px-0 md:flex-row">
            <div className="flex w-full flex-wrap items-center border-b-0 border-gray-200 md:border-b-2">
              <nav
                className="-mb-px mr-auto flex w-full flex-wrap gap-x-4 border-b-2 sm:pt-4 md:w-auto md:border-b-0"
                aria-label="Tabs">
                {userTabs.map(tab => (
                  <Link
                    key={tab.name}
                    href={{
                      query: tab.query,
                    }}>
                    <a
                      className={ctl(`
                            ${tab.current ? 'border-blue-600 text-blue-600' : 'border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700'} flex items-center gap-2
                            whitespace-nowrap border-b-2 px-1 py-4 text-sm font-semibold`)}
                      aria-current={tab.current ? 'page' : undefined}>
                      {tab.current && <span className="flex h-6 w-6 items-center justify-center rounded-full bg-blue-600 text-[10px] text-white">{accounts?.total ?? 0}</span>}
                      {tab.name}
                    </a>
                  </Link>
                ))}
              </nav>
              <div className="w-full pt-4 pb-2 md:w-1/3 md:pt-4">
                <div>
                  <label
                    htmlFor="search"
                    className="sr-only font-semibold">
                    Search
                  </label>
                  <div className="relative mt-1 rounded-md">
                    <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                      <MagnifyingGlassIcon
                        className="mr-2 h-5 w-5 text-gray-800"
                        aria-hidden="true"
                      />
                      <span className="text-sm font-semibold text-gray-800">Search</span>
                    </div>
                    <input
                      type="text"
                      name="search"
                      id="search"
                      value={searchInput}
                      onChange={e => handleSearch(e.target.value)}
                      className="block w-full rounded-md border border-gray-300 py-2 px-0 pl-[6.5rem] 
                    outline-none focus:border-blue-400 focus:ring-blue-400"
                      placeholder="Name or email"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="px-4 pb-3 sm:px-0">
            <div className="flex h-10 items-center">
              <QueryStatus
                isLoading={isLoading}
                isFetching={isFetching}
                error={error}
              />
            </div>

            <div>
              {isEmpty(accounts?.data) && !isLoading && (
                <div className="w-full md:w-1/2">
                  <p>No Accounts! Try adding a new account or searching by name or email.</p>
                </div>
              )}
              <ul
                role="list"
                className="grid min-h-[calc(100vh-530px)] grid-cols-1 items-start gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
                {accounts?.data.map(person => (
                  <li
                    key={person.email}
                    className="col-span-1 flex flex-col divide-y divide-gray-200 rounded-lg bg-white text-center shadow">
                    <div className="flex flex-1 flex-col p-8">
                      <div className="mx-auto mb-1 flex h-32 w-32 items-center justify-center overflow-hidden rounded-full bg-blue-600">
                        <Avatar
                          size={124}
                          name={person.first_name + person.last_name}
                          variant="beam"
                          colors={['#2563eb', '#4f46e5', '#0f172a']}
                        />
                      </div>
                      <h3 className="mt-6 text-sm font-medium text-gray-900">
                        {person.first_name} {person.last_name}
                      </h3>
                      <dl className="mt-1 flex grow flex-col justify-between">
                        <dt className="sr-only">Title</dt>
                        <dd className="text-sm text-gray-500">{person.email}</dd>
                        <dt className="sr-only">Role</dt>
                        <dd className="mt-3">
                          <span className="rounded-full bg-green-100 px-2 py-1 text-xs font-medium text-green-800">{person.role}</span>
                        </dd>
                      </dl>
                    </div>
                  </li>
                ))}
              </ul>
              <div className="mt-10 mb-4 flex items-center justify-between border-gray-200 bg-gray-100 py-3">
                <div className="hidden flex-1 justify-between">
                  <a
                    href="#"
                    className="relative inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50">
                    Previous
                  </a>
                  <a
                    href="#"
                    className="relative ml-3 inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50">
                    Next
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </>
  );
};

Accounts.getLayout = getLayout;

export default Accounts;
