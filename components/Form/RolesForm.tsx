import { useEffect } from 'react';
import { useRouter } from 'next/router';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'react-toastify';
import { useForm, SubmitHandler } from 'react-hook-form';
import { validateField } from '@/services/Validation';
import { roleOptions } from '@/utils/constants/forms';
import ReactSelect from '@/components/Form/Select';
import Required from '@/components/Form/Required';
import LoadingContent from '@/components/Button/LoadingContent';
import Button from '@/components/Button';
import HelpText from '@/components/Form/HelpText';
import Message from '@/components/Toast/Message';
import { roles as rolesApi } from '@/utils/api';

type RoleType = {
  roles: number[];
};

const RolesForm = ({ roles }: { roles: number[] }) => {
  const queryClient = useQueryClient();

  const router = useRouter();
  const { id: schoolId, userId } = router.query;
  const {
    handleSubmit,
    control,
    reset,
    formState: { errors },
  } = useForm<RoleType>();

  useEffect(() => {
    reset({ roles });
  }, [roles, reset]);

  const editRole = useMutation(
    (data: RoleType) => {
      return rolesApi.update(schoolId as string, `${userId}`, data);
    },
    {
      onSuccess: () => {
        toast.success(
          <Message
            title="Success"
            body="Account Role has been updated."
          />,
        );
        queryClient.invalidateQueries(['account-profile', userId]);
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

  const onSubmitPermission: SubmitHandler<RoleType> = data => {
    editRole.mutate(data);
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmitPermission)}
      noValidate
      className="mb-8 rounded-lg border bg-white shadow-sm">
      <div className="flex items-center justify-between border-b px-5 pt-5 pb-3 sm:px-10">
        <div>
          <h3 className="text-xl font-medium leading-6 text-gray-900">Permissions</h3>
          <p className="mt-1 text-xs text-gray-500">A users access information</p>
        </div>
        <div>
          <Button
            type="submit"
            disabled={editRole.isLoading}
            className="mr-2">
            <LoadingContent
              loading={editRole.isLoading}
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
    </form>
  );
};

export default RolesForm;
