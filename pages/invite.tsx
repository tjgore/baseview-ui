/* eslint-disable max-lines */
import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { toast } from 'react-toastify';
import { isEmpty } from 'lodash';
import { CheckCircleIcon, ExclamationCircleIcon } from '@heroicons/react/20/solid';
import { useForm, SubmitHandler, Controller } from 'react-hook-form';
import { useQuery, useMutation } from '@tanstack/react-query';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import PhoneInputWithCountry from 'react-phone-number-input/react-hook-form';
import 'react-phone-number-input/style.css';
import { NextPageWithLayout } from '@/pages/_app';
import { getLayout } from '@/components/Layouts/FullPageLayout';
import useAuth from '@/hooks/useAuth';
import { auth, invites as invitesApi, profiles as profilesApi } from '@/utils/api';
import PageLoading from '@/components/Loading/Page';
import { profileFields, genderOptions } from '@/utils/constants/forms';
import { addValidation } from '@/services/Validation';
import { InviteDataType, isInviteData, InvitationFormType } from '@/types/invites';
import Required from '@/components/Form/Required';
import ReactSelect from '@/components/Form/Select';
import HelpText from '@/components/Form/HelpText';
import LoadingContent from '@/components/Button/LoadingContent';
import { getDatePickerDate } from '@/utils/helpers';
import Message from '@/components/Toast/Message';

const invitationFields = {
  password: { rules: 'required|alpha_num|min:8' },
  password_confirmation: { rules: 'required|alpha_num|min:8' },
  ...profileFields,
  last_name: { rules: 'required|string' },
};

const invitationForm = addValidation(invitationFields);

