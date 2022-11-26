import { Image, Text, VStack } from "@chakra-ui/react";
import Link from "next/link";
import { RecipeType } from "./RecipeDetail";

interface RecipeBoxProps {
  recipe: RecipeType;
}

const RecipeBoxComponent = ({ recipe }: RecipeBoxProps) => {
  return (
    <Link href={"/recipes/" + recipe.id}>
      <VStack
        boxSize="200px"
        borderRadius="8px"
        border="1px solid"
        borderColor="panel"
        m={2}
        _hover={{ border: "3px solid", borderColor: "button" }}
      >
        <Image
          alt="Image not found"
          src={`${process.env.NEXT_PUBLIC_API}static/images/${recipe.id}.jpg`}
          boxSize="100%"
          borderTopRadius="8px"
        />
        <Text fontSize="md">{recipe.name}</Text>
      </VStack>
    </Link>
  );
};

export default RecipeBoxComponent;
