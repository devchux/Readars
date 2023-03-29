import { AddIcon } from "@chakra-ui/icons";
import {
  Box,
  Button,
  Grid,
  Heading,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Stack,
  Text,
  useDisclosure,
} from "@chakra-ui/react";
import React from "react";
import Feed from "../../components/cards/feed";

const Publish = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <Box p="8">
      <Box>
        <Button onClick={onOpen} variant="outline" colorScheme="teal">
          <AddIcon boxSize={3} mr="2" /> Publish Content
        </Button>
      </Box>
      <Box mt="14" px={{ base: "1", lg: "8"}}>
        <Heading fontSize="xl" mb="4">
          My Books
        </Heading>
        <Grid
          gridTemplateColumns={{
            base: "repeat(1, 1fr)",
            md: "repeat(2, 1fr)",
            xl: "repeat(3, 1fr)",
          }}
          gap="8"
        >
          <Feed
            id="1"
            title="Things Fall Apart"
            author="Chinua Achebe"
            summary="This sofa is perfect for modern tropical spaces, baroque inspired spaces, earthy toned spaces and for people who love a chic design with a sprinkle of vintage design."
            thumbnail="https://images.unsplash.com/photo-1667489022797-ab608913feeb?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHw5fHx8ZW58MHx8fHw%3D&auto=format&fit=crop&w=800&q=60"
          />
          <Feed
            id="1"
            title="Things Fall Apart"
            author="Chinua Achebe"
            summary="This sofa is perfect for modern tropical spaces, baroque inspired spaces, earthy toned spaces and for people who love a chic design with a sprinkle of vintage design."
            thumbnail="https://images.unsplash.com/photo-1667489022797-ab608913feeb?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHw5fHx8ZW58MHx8fHw%3D&auto=format&fit=crop&w=800&q=60"
          />
          <Feed
            id="1"
            title="Things Fall Apart"
            author="Chinua Achebe"
            summary="This sofa is perfect for modern tropical spaces, baroque inspired spaces, earthy toned spaces and for people who love a chic design with a sprinkle of vintage design."
            thumbnail="https://images.unsplash.com/photo-1667489022797-ab608913feeb?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHw5fHx8ZW58MHx8fHw%3D&auto=format&fit=crop&w=800&q=60"
          />
          <Feed
            id="1"
            title="Things Fall Apart"
            author="Chinua Achebe"
            summary="This sofa is perfect for modern tropical spaces, baroque inspired spaces, earthy toned spaces and for people who love a chic design with a sprinkle of vintage design."
            thumbnail="https://images.unsplash.com/photo-1667489022797-ab608913feeb?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHw5fHx8ZW58MHx8fHw%3D&auto=format&fit=crop&w=800&q=60"
          />
          <Feed
            id="1"
            title="Things Fall Apart"
            author="Chinua Achebe"
            summary="This sofa is perfect for modern tropical spaces, baroque inspired spaces, earthy toned spaces and for people who love a chic design with a sprinkle of vintage design."
            thumbnail="https://images.unsplash.com/photo-1667489022797-ab608913feeb?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHw5fHx8ZW58MHx8fHw%3D&auto=format&fit=crop&w=800&q=60"
          />
          <Feed
            id="1"
            title="Things Fall Apart"
            author="Chinua Achebe"
            summary="This sofa is perfect for modern tropical spaces, baroque inspired spaces, earthy toned spaces and for people who love a chic design with a sprinkle of vintage design."
            thumbnail="https://images.unsplash.com/photo-1667489022797-ab608913feeb?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHw5fHx8ZW58MHx8fHw%3D&auto=format&fit=crop&w=800&q=60"
          />
        </Grid>
      </Box>
      <Modal onClose={onClose} size="xl" isOpen={isOpen}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Add Book</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Box mb="4">
              <Text mb="2">Book Title</Text>
              <Input type="text" placeholder="Enter Book Title" />
            </Box>
            <Box mb="4">
              <Text mb="2">Amount (in Naira)</Text>
              <Input type="number" placeholder="Enter Amount" />
            </Box>
            <Box mb="4">
              <Text mb="2">Book Thumbnail</Text>
              <input type="file" />
            </Box>
            <Box mb="4">
              <Text mb="2">Book PDF</Text>
              <input type="file" />
            </Box>
          </ModalBody>
          <ModalFooter>
            <Stack direction="row" spacing={4} align="center">
              <Button onClick={onClose}>Close</Button>
              <Button colorScheme="teal">Publish Book</Button>
            </Stack>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </Box>
  );
};

export default Publish;
