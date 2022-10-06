import ctl from '@netlify/classnames-template-literals';
import { ChevronRightIcon, ChevronLeftIcon, MagnifyingGlassIcon } from '@heroicons/react/20/solid';
import { NextPageWithLayout } from '@/pages/_app';
import { getLayout } from '@/components/Layouts/UserLayout';

const people = [
  {
    name: 'Jane Cooper',
    title: 'Paradigm Representative',
    role: 'Admin',
    email: 'janecooper@example1.com',
    telephone: '+1-202-555-0170',
    imageUrl: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=4&w=256&h=256&q=60',
  },
  {
    name: 'Cody Fisher',
    title: 'Paradigm Representative',
    role: 'Admin',
    email: 'janecooper@example2.com',
    telephone: '+1-202-555-0170',
    imageUrl: 'https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=4&w=256&h=256&q=60',
  },
  {
    name: 'Esther Howard',
    title: 'Paradigm Representative',
    role: 'Admin',
    email: 'janecooper@example3.com',
    telephone: '+1-202-555-0170',
    imageUrl: 'https://images.unsplash.com/photo-1520813792240-56fc4a3765a7?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=4&w=256&h=256&q=60',
  },
  {
    name: 'Mark Cube',
    title: 'Paradigm Representative',
    role: 'Admin',
    email: 'janecooper@example4.com',
    telephone: '+1-202-555-0170',
    imageUrl: 'https://images.unsplash.com/photo-1488426862026-3ee34a7d66df?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=4&w=256&h=256&q=60',
  },
];

const tabs = [
  { name: 'All Students', href: '#', current: true },
  { name: 'My Students', href: '#', current: false },
  { name: 'Teachers', href: '#', current: false },
  { name: 'Admins', href: '#', current: false },
  { name: 'Support', href: '#', current: false },
  { name: 'Professors', href: '#', current: false },
  { name: 'Internal Admin', href: '#', current: false },
];

