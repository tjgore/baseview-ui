/* eslint-disable max-lines */
import { useState, useEffect, useMemo } from 'react';
import { ChevronRightIcon } from '@heroicons/react/20/solid';
import { ExclamationTriangleIcon } from '@heroicons/react/24/outline';
import PhoneInputWithCountry from 'react-phone-number-input/react-hook-form';
import 'react-phone-number-input/style.css';
import Link from 'next/link';
import { toast } from 'react-toastify';
import { useRouter } from 'next/router';
import { useQuery } from '@tanstack/react-query';
import { useForm, SubmitHandler } from 'react-hook-form';
import { NextPageWithLayout } from '@/pages/_app';
import { isValidationError, getDefaultValues, isUnauthenticatedError } from '@/utils/helpers';
import { getLayout } from '@/components/Layouts/UserLayout';
import { addValidation } from '@/services/Validation';
import { schools } from '@/utils/api';
import { isErrorResponse, isSchoolData, SchoolType } from '@/types/index';
import Spinner from '@/components/Spinner';
import ErrorText from '@/components/Error/Text';
import Required from '@/components/Form/Required';
import Message from '@/components/Toast/Message';
import Modal from '@/components/Modals';
import ScrollContent from '@/components/Modals/ScrollContent';

const schoolFields = {
  name: { rules: 'string|required' },
  address: { rules: 'string|required' },
  email: { rules: 'required|email' },
  phone: { rules: 'string|required' },
  website: { rules: 'string|url|present' },
  about: { rules: 'string|present' },
  slogan: { rules: 'string|present' },
  principal: { rules: 'required|string' },
  vice_principal: { rules: 'string|present' },
};

const schoolForm = addValidation(schoolFields);

