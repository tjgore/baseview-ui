/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import Select, { StylesConfig, OptionsOrGroups, GroupBase } from 'react-select';
import { Controller } from 'react-hook-form';
import { ValueType } from '@/services/Validation';

type Options = string | { value: number; label: string } | { value: string; label: string } | { value: number; label: string };

const customStyles: StylesConfig<Options, boolean, GroupBase<Options>> = {
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

type SelectType = {
  id: string;
  name: string;
  control: any;
  rules:
    | {
        validate: (value: ValueType) => string | boolean;
      }
    | undefined;
  placeholder?: string;
  options: OptionsOrGroups<any, GroupBase<Options>> | undefined;
};

const ReactSelect = ({ id, name, control, rules, placeholder, options }: SelectType) => {
  return (
    <Controller
      name={name}
      control={control}
      rules={rules}
      render={({ field }) => {
        return (
          /** @ts-ignore Library issue */
          <Select
            {...field}
            id={id}
            placeholder={placeholder}
            options={options}
            styles={customStyles}
          />
        );
      }}
    />
  );
};

export default ReactSelect;
