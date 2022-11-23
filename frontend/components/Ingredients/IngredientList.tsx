import {
  Text,
  VStack,
  StackDivider,
  HStack,
  IconButton,
  Spacer,
} from "@chakra-ui/react";
import { FaTrashAlt } from "react-icons/fa";
import React from "react";

export interface IngredientQuantityType {
  id: number | string;
  name: string;
  amount: number;
  unit: string;
}
interface IngredientListType {
  ingredients: Array<IngredientQuantityType>;
  removeIngredient: (id: number | string) => void;
}

const IngredientList = ({
  ingredients,
  removeIngredient,
}: IngredientListType) => {
  if (!ingredients.length) {
    return <Text p={4}>Add some ingredients below!</Text>;
  }
  return (
    <VStack
      m={4}
      borderColor="font"
      borderWidth="2px"
      borderRadius="lg"
      p={4}
      w="80%"
      divider={<StackDivider borderColor="font" />}
    >
      {ingredients.map((ing: IngredientQuantityType) => (
        <HStack w="100%" key={ing.id}>
          <Text>{ing.name} - </Text>
          <Text>
            {ing.amount}
            {ing.unit}
          </Text>
          <Spacer />
          <IconButton
            aria-label="remove-ingredient"
            icon={<FaTrashAlt />}
            size="xs"
            onClick={() => removeIngredient(ing.id)}
          ></IconButton>
        </HStack>
      ))}
    </VStack>
  );
};

export default IngredientList;
