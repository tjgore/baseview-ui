import { useEffect } from 'react';
import Avatar from 'boring-avatars';
import { useQuery, useMutation } from '@tanstack/react-query';
import { EnvelopeOpenIcon, PhoneIcon } from '@heroicons/react/24/solid';
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
import QueryStatus from '@/components/QueryStatus';
import { AccountDataType, isAccountData } from '@/types/accounts';
import Button from '@/components/Button';
import { profileFields, genderOptions } from '@/utils/constants/forms';
import { addValidation } from '@/services/Validation';
import Required from '@/components/Form/Required';
import Message from '@/components/Toast/Message';
import { ProfileFormType } from '@/types/profiles';
import HelpText from '@/components/Form/HelpText';
import { getDatePickerDate } from '@/utils/helpers';
import LoadingContent from '@/components/Button/LoadingContent';
import RolesForm from '@/components/Form/RolesForm';

const profileForm = addValidation(profileFields);

const ViewAccount: NextPageWithLayout = () => {
  useAuth({ middleware: 'auth' });
  const router = useRouter();
  const { id: schoolId, userId, edit } = router.query;
  const accountQuery = useQuery(['account-profile', userId], () => accountsApi.find(schoolId as string, userId as string));

  const account: AccountDataType | null = isAccountData(accountQuery.data) ? accountQuery.data : null;

  const {
    register,
    handleSubmit,
    reset,
    control,
    formState: { errors },
  } = useForm<ProfileFormType>();

  useEffect(() => {
    reset(
      account
        ? {
            first_name: account.first_name,
            last_name: account.last_name,
            email: account.email,
            preferred_name: account.preferred_name,
            gender: account.gender,
            dob: account.dob,
            mobile: account.mobile,
            address: account.address,
          }
        : {},
    );
  }, [account, reset]);

  const editAccountProfile = useMutation(
    (data: ProfileFormType) => {
      return accountsApi.updateProfile(schoolId as string, `${account?.profile_id}`, data);
    },
    {
      onSuccess: () => {
        toast.success(
          <Message
            title="Success"
            body="Profile has been updated."
          />,
        );
        accountQuery.refetch();
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

  const onSubmit: SubmitHandler<ProfileFormType> = data => {
    editAccountProfile.mutate(data);
  };

  const editMode = {
    profile: edit === 'profile',
    permission: edit === 'permissions',
  };

  return (
    <main className="mx-auto max-w-4xl">
      <PageHeader title="View Account" />
      <div className="mx-auto max-w-4xl pb-32 sm:px-6 lg:px-8">
        <div className="px-4 pb-3 sm:px-0">
          <div className="flex h-10 items-center">
            <QueryStatus
              isLoading={accountQuery.isLoading}
              isFetching={accountQuery.isFetching}
              error={accountQuery.error}
            />
          </div>
          {account && !accountQuery.isLoading && (
            <>
              <div className="mb-8 rounded-lg bg-white px-5 pt-8 pb-5 shadow-sm ">
                <div className="flex flex-col sm:flex-row">
                  <div className="mr-8 mb-5 flex h-[7rem] w-[7rem] items-center justify-center overflow-hidden rounded-full bg-blue-600">
                    <Avatar
                      size={124}
                      name={account.full_name}
                      variant="beam"
                      colors={['#2563eb', '#4f46e5', '#0f172a']}
                    />
                  </div>
                  <div>
                    <div className="flex flex-wrap items-center text-lg font-semibold leading-6 text-gray-900">
                      <p className="mr-3 mb-1 text-2xl font-bold sm:mb-0">{account.full_name}</p>
                      {account.roles.nice_name.map(niceName => (
                        <div
                          key={niceName}
                          className="mt-1 mr-1 flex h-5 items-center justify-center rounded-lg bg-green-100 px-2 text-xs text-green-600">
                          {niceName}
                        </div>
                      ))}
                    </div>

                    <div className="flex w-full flex-wrap items-center pt-1">
                      <div className="mr-4 mb-1 flex items-center text-gray-500">
                        <EnvelopeOpenIcon className="mr-2 h-4 w-4 text-gray-400" />
                        <p>{account.email}</p>
                      </div>
                      <div className="mb-1 flex items-center pr-4 text-gray-500">
                        <PhoneIcon className="mr-2 h-4 w-4 text-gray-400" />
                        {account.mobile}
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {editMode.profile ? (
                <form
                  onSubmit={handleSubmit(onSubmit)}
                  noValidate
                  className="mb-8 rounded-lg border bg-white shadow-sm">
                  <div className="flex items-center justify-between border-b px-5 pt-5 pb-3 sm:px-10">
                    <div>
                      <h3 className="text-xl font-medium leading-6 text-gray-900">Personal Information</h3>
                      <p className="mt-1 text-xs text-gray-500">Details about the user.</p>
                    </div>
                    <div className="flex items-center">
                      <Button
                        type="submit"
                        disabled={editAccountProfile.isLoading}
                        className="mr-2">
                        <LoadingContent
                          loading={editAccountProfile.isLoading}
                          text="Save"
                        />
                      </Button>
                      <Button
                        text="Done"
                        color="secondary"
                        onClick={() => router.push(`/schools/[id]/accounts/[userId]`, `/schools/${schoolId}/accounts/${userId}`, { scroll: false })}
                      />
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
                </form>
              ) : (
                <form className="mb-8 rounded-lg border bg-white shadow-sm">
                  <div className="flex items-center justify-between border-b px-5 pt-5 pb-3 sm:px-10">
                    <div>
                      <h3 className="text-xl font-medium leading-6 text-gray-900">Personal Information</h3>
                      <p className="mt-1 text-xs text-gray-500">Details about the user.</p>
                    </div>
                    <div>
                      <Button
                        text="Edit Profile"
                        color="secondary"
                        onClick={() => router.push(`/schools/[id]/accounts/[userId]?edit=profile`, `/schools/${schoolId}/accounts/${userId}?edit=profile`, { scroll: false })}
                      />
                    </div>
                  </div>
                  <div className="px-5 py-6 sm:px-10">
                    <div className="grid grid-cols-6 gap-6 pb-8">
                      <div className="col-span-6 sm:col-span-3">
                        <dt className="block font-semibold text-gray-800">First name</dt>
                        <dd>{account.first_name}</dd>
                      </div>

                      <div className="col-span-6 sm:col-span-3">
                        <dt className="block font-semibold text-gray-800">Last name</dt>
                        <dd>{account.last_name}</dd>
                      </div>

                      <div className="col-span-6 sm:col-span-3">
                        <dt className="block font-semibold text-gray-800">Preferred Name</dt>
                        <dd>{account.preferred_name}</dd>
                      </div>

                      <div className="col-span-6 sm:col-span-3">
                        <dt className="block font-semibold text-gray-800">Email Address</dt>
                        <dd>{account.email}</dd>
                      </div>

                      <div className="col-span-6 sm:col-span-3">
                        <dt className="block font-semibold text-gray-800">Gender</dt>
                        <dd>{account.gender}</dd>
                      </div>

                      <div className="col-span-6 sm:col-span-3">
                        <dt className="block font-semibold text-gray-800">DOB</dt>
                        <dd>{account.dob}</dd>
                      </div>

                      <div className="col-span-6 sm:col-span-3">
                        <dt className="block font-semibold text-gray-800">Mobile</dt>
                        <dd>{account.mobile}</dd>
                      </div>

                      <div className="col-span-6 sm:col-span-3">
                        <dt className="block font-semibold text-gray-800">Address</dt>
                        <dd>{account.address}</dd>
                      </div>
                    </div>
                  </div>
                </form>
              )}
              {editMode.permission ? (
                <RolesForm roles={account?.roles.ids} />
              ) : (
                <div className="mb-8 rounded-lg border bg-white shadow-sm">
                  <div className="flex items-center justify-between border-b px-5 pt-5 pb-3 sm:px-10">
                    <div>
                      <h3 className="text-xl font-medium leading-6 text-gray-900">Permissions</h3>
                      <p className="mt-1 text-xs text-gray-500">A users access information</p>
                    </div>
                    <div>
                      <Button
                        text="Edit"
                        color="secondary"
                        onClick={() =>
                          router.push(`/schools/[id]/accounts/[userId]?edit=permissions`, `/schools/${schoolId}/accounts/${userId}?edit=permissions`, { scroll: false })
                        }
                      />
                    </div>
                  </div>
                  <div className="px-5 py-6 sm:px-10">
                    <div className="grid grid-cols-6 gap-6">
                      <div className="col-span-6 sm:col-span-3">
                        <dt className="block font-semibold text-gray-800">Roles</dt>
                        <dd className="flex items-center">
                          {account.roles.nice_name.map(niceName => (
                            <div
                              key={niceName}
                              className="mt-1 mr-1 flex h-5 items-center justify-center rounded-lg bg-green-100 px-2 text-xs text-green-600">
                              {niceName}
                            </div>
                          ))}
                        </dd>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </main>
  );
};

ViewAccount.getLayout = getLayout;

export default ViewAccount;
