import { Flex, Input } from "@chakra-ui/react";
import { MultiValue, OptionBase } from "chakra-react-select";
import React, { useEffect, useState } from "react";
import { RecipeType } from "./RecipeDetail";
import { IngredientType } from "./Ingredients/AddIngredient";
import RecipeTypeSelect from "./Selects/RecipeTypeSelect";
import IngredientsSelect from "./Selects/IngredientsSelect";
import { Option } from "./Selects/CustomSelect";

interface RecipesFilterType {
  recipes: Array<RecipeType>;
  setFilteredRecipes: (filteredRecipes: Array<RecipeType>) => void;
}

const RecipesFilter = ({ recipes, setFilteredRecipes }: RecipesFilterType) => {
  const [selectedTypes, setSelectedTypes] = useState<MultiValue<Option>>([]);

  const [selectedIngredients, setSelectedIngredients] = useState<
    MultiValue<IngredientType>
  >([]);

  const [searchedRecipe, setSearchedRecipe] = useState("");

  useEffect(() => {
    filterRecipes();
  }, [selectedTypes, selectedIngredients, searchedRecipe]);

  const isRecipeOfFileterdType = (
    recipe: RecipeType,
    selectedTypesValues: Array<string>
  ) => {
    if (!selectedTypesValues.length) {
      return true;
    }
    return selectedTypesValues.includes(recipe.type);
  };

  const recipeContainsIngredients = (
    recipe: RecipeType,
    selectedIngredientsValues: Array<string>
  ) => {
    const recipeIngredientsNames = recipe.ingredients?.map(({ name }) => name);

    if (!selectedIngredientsValues.length) {
      return true;
    }
    return selectedIngredientsValues.every((ing) =>
      recipeIngredientsNames?.includes(ing)
    );
  };

  const filterRecipes = () => {
    const selectedIngredientsValues = selectedIngredients.map(
      ({ value }) => value
    );
    const searchedRecipeLowercase = searchedRecipe.toLowerCase();
    const selectedTypesValues = selectedTypes.map(({ value }) => value);

    let filteredRecipes: Array<RecipeType> = [];

    recipes.forEach((recipe: RecipeType) => {
      if (
        recipe.name.toLowerCase().includes(searchedRecipeLowercase) &&
        isRecipeOfFileterdType(recipe, selectedTypesValues) &&
        recipeContainsIngredients(recipe, selectedIngredientsValues)
      ) {
        filteredRecipes.push(recipe);
      }
    });

    setFilteredRecipes(filteredRecipes);
  };

  return (
    <Flex alignSelf="center" pt="12px">
      <Input
        width={"320px"}
        value={searchedRecipe}
        onChange={(e) => setSearchedRecipe(e.target.value)}
        placeholder="Enter recipe name"
      ></Input>
      <RecipeTypeSelect
        isMulti
        w="320px"
        value={selectedTypes}
        onChange={setSelectedTypes}
      />
      <IngredientsSelect
        w="320px"
        isMulti
        value={selectedIngredients}
        onChange={setSelectedIngredients}
      />
    </Flex>
  );
};

export default RecipesFilter;
