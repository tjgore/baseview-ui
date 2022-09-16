const NotFound = () => {
  return (
    <div className="min-h-screen bg-white px-4 py-16 sm:px-6 sm:py-24 md:grid md:place-items-center lg:px-8">
      <div className="mx-auto max-w-max">
        <main className="sm:flex">
          <p className="text-4xl font-bold tracking-tight text-blue-500 sm:text-5xl">404</p>
          <div className="sm:ml-6">
            <div className="sm:border-l sm:border-gray-200 sm:pl-6">
              <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl">Page not found</h1>
              <p className="mt-1 text-base text-gray-500">Please check the URL in the address bar and try again.</p>
            </div>
            <div className="mt-10 flex space-x-3 sm:border-l sm:border-transparent sm:pl-6">
              <button
                type="button"
                onClick={() => window.location.reload()}
                className="inline-flex items-center rounded-md border border-transparent bg-blue-500 px-4 py-2
                  text-sm font-medium text-white shadow-sm hover:bg-blue-600 focus:outline-none focus:ring-2
                    focus:ring-blue-400 focus:ring-offset-2">
                Go back
              </button>

              <a
                href="#"
                className="inline-flex items-center rounded-md border border-transparent bg-blue-100 px-4 py-2
                  text-sm font-medium text-blue-600 hover:bg-blue-200 focus:outline-none focus:ring-2
                    focus:ring-blue-400 focus:ring-offset-2">
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
