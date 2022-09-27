/* eslint-disable max-lines */
import { useEffect, useState } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import { toast } from 'react-toastify';
import { OptionsOrGroups, GroupBase } from 'react-select';
import { useQuery, useMutation } from '@tanstack/react-query';
import Required from '@/components/Form/Required';
import { addValidation } from '@/services/Validation';
import HelpText from '@/components/Form/HelpText';
import { roles, schools as schoolsApi, invites } from '@/utils/api';
import { isRoleList } from '@/types/roles';
import { isSchoolListData } from '@/types/schools';
import Message from '@/components/Toast/Message';
import Spinner from '@/components/Spinner';
import ReactSelect from '@/components/Form/Select';
import { InviteType, InviteFormType } from '@/types/invites';
import { inviteFields } from '@/utils/constants/forms';

type Options = {
  value: number;
  label: string;
};

type OptionsType = OptionsOrGroups<Options, GroupBase<Options>> | undefined;

const inviteFieldKeys = Object.keys(inviteFields);

const inviteForm = addValidation(inviteFields);

type InviteDrawerProps = {
  setOpen?: (boolean) => void;
};

const InviteDrawer = ({ setOpen }: InviteDrawerProps) => {
  const [roleOptions, setRoleOptions] = useState<OptionsType>();
  const [schoolOptions, setSchoolOptions] = useState<OptionsType>();

  const {
    register,
    handleSubmit,
    reset,
    control,
    formState: { errors },
  } = useForm<InviteFormType>();

  const inviteMutation = useMutation((data: InviteType) => {
    return invites.create(data);
  });

  const onSubmit: SubmitHandler<InviteFormType> = data => {
    const inviteData: InviteType = {};
    inviteFieldKeys.forEach(field => {
      let fieldValue: string | number | null = null;
      const value = data[field as keyof typeof data];
      if (value && typeof value === 'object' && 'value' in value) {
        fieldValue = value.value;
        inviteData[field] = fieldValue;
      } else {
        inviteData[field] = value;
      }
    });

    inviteMutation.mutate(inviteData);
  };

  useEffect(() => {
    if (inviteMutation.isSuccess) {
      toast.success(
        <Message
          title="Success"
          body="Invite has been sent."
        />,
      );
      const resetValues = {};
      inviteFieldKeys.forEach(field => {
        resetValues[field] = null;
      });
      reset(resetValues);
    }
    if (inviteMutation.isError) {
      toast.error(
        <Message
          title="Error"
          body="Invite was not sent. Try again."
        />,
      );
    }
  }, [inviteMutation.isSuccess, inviteMutation.isError, reset]);

  const schoolsQuery = useQuery(['schools'], schoolsApi.all);
  const { data: schoolData } = schoolsQuery;
  const rolesQuery = useQuery(['school-roles'], roles.school);
  const { data: roleData } = rolesQuery;

  useEffect(() => {
    if (schoolData && isSchoolListData(schoolData)) {
      const options = schoolData.map(school => {
        return { value: school.id, label: school.name };
      });
      setSchoolOptions(options);
    }
  }, [schoolData]);

  useEffect(() => {
    if (roleData && isRoleList(roleData)) {
      const options = roleData.map(role => {
        return { value: role.id, label: role.nice_name };
      });
      setRoleOptions(options);
    }
  }, [roleData]);

  if (rolesQuery.isLoading || schoolsQuery.isLoading) {
    return (
      <div className="flex flex-row justify-center">
        <Spinner color="text-gray-900 mr-3" />
        <p>Loading...</p>
      </div>
    );
  }

  if (rolesQuery.isError || schoolsQuery.isError) {
    return (
      <div className="flex flex-row justify-center">
        <p className="text-red-500">An error occurred. Please try reloading the page.</p>
      </div>
    );
  }

  return (
    <div>
      <form
        noValidate
        onSubmit={handleSubmit(onSubmit)}>
        <div className="">
          <div className="grid grid-cols-6 gap-x-5 gap-y-6">
            <div className="col-span-3">
              <label
                htmlFor={inviteForm.first_name.id}
                className="block font-semibold text-gray-800">
                First name <Required rules={inviteForm.first_name.rules} />
              </label>
              <input
                type="text"
                {...register(inviteForm.first_name.id, inviteForm.first_name.validate)}
                id={inviteForm.first_name.id}
                autoComplete={inviteForm.first_name.id}
                className="mt-1 block w-full rounded-md border border-gray-300 py-2 px-3 shadow-sm
                          focus:border-blue-300 focus:outline-none focus:ring-blue-300 sm:text-sm"
              />
              <HelpText errorMessages={errors?.first_name?.message as string} />
            </div>

            <div className="col-span-3">
              <label
                htmlFor={inviteForm.last_name.id}
                className="block font-semibold text-gray-800">
                Last name <Required rules={inviteForm.last_name.rules} />
              </label>
              <input
                type="text"
                {...register(inviteForm.last_name.id, inviteForm.last_name.validate)}
                id={inviteForm.last_name.id}
                autoComplete={inviteForm.last_name.id}
                className="mt-1 block w-full rounded-md border border-gray-300 py-2 px-3 shadow-sm
                          focus:border-blue-300 focus:outline-none focus:ring-blue-300 sm:text-sm"
              />
              <HelpText helpText="The last name may be left blank." />
            </div>

            <div className="col-span-6">
              <label
                htmlFor={inviteForm.email.id}
                className="block font-semibold text-gray-800">
                Email <Required rules={inviteForm.email.rules} />
              </label>
              <input
                type="text"
                {...register(inviteForm.email.id, inviteForm.email.validate)}
                id={inviteForm.email.id}
                autoComplete={inviteForm.email.id}
                className="mt-1 block w-full rounded-md border border-gray-300 py-2 px-3 shadow-sm
                          focus:border-blue-300 focus:outline-none focus:ring-blue-300 sm:text-sm"
              />
              <HelpText errorMessages={errors?.email?.message as string} />
            </div>

            <div className="col-span-3">
              <label
                htmlFor={inviteForm.school.id}
                className="block font-semibold text-gray-800">
                School <Required rules={inviteForm.school.rules} />
              </label>
              <ReactSelect
                id={inviteForm.school.id}
                name={inviteForm.school.id}
                control={control}
                rules={inviteForm.school.validate}
                options={schoolOptions}
              />
              <HelpText errorMessages={errors?.school?.message as string} />
            </div>

            <div className="col-span-3">
              <label
                htmlFor={inviteForm.role.id}
                className="block font-semibold text-gray-800">
                Role <Required rules={inviteForm.role.rules} />
              </label>
              <ReactSelect
                id={inviteForm.role.id}
                name={inviteForm.role.id}
                control={control}
                rules={inviteForm.role.validate}
                options={roleOptions}
              />
              <HelpText errorMessages={errors?.role?.message as string} />
            </div>
          </div>
          <div className="pt-6 text-right">
            <button
              disabled={inviteMutation.isLoading}
              type="button"
              className="rounded-md  bg-slate-200 py-2 px-4 text-sm
                    font-semibold text-gray-700 shadow-sm hover:bg-slate-300 focus:outline-none focus:ring-1 focus:ring-blue-500 focus:ring-offset-2"
              onClick={() => setOpen?.(false)}>
              Cancel
            </button>
            <button
              disabled={inviteMutation.isLoading}
              type="submit"
              className="ml-3 inline-flex justify-center rounded-md border border-transparent
                    bg-blue-600 py-2 px-4 text-sm font-medium text-white shadow-sm
                      hover:bg-blue-700 focus:outline-none focus:ring-1 focus:ring-blue-500 focus:ring-offset-2">
              {inviteMutation.isLoading ? (
                <div className="flex items-center">
                  <Spinner className="mr-3" /> Loading...
                </div>
              ) : (
                'Invite'
              )}
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default InviteDrawer;
