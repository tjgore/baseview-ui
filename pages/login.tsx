import { useState } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import useAuth from '@/hooks/useAuth';
import { addValidation } from '@/services/Validation';
import { LoginDataType, isErrorResponse } from '@/types/index';
import { canHandleError, isValidationError } from '@/utils/helpers';
import Spinner from '@/components/Spinner';
import { getLayout } from '@/components/Layouts/FullPageLayout';
import { auth } from '@/utils/api';
import PageLoading from '@/components/Loading/Page';
import Error from '@/components/Error/Page';
import { NextPageWithLayout } from '@/pages/_app';
import { loginFields } from '@/utils/constants/forms';

const loginForm = addValidation(loginFields);

const Login: NextPageWithLayout = () => {
  const { user, isLoading, error, refetchUser } = useAuth({ middleware: 'guest' });
  const [showHeadingError, setHeadingError] = useState(false);
  const [loginLoading, setLoginLoading] = useState(false);

  const {
    register,
    reset,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginDataType>();

  const onSubmit: SubmitHandler<LoginDataType> = async data => {
    setHeadingError(false);
    setLoginLoading(true);
    try {
      await auth.login(data);
      refetchUser();
    } catch (err) {
      if (isErrorResponse(err) && isValidationError(err)) {
        setHeadingError(true);
      }
      setLoginLoading(false);
    }
    reset();
  };

  if (user || isLoading) {
    return <PageLoading dark />;
  }

  if (error && !canHandleError(error)) {
    return <Error dark />;
  }

  return (
    <div className="flex min-h-full flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="flex min-h-full flex-col justify-center py-12 sm:px-6 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-md">
          <div className="flex items-center justify-center">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="currentColor"
              className="mr-2 h-8 w-8 text-blue-700">
              <path
                fillRule="evenodd"
                d="M1.5 9.832v1.793c0 1.036.84 1.875 1.875 1.875h17.25c1.035 0 1.875-.84 1.875-1.875V9.832a3 3 0 00-.722-1.952l-3.285-3.832A3
                        3 0 0016.215 3h-8.43a3 3 0 00-2.278 1.048L2.222 7.88A3 3 0 001.5 9.832zM7.785 4.5a1.5 1.5 0 00-1.139.524L3.881 8.25h3.165a3
                        3 0 012.496 1.336l.164.246a1.5 1.5 0 001.248.668h2.092a1.5 1.5 0 001.248-.668l.164-.246a3 3 0
                        012.496-1.336h3.165l-2.765-3.226a1.5 1.5 0 00-1.139-.524h-8.43z"
                clipRule="evenodd"
              />
              <path
                d="M2.813 15c-.725 0-1.313.588-1.313 1.313V18a3 3 0 003 3h15a3 3 0 003-3v-1.688c0-.724-.588-1.312-1.313-1.312h-4.233a3
                      3 0 00-2.496 1.336l-.164.246a1.5 1.5 0 01-1.248.668h-2.092a1.5 1.5 0 01-1.248-.668l-.164-.246A3 3 0 007.046 15H2.812z"
              />
            </svg>
            <p className="text-2xl font-medium text-gray-900">Baseview</p>
          </div>
          <h2 className="mt-3 text-center text-3xl font-bold tracking-tight text-gray-900">Sign in to your account</h2>
        </div>
        <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
          {showHeadingError ? (
            <div className="pb-5 text-center">
              <p className="text-sm text-red-600">
                Your email or password is incorrect! Please try again. <br /> If you have forgotten your login information, <br /> try resetting your password. Thank you.
              </p>
            </div>
          ) : null}
          <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
            <form
              className="space-y-6"
              onSubmit={handleSubmit(onSubmit)}>
              <div>
                <label
                  htmlFor={loginForm.email.id}
                  className="block text-sm font-medium text-gray-700">
                  Email address
                </label>
                <div className="mt-1">
                  <input
                    id={loginForm.email.id}
                    type="email"
                    autoComplete={loginForm.email.id}
                    {...register(loginForm.email.id, loginForm.email.validate)}
                    className="block w-full appearance-none rounded-md border border-gray-300 px-3 py-2 shadow-sm placeholder:text-gray-400 focus:border-blue-300
                            focus:outline-none focus:ring-blue-300 sm:text-sm"
                  />
                  <p className="pt-1 text-xs text-red-500">{errors?.email?.message as string}</p>
                </div>
              </div>
              <div>
                <label
                  htmlFor={loginForm.password.id}
                  className="block text-sm font-medium text-gray-700">
                  Password
                </label>
                <div className="mt-1">
                  <input
                    id={loginForm.password.id}
                    type="password"
                    autoComplete="current-password"
                    {...register(loginForm.password.id, loginForm.password.validate)}
                    className="block w-full appearance-none rounded-md border border-gray-300 px-3 py-2 shadow-sm placeholder:text-gray-400 focus:border-blue-300
                            focus:outline-none focus:ring-blue-300 sm:text-sm"
                  />
                  <p className="pt-1 text-xs text-red-500">{errors?.password?.message as string}</p>
                </div>
              </div>
              <div className="flex items-center justify-between">
                <div className="text-sm">
                  <a
                    href="#"
                    className="font-medium text-blue-600 hover:text-blue-500">
                    Forgot your password?
                  </a>
                </div>
              </div>
              <div>
                <button
                  disabled={loginLoading}
                  type="submit"
                  className="flex w-full justify-center rounded-md border border-transparent bg-blue-600 py-2 px-4 text-base
                          font-semibold text-white shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2
                          focus:ring-blue-500 focus:ring-offset-2 disabled:cursor-not-allowed disabled:bg-blue-200">
                  {loginLoading ? (
                    <div className="flex items-center">
                      <Spinner className="mr-3" /> Loading...
                    </div>
                  ) : (
                    'Sign in'
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

Login.getLayout = getLayout;

export default Login;
