// import { tada } from "react-animations";
import { Heading, HStack, Image } from "@chakra-ui/react";

export const NotFoundWarning = () => {
  return (
    <HStack w="100%" mt="15%" justifyContent="center">
      <Image boxSize="3%" src={"/chilli.png"} pr={4} />
      <Heading>Page not found!</Heading>
    </HStack>
  );
};

export const NotSignedInWarning = () => {
  return (
    <HStack w="100%" mt="15%" justifyContent="center">
      <Image boxSize="3%" src={"/chilli.png"} pr={4} />
      <Heading>You have to login!</Heading>
    </HStack>
  );
};

export const UnauthorizedWarning = () => {
  return (
    <HStack w="100%" mt="15%" justifyContent="center">
      <Image boxSize="3%" src={"/chilli.png"} pr={4} />
      <Heading>You are not authorized to see this!</Heading>
    </HStack>
  );
};
