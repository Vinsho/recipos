import CustomSelect, { EditableSelectProps } from "./CustomSelect";

const RecipeTypeSelect = ({
  w,
  isMulti,
  onChange,
  value,
}: EditableSelectProps) => {
  const options = [
    { value: "soup", label: "soup" },
    { value: "main_dish", label: "main dish" },
    { value: "dessert", label: "dessert" },
  ];

  return (
    <CustomSelect
      isMulti={isMulti}
      w={w}
      options={options}
      name="type"
      placeholder="Select recipe type"
      onChange={onChange}
      value={value}
    />
  );
};

export default RecipeTypeSelect;
