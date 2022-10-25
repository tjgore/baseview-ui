import { useMutation } from '@tanstack/react-query';
import { useForm, SubmitHandler, Controller } from 'react-hook-form';
import { toast } from 'react-toastify';
import { useRouter } from 'next/router';
import PhoneInputWithCountry from 'react-phone-number-input/react-hook-form';
import 'react-phone-number-input/style.css';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import ReactSelect from '@/components/Form/Select';
import { NextPageWithLayout } from '@/pages/_app';
import { getLayout } from '@/components/Layouts/UserLayout';
import useAuth from '@/hooks/useAuth';
import PageHeader from '@/components/PageHeader';
import { accounts as accountsApi } from '@/utils/api';
import { AccountFormType, AccountCreatedType, isAccountCreatedData } from '@/types/accounts';
import Button from '@/components/Button';
import { profileFields, genderOptions, roleOptions } from '@/utils/constants/forms';
import { addValidation, validateField } from '@/services/Validation';
import Required from '@/components/Form/Required';
import Message from '@/components/Toast/Message';
import HelpText from '@/components/Form/HelpText';
import { getDatePickerDate } from '@/utils/helpers';
import LoadingContent from '@/components/Button/LoadingContent';

const profileForm = addValidation({
  ...profileFields,
  roles: { rules: 'required|array' },
});

