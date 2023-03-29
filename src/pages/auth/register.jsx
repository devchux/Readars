import { Box, Button, Flex, Input, Link, Text } from "@chakra-ui/react";
import React from "react";
import { Link as ReactLink } from "react-router-dom";

const Register = () => {
  return (
    <Flex as="form" direction="column" gap="5">
      <Box>
        <Text>First Name</Text>
        <Input type="text" placeholder="Enter First Name" />
      </Box>
      <Box>
        <Text>Last Name</Text>
        <Input type="text" placeholder="Enter First Name" />
      </Box>
      <Box>
        <Text>Email</Text>
        <Input type="email" placeholder="Enter Email" />
      </Box>
      <Box>
        <Text>Password</Text>
        <Input type="password" placeholder="Enter Password" />
      </Box>
      <Box>
        <Text>Confirm Password</Text>
        <Input type="password" placeholder="Enter Password" />
      </Box>
      <Box>
        <Text>
          Already have an account?{" "}
          <Link as={ReactLink} to="/auth" color="teal.500">
            Login
          </Link>
        </Text>
      </Box>
      <Box>
        <Button isLoading={false} colorScheme="teal">
          Register
        </Button>
      </Box>
    </Flex>
  );
};

export default Register;
