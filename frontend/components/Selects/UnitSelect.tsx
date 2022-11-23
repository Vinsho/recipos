import CustomSelect, { EditableSelectProps } from "./CustomSelect";
import React from "react";

const UnitSelect = ({ w, onChange }: EditableSelectProps) => {
  const options = [
    { value: "g", label: "g" },
    { value: "ml", label: "ml" },
    { value: "pc/s", label: "pc/s" },
  ];

  return (
    <CustomSelect
      w={w}
      options={options}
      name="unit"
      placeholder="Unit"
      onChange={onChange}
    />
  );
};

export default UnitSelect;
