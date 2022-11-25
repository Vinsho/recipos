import { useEffect, useState } from "react";
import { NotFoundWarning } from "components/Warnings";
import { RecipeType } from "components/RecipeDetail";
import RecipesFilter from "components/RecipesFilter";
import RecipeBoxComponent from "components/RecipeBox";
import { Flex, VStack } from "@chakra-ui/react";

const Recipes = () => {
  useEffect(() => {
    fetchRecipes();
  }, []);

  const [recipes, setRecipes] = useState<Array<RecipeType>>([]);
  const [filteredRecipes, setFilteredRecipes] = useState<Array<RecipeType>>([]);

  const fetchRecipes = async () => {
    let recipesJson;
    try {
      const recipesData = await fetch(`${process.env.NEXT_PUBLIC_API}recipes`);
      recipesJson = await recipesData.json();
    } catch (error) {
      recipesJson = null;
    }
    setRecipes(recipesJson);
    setFilteredRecipes(recipesJson);
  };
  return (
    <>
      {recipes == null ? (
        <NotFoundWarning />
      ) : (
        <VStack>
          <RecipesFilter
            recipes={recipes}
            setFilteredRecipes={setFilteredRecipes}
          ></RecipesFilter>
          <Flex>
            {filteredRecipes.map((recipe: RecipeType) => (
              <RecipeBoxComponent key={recipe.id} recipe={recipe} />
            ))}
          </Flex>
        </VStack>
      )}
    </>
  );
};

export default Recipes;
