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
  Textarea,
  useDisclosure,
} from "@chakra-ui/react";
import React from "react";
import { useForm } from "react-formid";
import { useMutation, useQuery } from "react-query";
import { toast } from "react-toastify";
import Feed from "../../components/cards/feed";
import { useApp } from "../../hooks/useApp";

const Publish = () => {
  const { isOpen, onOpen, onClose: closeModal } = useDisclosure();
  const { createBook, errorHandler, convertBase64, getBooks } = useApp();

  const { getFieldProps, setFieldValue, inputs, reset } = useForm({
    defaultValues: {
      title: "",
      description: "",
      doc: null,
      thumbnail: null,
    },
  });

  const onClose = () => {
    reset();
    closeModal();
  };

  const {
    data: books,
    isLoading: loadingBooks,
    refetch,
  } = useQuery(["BOOKS"], getBooks, {
    onError(err) {
      errorHandler(err);
    },
  });

  const { mutate, isLoading } = useMutation(createBook, {
    onSuccess() {
      refetch();
      toast.success("Book has been added");
      onClose();
    },
    onError(err) {
      errorHandler(err);
    },
  });

  const onSubmit = () => {
    mutate(inputs);
  };

  return (
    <Box p="8">
      <Box>
        <Button onClick={onOpen} variant="outline" colorScheme="teal">
          <AddIcon boxSize={3} mr="2" /> Publish Content
        </Button>
      </Box>
      <Box mt="14" px={{ base: "1", lg: "8" }}>
        <Heading fontSize="xl" mb="4">
          Recent Books
        </Heading>
        <Grid
          gridTemplateColumns={{
            base: "repeat(1, 1fr)",
            md: "repeat(2, 1fr)",
            xl: "repeat(3, 1fr)",
          }}
          gap="8"
        >
          {books?.map((book) => (
            <Feed
              key={book.id}
              id={book?.id}
              title={book?.title}
              author={book?.author?.first_name + " " + book?.author?.last_name}
              summary={book?.description}
              thumbnail={book?.thumbnail}
            />
          ))}
          {loadingBooks && (
            <>
              <Feed isLoading={loadingBooks} />
              <Feed isLoading={loadingBooks} />
              <Feed isLoading={loadingBooks} />
              <Feed isLoading={loadingBooks} />
            </>
          )}
        </Grid>
        {!loadingBooks && books?.result?.length === 0 ? (
          <Text textAlign="center" my="8">
            No books available
          </Text>
        ) : null}
      </Box>
      <Modal onClose={onClose} size="xl" isOpen={isOpen}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Add Book</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Box mb="4">
              <Text mb="2">Book Title</Text>
              <Input
                type="text"
                placeholder="Enter Book Title"
                {...getFieldProps("title")}
              />
            </Box>
            <Box mb="4">
              <Text mb="2">Description</Text>
              <Textarea {...getFieldProps("description")} />
            </Box>
            <Box mb="4">
              <Text mb="2">Book Thumbnail</Text>
              <input
                type="file"
                accept="image/png, image/gif, image/jpeg"
                onChange={async ({ target: { files } }) => {
                  const file = files[0];
                  const base64 = await convertBase64(file);
                  setFieldValue("thumbnail", base64);
                }}
              />
            </Box>
            <Box mb="4">
              <Text mb="2">Book PDF</Text>
              <input
                type="file"
                ccept="application/pdf"
                onChange={async ({ target: { files } }) => {
                  const file = files[0];
                  const base64 = await convertBase64(file);
                  setFieldValue("doc", base64);
                }}
              />
            </Box>
          </ModalBody>
          <ModalFooter>
            <Stack direction="row" spacing={4} align="center">
              <Button onClick={onClose}>Close</Button>
              <Button
                colorScheme="teal"
                isLoading={isLoading}
                onClick={onSubmit}
              >
                Publish Book
              </Button>
            </Stack>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </Box>
  );
};

export default Publish;
