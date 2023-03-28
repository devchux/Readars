import { Box, Heading } from "@chakra-ui/react";
import React from "react";
import { Outlet } from "react-router-dom";

const AuthLayout = () => {
  return (
    <Box maxW="md" m="auto">
      <Heading textAlign="center" mt="16" mb="8">
        Readars
      </Heading>
      <Box>
        <Outlet />
      </Box>
    </Box>
  );
};

export default AuthLayout;
