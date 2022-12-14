// Import { ChevronLeftIcon } from '@heroicons/react/24/solid';

type PageHeaderProps = {
  title: string;
  actions?: React.ReactNode;
};

const PageHeader = ({ title, actions }: PageHeaderProps) => {
  return (
    <div className="mx-auto max-w-7xl p-4 pb-0 pt-8 sm:px-6 lg:px-8">
      <div className="flex flex-wrap items-center justify-between">
        <div className="mr-5">
          {/*   <div className="group -ml-2 mb-3 flex cursor-pointer items-center">
            <ChevronLeftIcon className="mr-1 h-4 w-4 font-bold text-gray-400 group-hover:text-gray-900" />
            <p className="text-sm font-bold text-gray-400 group-hover:text-gray-900">Back To Accounts</p>
          </div> */}

          <h2 className=" h-8 text-2xl font-semibold leading-7 text-gray-900 sm:truncate sm:tracking-tight">{title}</h2>
        </div>
        <div className="flex shrink-0 pt-4 sm:pt-0 md:ml-4">{actions ?? null}</div>
      </div>
    </div>
  );
};

export default PageHeader;
