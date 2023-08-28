import React from "react";
import { Container, Input, Heading, Text, Box, Button } from "@chakra-ui/react";
import "styles/global.scss";
import Layout from "components/Layout";
import { NavLink } from "react-router-dom";

import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { ErrorMessage } from "@hookform/error-message";
import { useNavigate, Navigate } from "react-router-dom";
import axios from "axios";
import useAuth from "hooks/useAuth";

function Login() {
  const { auth, setAuth } = useAuth();
  const [errorMessage, setErrorMessage] = React.useState("");

  const navigate = useNavigate();
  const LoginSchema = yup.object().shape({
    email: yup.string().email("Invalid email").required("Required"),
    password: yup.string().required("Required"),
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    resolver: yupResolver(LoginSchema),
  });
  const onSubmitHandler = async (data: any) => {
    try {
      const response = await axios.post("/users/login", JSON.stringify(data), {
        headers: {
          "Content-Type": "application/json",
          withCredentials: true,
        },
      });

      const { id, role, firstName, lastName, token, userData } = response.data;
      setAuth({ id, role, firstName, lastName, token, userData });
      localStorage.setItem(
        "DIRECTORY_USER",
        JSON.stringify({
          id,
          role,
          firstName,
          lastName,
          token,
          userData,
        })
      );
      reset();
      navigate("/");
    } catch (err: any) {
      if (!err?.response) {
        setErrorMessage("no server response");
      } else if (err.response?.status === 400) {
        setErrorMessage("Missing login details");
      } else if (err.response?.status === 401) {
        setErrorMessage(err.response?.data.error);
      } else {
        setErrorMessage("Login failed");
      }
    }
  };

  if (auth.id) return <Navigate to="/" />;

  const onInvalid = (errors: any) => "an error occurred";
  return (
    <Layout>
      <Container>
        <Box>
          <Heading as="h1" mb="1em">
            Login
          </Heading>
          <Text fontWeight="bold">Email</Text>
          <ErrorMessage
            errors={errors}
            as={<Text />}
            color="red"
            fontWeight="bold"
            name="email"
          />
          <Input {...register("email")} variant="filled" mb="1em" isRequired />
          <Text fontWeight="bold">Password</Text>
          <ErrorMessage
            errors={errors}
            as={<Text />}
            color="red"
            fontWeight="bold"
            name="password"
          />
          <Input
            {...register("password")}
            type="password"
            variant="filled"
            isRequired
          />
          <Text color="red" fontWeight="bold" mt="10px" fontSize="1em">
            {errorMessage}
          </Text>
          <Button
            mt="20px"
            type="submit"
            width="full"
            fontWeight="bold"
            fontSize="20px"
            bgColor="primary.main"
            onClick={handleSubmit(onSubmitHandler, onInvalid)}
          >
            Login
          </Button>
        </Box>
        <Box my="10px">
          <NavLink to="/register">Register</NavLink>
        </Box>
      </Container>
    </Layout>
  );
}

export default Login;