const ViewAccount: NextPageWithLayout = () => {
  useAuth({ middleware: 'auth' });
  const router = useRouter();
  const { id: schoolId } = router.query;

  const {
    register,
    handleSubmit,
    control,
    reset,
    formState: { errors },
  } = useForm<AccountFormType>();

  const createAccount = useMutation(
    (data: AccountFormType) => {
      return accountsApi.create(schoolId as string, data);
    },
    {
      onSuccess: data => {
        const createdResponse: AccountCreatedType | null = isAccountCreatedData(data) ? data : null;
        toast.success(
          <Message
            title="Success"
            body="Account has been created!"
          />,
        );
        router.push(`/schools/${schoolId}/accounts/${createdResponse?.id}`);
      },
      onError: () => {
        toast.error(
          <Message
            title="Error"
            body="An error occurred. Try again."
          />,
        );
      },
    },
  );

  const onSubmit: SubmitHandler<AccountFormType> = data => {
    createAccount.mutate(data);
  };

  return (
    <main className="mx-auto max-w-4xl">
      <PageHeader title="Create Account" />
      <div className="mx-auto max-w-4xl pb-32 sm:px-6 lg:px-8">
        <div className="px-4 pb-3 sm:px-0">
          <div className="flex h-10 items-center" />
          <form
            onSubmit={handleSubmit(onSubmit)}
            noValidate>
            <div className="mb-8 rounded-lg border bg-white shadow-sm">
              <div className="flex items-center justify-between border-b px-5 pt-5 pb-3 sm:px-10">
                <div>
                  <h3 className="text-xl font-medium leading-6 text-gray-900">Personal Information</h3>
                  <p className="mt-1 text-xs text-gray-500">Details about the user.</p>
                </div>
              </div>
              <div className="px-5 py-6 sm:px-10">
                <div className="grid grid-cols-6 items-start gap-y-6 gap-x-10 pb-8">
                  <div className="col-span-6 sm:col-span-3">
                    <label
                      htmlFor={profileForm.first_name.id}
                      className="block font-semibold text-gray-800">
                      First name <Required rules={profileForm.first_name.rules} />
                    </label>
                    <input
                      type="text"
                      {...register(profileForm.first_name.id, profileForm.first_name.validate)}
                      id={profileForm.first_name.id}
                      autoComplete={profileForm.first_name.id}
                      className="mt-1 block w-full rounded-md border border-gray-300 py-2 px-3 shadow-sm
                    focus:border-blue-300 focus:outline-none focus:ring-blue-300 sm:text-sm"
                    />
                    <HelpText errorMessages={errors?.first_name?.message as string} />
                  </div>

                  <div className="col-span-6 sm:col-span-3">
                    <label
                      htmlFor={profileForm.last_name.id}
                      className="block font-semibold text-gray-800">
                      Last name <Required rules={profileForm.last_name.rules} />
                    </label>
                    <input
                      type="text"
                      {...register(profileForm.last_name.id, profileForm.last_name.validate)}
                      id={profileForm.last_name.id}
                      autoComplete={profileForm.last_name.id}
                      className="mt-1 block w-full rounded-md border border-gray-300 py-2 px-3 shadow-sm
                    focus:border-blue-300 focus:outline-none focus:ring-blue-300 sm:text-sm"
                    />
                    <HelpText errorMessages={errors?.last_name?.message as string} />
                  </div>

                  <div className="col-span-6 sm:col-span-3">
                    <label
                      htmlFor={profileForm.preferred_name.id}
                      className="block font-semibold text-gray-800">
                      Preferred name <Required rules={profileForm.first_name.rules} />
                    </label>
                    <input
                      type="text"
                      id={profileForm.preferred_name.id}
                      autoComplete={profileForm.preferred_name.id}
                      {...register(profileForm.preferred_name.id, profileForm.preferred_name.validate)}
                      className="mt-1 block w-full max-w-lg rounded-md border border-gray-300 py-2 px-3
                  shadow-sm focus:border-blue-300 focus:outline-none focus:ring-blue-300 sm:text-sm"
                    />
                    <HelpText
                      helpText="This is the name you prefer to be called by. If none, type your full name."
                      errorMessages={errors?.preferred_name?.message as string}
                    />
                  </div>

                  <div className="col-span-6 sm:col-span-3">
                    <label
                      htmlFor={profileForm.email.id}
                      className="block font-semibold text-gray-800">
                      Email <Required rules={profileForm.email.rules} />
                    </label>
                    <input
                      type="email"
                      id={profileForm.email.id}
                      autoComplete={profileForm.email.id}
                      {...register(profileForm.email.id, profileForm.email.validate)}
                      className="mt-1 block w-full max-w-lg rounded-md border border-gray-300 py-2 px-3
                  shadow-sm focus:border-blue-300 focus:outline-none focus:ring-blue-300 sm:text-sm"
                    />
                    <HelpText errorMessages={errors?.email?.message as string} />
                  </div>

                  <div className="col-span-6 sm:col-span-3">
                    <label
                      htmlFor={profileForm.gender.id}
                      className="block font-semibold text-gray-800">
                      Gender <Required rules={profileForm.gender.rules} />
                    </label>

                    <ReactSelect
                      id={profileForm.gender.id}
                      name={profileForm.gender.id}
                      placeholder=""
                      control={control}
                      rules={profileForm.gender.validate}
                      options={genderOptions}
                    />
                    <HelpText errorMessages={errors?.gender?.message as string} />
                  </div>

                  <div className="col-span-6 sm:col-span-3">
                    <label
                      htmlFor={profileForm.dob.id}
                      className="block font-semibold text-gray-800">
                      DOB <Required rules={profileForm.dob.rules} />
                    </label>

                    <Controller
                      name={profileForm.dob.id}
                      control={control}
                      rules={profileForm.dob.validate}
                      render={({ field }) => {
                        return (
                          <DatePicker
                            id={profileForm.dob.id}
                            dateFormat="MMMM d, yyyy"
                            selected={getDatePickerDate(field.value)}
                            onChange={(date: Date) => {
                              field.onChange(date.toISOString().substring(0, 10));
                            }}
                            showYearDropdown
                            className="mt-1 block w-full max-w-lg rounded-md border border-gray-300 py-2 px-3
                  shadow-sm focus:border-blue-300 focus:outline-none focus:ring-blue-300 sm:text-sm"
                          />
                        );
                      }}
                    />
                    <HelpText errorMessages={errors?.dob?.message as string} />
                  </div>

                  <div className="col-span-6 sm:col-span-3">
                    <label
                      htmlFor={profileForm.mobile.id}
                      className="block font-semibold text-gray-800">
                      Mobile <Required rules={profileForm.mobile.rules} />
                    </label>

                    <PhoneInputWithCountry
                      name={profileForm.mobile.id}
                      id={profileForm.mobile.id}
                      /** @ts-ignore: Library types issue */
                      control={control}
                      rules={profileForm.mobile.validate}
                      className=""
                      defaultCountry="AG"
                    />
                    <HelpText errorMessages={errors?.mobile?.message as string} />
                  </div>

                  <div className="col-span-6 sm:col-span-3">
                    <label
                      htmlFor={profileForm.address.id}
                      className="block font-semibold text-gray-800">
                      Address <Required rules={profileForm.address.rules} />
                    </label>

                    <input
                      type="text"
                      id={profileForm.address.id}
                      autoComplete={profileForm.address.id}
                      {...register(profileForm.address.id, profileForm.address.validate)}
                      className="mt-1 block w-full max-w-lg rounded-md border border-gray-300 py-2 px-3
                  shadow-sm focus:border-blue-300 focus:outline-none focus:ring-blue-300 sm:text-sm"
                    />
                    <HelpText errorMessages={errors?.address?.message as string} />
                  </div>
                </div>
              </div>
            </div>

            <div className="mb-8 rounded-lg border bg-white shadow-sm">
              <div className="flex items-center justify-between border-b px-5 pt-5 pb-3 sm:px-10">
                <div>
                  <h3 className="text-xl font-medium leading-6 text-gray-900">Permissions</h3>
                  <p className="mt-1 text-xs text-gray-500">A users access information</p>
                </div>
              </div>
              <div className="px-5 py-6 sm:px-10">
                <div className="grid grid-cols-6 gap-6">
                  <div className="col-span-6 sm:col-span-6">
                    <label
                      htmlFor="roles"
                      className="block font-semibold text-gray-800">
                      Roles <Required rules="required" />
                    </label>

                    <ReactSelect
                      id="roles"
                      name="roles"
                      placeholder=""
                      control={control}
                      rules={{ validate: value => validateField({ roles: value }, { roles: 'required|array' }) }}
                      isMulti={true}
                      options={roleOptions}
                    />
                    <HelpText errorMessages={errors?.roles?.message as string} />
                  </div>
                </div>
              </div>
            </div>
            <div className="flex items-center justify-end">
              <Button
                type="submit"
                disabled={createAccount.isLoading}
                className="mr-2">
                <LoadingContent
                  loading={createAccount.isLoading}
                  text="Create Account"
                />
              </Button>
              <Button
                text="Cancel"
                color="secondary"
                onClick={() => reset({})}
              />
            </div>
          </form>
        </div>
      </div>
    </main>
  );
};

ViewAccount.getLayout = getLayout;

export default ViewAccount;
