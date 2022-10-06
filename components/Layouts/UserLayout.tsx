import { Fragment, useEffect, useState } from 'react';
import { isEmpty } from 'lodash';
import ctl from '@netlify/classnames-template-literals';
import { useRouter } from 'next/router';
import Link from 'next/link';
import { Menu, Transition } from '@headlessui/react';
import { BellIcon } from '@heroicons/react/24/outline';
import { getLayout as getAppLayout } from '@/components/Layouts/AppLayout';
import { charLimit, canHandleError } from '@/utils/helpers';
import { buildPrimaryNav } from '@/utils/helpers/nav';

import useAuth from '@/hooks/useAuth';
import PageLoading from '@/components/Loading/Page';
import Error from '@/components/Error/Page';
import useSchool from '@/hooks/useSchool';

const userNavigation = [
  { name: 'Profile', href: '/profile' },
  { name: 'Logout', href: '/logout' },
];

const UserLayout = ({ children }) => {
  const [schoolId, setSchoolId] = useState<string | undefined>();
  const router = useRouter();
  const { pathname } = router;
  const { id: schoolParam } = router.query;
  const { user, isLoading, error } = useAuth({ middleware: 'auth' });
  const { school, schoolQuery } = useSchool({ schoolId, dependsOn: user });
  const nav = buildPrimaryNav(pathname, { schoolId });

  // Save school id to local storage
  useEffect(() => {
    let id: string | undefined = '';
    if (schoolParam === undefined) {
      id = localStorage.getItem('school') ?? '';
    }
    if (typeof schoolParam === 'string') {
      localStorage.setItem('school', schoolParam);
    }
    if (schoolParam) {
      id = schoolParam as string;
    }
    setSchoolId(id);
  }, [schoolParam]);

  const userLoading = !user && (isLoading || canHandleError(error));
  const loading = userLoading || !school;

  if (loading) {
    return <PageLoading dark />;
  }

  if ((error && !canHandleError(error)) || schoolQuery.error) {
    return <Error dark />;
  }

  const { imageUrl, first_name, last_name } = user ?? {};
  const fullName = charLimit(`${first_name} ${last_name}`, 10);
  const userInitials = `${first_name?.substring(0, 1)}${last_name?.substring(0, 1)}`;

  return (
    <div className="min-h-full">
      <nav className="bg-gray-800">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex h-16 items-center justify-between">
            <div className="flex items-center">
              <div className="shrink-0 rounded bg-gray-100 p-1">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  className="h-6 w-6 text-blue-700">
                  <path
                    fillRule="evenodd"
                    d="M1.5 9.832v1.793c0 1.036.84 1.875 1.875 1.875h17.25c1.035 0 1.875-.84 1.875-1.875V9.832a3 3 0 00-.722-1.952l-3.285-3.832A3
                          3 0 0016.215 3h-8.43a3 3 0 00-2.278 1.048L2.222 7.88A3 3 0 001.5 9.832zM7.785 4.5a1.5 1.5 0 00-1.139.524L3.881 8.25h3.165a3
                          3 0 012.496 1.336l.164.246a1.5 1.5 0 001.248.668h2.092a1.5 1.5 0 001.248-.668l.164-.246a3 3 0
                          012.496-1.336h3.165l-2.765-3.226a1.5 1.5 0 00-1.139-.524h-8.43z"
                    clipRule="evenodd"
                  />
                  <path
                    d="M2.813 15c-.725 0-1.313.588-1.313 1.313V18a3 3 0 003 3h15a3 3 0 003-3v-1.688c0-.724-.588-1.312-1.313-1.312h-4.233a3
                        3 0 00-2.496 1.336l-.164.246a1.5 1.5 0 01-1.248.668h-2.092a1.5 1.5 0 01-1.248-.668l-.164-.246A3 3 0 007.046 15H2.812z"
                  />
                </svg>
              </div>
              <div className="block">
                <p className="ml-4 hidden text-base font-bold text-white hover:underline sm:ml-6 sm:block sm:text-lg">{charLimit(school?.name, 22) ?? 'Baseview'}</p>
                <p className="ml-4 block text-base font-bold text-white hover:underline sm:ml-6 sm:hidden sm:text-lg">{charLimit(school?.name, 10) ?? 'Baseview'}</p>
              </div>
            </div>
            <div className="block">
              <div className="ml-4 flex items-center md:ml-6">
                <button
                  type="button"
                  className="rounded-full bg-gray-800 p-1 text-gray-400 hover:text-white focus:text-white focus:outline-none focus:ring-1
                          focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800">
                  <span className="sr-only">View notifications</span>
                  <BellIcon
                    className="h-6 w-6"
                    aria-hidden="true"
                  />
                </button>

                {/* Profile dropdown */}
                <Menu
                  as="div"
                  className="relative ml-3">
                  <div>
                    <Menu.Button
                      className="flex max-w-xs items-center rounded-full bg-gray-800 text-sm text-white 
                              focus:outline-none focus:ring-1 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800">
                      <span className="sr-only">Open user menu</span>
                      {imageUrl ? (
                        <img
                          className="h-8 w-8 rounded-full"
                          src={imageUrl}
                          alt="User avatar"
                        />
                      ) : (
                        <div className="flex h-8 w-8 items-center justify-center rounded-full bg-gray-200">
                          <p className="font-bold text-gray-700">{userInitials}</p>
                        </div>
                      )}
                      <div className="ml-2 hidden flex-col items-start sm:flex">
                        <p className="text-xs font-semibold">{fullName}</p>
                      </div>
                    </Menu.Button>
                  </div>
                  <Transition
                    as={Fragment}
                    enter="transition ease-out duration-100"
                    enterFrom="transform opacity-0 scale-95"
                    enterTo="transform opacity-100 scale-100"
                    leave="transition ease-in duration-75"
                    leaveFrom="transform opacity-100 scale-100"
                    leaveTo="transform opacity-0 scale-95">
                    <Menu.Items
                      className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md
                            bg-white py-1 shadow-lg ring-1 ring-gray-900/5 focus:outline-none">
                      {userNavigation.map(item => (
                        <Menu.Item key={item.name}>
                          {({ active }) => (
                            <a
                              onClick={() => router.push(item.href)}
                              className={ctl(`${active ? 'bg-gray-100' : ''} block w-full cursor-pointer px-4 py-2 text-left text-sm text-gray-700 hover:bg-gray-200`)}>
                              {item.name}
                            </a>
                          )}
                        </Menu.Item>
                      ))}
                    </Menu.Items>
                  </Transition>
                </Menu>
              </div>
            </div>
          </div>
          {!isEmpty(nav) ? (
            <nav
              className="flex flex-wrap gap-x-6 border-t border-gray-500 py-3 pb-4"
              aria-label="Global">
              {nav.map(item => (
                <Link
                  key={item.name}
                  href={item.link}>
                  <a
                    className={ctl(`
                    ${item.current ? 'bg-gray-900 text-white' : 'text-gray-300 hover:bg-gray-700 hover:text-white'}
                    inline-flex items-center rounded-md py-2 px-3 text-sm font-medium`)}
                    aria-current={item.current ? 'page' : undefined}>
                    {item.name}
                  </a>
                </Link>
              ))}
            </nav>
          ) : null}
        </div>
      </nav>

      {children}
    </div>
  );
};

export const getLayout = page => getAppLayout(<UserLayout>{page}</UserLayout>);

export default UserLayout;
