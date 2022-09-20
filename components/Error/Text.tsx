import { ExclamationTriangleIcon } from '@heroicons/react/24/outline';

const ErrorText = ({ text, reload }: { text?: string; reload?: boolean }) => {
  return (
    <>
      <ExclamationTriangleIcon className="mr-2 h-5 w-5 text-red-500" />
      <p>
        {text ?? 'An error occurred. Try reloading the page.'}
        {reload && (
          <button
            type="button"
            onClick={() => window.location.reload()}
            className="pl-1 underline hover:font-semibold">
            Reload
          </button>
        )}
      </p>
    </>
  );
};

export default ErrorText;
