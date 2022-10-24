import Select, { StylesConfig, GroupBase, MultiValue, SingleValue } from 'react-select';
import { Controller, Control } from 'react-hook-form';
import { ValueType } from '@/services/Validation';
import { OptionsType } from '@/types/index';

type Options = { value: number; label: string } | { value: string; label: string };

const customStyles: StylesConfig<Options | GroupBase<Options>, boolean, GroupBase<Options>> = {
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
      paddingTop: '0px',
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
  isMulti?: boolean;
};

const ReactSelect = ({ id, name, control, rules, placeholder, options, isMulti }: SelectType) => {
  /**
   * Get the default value
   * @param value string
   * @returns
   */
  const getDefault = (value: string | string[]) => {
    const isValueType = typeof value === 'string';

    const defaultOption = options?.filter(option => {
      let foundOption = false;
      const optionValue = 'value' in option ? option?.value : '';

      if (isValueType || typeof value === 'number') {
        foundOption = optionValue === value;
      } else if (Array.isArray(value)) {
        foundOption = value.filter(v => v === optionValue).length > 0;
      }

      return foundOption;
    });

    return isValueType ? defaultOption?.[0] : defaultOption;
  };

  /**
   * Get Value for onChange event
   * @param selectedOption
   * @returns
   */
  const getOnChangeValue = (selectedOption: SingleValue<Options | GroupBase<Options>> | MultiValue<Options | GroupBase<Options>>) => {
    if (selectedOption && !Array.isArray(selectedOption)) {
      return 'value' in selectedOption ? selectedOption.value : '';
    }
    if (selectedOption && Array.isArray(selectedOption)) {
      return selectedOption.map(selected => {
        const multiSelected = selected as Options;
        return multiSelected.value;
      });
    }
  };

  return (
    <Controller
      name={name}
      control={control}
      rules={rules}
      render={({ field }) => {
        let fieldValue: string | string[] = '';
        if (typeof field.value === 'string') {
          fieldValue = field.value;
        } else if (Array.isArray(field.value)) {
          fieldValue = field.value;
        }
        return (
          <Select
            {...field}
            id={id}
            placeholder={placeholder}
            value={getDefault(fieldValue)}
            onChange={selectedOption => field.onChange(getOnChangeValue(selectedOption))}
            isMulti={isMulti}
            options={options}
            styles={customStyles}
          />
        );
      }}
    />
  );
};

export default ReactSelect;
