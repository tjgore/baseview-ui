import { useState, useEffect } from 'react';
import { ExclamationTriangleIcon } from '@heroicons/react/24/outline';
import PhoneInputWithCountry from 'react-phone-number-input/react-hook-form';
import 'react-phone-number-input/style.css';
import { toast } from 'react-toastify';
import { useRouter } from 'next/router';
import { useForm, SubmitHandler } from 'react-hook-form';
import { NextPageWithLayout } from '@/pages/_app';
import { isValidationError } from '@/utils/helpers';
import { getLayout } from '@/components/Layouts/UserLayout';
import { addValidation } from '@/services/Validation';
import { isErrorResponse } from '@/types/index';
import { isSchoolData, SchoolType } from '@/types/schools';
import ErrorText from '@/components/Error/Text';
import Required from '@/components/Form/Required';
import Message from '@/components/Toast/Message';
import Modal from '@/components/Modals';
import { schoolFields } from '@/utils/constants/forms';
import LoadingContent from '@/components/Button/LoadingContent';
import QueryStatus from '@/components/QueryStatus';
import useSchool from '@/hooks/useSchool';
import useAuth from '@/hooks/useAuth';
import PageHeader from '@/components/PageHeader';
import Button from '@/components/Button';

const schoolForm = addValidation(schoolFields);

const CreateSchool: NextPageWithLayout = () => {
  useAuth({ middleware: 'auth' });

  const router = useRouter();
  const { id: schoolId } = router.query;
  const [showError, setError] = useState(false);
  const [open, setOpen] = useState(false);
  const { school, schoolQuery, createSchool, editSchool, deleteSchool } = useSchool({ schoolId });
  const { refetch } = schoolQuery;
  const pageTitle = schoolId ? `Edit ${school?.name}` : 'Create School';

  const {
    register,
    handleSubmit,
    reset,
    control,
    formState: { errors },
  } = useForm<SchoolType>();

  useEffect(() => {
    reset(school ?? {});
  }, [school, reset]);

  const onSubmit: SubmitHandler<SchoolType> = data => {
    setError(false);
    try {
      if (isSchoolData(data)) {
        createOrUpdate(data);
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
  };

  const createOrUpdate = (data: SchoolType) => {
    if (schoolId) {
      editSchool.mutate(data, {
        onSuccess: () => {
          toast.success(
            <Message
              title="Success"
              body="School has been updated."
            />,
          );
          refetch();
        },
      });
    } else {
      createSchool.mutate(data, {
        onSuccess: () => {
          toast.success(
            <Message
              title="Success"
              body="School has been created."
            />,
          );
          router.push('/schools');
        },
      });
    }
  };

  // Delete
  useEffect(() => {
    if (deleteSchool.isSuccess) {
      toast.error(
        <Message
          title="Deletion"
          body="School has been deleted."
        />,
      );
      router.push('/schools');
    }
    if (deleteSchool.isError) {
      toast.error(
        <Message
          title="Error"
          body="Ooops, looks like something went wrong. Try again"
        />,
      );
    }
  }, [deleteSchool.isSuccess, deleteSchool.isError, router]);

  const formLoading = createSchool.isLoading || editSchool.isLoading;

  return (
    <main>
      <PageHeader
        title={pageTitle}
        actions={
          schoolId && (
            <>
              <Button
                text="Delete School"
                onClick={() => setOpen(true)}
                color="danger"
              />
              <Modal
                open={open}
                setOpen={(state: boolean) => setOpen(state)}
                title="Delete School"
                body={`Are you sure you want to delete ${school?.name}? All of your school data will be removed.`}
                icon={
                  <ExclamationTriangleIcon
                    className="h-6 w-6 text-red-600"
                    aria-hidden="true"
                  />
                }
                button={
                  <Button
                    className="ml-3"
                    disabled={deleteSchool.isLoading}
                    color="danger"
                    onClick={() => deleteSchool.mutate()}>
                    <LoadingContent
                      loading={deleteSchool.isLoading}
                      text="Yes, delete"
                    />
                  </Button>
                }
              />
            </>
          )
        }
      />
      <div className="mx-auto max-w-7xl pb-5 sm:px-6 lg:px-8">
        <div className="pb-3">
          <div className="flex h-10 items-center">
            {schoolId && (
              <QueryStatus
                isLoading={schoolQuery.isLoading}
                isFetching={schoolQuery.isFetching}
                error={schoolQuery.error}
              />
            )}
          </div>
          {schoolId && schoolQuery.isLoading ? null : (
            <div className="mb-5 rounded-lg border bg-white shadow-sm">
              <div className="border-b px-10 pt-5 pb-3">
                <h3 className="text-xl font-medium leading-6 text-gray-900">School Information</h3>
                <p className="mt-1 text-xs text-gray-500">Provide details and information for other users needs.</p>
                <div className="flex pt-2 text-red-500">{showError && <ErrorText text="An error occurred. Try again." />}</div>
              </div>
              <form
                noValidate
                onSubmit={handleSubmit(onSubmit)}>
                <div className="p-10 sm:overflow-hidden">
                  <div>
                    <div className="grid grid-cols-6 gap-x-10 gap-y-5">
                      <div className="col-span-6 sm:col-span-3">
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
                      <div className="col-span-6 sm:col-span-3">
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

                      <div className="col-span-6 sm:col-span-3">
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

                      <div className="col-span-6 sm:col-span-3">
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

                      <div className="col-span-6 sm:col-span-3">
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

                      <div className="col-span-6 sm:col-span-3">
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

                      <div className="col-span-6 sm:col-span-3">
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
                        focus:outline-none focus:ring-1 focus:ring-blue-400 focus:ring-offset-2 disabled:cursor-not-allowed disabled:bg-blue-200">
                      <LoadingContent
                        loading={formLoading}
                        text="Save Changes"
                      />
                    </button>
                  </div>
                </div>
              </form>
            </div>
          )}
        </div>
      </div>
    </main>
  );
};

CreateSchool.getLayout = getLayout;

export default CreateSchool;
