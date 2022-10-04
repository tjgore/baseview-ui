/* eslint-disable max-lines */
import { useState, useEffect } from 'react';
import { z } from 'zod';
import Avatar from 'boring-avatars';
import { EnvelopeOpenIcon, PhoneIcon } from '@heroicons/react/24/solid';
import { useForm, SubmitHandler, Controller } from 'react-hook-form';
import PhoneInputWithCountry from 'react-phone-number-input/react-hook-form';
import 'react-phone-number-input/style.css';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { NextPageWithLayout } from '@/pages/_app';
import { getLayout } from '@/components/Layouts/UserLayout';
import useProfile from '@/hooks/useProfile';
import QueryStatus from '@/components/QueryStatus';
import { profileFields, genderOptions } from '@/utils/constants/forms';
import { addValidation } from '@/services/Validation';
import { ProfileFormType } from '@/types/profiles';
import Required from '@/components/Form/Required';
import ReactSelect from '@/components/Form/Select';
import HelpText from '@/components/Form/HelpText';
import LoadingContent from '@/components/Button/LoadingContent';

const profileForm = addValidation(profileFields);
const profileKeys = Object.keys(profileFields);

const Profile: NextPageWithLayout = () => {
  const { profile, profileQuery, profileDefaultValues, editProfile } = useProfile();
  const [edit, setEdit] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    control,
    formState: { errors },
  } = useForm<ProfileFormType>();

  useEffect(() => {
    reset(profileDefaultValues ?? {});
  }, [profileDefaultValues, reset]);

  const valueObjectSchema = z.object({ label: z.string(), value: z.string() });

  type ValueObject = z.infer<typeof valueObjectSchema>;

  const isValueObject = (data: unknown): data is ValueObject => valueObjectSchema.safeParse(data).success;

  const onSubmit: SubmitHandler<ProfileFormType> = data => {
    profileKeys.forEach(field => {
      const value = data[field as keyof typeof data];
      if (value && isValueObject(value)) {
        data[field] = value.value;
      } else {
        data[field] = value;
      }
    });

    editProfile.mutate(data);
  };

  const fullName = `${profile?.first_name} ${profile?.last_name}`;

  return (
    <>
      <header className="bg-white shadow-sm">
        <div className="mx-auto max-w-7xl p-4 sm:px-6 lg:px-8">
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
                      <a
                        href="#"
                        className="truncate text-sm font-medium text-gray-500 hover:text-gray-700">
                        Profile
                      </a>
                    </div>
                  </li>
                </ol>
              </nav>
            </div>
            <div className="mt-1 md:flex md:items-center md:justify-between">
              <div className="min-w-0 flex-1">
                <h2 className="text-2xl font-semibold leading-7 text-gray-900 sm:truncate sm:tracking-tight">My Profile</h2>
              </div>
            </div>
          </div>
        </div>
      </header>
      <main>
        <div className="mx-auto max-w-7xl pb-5 sm:px-6 lg:px-8">
          <div className="px-4 pb-3 sm:px-0 ">
            <div className="flex h-10 items-center">
              <QueryStatus
                isLoading={profileQuery.isLoading}
                isFetching={profileQuery.isFetching}
                error={profileQuery.error}
              />
            </div>
            {profile && (
              <>
                <div className="mb-5 rounded-lg border bg-white p-5 shadow-sm">
                  <div className="flex flex-col sm:flex-row">
                    <div className="mr-5 mb-5 flex h-24 w-24 items-center justify-center overflow-hidden rounded-md border bg-blue-600">
                      <Avatar
                        size={100}
                        square
                        name={fullName}
                        variant="beam"
                        colors={['#2563eb', '#4f46e5', '#0f172a']}
                      />
                    </div>
                    <div>
                      <div className="flex flex-wrap text-lg font-semibold leading-6 text-gray-900">
                        <p className="mr-3 mb-1 sm:mb-0">{fullName}</p>
                        <div className="mt-1 flex h-5 items-center justify-center rounded-lg bg-green-100 px-2 text-xs text-green-600">{profile.roles[0].nice_name}</div>
                      </div>

                      <div className="flex w-full flex-wrap items-center pt-1">
                        <div className="mr-4 mb-1 flex items-center text-gray-500">
                          <EnvelopeOpenIcon className="mr-2 h-4 w-4 text-gray-400" />
                          <p>{profile.email}</p>
                        </div>
                        <div className="mb-0 flex items-center pr-4 text-gray-500">
                          <PhoneIcon className="mr-2 h-4 w-4 text-gray-400" />
                          {profile.mobile}
                        </div>
                      </div>

                      <div>
                        <p>Joined on Sept 30, 2020.</p>
                        <p>
                          Belongs to
                          <span className="text-lg font-semibold text-gray-900"> 20</span> classes with <span className="text-lg font-semibold text-gray-900">5 </span>
                          teachers.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                <div className={`mb-5 rounded-lg border bg-white shadow-sm  ${edit ? 'hidden' : 'block'}`}>
                  <div className="border-b px-10 py-5">
                    <h3 className="text-lg font-medium leading-6 text-gray-900">Personal Information</h3>
                  </div>
                  <div className="pb-10">
                    <dl>
                      <div className="bg-gray-50 px-10 py-4 sm:grid sm:grid-cols-3">
                        <dt className="block text-sm font-medium text-gray-500 sm:mt-px">First Name</dt>
                        <dd className="text-gray-900 sm:col-span-2">{profile.first_name}</dd>
                      </div>

                      <div className="px-10 py-4 sm:grid sm:grid-cols-3">
                        <dt className="block text-sm font-medium text-gray-500 sm:mt-px">Last Name</dt>
                        <dd className="text-gray-900 sm:col-span-2">{profile.last_name}</dd>
                      </div>

                      <div className="bg-gray-50 px-10 py-4 sm:grid sm:grid-cols-3">
                        <dt className="block text-sm font-medium text-gray-500 sm:mt-px">Preferred Name</dt>
                        <dd className="text-gray-900 sm:col-span-2">{profile.preferred_name}</dd>
                      </div>

                      <div className="px-10 py-4 sm:grid sm:grid-cols-3">
                        <dt className="block text-sm font-medium text-gray-500 sm:mt-px">Gender</dt>
                        <dd className="text-gray-900 sm:col-span-2">{profile.gender}</dd>
                      </div>

                      <div className="bg-gray-50 px-10 py-4 sm:grid sm:grid-cols-3">
                        <dt className="block text-sm font-medium text-gray-500 sm:mt-px">DOB</dt>
                        <dd className="text-gray-900 sm:col-span-2">{profile.dob}</dd>
                      </div>

                      <div className="px-10 py-4 sm:grid sm:grid-cols-3">
                        <dt className="block text-sm font-medium text-gray-500 sm:mt-px">Email Address</dt>
                        <dd className="text-gray-900 sm:col-span-2">{profile.email}</dd>
                      </div>

                      <div className="bg-gray-50 px-10 py-4 sm:grid sm:grid-cols-3">
                        <dt className="block text-sm font-medium text-gray-500 sm:mt-px">Mobile</dt>
                        <dd className="text-gray-900 sm:col-span-2">{profile.mobile}</dd>
                      </div>

                      <div className="px-10 py-4 sm:grid sm:grid-cols-3">
                        <dt className="block text-sm font-medium text-gray-500 sm:mt-px">Address</dt>
                        <dd className="text-gray-900 sm:col-span-2">{profile.address}</dd>
                      </div>
                    </dl>
                    <div className="flex justify-end px-10">
                      <button
                        type="button"
                        onClick={() => setEdit(true)}
                        className="inline-flex justify-center rounded-md border border-transparent
                      bg-blue-600 py-2 px-5 text-sm font-semibold text-white shadow-sm hover:bg-blue-700
                        focus:outline-none focus:ring-1 focus:ring-blue-400 focus:ring-offset-2 disabled:cursor-not-allowed disabled:bg-blue-200">
                        Edit Profile
                      </button>
                    </div>
                  </div>
                </div>

                {edit && (
                  <div className={`mb-5 rounded-lg border bg-white shadow-sm ${edit ? 'block' : 'hidden'}`}>
                    <form
                      noValidate
                      onSubmit={handleSubmit(onSubmit)}>
                      <div className="border-b px-10 py-5">
                        <h3 className="text-lg font-medium leading-6 text-gray-900">Personal Information</h3>
                      </div>
                      <div className="pb-10">
                        <div>
                          <div className="bg-gray-50 px-10 py-4 sm:grid sm:grid-cols-3">
                            <label
                              htmlFor={profileForm.first_name.id}
                              className="block font-semibold text-gray-800">
                              First name <Required rules={profileForm.first_name.rules} />
                            </label>
                            <div className="sm:col-span-2">
                              <input
                                type="text"
                                id={profileForm.first_name.id}
                                autoComplete={profileForm.first_name.id}
                                {...register(profileForm.first_name.id, profileForm.first_name.validate)}
                                className="block w-full max-w-lg rounded-md border border-gray-300 py-2 px-3
                        shadow-sm focus:border-blue-300 focus:outline-none focus:ring-blue-300 sm:text-sm"
                              />
                              <HelpText errorMessages={errors?.first_name?.message as string} />
                            </div>
                          </div>

                          <div className="px-10 py-4 sm:grid sm:grid-cols-3">
                            <label
                              htmlFor={profileForm.last_name.id}
                              className="block font-semibold text-gray-800">
                              Last name <Required rules={profileForm.first_name.rules} />
                            </label>
                            <div className="sm:col-span-2">
                              <input
                                type="text"
                                id={profileForm.last_name.id}
                                autoComplete={profileForm.last_name.id}
                                {...register(profileForm.last_name.id, profileForm.last_name.validate)}
                                className="block w-full max-w-lg rounded-md border border-gray-300 py-2 px-3
                        shadow-sm focus:border-blue-300 focus:outline-none focus:ring-blue-300 sm:text-sm"
                              />
                              <HelpText errorMessages={errors?.last_name?.message as string} />
                            </div>
                          </div>

                          <div className="bg-gray-50 px-10 py-4 sm:grid sm:grid-cols-3">
                            <label
                              htmlFor={profileForm.preferred_name.id}
                              className="block font-semibold text-gray-800">
                              Preferred name <Required rules={profileForm.first_name.rules} />
                            </label>
                            <div className="sm:col-span-2">
                              <input
                                type="text"
                                id={profileForm.preferred_name.id}
                                autoComplete={profileForm.preferred_name.id}
                                {...register(profileForm.preferred_name.id, profileForm.preferred_name.validate)}
                                className="block w-full max-w-lg rounded-md border border-gray-300 py-2 px-3
                        shadow-sm focus:border-blue-300 focus:outline-none focus:ring-blue-300 sm:text-sm"
                              />
                              <HelpText errorMessages={errors?.preferred_name?.message as string} />
                            </div>
                          </div>

                          <div className="px-10 py-4 sm:grid sm:grid-cols-3">
                            <label
                              htmlFor={profileForm.gender.id}
                              className="block font-semibold text-gray-800">
                              Gender <Required rules={profileForm.gender.rules} />
                            </label>

                            <div className="max-w-lg sm:col-span-2">
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
                          </div>

                          <div className="bg-gray-50 px-10 py-4 sm:grid sm:grid-cols-3">
                            <label
                              htmlFor={profileForm.dob.id}
                              className="block font-semibold text-gray-800">
                              DOB <Required rules={profileForm.dob.rules} />
                            </label>
                            <div className="sm:col-span-2">
                              <Controller
                                name={profileForm.dob.id}
                                control={control}
                                rules={profileForm.dob.validate}
                                render={({ field }) => {
                                  return (
                                    <DatePicker
                                      id={profileForm.dob.id}
                                      dateFormat="MMMM d, yyyy"
                                      selected={typeof field.value === 'object' ? field.value : new Date(`${field.value} 00:00`)}
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
                          </div>

                          <div className="px-10 py-4 sm:grid sm:grid-cols-3">
                            <label
                              htmlFor={profileForm.email.id}
                              className="block font-semibold text-gray-800">
                              Email <Required rules={profileForm.email.rules} />
                            </label>
                            <div className="sm:col-span-2">
                              <input
                                type="email"
                                id={profileForm.email.id}
                                autoComplete={profileForm.email.id}
                                {...register(profileForm.email.id, profileForm.email.validate)}
                                className="block w-full max-w-lg rounded-md border border-gray-300 py-2 px-3
                        shadow-sm focus:border-blue-300 focus:outline-none focus:ring-blue-300 sm:text-sm"
                              />
                              <HelpText errorMessages={errors?.email?.message as string} />
                            </div>
                          </div>

                          <div className="bg-gray-50 px-10 py-4 sm:grid sm:grid-cols-3">
                            <label
                              htmlFor={profileForm.mobile.id}
                              className="block font-semibold text-gray-800">
                              Mobile <Required rules={profileForm.mobile.rules} />
                            </label>
                            <div className="max-w-lg sm:col-span-2">
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
                          </div>

                          <div className="px-10 py-4 sm:grid sm:grid-cols-3">
                            <label
                              htmlFor={profileForm.address.id}
                              className="block font-semibold text-gray-800">
                              Address <Required rules={profileForm.address.rules} />
                            </label>
                            <div className="sm:col-span-2">
                              <input
                                type="text"
                                id={profileForm.address.id}
                                autoComplete={profileForm.address.id}
                                {...register(profileForm.address.id, profileForm.address.validate)}
                                className="block w-full max-w-lg rounded-md border border-gray-300 py-2 px-3
                        shadow-sm focus:border-blue-300 focus:outline-none focus:ring-blue-300 sm:text-sm"
                              />
                              <HelpText errorMessages={errors?.address?.message as string} />
                            </div>
                          </div>

                          <div className="flex items-center justify-end px-10 pt-5">
                            <button
                              type="button"
                              onClick={() => setEdit(false)}
                              className="mr-4 inline-flex justify-center rounded-md border border-transparent
                      bg-slate-200 py-2 px-5 text-sm font-semibold text-gray-700 shadow-sm hover:bg-slate-300
                        focus:outline-none focus:ring-1 focus:ring-blue-400 focus:ring-offset-2 disabled:cursor-not-allowed disabled:bg-blue-200">
                              Close
                            </button>
                            <button
                              disabled={editProfile.isLoading}
                              type="submit"
                              className="inline-flex justify-center rounded-md border border-transparent
                      bg-blue-600 py-2 px-5 text-sm font-semibold text-white shadow-sm hover:bg-blue-700
                        focus:outline-none focus:ring-1 focus:ring-blue-400 focus:ring-offset-2 disabled:cursor-not-allowed disabled:bg-blue-200">
                              <LoadingContent
                                loading={editProfile.isLoading}
                                text="Save Changes"
                              />
                            </button>
                          </div>
                        </div>
                      </div>
                    </form>
                  </div>
                )}
              </>
            )}
          </div>
        </div>
      </main>
    </>
  );
};

Profile.getLayout = getLayout;

export default Profile;
