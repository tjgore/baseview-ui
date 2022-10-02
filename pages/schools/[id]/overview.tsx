import { useState, useMemo } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useQuery } from '@tanstack/react-query';
import { ChevronRightIcon } from '@heroicons/react/20/solid';
import { NextPageWithLayout } from '@/pages/_app';
import useAuth from '@/hooks/useAuth';
import { getLayout } from '@/components/Layouts/UserLayout';
import { schools } from '@/utils/api';
import { isSchoolData } from '@/types/schools';
import { getDefaultValues } from '@/utils/helpers';
import Drawer from '@/components/Drawers';
import InviteDrawer from '@/components/Drawers/InviteDrawer';

const Overview: NextPageWithLayout = () => {
  useAuth({ middleware: 'auth' });
  const router = useRouter();
  const { id: schoolId } = router.query;
  const [openDrawer, setOpenDrawer] = useState(false);
  const { data } = useQuery(['school', schoolId], () => schools.findById(schoolId), { enabled: !!schoolId });
  const school = useMemo(() => {
    return isSchoolData(data) ? getDefaultValues(data) : {};
  }, [data]);

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
                        {school.name as string}
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
                        Overview
                      </a>
                    </div>
                  </li>
                </ol>
              </nav>
            </div>
            <div className="mt-1 md:flex md:items-center md:justify-between">
              <div className="min-w-0 flex-1">
                <h2 className="text-2xl font-semibold leading-7 text-gray-900 sm:truncate sm:tracking-tight">School Overview</h2>
              </div>
              <div className="mt-4 flex shrink-0 md:mt-0 md:ml-4">
                <button
                  type="button"
                  onClick={() => setOpenDrawer(true)}
                  className="inline-flex items-center rounded-md border border-transparent bg-blue-600 px-4 py-2
                  text-sm font-semibold text-white shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2">
                  Invite
                </button>

                <Drawer
                  title="Invite Member"
                  description="Invite as many members as you like by filling out the below info."
                  open={openDrawer}
                  setOpen={setOpenDrawer}>
                  <InviteDrawer setOpen={setOpenDrawer} />
                </Drawer>
                <Link href="/schools">
                  <button
                    type="button"
                    className="ml-3 inline-flex items-center rounded-md bg-slate-200 px-4 py-2 text-sm
                    font-semibold text-gray-700 shadow-sm hover:bg-slate-300 hover:text-gray-800 focus:outline-none focus:ring-1 focus:ring-blue-500 focus:ring-offset-2">
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
