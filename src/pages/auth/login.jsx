import {
  Box,
  Button,
  Flex,
  FormControl,
  FormErrorMessage,
  Input,
  Link,
  Text,
} from "@chakra-ui/react";
import React from "react";
import { useForm } from "react-formid";
import { useMutation } from "react-query";
import validator from "validator";
import { Link as ReactLink, useNavigate } from "react-router-dom";
import { useApp } from "../../hooks/useApp";

const Login = () => {
  const { login, errorHandler } = useApp();
  const navigate = useNavigate();
  const { handleSubmit, getFieldProps, errors } = useForm({
    defaultValues: {
      email: "",
      password: "",
    },
    validation: {
      email: {
        required: (val) => !!val || "Email address is required",
        isValid: (val) => validator.isEmail(val) || "Email address is invalid",
      },
      password: {
        required: (val) => !!val || "Password is required",
        hasMoreThan6Chars: (val) =>
          val.length >= 8 || "Please enter 8 or more characters",
      },
    },
  });

  const { mutate, isLoading } = useMutation(login, {
    onSuccess() {
      navigate("/app");
    },
    onError(err) {
      errorHandler(err);
    },
  });

  const onSubmit = (data) => mutate(data);

  return (
    <Flex
      as="form"
      onSubmit={handleSubmit(onSubmit)}
      direction="column"
      gap="5"
    >
      <FormControl isInvalid={!!errors.email}>
        <Text>Email</Text>
        <Input
          type="email"
          placeholder="Enter Email"
          {...getFieldProps("email")}
        />
        {errors.email && <FormErrorMessage>{errors.email}</FormErrorMessage>}
      </FormControl>
      <FormControl isInvalid={!!errors.password}>
        <Text>Password</Text>
        <Input
          type="password"
          placeholder="Enter Password"
          {...getFieldProps("password")}
        />
        {errors.password && (
          <FormErrorMessage>{errors.password}</FormErrorMessage>
        )}
      </FormControl>
      <Box>
        <Text>
          Don't have an account?{" "}
          <Link as={ReactLink} to="/auth/register" color="teal.500">
            Register Now
          </Link>
        </Text>
      </Box>
      <Box>
        <Button
          type="submit"
          isLoading={isLoading}
          colorScheme="teal"
          display="block"
          w="full"
        >
          Login
        </Button>
      </Box>
    </Flex>
  );
};

export default Login;
