import Select, { StylesConfig, GroupBase, MultiValue, SingleValue } from 'react-select';
import { Controller, Control } from 'react-hook-form';
import { ValueType } from '@/services/Validation';
import { OptionsType } from '@/types/index';

type Options = { value: number; label: string } | { value: string; label: string };

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
  control: Control<any, any>;
  rules:
    | {
        validate: (value: ValueType) => string | boolean;
      }
    | undefined;
  placeholder?: string;
  options: OptionsType;
};

const ReactSelect = ({ id, name, control, rules, placeholder, options }: SelectType) => {
  /**
   * Get the default value
   * @param value string
   * @returns
   */
  const getDefault = (value: string) => {
    const defaultOption = options?.filter(option => {
      if ('value' in option) {
        return option?.value === value;
      }
    });
    return defaultOption?.[0] as Options;
  };

  const getValueFromOption = (selectedOption: MultiValue<Options> | SingleValue<Options>) => {
    return selectedOption && !Array.isArray(selectedOption) && 'value' in selectedOption ? selectedOption.value : '';
  };

  return (
    <Controller
      name={name}
      control={control}
      rules={rules}
      render={({ field }) => {
        const value = typeof field.value === 'string' ? field.value : '';
        return (
          <Select
            {...field}
            id={id}
            placeholder={placeholder}
            value={getDefault(value)}
            onChange={selectedOption => field.onChange(getValueFromOption(selectedOption))}
            options={options}
            styles={customStyles}
          />
        );
      }}
    />
  );
};

export default ReactSelect;
