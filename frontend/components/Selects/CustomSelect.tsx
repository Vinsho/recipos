import { Box } from "@chakra-ui/react";
import { Select } from "chakra-react-select";
import { SelectStyle } from "styles/Select";

export interface Option {
  value: string;
  label: string;
}

export interface EditableSelectProps {
  w: string;
  onChange?: any;
  value?: any;
  isMulti?: boolean;
}

export interface CustomSelectProps extends EditableSelectProps {
  options: Option[];
  name: string;
  placeholder: string;
}

function CustomSelect({
  w,
  options,
  name,
  placeholder,
  onChange,
  value,
  isMulti,
}: CustomSelectProps) {
  return (
    <Box w={w}>
      <Select
        isMulti={isMulti}
        name={name}
        placeholder={placeholder}
        options={options}
        chakraStyles={SelectStyle}
        onChange={onChange}
        value={value}
      />
    </Box>
  );
}

export default CustomSelect;
