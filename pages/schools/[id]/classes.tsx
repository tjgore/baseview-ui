import { NextPageWithLayout } from '@/pages/_app';
import { getLayout } from '@/components/Layouts/UserLayout';
import PageHeader from '@/components/PageHeader';

const Classes: NextPageWithLayout = () => {
  return (
    <main>
      <PageHeader title="Classes" />
      <div className="mx-auto max-w-7xl pb-5 sm:px-6 lg:px-8">
        <div className="px-4 pb-3 sm:px-0">
          <div className="flex h-10 items-center">
            {/*  <QueryStatus
                isLoading={profileQuery.isLoading}
                isFetching={profileQuery.isFetching}
                error={profileQuery.error}
              /> */}
          </div>
          <div className="overflow-hidden rounded-lg border bg-white px-10 py-5 shadow-sm">Classes Page</div>
        </div>
      </div>
    </main>
  );
};

Classes.getLayout = getLayout;

export default Classes;
