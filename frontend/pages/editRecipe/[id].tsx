import React, { useState, useEffect, FormEvent } from "react";
import { Heading, Input, VStack, Container, Button } from "@chakra-ui/react";
import { toast } from "react-toastify";
import { useRouter } from "next/router";
import { API } from "config";
import useAuth from "components/Auth/useAuth";
import useAPI from "components/API/ApiProvider";
import { DirectionType } from "components/Directions/DirectionsList";
import { NotSignedInWarning, UnauthorizedWarning } from "components/Warnings";
import { IngredientQuantityType } from "components/Ingredients/IngredientList";
import { RecipeType } from "components/RecipeDetail";
import RecipeTypeSelect from "components/Selects/RecipeTypeSelect";
import { Option } from "components/Selects/CustomSelect";
import Ingredients from "components/Ingredients/Ingredients";
import Directions from "components/Directions/Directions";

const NewRecipeComponent = () => {
  const [ingredients, setIngredients] = useState<Array<IngredientQuantityType>>(
    []
  );
  const [directions, setDirections] = useState<Array<DirectionType>>([]);
  const [name, setName] = useState("");
  const [type, setType] = useState<Option>();
  const [file, setFile] = useState<File>();
  const { axiosInstance, token } = useAuth();
  const { setUserCanEditRecipe, fetchRecipe } = useAPI();
  const router = useRouter();
  const [userCanEdit, setUserCanEdit] = useState(false);

  useEffect(() => {
    if (router.query.id) {
      setUserCanEditRecipe(router.query.id as string, setUserCanEdit);
      fetchRecipe(router.query.id as String).then((recipe: RecipeType) => {
        setIngredients(recipe.ingredients);
        // dnd needs ids to be of type string
        setDirections(
          recipe.directions.map((dir) => {
            dir.id = dir.id.toString();
            return dir;
          })
        );

        setName(recipe.name);
        setType({ label: recipe.type, value: recipe.type });
      });
    }
  }, [router.query]);

  const updateRecipe = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (ingredients.length < 1) {
      toast.error("Enter at least 1 ingredient!");
    } else {
      let data = new FormData(e.currentTarget);
      if (file) {
        data.append("image", file, file.name);
      }
      data.append("ingredients", JSON.stringify(ingredients));
      data.append("directions", JSON.stringify(directions));
      axiosInstance
        .put(`${API}recipes/${router.query.id}`, data)
        .then((response) => {
          router.push(`/recipes/${router.query.id}`);
          toast.success("Recipe updated!");
        })
        .catch((error) => {
          toast.error(error.response.data.message);
        });
    }
  };

  if (!token) {
    return <NotSignedInWarning />;
  }

  if (!userCanEdit) {
    return <UnauthorizedWarning />;
  }

  return (
    <form id="recipeForm" onSubmit={updateRecipe}>
      <Container centerContent>
        <VStack p={4}>
          <Heading p={4}>Edit your recipe</Heading>
          <Input
            name="name"
            placeholder="Recipe name"
            textAlign={"left"}
            required
            value={name}
            onChange={(e) => {
              setName(e.target.value);
            }}
          />
          <RecipeTypeSelect w="100%" value={type} onChange={setType} />

          <Input
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
