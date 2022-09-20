import { useState } from 'react';
import { ChevronRightIcon } from '@heroicons/react/20/solid';
import Link from 'next/link';
import { useForm, SubmitHandler, FieldValues } from 'react-hook-form';
import { NextPageWithLayout } from '@/pages/_app';
import { resetForm, isInvalidResponse } from '@/utils/helpers';
import { getLayout } from '@/components/Layouts/UserLayout';
import { addValidation } from '@/services/Validation';
import { schools } from '@/utils/api';
import { isErrorResponse, schoolSchema, SchoolType } from '@/types/index';
import Spinner from '@/components/Spinner';
import ErrorText from '@/components/Error/Text';
import Required from '@/components/Form/Required';

const isSchoolData = (data): data is SchoolType => schoolSchema.safeParse(data).success;

const schoolFields = {
  name: { rules: 'string|required' },
  address: { rules: 'string|required' },
  email: { rules: 'required|email' },
  phone: { rules: 'string|required' },
  website: { rules: 'string|nullable' },
  about: { rules: 'string||url|nullable' },
  slogan: { rules: 'string|nullable' },
  principal: { rules: 'required|string' },
  vice_principal: { rules: 'string|nullable' },
};

const schoolForm = addValidation(schoolFields);

const CreateSchool: NextPageWithLayout = () => {
  const [showError, setError] = useState(false);
  const [formLoading, setFormLoading] = useState(false);

  const {
    register,
    resetField,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit: SubmitHandler<FieldValues> = async data => {
    setError(false);
    setFormLoading(true);
    try {
      if (isSchoolData(data)) {
        await schools.create(data);
      }

      resetForm(resetField, Object.keys(schoolFields));
    } catch (err) {
      if (isErrorResponse(err) && isInvalidResponse(err)) {
        setError(true);
      }
    }
    setFormLoading(false);
  };

  return (
    <>
      <header className="bg-white shadow-sm">
        <div className="mx-auto max-w-7xl p-5 sm:px-6 lg:px-8">
          <div>
            <div>
              <nav
                className="flex"
                aria-label="Breadcrumb">
                <ol
                  role="list"
                  className="flex flex-wrap items-center space-x-2 md:space-x-4 lg:flex-nowrap">
                  <li>
                    <div className="flex">
                      <Link href="/schools">
                        <a className="truncate text-sm font-medium text-gray-500 hover:text-gray-700">Schools</a>
                      </Link>
                    </div>
                  </li>
                  <li>
                    <div className="flex items-center">
                      <ChevronRightIcon
                        className="h-5 w-5 shrink-0 text-gray-400"
                        aria-hidden="true"
                      />
                      <Link href="#">
                        <a className="ml-4 text-sm font-medium text-gray-500 hover:text-gray-700">Create School</a>
                      </Link>
                    </div>
                  </li>
                </ol>
              </nav>
            </div>
            <div className="mt-2 md:flex md:items-center md:justify-between">
              <div className="min-w-0 flex-1">
                <h2 className="text-2xl font-bold leading-7 text-gray-900 sm:truncate sm:text-3xl sm:tracking-tight">Create New School</h2>
              </div>
            </div>
          </div>
        </div>
      </header>
      <main>
        <div className="mx-auto max-w-7xl pb-5 sm:px-6 lg:px-8">
          <div className="px-4 py-3 pt-10 sm:px-0">
            <div className="mb-5 rounded-lg border bg-white p-6 shadow-sm md:p-10">
              <form onSubmit={handleSubmit(onSubmit)}>
                <div className="sm:overflow-hidden">
                  <div className="space-y-6 sm:p-6">
                    <div>
                      <h3 className="text-xl font-medium leading-6 text-gray-900">School Information</h3>
                      <p className="mt-1 text-sm text-gray-500">Provide details and information for other users needs.</p>
                      <div className="flex pt-2 text-red-500">{showError && <ErrorText text="An error occurred. Try again." />}</div>
                    </div>

                    <div className="grid grid-cols-6 gap-6">
                      <div className="col-span-6">
                        <label
                          htmlFor={schoolForm.name.id}
                          className="block text-sm font-medium text-gray-700">
                          School name <Required rules={schoolForm.name.rules} />
                        </label>
                        <input
                          type="text"
                          {...register(schoolForm.name.id, schoolForm.name.validate)}
                          id={schoolForm.name.id}
                          autoComplete={schoolForm.name.id}
                          className="mt-1 block w-full rounded-md border border-gray-300 py-2 px-3
                          shadow-sm focus:border-blue-300 focus:outline-none focus:ring-blue-300 sm:text-sm"
                        />
                        <p className="pt-1 text-xs text-red-500">{errors?.name?.message as string}</p>
                      </div>
                      <div className="col-span-6">
                        <label
                          htmlFor={schoolForm.address.id}
                          className="block text-sm font-medium text-gray-700">
                          Street address <Required rules={schoolForm.address.rules} />
                        </label>
                        <input
                          type="text"
                          {...register(schoolForm.address.id, schoolForm.address.validate)}
                          id={schoolForm.address.id}
                          autoComplete={schoolForm.address.id}
                          className="mt-1 block w-full rounded-md border border-gray-300 py-2 px-3
                          shadow-sm focus:border-blue-300 focus:outline-none focus:ring-blue-300 sm:text-sm"
                        />
                        <p className="pt-1 text-xs text-red-500">{errors?.address?.message as string}</p>
                      </div>

                      <div className="col-span-6 sm:col-span-3">
                        <label
                          htmlFor={schoolForm.email.id}
                          className="block text-sm font-medium text-gray-700">
                          Email address <Required rules={schoolForm.email.rules} />
                        </label>
                        <input
                          type="email"
                          {...register(schoolForm.email.id, schoolForm.email.validate)}
                          id={schoolForm.email.id}
                          autoComplete={schoolForm.email.id}
                          className="mt-1 block w-full rounded-md border border-gray-300 py-2 px-3
                          shadow-sm focus:border-blue-300 focus:outline-none focus:ring-blue-300 sm:text-sm"
                        />
                        <p className="pt-1 text-xs text-red-500">{errors?.email?.message as string}</p>
                      </div>

                      <div className="col-span-6 sm:col-span-3">
                        <label
                          htmlFor={schoolForm.phone.id}
                          className="block text-sm font-medium text-gray-700">
                          Phone <Required rules={schoolForm.phone.rules} />
                        </label>
                        <input
                          type="text"
                          {...register(schoolForm.phone.id, schoolForm.phone.validate)}
                          id={schoolForm.phone.id}
                          autoComplete={schoolForm.phone.id}
                          className="mt-1 block w-full rounded-md border border-gray-300 py-2 px-3
                          shadow-sm focus:border-blue-300 focus:outline-none focus:ring-blue-300 sm:text-sm"
                        />
                        <p className="pt-1 text-xs text-red-500">{errors?.phone?.message as string}</p>
                      </div>

                      <div className="col-span-6">
                        <label
                          htmlFor={schoolForm.website.id}
                          className="block text-sm font-medium text-gray-700">
                          Website <Required rules={schoolForm.website.rules} />
                        </label>
                        <input
                          type="text"
                          {...register(schoolForm.website.id, schoolForm.website.validate)}
                          id={schoolForm.website.id}
                          autoComplete={schoolForm.website.id}
                          className="mt-1 block w-full rounded-md border border-gray-300 py-2 px-3
                          shadow-sm focus:border-blue-300 focus:outline-none focus:ring-blue-300 sm:text-sm"
                        />
                        <p className="pt-1 text-xs text-red-500">{errors?.website?.message as string}</p>
                      </div>

                      <div className="col-span-6 sm:col-span-3">
                        <label
                          htmlFor={schoolForm.principal.id}
                          className="block text-sm font-medium text-gray-700">
                          Principal <Required rules={schoolForm.principal.rules} />
                        </label>
                        <input
                          type="text"
                          {...register(schoolForm.principal.id, schoolForm.principal.validate)}
                          id={schoolForm.principal.id}
                          autoComplete={schoolForm.principal.id}
                          className="mt-1 block w-full rounded-md border border-gray-300 py-2 px-3
                          shadow-sm focus:border-blue-300 focus:outline-none focus:ring-blue-300 sm:text-sm"
                        />
                        <p className="pt-1 text-xs text-red-500">{errors?.principal?.message as string}</p>
                      </div>

                      <div className="col-span-3">
                        <label
                          htmlFor={schoolForm.vice_principal.id}
                          className="block text-sm font-medium text-gray-700">
                          Vice Principal <Required rules={schoolForm.vice_principal.rules} />
                        </label>
                        <input
                          type="text"
                          {...register(schoolForm.vice_principal.id, schoolForm.vice_principal.validate)}
                          id={schoolForm.vice_principal.id}
                          autoComplete={schoolForm.vice_principal.id}
                          className="mt-1 block w-full rounded-md border border-gray-300 py-2 px-3
                          shadow-sm focus:border-blue-300 focus:outline-none focus:ring-blue-300 sm:text-sm"
                        />
                        <p className="pt-1 text-xs text-red-500">{errors?.vice_principal?.message as string}</p>
                      </div>

                      <div className="col-span-6">
                        <label
                          htmlFor="about"
                          className="block text-sm font-medium text-gray-700">
                          About <Required rules={schoolForm.about.rules} />
                        </label>
                        <textarea
                          id="about"
                          {...register(schoolForm.about.id, schoolForm.about.validate)}
                          rows={3}
                          className="mt-2 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-300 focus:ring-blue-300 sm:text-sm"
                          defaultValue={''}
                        />
                        <p className="pt-1 text-xs text-red-500">{errors?.about?.message as string}</p>
                      </div>

                      <div className="col-span-6">
                        <label
                          htmlFor={schoolForm.slogan.id}
                          className="block text-sm font-medium text-gray-700">
                          Slogan <Required rules={schoolForm.slogan.rules} />
                        </label>
                        <textarea
                          id={schoolForm.slogan.id}
                          {...register(schoolForm.slogan.id, schoolForm.slogan.validate)}
                          rows={3}
                          className="mt-2 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-300 focus:ring-blue-300 sm:text-sm"
                          defaultValue={''}
                        />
                        <p className="pt-1 text-xs text-red-500">{errors?.slogan?.message as string}</p>
                      </div>
                    </div>
                  </div>
                  <div className="pt-8 text-right sm:px-6 md:pt-0">
                    <button
                      disabled={formLoading}
                      type="submit"
                      className="inline-flex justify-center rounded-md border border-transparent
                      bg-blue-600 py-2 px-5 text-sm font-semibold text-white shadow-sm hover:bg-blue-700
                        focus:outline-none focus:ring-1 focus:ring-blue-400 focus:ring-offset-2 disabled:bg-blue-200">
                      {formLoading ? (
                        <div className="flex items-center">
                          <Spinner className="mr-3" /> Loading...
                        </div>
                      ) : (
                        'Save'
                      )}
                    </button>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </main>
    </>
  );
};

CreateSchool.getLayout = getLayout;

export default CreateSchool;
