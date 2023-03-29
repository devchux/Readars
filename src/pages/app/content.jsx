import { Box, Button, Flex, Heading, Image, Text } from "@chakra-ui/react";
import React from "react";

const Content = () => {
  return (
    <Flex
      flexDirection={{ base: "column", md: "row" }}
      gap="12"
      p={{ base: "4", md: "16" }}
    >
      <Box w="100%" maxW="350px" h="450">
        <Image
          w="100%"
          h="100%"
          objectFit="cover"
          src="https://images.unsplash.com/photo-1667489022797-ab608913feeb?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHw5fHx8ZW58MHx8fHw%3D&auto=format&fit=crop&w=800&q=60"
          alt=""
        />
      </Box>
      <Box w="100%" maxW="500px">
        <Heading fontSize="3xl" mb="4">
          Things Fall Apart
        </Heading>
        <Text>By Chinua Achebe</Text>
        <Box mt={{ base: "8", md: "32" }}>
          <Heading fontSize="xl" mb="4">
            About this book:
          </Heading>
          <Text noOfLines={10}>
            This sofa is perfect for modern tropical spaces, baroque inspired
            spaces, earthy toned spaces and for people who love a chic design
            with a sprinkle of vintage design.
          </Text>
          <Box mt="16">
            <Button>Buy Now</Button>
          </Box>
        </Box>
      </Box>
    </Flex>
  );
};

export default Content;
