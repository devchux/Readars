import {
  Box,
  Button,
  ButtonGroup,
  Flex,
  Heading,
  Stack,
} from "@chakra-ui/react";
import React from "react";
import { Outlet } from "react-router-dom";

const AppLayout = () => {
  return (
    <Box maxW="1240" mx="auto" py="6">
      <Flex justifyContent="space-between" alignItems="center">
        <Heading as="h6" size="md">
          Readars
        </Heading>
        <Stack direction="row" spacing={4} align="center">
          <Button colorScheme="teal">Publish Content</Button>
          <Button
            colorScheme="teal"
            variant="outline"
          >
            Logout
          </Button>
        </Stack>
      </Flex>
      <Box>
        <Outlet />
      </Box>
    </Box>
  );
};

export default AppLayout;
