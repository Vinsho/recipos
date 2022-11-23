import { Heading, ListIcon, ListItem, List, VStack } from "@chakra-ui/react";
import { GiFireBowl } from "react-icons/gi";

const Home = () => {
  return (
    <VStack p="32px" w="100%" alignItems={"center"}>
      <Heading>Hello and welcome to</Heading>
      <Heading p={16} size="2xl" color="button">
        Recipes without annoying life stories!
      </Heading>
      <Heading pb={8}>Here you won&apos;t find anything like:</Heading>
      <List spacing={3} w="40%" border="1px" p={4} borderRadius="8px">
        <ListItem>
          <ListIcon as={GiFireBowl} color="button" />
          Me and my hubbie love this recipe so very much!
        </ListItem>
        <ListItem>
          <ListIcon as={GiFireBowl} color="button" />
          My mom used to make me this recipe when I was young!
        </ListItem>
        <ListItem>
          <ListIcon as={GiFireBowl} color="button" />I remember the winter night
          when I tasted this recipe for the first time and it changed my life.
          Here let me tell you in these 2000 words how.
        </ListItem>
      </List>
    </VStack>
  );
};

export default Home;
