import { Heading, VStack } from "@chakra-ui/react";
import AddDirection from "./AddDirection";
import DirectionstList, { DirectionType } from "./DirectionsList";

interface DirectionsProps {
  directions: Array<DirectionType>;
  setDirections: React.Dispatch<React.SetStateAction<DirectionType[]>>;
}

const Directions = ({ directions, setDirections }: DirectionsProps) => {
  const addDirection = (direction: DirectionType) => {
    setDirections([...directions, direction]);
  };

  const removeDirection = (id: string) => {
    const newDirections = directions.filter((direction: DirectionType) => {
      return direction.id !== id;
    });
    setDirections(newDirections);
  };

  return (
    <VStack border="1px solid black" borderRadius="16px" p="16px" w="100%">
      <Heading size="lg">Directions</Heading>
      <DirectionstList
        directions={directions}
        removeDirection={removeDirection}
        setDirections={setDirections}
      />
      <AddDirection addDirection={addDirection} />
    </VStack>
  );
};

export default Directions;
