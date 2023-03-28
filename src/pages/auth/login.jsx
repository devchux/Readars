import { Box, Button, Flex, Input, Link, Text } from "@chakra-ui/react";
import React from "react";

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
        <Text>Don't have an account? <Link href="/auth/register" color="teal.500">Register Now</Link></Text>
      </Box>
      <Box>
        <Button isLoading={false} colorScheme="teal">Login</Button>
      </Box>
    </Flex>
  );
};

export default Login;
