import { Button, Container, Heading, Input, VStack } from "@chakra-ui/react";
import axios from "axios";
import { useRouter } from "next/router";
import useAuth from "components/Auth/useAuth";
import { toast } from "react-toastify";

const LoginComponent = () => {
  const router = useRouter();
  const { onLogin } = useAuth();

  const Login = (e: any) => {
    e.preventDefault();
    const formData = new FormData(e.target);

    axios
      .post(`${process.env.NEXT_PUBLIC_API}userLogin`, formData)
      .then((response) => {
        onLogin(response.data);
        router.push("/recipes");
        toast.success("Welcome back!");
      })
      .catch((error) => {
        toast.error(error.response.data.message);
      });
  };

  return (
    <form id="loginForm" onSubmit={Login}>
      <Container centerContent>
        <VStack p={4} w="100%">
          <Heading p={4} size="md">
            Email
          </Heading>
          <Input name="email" placeholder="Email address" required></Input>

          <Heading p={4} size="md">
            Password
          </Heading>
          <Input
            name="password"
            placeholder="Enter Password"
            type="password"
            required
          ></Input>

          <Button color="font" m={4} type="submit">
            Login
          </Button>
          <Heading size="sm" pt={"36px"}>
            Do not have an account yet?
          </Heading>
          <Button color="font" m={4} onClick={() => router.push("/signUp")}>
            Sign up
          </Button>
        </VStack>
      </Container>
    </form>
  );
};
export default LoginComponent;
