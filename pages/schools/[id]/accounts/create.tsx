/* eslint-disable */ /* @ts-ignore */
import { useForm, SubmitHandler, Controller } from 'react-hook-form';
import { useMutation } from '@tanstack/react-query';
import Avatar from 'boring-avatars';
import { EnvelopeOpenIcon, PhoneIcon } from '@heroicons/react/24/solid';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import PhoneInputWithCountry from 'react-phone-number-input/react-hook-form';
import 'react-phone-number-input/style.css';
import { NextPageWithLayout } from '@/pages/_app';
import { getLayout } from '@/components/Layouts/UserLayout';
import useAuth from '@/hooks/useAuth';
import {} from '@/utils/api';
import { profileFields, genderOptions } from '@/utils/constants/forms';
import { addValidation } from '@/services/Validation';
import { InviteDataType, isInviteData, InvitationFormType } from '@/types/invites';
import Required from '@/components/Form/Required';
import ReactSelect from '@/components/Form/Select';
import HelpText from '@/components/Form/HelpText';
import LoadingContent from '@/components/Button/LoadingContent';
import { getDatePickerDate } from '@/utils/helpers';
import Button from '@/components/Button';
import PageHeader from '@/components/PageHeader';

const invitationFields = {
  password: { rules: 'required|alpha_num|min:8' },
  password_confirmation: { rules: 'required|alpha_num|min:8' },
  ...profileFields,
  last_name: { rules: 'required|string' },
};

const invitationForm = addValidation(invitationFields);

const CreateAccount: NextPageWithLayout = () => {
  const { user } = useAuth({ middleware: 'auth' });

  const {
    register,
    handleSubmit,
    reset,
    watch,
    control,
    formState: { errors },
  } = useForm<InvitationFormType>();

  const onSubmit: SubmitHandler<InvitationFormType> = data => {
    console.log(data);
  };

  return (
    <main className="mx-auto max-w-4xl">
      <PageHeader title="Create Account" />
      <div className="mx-auto max-w-4xl pb-5 sm:px-6 lg:px-8">
        <div className="px-4 pb-3 sm:px-0">
          <div className="flex h-10 items-center">
            {/*  <QueryStatus
                isLoading={isLoading}
                isFetching={isFetching}
                error={error}
              /> */}
          </div>

          <div className="mb-8 rounded-lg border bg-white px-5 pt-8 pb-5 shadow-sm ">
            <div className="flex flex-col sm:flex-row">
              <div className="mr-8 mb-5 flex h-[7rem] w-[7rem] items-center justify-center overflow-hidden rounded-full bg-blue-600">
                <Avatar
                  size={124}
                  name="Tyndale Michael"
                  variant="beam"
                  colors={['#2563eb', '#4f46e5', '#0f172a']}
                />
              </div>
              <div>
                <div className="flex flex-wrap text-lg font-semibold leading-6 text-gray-900">
                  <p className="mr-3 mb-1 text-2xl font-bold sm:mb-0">Tyndale Michael</p>
                  <div className="mt-1 flex h-5 items-center justify-center rounded-lg bg-green-100 px-2 text-xs text-green-600">Teacher</div>
                </div>

                <div className="flex w-full flex-wrap items-center pt-1">
                  <div className="mr-4 mb-1 flex items-center text-gray-500">
                    <EnvelopeOpenIcon className="mr-2 h-4 w-4 text-gray-400" />
                    <p>maxedoutplanet@gmail.com</p>
                  </div>
                  <div className="mb-1 flex items-center pr-4 text-gray-500">
                    <PhoneIcon className="mr-2 h-4 w-4 text-gray-400" />
                    1268-460-16-20
                  </div>
                </div>
              </div>
            </div>
          </div>

          <form
            className="space-y-6"
            noValidate
            onSubmit={handleSubmit(onSubmit)}>
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

                    <div className="col-span-6">
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

                    <div className="col-span-6">
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

                    <div className="col-span-6">
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

                    <div className="col-span-6">
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
                disabled={false}
                type="submit"
                className="ml-3 inline-flex justify-center rounded-md border border-transparent
                      bg-blue-600 py-2 px-5 text-sm font-semibold text-white shadow-sm hover:bg-blue-700
                        focus:outline-none focus:ring-1 focus:ring-blue-400 focus:ring-offset-2 disabled:cursor-not-allowed disabled:bg-blue-200">
                <LoadingContent
                  loading={false}
                  text="Create account"
                />
              </button>
            </div>
          </form>
        </div>
      </div>
    </main>
  );
};

CreateAccount.getLayout = getLayout;

export default CreateAccount;
