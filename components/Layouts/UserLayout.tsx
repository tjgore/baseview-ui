import { Fragment, useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';
import { Disclosure, Menu, Transition } from '@headlessui/react';
import { Bars3Icon, BellIcon, XMarkIcon } from '@heroicons/react/24/outline';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { getLayout as getAppLayout } from './AppLayout';
import { classNames, charLimit, canHandleError } from '../../utils/helpers';
import useAuth from '../../hooks/useAuth';
import PageLoading from '../Loading/Page';
import Error from '../Error/Page';

// User image 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80'

const navigation = [
  { name: 'Overview', href: '/schools/1/overview', current: true },
  { name: 'Classes', href: '/classes', current: false },
  { name: 'Teachers', href: '#', current: false },
  { name: 'Students', href: '#', current: false },
];
const userNavigation = [
  { name: 'Account', href: '#' },
  { name: 'Sign out', href: '/logout' },
];

const UserLayout = ({ children }) => {
  const router = useRouter();
  const { pathname } = router;
  const [nav, setNav] = useState(navigation);
  const { user, isLoading, isFetching, error } = useAuth({ middleware: 'auth' });

  const updateActiveNav = name => {
    const updatedNav = nav.map(navItem => {
      navItem.current = navItem.name === name;
      return navItem;
    });
    setNav(updatedNav);
  };

  useEffect(() => {
    if (['/schools', '/schools/create'].includes(pathname)) {
      setNav([{ name: 'Schools', href: '/schools', current: true }]);
    } else setNav(navigation);
  }, [pathname]);

  if (!user && (isLoading || isFetching || canHandleError(error))) {
    return <PageLoading dark />;
  }

  if (error && !canHandleError(error)) {
    return <Error dark />;
  }

  const { imageUrl, email, first_name, last_name } = user ?? {};
  // eslint-disable-next-line no-magic-numbers
  const fullName = charLimit(`${first_name ?? ''} ${last_name ?? ''}`, 10);

  return (
    <div className="min-h-full">
      <ToastContainer
        bodyClassName="!mb-3 !flex !items-start font-sans"
        position="top-right"
        icon={true}
        autoClose={4000}
        hideProgressBar={false}
        newestOnTop
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
      <Disclosure
        as="nav"
        className="bg-gray-800">
        {({ open }) => (
          <>
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
                  <div className="hidden md:block">
                    <div className="ml-10 flex items-baseline space-x-4">
                      {nav.map(item => (
                        <Link
                          key={item.name}
                          href={item.href}>
                          <a
                            onClick={() => updateActiveNav(item.name)}
                            className={classNames(
                              item.current ? 'bg-gray-900 text-white' : 'text-gray-300 hover:bg-gray-700 hover:text-white',
                              'rounded-md px-3 py-2 text-sm font-medium',
                            )}
                            aria-current={item.current ? 'page' : undefined}>
                            {item.name}
                          </a>
                        </Link>
                      ))}
                    </div>
                  </div>
                </div>
                <div className="hidden md:block">
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
                            <div className="h-8 w-8 rounded-full bg-gray-200" />
                          )}
                          <div className="ml-2 flex flex-col items-start">
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
                                <Link href={item.href}>
                                  <a className={classNames(active ? 'bg-gray-100' : '', 'block px-4 py-2 text-sm text-gray-700 hover:bg-gray-200')}>{item.name}</a>
                                </Link>
                              )}
                            </Menu.Item>
                          ))}
                        </Menu.Items>
                      </Transition>
                    </Menu>
                  </div>
                </div>
                <div className="-mr-2 flex md:hidden">
                  {/* Mobile menu button */}
                  <Disclosure.Button
                    className="inline-flex items-center justify-center rounded-md bg-gray-800 p-2 text-gray-400 hover:bg-gray-700
                      hover:text-white focus:outline-none focus:ring-1 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800">
                    <span className="sr-only">Open main menu</span>
                    {open ? (
                      <XMarkIcon
                        className="block h-6 w-6"
                        aria-hidden="true"
                      />
                    ) : (
                      <Bars3Icon
                        className="block h-6 w-6"
                        aria-hidden="true"
                      />
                    )}
                  </Disclosure.Button>
                </div>
              </div>
            </div>

            <Disclosure.Panel className="md:hidden">
              <div className="space-y-1 px-2 pt-2 pb-3 sm:px-3">
                {nav.map(item => (
                  <Disclosure.Button
                    key={item.name}
                    as="a"
                    href={item.href}
                    className={classNames(
                      item.current ? 'bg-gray-900 text-white' : 'text-gray-300 hover:bg-gray-700 hover:text-white',
                      'block rounded-md px-3 py-2 text-base font-medium',
                    )}
                    aria-current={item.current ? 'page' : undefined}>
                    {item.name}
                  </Disclosure.Button>
                ))}
              </div>
              <div className="border-t border-gray-700 pt-4 pb-3">
                <div className="flex items-center px-5">
                  <div className="shrink-0">
                    {imageUrl ? (
                      <img
                        className="h-8 w-8 rounded-full"
                        src={imageUrl}
                        alt="User avatar"
                      />
                    ) : (
                      <div className="h-8 w-8 rounded-full bg-gray-200" />
                    )}
                  </div>
                  <div className="ml-3">
                    <div className="text-base font-medium text-white">{fullName}</div>
                    <div className="text-sm font-medium text-gray-400">{email}</div>
                  </div>
                  <button
                    type="button"
                    className="ml-auto shrink-0 rounded-full bg-gray-800 p-1 text-gray-400 hover:text-white focus:outline-none focus:ring-2
                        focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800">
                    <span className="sr-only">View notifications</span>
                    <BellIcon
                      className="h-6 w-6"
                      aria-hidden="true"
                    />
                  </button>
                </div>
                <div className="mt-3 space-y-1 px-2">
                  {userNavigation.map(item => (
                    <Disclosure.Button
                      key={item.name}
                      as="a"
                      href={item.href}
                      className="block rounded-md px-3 py-2 text-base font-medium text-gray-400 hover:bg-gray-700 hover:text-white">
                      {item.name}
                    </Disclosure.Button>
                  ))}
                </div>
              </div>
            </Disclosure.Panel>
          </>
        )}
      </Disclosure>

      {children}
    </div>
  );
};

export const getLayout = page => getAppLayout(<UserLayout>{page}</UserLayout>);

export default UserLayout;
