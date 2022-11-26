import React, { useEffect, useState } from "react";
import { GiFireBowl } from "react-icons/gi";
import { GrEdit } from "react-icons/gr";
import { IngredientQuantityType } from "./Ingredients/IngredientList";
import { DirectionType } from "./Directions/DirectionsList";
import { useRouter } from "next/router";
import useAPI from "./API/ApiProvider";
import {
  Flex,
  Heading,
  HStack,
  Icon,
  IconButton,
  Image,
  List,
  ListItem,
  OrderedList,
  Text,
  VStack,
} from "@chakra-ui/react";

export interface RecipeType {
  id: number;
  name: string;
  type: string;
  ingredients: Array<IngredientQuantityType>;
  directions: Array<DirectionType>;
  author_name: string;
}

const RecipeComponent = (recipe: RecipeType) => {
  const { setUserCanEditRecipe } = useAPI();
  const [userCanEdit, setUserCanEdit] = useState(false);

  useEffect(() => {
    setUserCanEditRecipe(recipe.id.toString(), setUserCanEdit);
  }, [recipe.id]);

  const router = useRouter();

  const ingredients = Array.from(recipe.ingredients);
  const directions = Array.from(recipe.directions);

  return (
    <Flex justifyContent="center">
      <VStack
        w="65%"
        alignItems="start"
        borderLeft="1px dashed"
        pl={8}
        mt={4}
        borderColor="font"
      >
        <HStack justify="space-between" mt={4} w="100%">
          <Heading>{recipe.name}</Heading>
          {userCanEdit ? (
            <IconButton
              aria-label="edit-recipe"
              icon={<GrEdit />}
              size="m"
              onClick={() => router.push(`/editRecipe/${recipe.id}`)}
              boxSize="40px"
            ></IconButton>
          ) : null}
        </HStack>
        <Text pl={4}>
          {recipe.type} by {recipe.author_name}
        </Text>
        <HStack align="flex-start" justify="space-between" py={4} w="100%">
          <VStack>
            <Heading size="md">Ingredients</Heading>
            <List>
              {ingredients.map((ing: IngredientQuantityType) => (
                <ListItem key={ing.id}>
                  <Icon as={GiFireBowl} m="0px 10px" color="button" />
                  {ing.name} {ing.amount}
                  {ing.unit}
                </ListItem>
              ))}
            </List>
          </VStack>
          <Image
            alt="Image not found"
            border="1px solid black"
            borderRadius="32px"
            minH="250px"
            minW="250px"
            maxH="500px"
            maxW="500px"
            src={`${process.env.NEXT_PUBLIC_API}static/images/${recipe.id}.jpg`}
          />
        </HStack>

        <VStack alignItems="left">
          <Heading size="md">Directions</Heading>
          <OrderedList listStylePosition="inside">
            {directions.map((dir: DirectionType) => (
              <ListItem key={dir.id}>{dir.direction}</ListItem>
            ))}
          </OrderedList>
        </VStack>
      </VStack>
    </Flex>
  );
};

export default RecipeComponent;
