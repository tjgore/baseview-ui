import ctl from '@netlify/classnames-template-literals';
import { ExclamationTriangleIcon } from '@heroicons/react/24/outline';

const Error = ({ dark, message }: { dark?: boolean; message?: string }) => {
  const textClassName = ctl(`${dark ? 'text-gray-900' : 'text-white'} mt-3 whitespace-pre-line rounded p-3 text-center text-xl font-semibold`);

  return (
    <div className="relative mx-auto -mt-32 flex min-h-screen w-full items-center justify-center bg-gray-100">
      <div>
        <ExclamationTriangleIcon className="mx-auto h-10 w-10 text-red-500" />
        <p
          tabIndex={0}
          aria-label="An Error occurred. Please, reload the page."
          className={textClassName}>
          {message ?? `An Error occurred. ${'\n'} Please, reload the page.`}
        </p>
        <div className="flex justify-center pt-3">
          <button
            type="button"
            className="inline-flex items-center rounded border border-transparent bg-blue-500 px-4 py-2
          text-base font-semibold text-white shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:ring-offset-2"
            onClick={() => window.location.reload()}>
            Reload Page
          </button>
        </div>
      </div>
    </div>
  );
};

export default Error;
