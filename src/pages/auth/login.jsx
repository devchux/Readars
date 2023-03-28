import { Box, Button, Flex, Input, Link, Text } from "@chakra-ui/react";
import React from "react";
import { Link as ReactLink } from "react-router-dom";

const Login = () => {
  return (
    <Flex direction="column" gap="5">
      <Box>
        <Text>Email</Text>
        <Input type="email" placeholder="Enter Email" />
      </Box>
      <Box>
        <Text>Password</Text>
        <Input type="password" placeholder="Enter Password" />
      </Box>
      <Box>
        <Text>
          Don't have an account?{" "}
          <Link as={ReactLink} to="/auth/register" color="teal.500">
            Register Now
          </Link>
        </Text>
      </Box>
      <Box>
        <Button isLoading={false} colorScheme="teal">
          Login
        </Button>
      </Box>
    </Flex>
  );
};

export default Login;