const Invite: NextPageWithLayout = () => {
  useAuth({ middleware: 'guest' });
  const [passwordMatch, setPasswordMatch] = useState<boolean | null>(null);
  const router = useRouter();
  const token = typeof router.query.token === 'string' ? router.query.token : '';

  const { data, isLoading, error } = useQuery(['invite', token], () => invitesApi.findByToken(token), { enabled: !!token });

  const invite: InviteDataType | null = isInviteData(data) ? data : null;

  const {
    register,
    handleSubmit,
    reset,
    watch,
    control,
    formState: { errors },
  } = useForm<InvitationFormType>();

  // Set form defaults value to invite data
  useEffect(() => {
    if (invite) {
      reset({
        email: invite.email,
        first_name: invite.first_name,
        last_name: invite.last_name ?? '',
      });
    }
  }, [invite, reset]);

  const passwords = watch(['password', 'password_confirmation']);

  useEffect(() => {
    const passwordsEqual = passwords[0] === passwords[1];
    if (!isEmpty(passwords[0]) && passwordsEqual) {
      setPasswordMatch(true);
    } else if (!isEmpty(passwords[0]) && !passwordsEqual) {
      setPasswordMatch(false);
    }
    if (isEmpty(passwords[0])) {
      setPasswordMatch(null);
    }
  }, [passwords]);

  const onSubmit: SubmitHandler<InvitationFormType> = data => {
    const { first_name, last_name, email, password, password_confirmation, preferred_name, dob, gender, mobile, address } = data;
    const { value: genderValue } = gender;

    createAccount.mutate(
      {
        invite_id: invite?.id,
        first_name,
        last_name,
        email,
        password,
        password_confirmation,
      },
      {
        onSuccess: () => {
          createProfile.mutate({
            preferred_name,
            dob,
            gender: genderValue,
            mobile,
            address,
          });
        },
      },
    );
  };

  const createAccount = useMutation(
    (data: { invite_id: number | undefined; first_name: string; last_name: string; email: string; password: string; password_confirmation: string }) => {
      return auth.register(data);
    },
  );

  const createProfile = useMutation(
    (data: { preferred_name: string; dob: string; gender: string; mobile: string | null | undefined; address: string }) => {
      return profilesApi.create(data);
    },
    {
      onSuccess: () => {
        toast.success(
          <Message
            title="Success"
            body="Your account has been created."
          />,
        );
        router.push('/login');
      },
    },
  );

  useEffect(() => {
    if (createProfile.isError || createAccount.isError) {
      toast.error(
        <Message
          title="Error"
          body="An error occurred. Try again or reload the page."
        />,
      );
    }
  }, [createProfile.isError, createAccount.isError]);

  const submitting = createProfile.isLoading || createAccount.isLoading;

  if (isLoading) {
    return <PageLoading dark />;
  }

  return (
    <div className="pt-20 pb-14">
      <div className="mb-4 flex items-center justify-center">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="currentColor"
          className="mr-2 h-8 w-8 text-blue-600">
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
      <h1 className="mb-8 text-center text-3xl font-semibold text-gray-900">User Invitation</h1>
      {error || isEmpty(invite) ? (
        <div className="rounded-lg bg-white p-5 font-semibold shadow-sm">
          <p>Your invite has expired or is invalid.</p>
          <p> Contact your school admin to resend you a new invite.</p>
        </div>
      ) : (
        <form
          className="space-y-6"
          noValidate
          onSubmit={handleSubmit(onSubmit)}>
          <div className="mb-10 rounded-lg border bg-white p-10 shadow-sm">
            <div className="md:grid md:grid-cols-3 md:gap-6">
              <div className="md:col-span-1">
                <h3 className="text-xl font-medium leading-6 text-gray-900">Login Details</h3>
                <p className="mt-1 text-sm text-gray-500">This information is used to create and login into your account.</p>
              </div>
              <div className="mt-5 grid grid-cols-6 space-y-6 md:col-span-2 md:mt-0">
                <div className="col-span-6 sm:col-span-4">
                  <label
                    htmlFor={invitationForm.email.id}
                    className="block font-semibold text-gray-800">
                    Email address <Required rules={invitationForm.email.rules} />
                  </label>
                  <input
                    type="email"
                    {...register(invitationForm.email.id, invitationForm.email.validate)}
                    id={invitationForm.email.id}
                    autoComplete={invitationForm.email.id}
                    className="mt-1 block w-full rounded-md border border-gray-300 py-2 px-3
                          shadow-sm focus:border-blue-300 focus:outline-none focus:ring-blue-300 sm:text-sm"
                  />
                  <HelpText errorMessages={errors?.email?.message as string} />
                </div>

                <div className="col-span-6 sm:col-span-6">
                  <label
                    htmlFor={invitationForm.password.id}
                    className="block font-semibold text-gray-800">
                    Password <Required rules={invitationForm.password.rules} />
                  </label>
                  <input
                    type="password"
                    {...register(invitationForm.password.id, invitationForm.password.validate)}
                    id={invitationForm.password.id}
                    className="mt-1 block w-full rounded-md border border-gray-300 py-2 px-3
                          shadow-sm focus:border-blue-300 focus:outline-none focus:ring-blue-300 sm:text-sm"
                  />
                  <HelpText errorMessages={errors?.password?.message as string} />
                </div>

                <div className="col-span-6 sm:col-span-6">
                  <label
                    htmlFor={invitationForm.password_confirmation.id}
                    className="flex items-center font-semibold text-gray-800">
                    Confirm Password{' '}
                    <Required
                      className="px-1"
                      rules={invitationForm.password_confirmation.rules}
                    />
                    {passwordMatch && (
                      <>
                        <CheckCircleIcon className="mr-1 h-5 w-5 text-green-500" />
                        <p className="text-xs text-green-500">Passwords match</p>
                      </>
                    )}
                    {!passwordMatch && passwordMatch !== null && (
                      <>
                        <ExclamationCircleIcon className="mr-1 h-5 w-5 text-red-500 " />
                        <p className="text-xs text-red-500">Passwords do not match</p>
                      </>
                    )}
                  </label>
                  <input
                    type="password"
                    {...register(invitationForm.password_confirmation.id, invitationForm.password_confirmation.validate)}
                    id={invitationForm.password_confirmation.id}
                    className="mt-1 block w-full rounded-md border border-gray-300 py-2 px-3
                          shadow-sm focus:border-blue-300 focus:outline-none focus:ring-blue-300 sm:text-sm"
                  />
                  <HelpText errorMessages={errors?.password_confirmation?.message as string} />
                </div>
              </div>
            </div>
          </div>
          <div className="bg-white px-4 py-5 shadow sm:rounded-lg sm:p-6">
            <div className="md:grid md:grid-cols-3 md:gap-6">
              <div className="md:col-span-1">
                <h3 className="text-lg font-medium leading-6 text-gray-900">Personal Information</h3>
                <p className="mt-1 text-sm text-gray-500">This information is used to create your profile.</p>
              </div>
              <div className="mt-5 md:col-span-2 md:mt-0">
                <div className="grid grid-cols-6 gap-6">
                  <div className="col-span-6 sm:col-span-3">
                    <label
                      htmlFor={invitationForm.first_name.id}
                      className="block font-semibold text-gray-800">
                      First name <Required rules={invitationForm.first_name.rules} />
                    </label>
                    <input
                      type="text"
                      {...register(invitationForm.first_name.id, invitationForm.first_name.validate)}
                      id={invitationForm.first_name.id}
                      autoComplete={invitationForm.first_name.id}
                      className="mt-1 block w-full rounded-md border border-gray-300 py-2 px-3
                          shadow-sm focus:border-blue-300 focus:outline-none focus:ring-blue-300 sm:text-sm"
                    />
                    <HelpText errorMessages={errors?.first_name?.message as string} />
                  </div>

                  <div className="col-span-6 sm:col-span-3">
                    <label
                      htmlFor={invitationForm.last_name.id}
                      className="block font-semibold text-gray-800">
                      Last name <Required rules={invitationForm.last_name.rules} />
                    </label>
                    <input
                      type="text"
                      {...register(invitationForm.last_name.id, invitationForm.last_name.validate)}
                      id={invitationForm.last_name.id}
                      autoComplete={invitationForm.last_name.id}
                      className="mt-1 block w-full rounded-md border border-gray-300 py-2 px-3
                          shadow-sm focus:border-blue-300 focus:outline-none focus:ring-blue-300 sm:text-sm"
                    />
                    <HelpText errorMessages={errors?.last_name?.message as string} />
                  </div>

                  <div className="col-span-6 sm:col-span-6">
                    <label
                      htmlFor={invitationForm.preferred_name.id}
                      className="block font-semibold text-gray-800">
                      Preferred name/ Shortname <Required rules={invitationForm.first_name.rules} />
                    </label>

                    <input
                      type="text"
                      id={invitationForm.preferred_name.id}
                      autoComplete={invitationForm.preferred_name.id}
                      {...register(invitationForm.preferred_name.id, invitationForm.preferred_name.validate)}
                      className="block w-full rounded-md border border-gray-300 py-2 px-3
                        shadow-sm focus:border-blue-300 focus:outline-none focus:ring-blue-300 sm:text-sm"
                    />
                    <HelpText
                      helpText="This is the name you prefer to be called by. If none, type your full name."
                      errorMessages={errors?.preferred_name?.message as string}
                    />
                  </div>

                  <div className="col-span-6 sm:col-span-4">
                    <label
                      htmlFor={invitationForm.gender.id}
                      className="block font-semibold text-gray-800">
                      Gender <Required rules={invitationForm.gender.rules} />
                    </label>

                    <ReactSelect
                      id={invitationForm.gender.id}
                      name={invitationForm.gender.id}
                      placeholder=""
                      control={control}
                      rules={invitationForm.gender.validate}
                      options={genderOptions}
                    />
                    <HelpText errorMessages={errors?.gender?.message as string} />
                  </div>

                  <div className="col-span-6 sm:col-span-4">
                    <label
                      htmlFor={invitationForm.dob.id}
                      className="block font-semibold text-gray-800">
                      DOB <Required rules={invitationForm.dob.rules} />
                    </label>

                    <Controller
                      name={invitationForm.dob.id}
                      control={control}
                      rules={invitationForm.dob.validate}
                      render={({ field }) => {
                        return (
                          <DatePicker
                            id={invitationForm.dob.id}
                            dateFormat="MMMM d, yyyy"
                            selected={getDatePickerDate(field.value)}
                            onChange={(date: Date) => {
                              field.onChange(date.toISOString().substring(0, 10));
                            }}
                            showYearDropdown
                            className="block w-full rounded-md border border-gray-300 py-2 px-3
                        shadow-sm focus:border-blue-300 focus:outline-none focus:ring-blue-300 sm:text-sm"
                          />
                        );
                      }}
                    />
                    <HelpText errorMessages={errors?.dob?.message as string} />
                  </div>

                  <div className="col-span-6 sm:col-span-4">
                    <label
                      htmlFor={invitationForm.mobile.id}
                      className="block font-semibold text-gray-800">
                      Mobile <Required rules={invitationForm.mobile.rules} />
                    </label>

                    <PhoneInputWithCountry
                      name={invitationForm.mobile.id}
                      id={invitationForm.mobile.id}
                      /** @ts-ignore: Library types issue */
                      control={control}
                      rules={invitationForm.mobile.validate}
                      className=""
                      defaultCountry="AG"
                    />
                    <HelpText errorMessages={errors?.mobile?.message as string} />
                  </div>

                  <div className="col-span-6 sm:col-span-6">
                    <label
                      htmlFor={invitationForm.address.id}
                      className="block font-semibold text-gray-800">
                      Address <Required rules={invitationForm.address.rules} />
                    </label>

                    <input
                      type="text"
                      id={invitationForm.address.id}
                      autoComplete={invitationForm.address.id}
                      {...register(invitationForm.address.id, invitationForm.address.validate)}
                      className="block w-full rounded-md border border-gray-300 py-2 px-3
                        shadow-sm focus:border-blue-300 focus:outline-none focus:ring-blue-300 sm:text-sm"
                    />
                    <HelpText errorMessages={errors?.address?.message as string} />
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="flex justify-end">
            <button
              type="button"
              className="rounded-md border border-gray-300 bg-white py-2 px-4 text-sm font-medium
            text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2">
              Cancel
            </button>
            <button
              disabled={submitting}
              type="submit"
              className="ml-3 inline-flex justify-center rounded-md border border-transparent
                      bg-blue-600 py-2 px-5 text-sm font-semibold text-white shadow-sm hover:bg-blue-700
                        focus:outline-none focus:ring-1 focus:ring-blue-400 focus:ring-offset-2 disabled:cursor-not-allowed disabled:bg-blue-200">
              <LoadingContent
                loading={submitting}
                text="Create account"
              />
            </button>
          </div>
        </form>
      )}
    </div>
  );
};

Invite.getLayout = getLayout;

export default Invite;
