import { nanoid } from "nanoid";
import useAuth from "../Auth/useAuth";

const useAPI = () => {
  const { axiosInstance } = useAuth();

  const setUserCanEditRecipe = (
    recipe_id: String,
    setUserCanEdit: (can: boolean) => void
  ) => {
    axiosInstance
      .get(`${process.env.NEXT_PUBLIC_API}userCanEdit/${recipe_id}`)
      .then((response) => {
        if (response.data.message === true) {
          setUserCanEdit(true);
        }
      })
      .catch(() => {});
  };

  const getAvailableIngredients = async () => {
    let availableIngredients;

    try {
      const ingredientsData = await fetch(
        `${process.env.NEXT_PUBLIC_API}ingredients`
      );

      availableIngredients = await ingredientsData.json();
      availableIngredients = availableIngredients.map(
        (ing: { name: string }) => {
          return { id: nanoid(), value: ing.name, label: ing.name };
        }
      );
    } catch (error) {
      availableIngredients = [];
    }

    return availableIngredients;
  };

  const fetchRecipe = async (recipe_id: String) => {
    let recipeJson;
    try {
      const recipeData = await fetch(
        `${process.env.NEXT_PUBLIC_API}recipes/${recipe_id}`
      );
      recipeJson = await recipeData.json();
    } catch (error) {
      recipeJson = null;
    }
    return recipeJson;
  };

  return {
    setUserCanEditRecipe: setUserCanEditRecipe,
    getAvailableIngredients: getAvailableIngredients,
    fetchRecipe: fetchRecipe,
  };
};

export default useAPI;
