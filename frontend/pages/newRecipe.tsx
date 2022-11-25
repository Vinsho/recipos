import { toast } from "react-toastify";
import { useRouter } from "next/router";
import React, { useState, FormEvent } from "react";
import { Heading, Input, VStack, Container, Button } from "@chakra-ui/react";

import useAuth from "components/Auth/useAuth";
import { NotSignedInWarning } from "components/Warnings";
import Directions from "components/Directions/Directions";
import Ingredients from "components/Ingredients/Ingredients";
import RecipeTypeSelect from "components/Selects/RecipeTypeSelect";
import { DirectionType } from "components/Directions/DirectionsList";
import { IngredientQuantityType } from "components/Ingredients/IngredientList";

const NewRecipeComponent = () => {
  const [ingredients, setIngredients] = useState<Array<IngredientQuantityType>>(
    []
  );
  const [directions, setDirections] = useState<Array<DirectionType>>([]);
  const [file, setFile] = useState<File>();
  const { axiosInstance, token } = useAuth();
  const router = useRouter();

  const saveRecipe = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (ingredients.length < 1) {
      toast.error("Enter at least 1 ingredient!");
    } else {
      let data = new FormData(e.currentTarget);

      if (file) {
        data.append("image", file, file.name);
      }
      data.append("user_id", "1");
      data.append("ingredients", JSON.stringify(ingredients));
      data.append("directions", JSON.stringify(directions));
      axiosInstance
        .post(`${process.env.NEXT_PUBLIC_API}recipes`, data)
        .then((response) => {
          router.push("/recipes");
          toast.success("Recipe created!");
        })
        .catch((error) => {
          toast.error(error.response.data.message);
        });
    }
  };

  if (!token) {
    return <NotSignedInWarning />;
  }

  return (
    <form id="recipeForm" onSubmit={saveRecipe}>
      <Container centerContent>
        <VStack p={4}>
          <Heading p={4} color="font">
            Add your new recipe
          </Heading>
          <Input
            name="name"
            placeholder="Recipe name"
            textAlign={"left"}
            required
          />
          <RecipeTypeSelect w="100%" />
          <Input
            required
            pt={2}
            type="file"
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              e.target.files ? setFile(e.target.files[0]) : null
            }
            textAlign="start"
          />
          <Ingredients
            ingredients={ingredients}
            setIngredients={setIngredients}
          />
          <Directions directions={directions} setDirections={setDirections} />
        </VStack>
        <Button color="font" m={4} type="submit">
          Save recipe
        </Button>
      </Container>
    </form>
  );
};

export default NewRecipeComponent;
