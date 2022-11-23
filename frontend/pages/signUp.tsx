import { Button, Container, Heading, Input, VStack } from "@chakra-ui/react";
import axios from "axios";
import { API } from "config";
import { useRouter } from "next/router";
import { toast } from "react-toastify";

const SignUpComponent = () => {
  const router = useRouter();

  const signUp = (e: any) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const formProps = Object.fromEntries(formData);
    if (formProps.password !== formProps.passwordAgain) {
      toast.error("Passwords don't match!");
    } else {
      axios
        .post(`${API}users`, formData)
        .then((response) => {
          router.push("/login");
          toast.success("Sign Up was successful!");
        })
        .catch((error) => {
          toast.error(error.response.data.message);
        });
    }
  };

  return (
    <form id="signUpForm" onSubmit={signUp}>
      <Container centerContent>
        <VStack p={4} w="100%">
          <Heading p={4}>Greetings!</Heading>

          <Heading p={4} size="md">
            Enter your email
          </Heading>
          <Input name="email" placeholder="Email address" required></Input>

          <Heading p={4} size="md">
            Choose a unique nickname
          </Heading>
          <Input name="name" placeholder="Nickname" required></Input>

          <Heading p={4} size="md">
            Set password
          </Heading>
          <Input
            name="password"
            placeholder="Set Password"
            type="password"
            required
          ></Input>
          <Input
            name="passwordAgain"
            placeholder="Repeat Password"
            type="password"
            required
          ></Input>

          <Button color="font" m={4} type="submit">
            Sign Up
          </Button>
        </VStack>
      </Container>
    </form>
  );
};
export default SignUpComponent;
