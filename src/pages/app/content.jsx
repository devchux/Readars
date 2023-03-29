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
import { useMutation, useQuery } from "react-query";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { useApp } from "../../hooks/useApp";

const Content = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const { getBook, errorHandler, subscribe } = useApp();
  const userStorage = localStorage.getItem("user");
  const userData = userStorage ? JSON.parse(userStorage) : null;

  const { data, isLoading } = useQuery(["BOOKS", id], () => getBook(id), {
    onError(err) {
      errorHandler(err);
    },
  });

  const { mutate, isLoading: suscribeLoading } = useMutation(subscribe, {
    onSuccess() {
      localStorage.setItem('user', { ...userData, subscribed: true });
      toast.success("User is suscribed");
    },
    onError(err) {
      errorHandler(err);
    },
  });

  const payKorapay = () => {
    window.Korapay.initialize({
      key: "pk_test_tuWZmPBJbmmz1EG5zeCyyshcaToUnJWidcawG79Z",
      reference: new Date().toISOString(),
      amount: 1000,
      currency: "NGN",
      customer: {
        name: `${userData?.first_name} ${userData?.last_name}`,
        email: userData?.email,
      },
      onSuccess: function (data) {
        // Handle when payment is successful
        mutate({});
      },
      onFailed: function () {
        toast.error("Payment not successful");
      },
      // notification_url: "https://example.com/webhook"
    });
  };

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
              ) : userData?.subscribed ? (
                <Link target="_blank" color="teal.500" href={data?.doc}>
                  View Document
                </Link>
              ) : (
                <Button
                  onClick={payKorapay}
                  isLoading={suscribeLoading}
                  colorScheme="teal"
                >
                  Subscribe
                </Button>
              )}
            </Box>
          </Box>
        </Box>
      </Flex>
    </Box>
  );
};

export default Content;
