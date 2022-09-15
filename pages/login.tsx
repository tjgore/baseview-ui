import { useEffect, useState, useRef } from 'react';
import type { NextPage } from 'next';
import { useForm, SubmitHandler, FieldValues } from 'react-hook-form';
import FocusLock from 'react-focus-lock';
import useAuth from '../hooks/useAuth';
import { validateField } from '../services/Validation';
import { LoginDataType, isErrorResponse } from '../types';
import { UNPROCESSABLE_ENTITY } from '../utils/constants';
import { resetForm } from '../utils/helpers';
import Spinner from '../components/Spinner';

const loginValidation = {
  email: (value: string) => validateField({ email: value }, 'required|email'),
  password: (value: string) => validateField({ password: value }, 'string|required'),
};

const Login: NextPage = () => {
  const { login, isLoading } = useAuth({ middleware: 'guest' });
  const [showHeadingError, setHeadingError] = useState(false);

  const {
    register,
    resetField,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm();

  const onSubmit: SubmitHandler<FieldValues> = async data => {
    setHeadingError(false);
    try {
      await login(data as LoginDataType);
    } catch (err) {
      if (isErrorResponse(err) && err?.response?.status === UNPROCESSABLE_ENTITY) {
        setHeadingError(true);
      }
    }
    resetForm(resetField, ['email', 'password']);
  };

  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (isLoading) ref?.current?.focus();
  }, [isLoading]);

  return (
    <div className="overflow-hidden font-sans antialiased">
      <div className="min-h-screen bg-gray-50">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-7xl">
            {isLoading ? (
              <FocusLock>
                <div className="fixed left-0 h-full w-full bg-gray-900 opacity-80">
                  <div className="mx-auto flex min-h-screen w-full items-center justify-center">
                    <div>
                      <Spinner
                        className="mx-auto"
                        size="h-14 w-14"
                      />
                      <p
                        ref={ref}
                        tabIndex={0}
                        aria-label="Page is Loading"
                        className="mt-3 rounded p-3 text-3xl font-semibold text-white focus:ring-blue-500  ">
                        Loading...
                      </p>
                    </div>
                  </div>
                </div>
              </FocusLock>
            ) : null}
            <div
              aria-hidden={true}
              className="flex min-h-full flex-col justify-center py-12 sm:px-6 lg:px-8">
              <div className="flex min-h-full flex-col justify-center py-12 sm:px-6 lg:px-8">
                <div className="sm:mx-auto sm:w-full sm:max-w-md">
                  <div className="flex items-center justify-center">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={1.5}
                      stroke="currentColor"
                      className="mr-2 h-8 w-8 text-blue-700">
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M7.875 14.25l1.214 1.942a2.25 2.25 0 001.908 1.058h2.006c.776 0 1.497-.4 1.908-1.058l1.214-1.942M2.41 9h4.636a2.25 2.25 0 011.872
                      1.002l.164.246a2.25 2.25 0 001.872 1.002h2.092a2.25 2.25 0 001.872-1.002l.164-.246A2.25 2.25 0 0116.954 9h4.636M2.41 9a2.25 2.25
                        0 00-.16.832V12a2.25 2.25 0 002.25 2.25h15A2.25 2.25 0 0021.75 12V9.832c0-.287-.055-.57-.16-.832M2.41
                        9a2.25 2.25 0 01.382-.632l3.285-3.832a2.25 2.25 0 011.708-.786h8.43c.657 0 1.281.287 1.709.786l3.284 3.832c.163.19.291.404.382.632M4.5
                          20.25h15A2.25 2.25 0 0021.75 18v-2.625c0-.621-.504-1.125-1.125-1.125H3.375c-.621 0-1.125.504-1.125 1.125V18a2.25 2.25 0 002.25 2.25z"
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
                          htmlFor="email"
                          className="block text-sm font-medium text-gray-700">
                          Email address
                        </label>
                        <div className="mt-1">
                          <input
                            id="email"
                            type="email"
                            autoComplete="email"
                            {...register('email', { validate: loginValidation.email })}
                            className="block w-full appearance-none rounded-md border border-gray-300 px-3 py-2 shadow-sm placeholder:text-gray-400 focus:border-blue-500
                            focus:outline-none focus:ring-blue-500 sm:text-sm"
                          />
                          <p className="pt-1 text-sm text-red-500">{errors?.email?.message as string}</p>
                        </div>
                      </div>
                      <div>
                        <label
                          htmlFor="password"
                          className="block text-sm font-medium text-gray-700">
                          Password
                        </label>
                        <div className="mt-1">
                          <input
                            id="password"
                            type="password"
                            autoComplete="current-password"
                            {...register('password', { validate: loginValidation.password })}
                            className="block w-full appearance-none rounded-md border border-gray-300 px-3 py-2 shadow-sm placeholder:text-gray-400 focus:border-blue-500
                            focus:outline-none focus:ring-blue-500 sm:text-sm"
                          />
                          <p className="pt-1 text-sm text-red-500">{errors?.password?.message as string}</p>
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
                          type="submit"
                          className="flex w-full justify-center rounded-md border border-transparent bg-blue-600 py-2 px-4
                          text-base font-semibold text-white shadow-sm hover:bg-blue-700 focus:outline-none
                          focus:ring-2 focus:ring-blue-500 focus:ring-offset-2">
                          {isSubmitting ? (
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
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
