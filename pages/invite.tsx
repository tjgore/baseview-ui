/* eslint-disable max-lines */
import { useEffect } from 'react';
import { z } from 'zod';
import { useRouter } from 'next/router';
import { toast } from 'react-toastify';
import { isEmpty } from 'lodash';
import { useForm, SubmitHandler, Controller } from 'react-hook-form';
import { useQuery, useMutation } from '@tanstack/react-query';
import DatePicker from 'react-datepicker';
import PhoneInputWithCountry from 'react-phone-number-input/react-hook-form';
import 'react-phone-number-input/style.css';
import { NextPageWithLayout } from '@/pages/_app';
import { getLayout } from '@/components/Layouts/FullPageLayout';
import useAuth from '@/hooks/useAuth';
import { auth, invites as invitesApi } from '@/utils/api';
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
  confirm_password: { rules: 'required|alpha_num|min:8' },
  ...profileFields,
  last_name: { rules: 'required|string' },
};

const invitationForm = addValidation(invitationFields);
const invitationKeys = Object.keys(invitationFields);

const Invite: NextPageWithLayout = () => {
  useAuth({ middleware: 'guest' });
  const router = useRouter();
  const token = typeof router.query.token === 'string' ? router.query.token : '';

  const { data, isLoading, error } = useQuery(['invite', token], () => invitesApi.findByToken(token), { enabled: !!token });

  const invite: InviteDataType | null = isInviteData(data) ? data : null;

  const {
    register,
    handleSubmit,
    reset,
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

  const valueObjectSchema = z.object({ label: z.string(), value: z.string() });

  type ValueObject = z.infer<typeof valueObjectSchema>;

  const isValueObject = (data: unknown): data is ValueObject => valueObjectSchema.safeParse(data).success;

  const onSubmit: SubmitHandler<InvitationFormType> = data => {
    console.log('form submit', data);
    invitationKeys.forEach(field => {
      const value = data[field as keyof typeof data];
      if (value && isValueObject(value)) {
        data[field] = value.value;
      } else {
        data[field] = value;
      }
    });

    // createAccount.mutate(data);
  };

  const createAccount = useMutation(
    (data: InvitationFormType) => {
      return auth.register(data);
    },
    {
      onSuccess: () => {
        toast.success(
          <Message
            title="Success"
            body="Your account is being created."
          />,
        );
      },
    },
  );

  /* const createProfile = useMutation(data => {
    return profilesApi.create(data);
  }); */

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
                    htmlFor={invitationForm.confirm_password.id}
                    className="block font-semibold text-gray-800">
                    Confirm Password <Required rules={invitationForm.confirm_password.rules} />
                  </label>
                  <input
                    type="password"
                    {...register(invitationForm.confirm_password.id, invitationForm.confirm_password.validate)}
                    id={invitationForm.confirm_password.id}
                    className="mt-1 block w-full rounded-md border border-gray-300 py-2 px-3
                          shadow-sm focus:border-blue-300 focus:outline-none focus:ring-blue-300 sm:text-sm"
                  />
                  <HelpText errorMessages={errors?.confirm_password?.message as string} />
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
                            className="block w-full max-w-lg rounded-md border border-gray-300 py-2 px-3
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
                      className="block w-full max-w-lg rounded-md border border-gray-300 py-2 px-3
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
              disabled={createAccount.isLoading}
              type="submit"
              className="ml-3 inline-flex justify-center rounded-md border border-transparent
                      bg-blue-600 py-2 px-5 text-sm font-semibold text-white shadow-sm hover:bg-blue-700
                        focus:outline-none focus:ring-1 focus:ring-blue-400 focus:ring-offset-2 disabled:cursor-not-allowed disabled:bg-blue-200">
              <LoadingContent
                loading={createAccount.isLoading}
                text="Save Changes"
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
