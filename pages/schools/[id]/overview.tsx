import { useState, useMemo } from 'react';
import { useRouter } from 'next/router';
import { useQuery } from '@tanstack/react-query';
import { NextPageWithLayout } from '@/pages/_app';
import useAuth from '@/hooks/useAuth';
import { getLayout } from '@/components/Layouts/UserLayout';
import { schools } from '@/utils/api';
import { isSchoolData } from '@/types/schools';
import { getDefaultValues } from '@/utils/helpers';
import Drawer from '@/components/Drawers';
import PageHeader from '@/components/PageHeader';
import InviteDrawer from '@/components/Drawers/InviteDrawer';
import Button from '@/components/Button';
import ButtonLink from '@/components/Button/Link';

const Overview: NextPageWithLayout = () => {
  useAuth({ middleware: 'auth' });
  const router = useRouter();
  const { id: schoolId } = router.query;
  const [openDrawer, setOpenDrawer] = useState(false);
  const { data } = useQuery(['school', schoolId], () => schools.findById(schoolId), { enabled: !!schoolId });
  const school = useMemo(() => {
    return isSchoolData(data) ? getDefaultValues(data) : {};
  }, [data]);

  console.log(school);

  return (
    <>
      <main>
        <PageHeader
          title="School Overview"
          actions={
            <>
              <Button
                text="Invite"
                onClick={() => setOpenDrawer(true)}
              />

              <Drawer
                title="Invite Member"
                description="Invite as many members as you like by filling out the below info."
                open={openDrawer}
                setOpen={setOpenDrawer}>
                <InviteDrawer setOpen={setOpenDrawer} />
              </Drawer>
              <ButtonLink
                className="ml-3"
                color="secondary"
                text="Schools"
                href="/schools"
              />
            </>
          }
        />
        <div className="mx-auto max-w-7xl pb-5 sm:px-6 lg:px-8">
          <div className="px-4 pb-3 sm:px-0 ">
            <div className="flex h-10 items-center">
              {/*  <QueryStatus
                isLoading={profileQuery.isLoading}
                isFetching={profileQuery.isFetching}
                error={profileQuery.error}
              /> */}
            </div>
            <div className="mb-5 grid  grid-cols-1 items-center gap-5 md:grid-cols-3">
              <div className="overflow-hidden rounded-lg border bg-white shadow-sm">
                <div className="px-5 pt-4 pb-2">
                  <p className="mb-1 text-sm  font-semibold uppercase text-gray-500">Total Students</p>
                  <p className="text-4xl font-bold text-blue-600">14</p>
                </div>
                <div className="bg-gray-50 px-5 py-2">
                  <a className="block text-right font-bold text-blue-600">View All</a>
                </div>
              </div>

              <div className="overflow-hidden rounded-lg border bg-white shadow-sm">
                <div className="px-5 pt-4 pb-2">
                  <p className="mb-1 text-sm  font-semibold uppercase text-gray-500">Total Classes</p>
                  <p className="text-4xl font-bold text-blue-600">12</p>
                </div>
                <div className="bg-gray-50 px-5 py-2">
                  <a className="block text-right font-bold text-blue-600">View All</a>
                </div>
              </div>

              <div className="overflow-hidden rounded-lg border bg-white shadow-sm">
                <div className="px-5 pt-4 pb-2">
                  <p className="mb-1 text-sm  font-semibold uppercase text-gray-500">Total Teachers</p>
                  <p className="text-4xl font-bold text-blue-600">3</p>
                </div>
                <div className="bg-gray-50 px-5 py-2">
                  <a className="block text-right font-bold text-blue-600">View All</a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </>
  );
};

Overview.getLayout = getLayout;

export default Overview;
