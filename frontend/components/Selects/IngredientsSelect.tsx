import useAPI from "components/API/ApiProvider";
import { useEffect, useState } from "react";
import CustomSelect, { EditableSelectProps } from "./CustomSelect";

const IngredientsSelect = ({
  w,
  isMulti,
  onChange,
  value,
}: EditableSelectProps) => {
  const { getAvailableIngredients } = useAPI();
  const [ingredientOptions, setIngredientOptions] = useState([]);

  useEffect(() => {
    getAvailableIngredients().then((ingredients) => {
      setIngredientOptions(ingredients);
    });
  }, []);

  return (
    <CustomSelect
      w={w}
      options={ingredientOptions}
      name="ingredients"
      placeholder="Select Ingredient"
      isMulti={isMulti}
      onChange={onChange}
      value={value}
    />
  );
};

export default IngredientsSelect;
