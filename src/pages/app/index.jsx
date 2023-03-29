import { Box, Flex, Grid, Text } from "@chakra-ui/react";
import React from "react";
import { useQuery } from "react-query";
import Feed from "../../components/cards/feed";
import { useApp } from "../../hooks/useApp";

const Home = () => {
  const { getBooks, errorHandler } = useApp();
  const { data: books, isLoading: loadingBooks } = useQuery(
    ["BOOKS"],
    getBooks,
    {
      onError(err) {
        errorHandler(err);
      },
    }
  );

  return (
    <Box mt="14" px="8">
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
  );
};

export default Home;
