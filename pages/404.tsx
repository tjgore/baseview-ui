import { useRouter } from 'next/router';

const NotFound = () => {
  const router = useRouter();
  return (
    <div className="min-h-screen bg-white px-4 py-16 sm:px-6 sm:py-24 md:grid md:place-items-center lg:px-8">
      <div className="mx-auto max-w-max">
        <main className="sm:flex">
          <p className="text-4xl font-bold tracking-tight text-blue-600 sm:text-9xl">
            4<span className="text-gray-700">0</span>4
          </p>
          <div className="sm:ml-6">
            <div className="sm:border-gray-200 sm:pl-6">
              <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl">Page not found!</h1>
              <p className="mt-1 text-base text-gray-500">Please check the URL in the address bar and try again.</p>
            </div>
            <div className="mt-10 flex space-x-3 sm:border-l sm:border-transparent sm:pl-6">
              <button
                type="button"
                onClick={() => router.back()}
                className="inline-flex items-center rounded-md border border-transparent bg-blue-600 px-4 py-2
                  text-sm font-medium text-white shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2
                    focus:ring-blue-500 focus:ring-offset-2">
                Go back
              </button>

              <a
                href="#"
                className="inline-flex items-center rounded-md border border-transparent bg-blue-50 px-4 py-2
                  text-sm font-medium text-blue-600 hover:bg-blue-200 focus:outline-none focus:ring-2
                    focus:ring-blue-500 focus:ring-offset-2">
                Contact support
              </a>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default NotFound;
