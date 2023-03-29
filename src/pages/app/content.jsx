import { ArrowBackIcon } from "@chakra-ui/icons";
import {
  Box,
  Button,
  Flex,
  Heading,
  Image,
  Link,
  Skeleton,
  SkeletonText,
  Text,
} from "@chakra-ui/react";
import React from "react";
import { useQuery } from "react-query";
import { useNavigate, useParams } from "react-router-dom";
import { useApp } from "../../hooks/useApp";

const Content = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const { getBook, errorHandler } = useApp();

  const { data, isLoading } = useQuery(["BOOKS", id], () => getBook(id), {
    onError(err) {
      errorHandler(err);
    },
  });

  return (
    <Box p={{ base: "2", md: "8" }}>
      <Box>
        <Button
          onClick={() => navigate(-1)}
          variant="outline"
          colorScheme="teal"
        >
          <ArrowBackIcon boxSize={3} mr="2" /> Go Back
        </Button>
      </Box>
      <Flex
        flexDirection={{ base: "column", md: "row" }}
        gap="12"
        p={{ base: "4", md: "16" }}
      >
        <Box w="100%" maxW="350px" h="450">
          {isLoading ? (
            <Skeleton height="100%" w="100%" fadeDuration={4} />
          ) : (
            <Image
              w="100%"
              h="100%"
              objectFit="cover"
              src={data?.thumbnail}
              alt=""
            />
          )}
        </Box>
        <Box w="100%" maxW="500px">
          {isLoading ? (
            <SkeletonText noOfLines={2} spacing="4" skeletonHeight="3" />
          ) : (
            <>
              <Heading fontSize="3xl" mb="4">
                {data?.title}
              </Heading>
              <Text>
                By {data?.author?.first_name} {data?.last_name}
              </Text>
            </>
          )}
          <Box mt={{ base: "8", md: "32" }}>
            {isLoading ? (
              <SkeletonText
                noOfLines={1}
                mb="4"
                spacing="4"
                skeletonHeight="4"
                w="200px"
              />
            ) : (
              <Heading fontSize="xl" mb="4">
                About this book:
              </Heading>
            )}
            {isLoading ? (
              <SkeletonText noOfLines={4} spacing="4" skeletonHeight="3" />
            ) : (
              <Text noOfLines={10}>{data?.description}</Text>
            )}
            <Box mt="16">
              {isLoading ? (
                <SkeletonText
                  noOfLines={1}
                  spacing="4"
                  skeletonHeight="8"
                  w="80px"
                />
              ) : (
                <Link target="_blank" color="teal.500" href={data?.doc}>
                  View Document
                </Link>
              )}
            </Box>
          </Box>
        </Box>
      </Flex>
    </Box>
  );
};

export default Content;
