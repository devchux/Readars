import {
  Box,
  Button,
  ButtonGroup,
  Flex,
  Heading,
  Link,
  Stack,
} from "@chakra-ui/react";
import React from "react";
import { Outlet, useNavigate, Link as ReactLink } from "react-router-dom";
import { useApp } from "../hooks/useApp";

const AppLayout = () => {
  const navigate = useNavigate();
  const { logout } = useApp();

  return (
    <Box maxW="1240" mx="auto" py="6">
      <Flex justifyContent="space-between" alignItems="center">
        <Heading as="h6" size="md">
          <Link as={ReactLink} _hover={{ textDecoration: "none" }} to="/">
            Readars
          </Link>
        </Heading>
        <Stack direction="row" spacing={4} align="center">
          <Button colorScheme="teal" onClick={() => navigate("/app/catalogue")}>
            Catalogue
          </Button>
          <Button colorScheme="teal" variant="outline" onClick={logout}>
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
