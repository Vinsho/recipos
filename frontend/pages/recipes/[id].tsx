import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import useAPI from "components/API/ApiProvider";
import RecipeComponent, { RecipeType } from "components/RecipeDetail";
import { NotFoundWarning } from "components/Warnings";

const Recipe = () => {
  const { fetchRecipe } = useAPI();
  const { query } = useRouter();
  const [recipe, setRecipe] = useState<RecipeType>();

  useEffect(() => {
    if (query.id) {
      fetchRecipe(query.id as String).then((recipe) => {
        setRecipe(recipe);
      });
    }
  }, [query]);

  if (recipe == null) {
    return NotFoundWarning();
  }
  return <RecipeComponent {...recipe} />;
};

export default Recipe;
