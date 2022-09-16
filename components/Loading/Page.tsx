import ctl from '@netlify/classnames-template-literals';
import Spinner from '../Spinner';

const PageLoading = ({ dark }: { dark?: boolean }) => {
  const spinnerClassName = ctl(`${dark ? 'text-gray-900' : 'text-white'}`);
  const textClassName = ctl(`${dark ? 'text-gray-900' : 'text-white'} mt-3 rounded p-3 text-3xl font-semibold`);

  return (
    <div className="relative mx-auto -mt-32 flex min-h-screen w-full items-center justify-center bg-gray-100">
      <div>
        <Spinner
          className="mx-auto"
          size="h-14 w-14"
          color={spinnerClassName}
        />
        <p
          tabIndex={0}
          aria-label="Page is Loading"
          className={textClassName}>
          Loading...
        </p>
      </div>
    </div>
  );
};

export default PageLoading;
