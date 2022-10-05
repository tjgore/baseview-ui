import ctl from '@netlify/classnames-template-literals';
import { ChevronRightIcon, MagnifyingGlassIcon } from '@heroicons/react/20/solid';
import { NextPageWithLayout } from '@/pages/_app';
import { getLayout } from '@/components/Layouts/UserLayout';

const people = [
  {
    name: 'Jane Cooper',
    title: 'Paradigm Representative',
    role: 'Admin',
    email: 'janecooper@example.com',
    telephone: '+1-202-555-0170',
    imageUrl: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=4&w=256&h=256&q=60',
  },
  {
    name: 'Cody Fisher',
    title: 'Paradigm Representative',
    role: 'Admin',
    email: 'janecooper@example.com',
    telephone: '+1-202-555-0170',
    imageUrl: 'https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=4&w=256&h=256&q=60',
  },
  {
    name: 'Esther Howard',
    title: 'Paradigm Representative',
    role: 'Admin',
    email: 'janecooper@example.com',
    telephone: '+1-202-555-0170',
    imageUrl: 'https://images.unsplash.com/photo-1520813792240-56fc4a3765a7?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=4&w=256&h=256&q=60',
  },
  {
    name: 'Mark Cube',
    title: 'Paradigm Representative',
    role: 'Admin',
    email: 'janecooper@example.com',
    telephone: '+1-202-555-0170',
    imageUrl: 'https://images.unsplash.com/photo-1488426862026-3ee34a7d66df?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=4&w=256&h=256&q=60',
  },
];

const tabs = [
  { name: 'All Students', href: '#', current: true },
  { name: 'Teachers', href: '#', current: false },
  { name: 'My Students', href: '#', current: false },
  { name: 'Admins', href: '#', current: false },
  { name: 'Professors', href: '#', current: false },
];

const Accounts: NextPageWithLayout = () => {
  return (
    <>
      <header className="bg-white shadow-sm">
        <div className="mx-auto max-w-7xl pt-0 sm:px-6 lg:px-8">
          <div className="hidden overflow-hidden">
            <div className="sm:hidden">
              <label
                htmlFor="tabs"
                className="sr-only">
                Select a tab
              </label>
              {/* Use an "onChange" listener to redirect the user to the selected tab URL. */}
              <select
                id="tabs"
                name="tabs"
                className="block w-full rounded-md border-gray-300 py-2 pl-3 pr-10 text-base focus:border-blue-600 focus:outline-none focus:ring-blue-600 sm:text-sm"
                defaultValue={tabs.find(tab => tab.current)?.name}>
                {tabs.map(tab => (
                  <option key={tab.name}>{tab.name}</option>
                ))}
              </select>
            </div>
            <div className="hidden sm:block">
              <div className="border-b border-gray-200">
                <nav
                  className="-mb-px flex space-x-8"
                  aria-label="Tabs">
                  {tabs.map(tab => (
                    <a
                      key={tab.name}
                      href={tab.href}
                      className={ctl(`
                            ${tab.current ? 'border-blue-600 text-indigo-600' : 'border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700'}
                            whitespace-nowrap border-b-2 py-4 px-1 text-sm font-medium`)}
                      aria-current={tab.current ? 'page' : undefined}>
                      {tab.name}
                    </a>
                  ))}
                </nav>
              </div>
            </div>
          </div>
        </div>
      </header>
      <main>
        <div className="mx-auto max-w-7xl p-4 pt-4 sm:px-6 lg:px-8">
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
                      className="truncate text-xs font-medium text-gray-500 hover:text-gray-700">
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
                      className="ml-2 text-xs font-medium text-gray-500 hover:text-gray-700">
                      Accounts
                    </a>
                  </div>
                </li>
              </ol>
            </nav>
          </div>
          <div className=" md:flex md:items-center md:justify-between">
            <div className="min-w-0 flex-1">
              <h2 className="text-2xl font-semibold leading-7 text-gray-900 sm:truncate sm:tracking-tight">Accounts</h2>
            </div>
          </div>
          <div className="mt-5 mb-12 overflow-hidden">
            <div className="block">
              <div className="flex flex-wrap border-b-2 border-gray-200">
                <nav
                  className="-mb-px flex flex-wrap gap-x-4"
                  aria-label="Tabs">
                  {tabs.map(tab => (
                    <a
                      key={tab.name}
                      href={tab.href}
                      className={ctl(`
                            ${tab.current ? 'border-blue-600 text-blue-600' : 'border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700'}
                            whitespace-nowrap border-b-2 px-1 pt-4 pb-2  text-sm font-semibold`)}
                      aria-current={tab.current ? 'page' : undefined}>
                      {tab.name}
                    </a>
                  ))}
                </nav>
              </div>
            </div>
          </div>
        </div>
        <div className="mx-auto max-w-7xl pb-5 sm:px-6 lg:px-8">
          <div className="px-4 pb-3 sm:px-0">
            <div className="flex h-0 items-center">
              {/*  <QueryStatus
                isLoading={profileQuery.isLoading}
                isFetching={profileQuery.isFetching}
                error={profileQuery.error}
              /> */}
            </div>
            {/*  <div className="overflow-hidden rounded-lg border bg-white px-10 py-5 shadow-sm">Accounts Page</div> */}
            <div className="mb-5">
              <div>
                <label
                  htmlFor="search"
                  className="sr-only font-semibold">
                  Search
                </label>
                <div className="relative mt-1 w-full rounded-md md:w-1/3">
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
                    transition-all duration-500 ease-in-out focus:w-full focus:border-blue-400 focus:ring-1 focus:ring-blue-400"
                    placeholder="Name or email"
                  />
                </div>
              </div>
            </div>

            <div>
              <ul
                role="list"
                className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
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
            </div>
          </div>
        </div>
      </main>
    </>
  );
};

Accounts.getLayout = getLayout;

export default Accounts;