const Accounts: NextPageWithLayout = () => {
  return (
    <>
      <main>
        <div className="mx-auto max-w-7xl p-4 pt-8 sm:px-6 lg:px-8">
          <div className="md:flex md:items-center md:justify-between">
            <div className="min-w-0 flex-1">
              <h2 className="h-8 text-2xl font-semibold leading-7 text-gray-900 sm:truncate sm:tracking-tight">Accounts Page</h2>
            </div>
            <div className="mt-4 flex shrink-0 md:mt-0 md:ml-4">
              <button
                type="button"
                className="inline-flex items-center rounded-md border border-transparent bg-blue-600 px-4 py-2
                  text-sm font-semibold text-white shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2">
                Create New
              </button>
            </div>
          </div>

          <div className="mt-10 mb-0 flex flex-col items-center overflow-hidden md:flex-row">
            <div className="flex w-full flex-wrap items-center border-b-0 border-gray-200 md:border-b-2">
              <nav
                className="-mb-px mr-auto flex w-full flex-wrap gap-x-4 border-b-2 md:w-auto md:border-b-0"
                aria-label="Tabs">
                {tabs.map(tab => (
                  <a
                    key={tab.name}
                    href={tab.href}
                    className={ctl(`
                            ${tab.current ? 'border-blue-600 text-blue-600' : 'border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700'}
                            whitespace-nowrap border-b-2 px-1 py-4 text-sm font-semibold`)}
                    aria-current={tab.current ? 'page' : undefined}>
                    {tab.name}
                  </a>
                ))}
              </nav>
              <div className="w-full pt-4 pb-2 md:w-1/3 md:pt-0">
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
                      className="block w-full rounded-md border border-gray-300 py-2 px-0 pl-[6.5rem] 
                    outline-none focus:border-blue-400 focus:ring-blue-400"
                      placeholder="Name or email"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="mx-auto max-w-7xl pb-5 sm:px-6 lg:px-8">
          <div className="px-4 pb-3 sm:px-0">
            <div className="flex h-10 items-center">
              {/*  <QueryStatus
                isLoading={profileQuery.isLoading}
                isFetching={profileQuery.isFetching}
                error={profileQuery.error}
              /> */}
            </div>

            <div>
              <ul
                role="list"
                className="grid min-h-[calc(100vh-530px)] grid-cols-1 items-start gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
                {people.map(person => (
                  <li
                    key={person.email}
                    className="col-span-1 flex flex-col divide-y divide-gray-200 rounded-lg bg-white text-center shadow">
                    <div className="flex flex-1 flex-col p-8">
                      <img
                        className="mx-auto h-32 w-32 shrink-0 rounded-full"
                        src={person.imageUrl}
                        alt=""
                      />
                      <h3 className="mt-6 text-sm font-medium text-gray-900">{person.name}</h3>
                      <dl className="mt-1 flex grow flex-col justify-between">
                        <dt className="sr-only">Title</dt>
                        <dd className="text-sm text-gray-500">{person.title}</dd>
                        <dt className="sr-only">Role</dt>
                        <dd className="mt-3">
                          <span className="rounded-full bg-green-100 px-2 py-1 text-xs font-medium text-green-800">{person.role}</span>
                        </dd>
                      </dl>
                    </div>
                  </li>
                ))}
              </ul>
              <div className="mt-10 mb-4 flex items-center justify-between border-gray-200 bg-gray-100 px-4 py-3 sm:px-6">
                <div className="flex flex-1 justify-between sm:hidden">
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
                <div className="hidden sm:flex sm:flex-1 sm:items-center sm:justify-between">
                  <div>
                    <p className="text-sm text-gray-700">
                      Showing <span className="font-medium">1</span> to <span className="font-medium">10</span> of <span className="font-medium">97</span> results
                    </p>
                  </div>
                  <div>
                    <nav
                      className="isolate inline-flex -space-x-px rounded-md shadow-sm"
                      aria-label="Pagination">
                      <a
                        href="#"
                        className="relative inline-flex items-center rounded-l-md border
                        border-gray-300 bg-white p-2 text-sm font-medium text-gray-500 hover:bg-gray-50 focus:z-20">
                        <span className="sr-only">Previous</span>
                        <ChevronLeftIcon
                          className="h-5 w-5"
                          aria-hidden="true"
                        />
                      </a>
                      {/* Current: "z-10 bg-indigo-50 border-indigo-500 text-indigo-600", Default: "bg-white border-gray-300 text-gray-500 hover:bg-gray-50" */}
                      <a
                        href="#"
                        aria-current="page"
                        className="relative z-10 inline-flex items-center border border-indigo-500 bg-indigo-50 px-4 py-2 text-sm font-medium text-indigo-600 focus:z-20">
                        1
                      </a>
                      <a
                        href="#"
                        className="relative inline-flex items-center border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-500 hover:bg-gray-50 focus:z-20">
                        2
                      </a>
                      <a
                        href="#"
                        className="relative hidden items-center border border-gray-300 bg-white
                        px-4 py-2 text-sm font-medium text-gray-500 hover:bg-gray-50 focus:z-20 md:inline-flex">
                        3
                      </a>
                      <span className="relative inline-flex items-center border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700">...</span>
                      <a
                        href="#"
                        className="relative hidden items-center border border-gray-300 bg-white
                        px-4 py-2 text-sm font-medium text-gray-500 hover:bg-gray-50 focus:z-20 md:inline-flex">
                        8
                      </a>
                      <a
                        href="#"
                        className="relative inline-flex items-center border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-500 hover:bg-gray-50 focus:z-20">
                        9
                      </a>
                      <a
                        href="#"
                        className="relative inline-flex items-center border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-500 hover:bg-gray-50 focus:z-20">
                        10
                      </a>
                      <a
                        href="#"
                        className="relative inline-flex items-center rounded-r-md border 
                        border-gray-300 bg-white p-2 text-sm font-medium text-gray-500 hover:bg-gray-50 focus:z-20">
                        <span className="sr-only">Next</span>
                        <ChevronRightIcon
                          className="h-5 w-5"
                          aria-hidden="true"
                        />
                      </a>
                    </nav>
                  </div>
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
