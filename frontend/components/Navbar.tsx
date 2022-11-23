import { Button, HStack, Link } from "@chakra-ui/react";
import React from "react";
import useAuth from "./Auth/useAuth";

const Navbar = () => {
  const { token, onLogout } = useAuth();

  const SignedIn = () => {
    if (token) {
      return (
        <Button color="font">
          <Link href="/login">
            <a onClick={() => onLogout()}>Log out</a>
          </Link>
        </Button>
      );
    } else {
      return (
        <Button color="font">
          <Link href="/login">Login</Link>
        </Button>
      );
    }
  };

  return (
    <HStack
      h="80px"
      justifyContent="space-between"
      alignSelf="center"
      px={4}
      bg="panel"
    >
      <Link href="/" variant="navbar" fontWeight="bold">
        Home
      </Link>
      <HStack>
        <Link href="/newRecipe" variant="navbar">
          New Recipe
        </Link>
        <Link href="/recipes" variant="navbar">
          Recipes
        </Link>
      </HStack>
      <SignedIn />
    </HStack>
  );
};

export default Navbar;
