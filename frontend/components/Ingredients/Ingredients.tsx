import { Heading, VStack } from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import useAPI from "components/API/ApiProvider";
import AddIngredient from "./AddIngredient";
import IngredientList, { IngredientQuantityType } from "./IngredientList";
import { toast } from "react-toastify";

interface IngredientsProps {
  ingredients: Array<IngredientQuantityType>;
  setIngredients: React.Dispatch<
    React.SetStateAction<IngredientQuantityType[]>
  >;
}

const Ingredients = ({ ingredients, setIngredients }: IngredientsProps) => {
  const [avaialbleIngredients, setAvailableIngredients] = useState([]);
  const { getAvailableIngredients } = useAPI();

  useEffect(() => {
    getAvailableIngredients().then((ingredients) => {
      setAvailableIngredients(ingredients);
    });
  }, []);

  const addIngredient = (new_ingredient: IngredientQuantityType) => {
    if (ingredients.some((ing) => ing.name == new_ingredient.name)) {
      toast.error("Ingredient already present!");
    } else {
      setIngredients([...ingredients, new_ingredient]);
    }
  };

  const removeIngredient = (id: number | string) => {
    const newIngredients = ingredients.filter((ing: IngredientQuantityType) => {
      return ing.id !== id;
    });
    setIngredients(newIngredients);
  };

  return (
    <VStack border="1px solid black" borderRadius="16px" p="16px">
      <Heading size="lg">Ingredients</Heading>
      <IngredientList
        ingredients={ingredients}
        removeIngredient={removeIngredient}
      />
      <AddIngredient
        addIngredient={addIngredient}
        ingredients={avaialbleIngredients}
      />
    </VStack>
  );
};

export default Ingredients;
