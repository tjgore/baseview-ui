import { useForm, SubmitHandler, Controller } from 'react-hook-form';
import { z } from 'zod';
import Select, { StylesConfig, OptionsOrGroups, GroupBase } from 'react-select';
import Required from '@/components/Form/Required';
import { addValidation } from '@/services/Validation';
import HelpText from '../Form/HelpText';

const inviteSchema = z.object({
  first_name: z.string(),
  last_name: z.string().nullable(),
  email: z.string().email(),
  role: z.number(),
  school: z.string(),
});

type Options = {
  value: number;
  label: string;
};

const schoolOptions: OptionsOrGroups<Options, GroupBase<Options>> = [
  { value: 1, label: 'First School' },
  { value: 7, label: 'Music School' },
];

const roleOptions: OptionsOrGroups<Options, GroupBase<Options>> = [
  { value: 2, label: 'Admin' },
  { value: 3, label: 'Teacher' },
  { value: 4, label: 'Student' },
];

const customStyles: StylesConfig<Options> = {
  input: styles => {
    return {
      ...styles,
      "[type='text']:focus": {
        boxShadow: 'none',
      },
    };
  },
  control: (styles, state) => {
    return {
      ...styles,
      paddingTop: '1px',
      paddingBottom: '0px',
      borderRadius: '0.375rem',
      marginTop: '0.25rem',
      transition: 'none',
      borderWidth: '1px',
      borderColor: state.isFocused ? 'rgb(147 197 253)' : 'rgb(209 213 219)',
      outline: state.isFocused ? '1px solid rgb(147 197 253)' : 'none',
      '&:hover': {
        borderColor: state.isFocused ? 'rgb(147 197 253)' : 'rgb(209 213 219)',
      },
    };
  },
};

/* Error for react select
const customErrorStyles: StylesConfig<{
  value: string;
  label: string;
}> = {
  control: (styles, state) => {
    return {
      ...styles,
      paddingTop: '1px',
      paddingBottom: '0px',
      borderRadius: '0.375rem',
      marginTop: '0.25rem',
      transition: 'none',
      borderWidth: '1px',
      borderColor: state.isFocused ? 'rgb(147 197 253)' : 'rgb(209 213 219)',
      boxShadow: '0 1px 2px 0 rgb(0 0 0 / 0.05)',
      outline: state.isFocused ? '1px solid rgb(147 197 253)' : 'none',
      '&:hover': {
        borderColor: state.isFocused ? 'rgb(147 197 253)' : 'rgb(209 213 219)',
      },
    };
  },
}; */

type InviteType = z.infer<typeof inviteSchema>;

const inviteFields = {
  first_name: { rules: 'required|string' },
  last_name: { rules: 'present|string' },
  email: { rules: 'email|required' },
  role: { rules: 'required|integer' },
  school: { rules: 'required|integer' },
};

const inviteForm = addValidation(inviteFields);

type InviteDrawerProps = {
  setOpen?: (boolean) => void;
};

const InviteDrawer = ({ setOpen }: InviteDrawerProps) => {
  const {
    register,
    handleSubmit,
    reset,
    control,
    formState: { errors },
  } = useForm<InviteType>();

  const onSubmit: SubmitHandler<InviteType> = data => {
    console.log('data', data);
    reset();
  };

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
              <Controller
                name={inviteForm.school.id}
                control={control}
                rules={inviteForm.school.validate}
                render={({ field }) => {
                  return (
                    /** @ts-ignore Library issue */
                    <Select
                      {...field}
                      id={inviteForm.school.id}
                      placeholder=""
                      options={schoolOptions}
                      styles={customStyles}
                    />
                  );
                }}
              />
              <HelpText errorMessages={errors?.school?.message as string} />
            </div>

            <div className="col-span-3">
              <label
                htmlFor={inviteForm.role.id}
                className="block font-semibold text-gray-800">
                Role <Required rules={inviteForm.role.rules} />
              </label>
              <Controller
                name={inviteForm.role.id}
                control={control}
                rules={inviteForm.role.validate}
                render={({ field }) => {
                  return (
                    /** @ts-ignore Library issue */
                    <Select
                      {...field}
                      id={inviteForm.role.id}
                      placeholder=""
                      options={roleOptions}
                      styles={customStyles}
                    />
                  );
                }}
              />
              <HelpText errorMessages={errors?.role?.message as string} />
            </div>
          </div>
          <div className="pt-6 text-right">
            <button
              type="button"
              className="rounded-md  bg-slate-200 py-2 px-4 text-sm
                    font-semibold text-gray-700 shadow-sm hover:bg-slate-300 focus:outline-none focus:ring-1 focus:ring-blue-500 focus:ring-offset-2"
              onClick={() => setOpen?.(false)}>
              Cancel
            </button>
            <button
              type="submit"
              className="ml-3 inline-flex justify-center rounded-md border border-transparent
                    bg-blue-600 py-2 px-4 text-sm font-medium text-white shadow-sm
                      hover:bg-blue-700 focus:outline-none focus:ring-1 focus:ring-blue-500 focus:ring-offset-2">
              Invite
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default InviteDrawer;
