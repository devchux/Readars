import React from "react";
import {
  Box,
  Card,
  CardBody,
  CardHeader,
  Flex,
  Heading,
  Image,
  Skeleton,
  SkeletonText,
  Text,
} from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";

const Feed = ({ title, author, thumbnail, id, summary, isLoading }) => {
  const navigate = useNavigate();

  return (
    <Card
      w="100%"
      maxW={{ base: "100%", md: "md" }}
      overflow="hidden"
      cursor="pointer"
      onClick={() => navigate(`/app/content/${id}`)}
    >
      <CardHeader pb="0">
        <Flex flex="1" gap="4" alignItems="center" flexWrap="wrap">
          {isLoading ? (
            <Box w="100%" mb="5">
              <SkeletonText noOfLines={2} spacing="4" skeletonHeight="3" />
            </Box>
          ) : (
            <Box>
              <Heading fontSize="lg" color="teal.500" lineHeight="6">
                {title}
              </Heading>
              <Text fontSize="sm">by {author}</Text>
            </Box>
          )}
        </Flex>
      </CardHeader>
      <CardBody>
        {isLoading ? (
          <Box w="100%">
            <SkeletonText noOfLines={4} spacing="4" skeletonHeight="2" />
          </Box>
        ) : (
          <Text noOfLines={4}>{summary}</Text>
        )}
      </CardBody>
      {isLoading ? (
        <Box w="100%">
          <Skeleton height="250" fadeDuration={4} />
        </Box>
      ) : (
        <Image objectFit="cover" src={thumbnail} alt="book cover" />
      )}
    </Card>
  );
};

export default Feed;
