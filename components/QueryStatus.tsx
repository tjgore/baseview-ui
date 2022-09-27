import { ExclamationTriangleIcon } from '@heroicons/react/24/outline';
import Spinner from '@/components/Spinner';

type QueryStatusProps = {
  isLoading?: boolean;
  isFetching?: boolean;
  error?: unknown;
};

const QueryStatus = ({ isLoading, isFetching, error }: QueryStatusProps) => {
  return (
    <>
      {(isLoading || isFetching) && (
        <>
          <Spinner
            className="mr-2"
            color="text-blue-900"
            size="h-4 w-4"
            aria-hidden="true"
          />
          <p className="text-blue-900">{isFetching && !isLoading ? 'Refreshing...' : 'Loading...'}</p>
        </>
      )}
      {error && !isLoading && !isFetching && (
        <>
          <ExclamationTriangleIcon
            className="mr-2 h-5 w-5 text-red-600"
            aria-hidden="true"
          />
          <p className="text-red-600">
            An error occurred. Try reloading the page.
            <button
              type="button"
              className="ml-1 underline hover:font-semibold">
              Reload
            </button>
          </p>
        </>
      )}
    </>
  );
};

export default QueryStatus;
