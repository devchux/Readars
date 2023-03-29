import {
  Box,
  Button,
  Flex,
  FormControl,
  FormErrorMessage,
  Input,
  Link,
  Select,
  Text,
} from "@chakra-ui/react";
import React from "react";
import { useForm } from "react-formid";
import { useMutation, useQuery } from "react-query";
import validator from "validator";
import { Link as ReactLink, useNavigate } from "react-router-dom";
import { useApp } from "../../hooks/useApp";

const Register = () => {
  const { register, getBanks } = useApp();
  const navigate = useNavigate();
  const {
    handleSubmit,
    getFieldProps,
    errors,
    setFieldValue,
    inputs,
    setInputs,
  } = useForm({
    defaultValues: {
      first_name: "",
      last_name: "",
      email: "",
      bank_code: "",
      bank_account_number: "",
      bank_name: "",
      password: "",
      confirm_password: "",
    },
    validation: {
      first_name: {
        required: true,
      },
      email: {
        required: (val) => !!val || "Email address is required",
        isValid: (val) => validator.isEmail(val) || "Email address is invalid",
      },
      last_name: {
        required: true,
      },
      bank_code: {
        required: true || "Select a bank",
      },
      bank_account_number: {
        required: true || "Account number is required",
      },
      password: {
        required: (val) => !!val || "Password is required",
        hasMoreThan6Chars: (val) =>
          val.length >= 8 || "Please enter 8 or more characters",
      },
      confirm_password: {
        shouldMatch: (val, { password }) =>
          val === password || "Passwords do not match",
      },
    },
  });

  const { mutate, isLoading } = useMutation(register, {
    onSuccess() {
      navigate("/app");
    },
    onError(err) {
      errorHandler(err);
    },
  });

  const { data: banks } = useQuery(["BANKS"], () => getBanks());

  console.log(banks);

  const onSubmit = (data) => mutate(data);

  return (
    <Flex
      as="form"
      onSubmit={handleSubmit(onSubmit)}
      direction="column"
      gap="5"
      mb="12"
    >
      <FormControl isInvalid={!!errors.first_name}>
        <Text>First Name</Text>
        <Input
          type="text"
          placeholder="Enter First Name"
          {...getFieldProps("first_name")}
        />
        {errors.first_name && (
          <FormErrorMessage>{errors.first_name}</FormErrorMessage>
        )}
      </FormControl>
      <FormControl isInvalid={!!errors.last_name}>
        <Text>Last Name</Text>
        <Input
          type="text"
          placeholder="Enter Last Name"
          {...getFieldProps("last_name")}
        />
        {errors.last_name && (
          <FormErrorMessage>{errors.last_name}</FormErrorMessage>
        )}
      </FormControl>
      <FormControl isInvalid={!!errors.email}>
        <Text>Email</Text>
        <Input
          type="email"
          placeholder="Enter Email"
          {...getFieldProps("email")}
        />
        {errors.email && <FormErrorMessage>{errors.email}</FormErrorMessage>}
      </FormControl>
      <FormControl isInvalid={!!errors.bank_code}>
        <Text>Bank</Text>
        <Select
          placeholder="Select bank"
          onChange={({ target: { value } }) => {
            const i = JSON.parse(value)
            setInputs({
              ...inputs,
              bank_name: i.name,
              bank_code: i.code,
            });
          }}
        >
          {banks?.data?.map((bank) => (
            <option key={bank.code} value={JSON.stringify(bank)}>
              {bank.name}
            </option>
          ))}
        </Select>
        {errors.bank_code && (
          <FormErrorMessage>{errors.bank_code}</FormErrorMessage>
        )}
      </FormControl>
      <FormControl isInvalid={!!errors.bank_account_number}>
        <Text>Bank Account Number</Text>
        <Input
          type="text"
          placeholder="Enter Bank Account Number"
          value={inputs.bank_account_number}
          onChange={({ target: { value } }) => {
            if (Number.isNaN(Number(value))) return;

            setFieldValue("bank_account_number", value);
          }}
        />
        {errors.bank_account_number && (
          <FormErrorMessage>{errors.bank_account_number}</FormErrorMessage>
        )}
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
      <FormControl isInvalid={!!errors.confirm_password}>
        <Text>Confirm Password</Text>
        <Input
          type="password"
          placeholder="Enter Password"
          {...getFieldProps("confirm_password")}
        />
        {errors.confirm_password && (
          <FormErrorMessage>{errors.confirm_password}</FormErrorMessage>
        )}
      </FormControl>
      <Box>
        <Text>
          Already have an account?{" "}
          <Link as={ReactLink} to="/auth" color="teal.500">
            Login
          </Link>
        </Text>
      </Box>
      <Box>
        <Button
          type="submit"
          isLoading={isLoading}
          display="block"
          w="full"
          colorScheme="teal"
        >
          Register
        </Button>
      </Box>
    </Flex>
  );
};

export default Register;