const CreateSchool: NextPageWithLayout = () => {
  const router = useRouter();
  const { id: schoolId } = router.query;
  const [showError, setError] = useState(false);
  const [formLoading, setFormLoading] = useState(false);
  const [deleteLoading, setDeleteLoading] = useState(false);
  const [open, setOpen] = useState(false);
  const { data, error: editError, refetch } = useQuery(['school', schoolId], () => schools.findById(schoolId), { enabled: !!schoolId });
  const school = useMemo(() => (isSchoolData(data) ? getDefaultValues(data) : {}), [data]);
  const pageTitle = schoolId ? 'Edit' : 'Create';

  const {
    register,
    handleSubmit,
    reset,
    control,
    formState: { errors },
  } = useForm<SchoolType>();

  useEffect(() => {
    const defaultValues = school;
    reset(defaultValues);
  }, [school, reset]);

  /**
   * @TODO update this to use an Alert instead
   */
  useEffect(() => {
    if (editError && isErrorResponse(editError) && !isUnauthenticatedError(editError)) {
      toast.error(
        <Message
          title="Error"
          body="Failed to get the school details for editing. Try reloading the page"
        />,
      );
    }
  }, [editError]);

  const onSubmit: SubmitHandler<SchoolType> = async data => {
    setError(false);
    setFormLoading(true);
    try {
      if (isSchoolData(data)) {
        await createOrUpdate(data);
      }
    } catch (err) {
      if (isErrorResponse(err) && isValidationError(err)) {
        setError(true);
      }
      toast.error(
        <Message
          title="Error"
          body="Ooops, looks like something went wrong. Try again"
        />,
      );
    }
    setFormLoading(false);
  };

  const createOrUpdate = async (data: SchoolType) => {
    if (schoolId) {
      await schools.edit(schoolId, data);
      toast.success(
        <Message
          title="Success"
          body="School has been updated."
        />,
      );
      refetch();
    } else {
      await schools.create(data);
      toast.success(
        <Message
          title="Success"
          body="School has been created."
        />,
      );
      reset();
      router.push('/schools');
    }
  };

  const deleteSchool = async () => {
    setDeleteLoading(true);
    try {
      await schools.delete(schoolId);
      toast.error(
        <Message
          title="Deletion"
          body="School has been deleted."
        />,
      );
      router.push('/schools');
    } catch (err) {
      toast.error(
        <Message
          title="Error"
          body="Ooops, looks like something went wrong. Try again"
        />,
      );
    }
    setDeleteLoading(false);
  };

  return (
    <>
      <header className="bg-white shadow-sm">
        <div className="mx-auto max-w-7xl p-5 py-4 sm:px-6 lg:px-8">
          <div>
            <div>
              <nav
                className="flex"
                aria-label="Breadcrumb">
                <ol
                  role="list"
                  className="flex flex-wrap items-center space-x-2 lg:flex-nowrap">
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
                        <a className="ml-2 text-sm font-medium text-gray-500 hover:text-gray-700">{pageTitle} School</a>
                      </Link>
                    </div>
                  </li>
                </ol>
              </nav>
            </div>
            <div className="mt-1 md:flex md:items-center md:justify-between">
              <div className="min-w-0 flex-1">
                <h2 className="text-2xl font-semibold leading-7 text-gray-900 sm:truncate sm:tracking-tight">
                  {pageTitle} {school.name ?? 'School'}
                </h2>
              </div>
              <div className="mt-4 flex md:mt-0 md:ml-4">
                {schoolId && (
                  <>
                    <button
                      type="button"
                      onClick={() => setOpen(true)}
                      className="inline-flex items-center rounded-md border border-transparent bg-red-600 px-4 py-2 text-sm
                  font-medium text-white shadow-sm hover:bg-red-700 focus:outline-none focus:ring-1 focus:ring-red-500 focus:ring-offset-2">
                      Delete School
                    </button>
                    <Modal
                      open={open}
                      setOpen={(state: boolean) => setOpen(state)}
                      title="Delete School"
                      body={`Are you sure you want to delete ${school.name}? All of your school data will be removed.`}
                      icon={
                        <ExclamationTriangleIcon
                          className="h-6 w-6 text-red-600"
                          aria-hidden="true"
                        />
                      }
                      button={
                        <button
                          type="button"
                          className="inline-flex w-full items-center justify-center rounded-md border border-transparent
                    bg-red-600 px-4 py-1 text-sm font-semibold text-white shadow-sm hover:bg-red-700 
                    focus:outline-none focus:ring-1 focus:ring-red-500 focus:ring-offset-2 sm:ml-3 sm:w-auto sm:text-sm"
                          onClick={deleteSchool}>
                          {deleteLoading ? (
                            <div className="flex items-center">
                              <Spinner className="mr-3" /> Loading...
                            </div>
                          ) : (
                            'Yes, Delete'
                          )}
                        </button>
                      }>
                      <ScrollContent
                        title="Add New School"
                        setOpen={(state: boolean) => setOpen(state)}
                        body={`Are you sure you want to delete ${school.name}? All of your school data will be removed.`}
                        button={
                          <button
                            type="button"
                            className="inline-flex w-full items-center justify-center rounded-md border border-transparent
                                    bg-red-600 px-4 py-1 text-sm font-semibold text-white shadow-sm hover:bg-red-700
                                    focus:outline-none focus:ring-1 focus:ring-red-500 focus:ring-offset-2 sm:ml-3 sm:w-auto sm:text-sm">
                            Save
                          </button>
                        }
                      />
                    </Modal>
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
      </header>
      <main>
        <div className="mx-auto max-w-7xl pb-5 sm:px-6 lg:px-8">
          <div className="max-w-7xl px-0 py-3 pt-10">
            <div className="mb-5 rounded-lg border bg-white px-6 pt-5 shadow-sm sm:px-12 sm:pb-10 ">
              <form
                noValidate
                onSubmit={handleSubmit(onSubmit)}>
                <div className="sm:overflow-hidden">
                  <div className="space-y-6 p-1">
                    <div>
                      <h3 className="text-xl font-medium leading-6 text-gray-900">School Information</h3>
                      <p className="mt-1 text-xs text-gray-500">Provide details and information for other users needs.</p>
                      <div className="flex pt-2 text-red-500">{showError && <ErrorText text="An error occurred. Try again." />}</div>
                    </div>

                    <div className="grid grid-cols-6 gap-x-10 gap-y-5">
                      <div className="col-span-3">
                        <label
                          htmlFor={schoolForm.name.id}
                          className="block font-semibold text-gray-800">
                          School name <Required rules={schoolForm.name.rules} />
                        </label>
                        <input
                          type="text"
                          {...register(schoolForm.name.id, schoolForm.name.validate)}
                          id={schoolForm.name.id}
                          autoComplete={schoolForm.name.id}
                          className="mt-1 block w-full rounded-md border border-gray-300 py-2 px-3 shadow-sm
                          focus:border-blue-300 focus:outline-none focus:ring-blue-300 sm:text-sm"
                        />
                        <p className="pt-1 text-xs text-red-500">{errors?.name?.message as string}</p>
                      </div>
                      <div className="col-span-3">
                        <label
                          htmlFor={schoolForm.address.id}
                          className="block font-semibold text-gray-800">
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

                      <div className="col-span-3">
                        <label
                          htmlFor={schoolForm.email.id}
                          className="block font-semibold text-gray-800">
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

                      <div className="col-span-3">
                        <label
                          htmlFor={schoolForm.phone.id}
                          className="block font-semibold text-gray-800">
                          Phone <Required rules={schoolForm.phone.rules} />
                        </label>
                        <PhoneInputWithCountry
                          name={schoolForm.phone.id}
                          id={schoolForm.phone.id}
                          /** @ts-ignore: Library types issue  */
                          control={control}
                          rules={schoolForm.phone.validate}
                          className=""
                          defaultCountry="AG"
                        />
                        <p className="pt-1 text-xs text-red-500">{errors?.phone?.message as string}</p>
                      </div>

                      <div className="col-span-3">
                        <label
                          htmlFor={schoolForm.website.id}
                          className="block font-semibold text-gray-800">
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

                      <div className="col-span-3">
                        <label
                          htmlFor={schoolForm.principal.id}
                          className="block font-semibold text-gray-800">
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
                          className="block font-semibold text-gray-800">
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
                          className="block font-semibold text-gray-800">
                          About <Required rules={schoolForm.about.rules} />
                        </label>
                        <textarea
                          id="about"
                          {...register(schoolForm.about.id, schoolForm.about.validate)}
                          rows={4}
                          className="mt-2 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-300 focus:ring-blue-300 sm:text-sm"
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
                        />
                        <p className="pt-1 text-xs text-red-500">{errors?.slogan?.message as string}</p>
                      </div>
                    </div>
                  </div>
                  <div className="pt-8 pb-3 pr-2 text-right">
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
                        'Save Changes'
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
