import Select from 'react-select';

interface IReactReactMultiSelect {
  options: any;
  onChange: any;
  value: any;
}

const ReactMultiSelect = ({ onChange, options, value }: IReactReactMultiSelect) => {
  const theValue = (options: any, value: any) => {
    return options ? options.find((option: any) => option.value === value) : '';
  };

  return (
    <Select
      isMulti
      options={options}
      styles={style}
      onChange={(e) => onChange(e)}
      value={theValue(options, value)}
    />
  );
};

//Styles for the select
const style = {
  control: (base: any, state: any) => ({
    ...base,
    color: state.isFocused && '#212529',
    backgroundColor: '#fff',
    borderColor: state.isFocused ? '#86b7fe' : '#CED4DA',
    outline: state.isFocused && '0',
    boxShadow: state.isFocused && '0 0 0 0.25rem rgb(13 110 253 / 25%)',
  }),
};

export default ReactMultiSelect;
