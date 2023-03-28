import { Box, Button, Flex, Input, Link, Text } from '@chakra-ui/react'
import React from 'react'

const Register = () => {
  return (
    <Flex direction="column" gap="5">
      <Box>
        <Text>Email</Text>
        <Input type="email" placeholder="Enter Email" />
      </Box>
      <Box>
        <Text>Password</Text>
        <Input type="password" placeholder="Enter Password" />
      </Box>
      <Box>
        <Text>Already have an account? <Link href="/auth" color="teal.500">Login</Link></Text>
      </Box>
      <Box>
        <Button isLoading={false} colorScheme="teal">Register</Button>
      </Box>
    </Flex>
  )
}

export default Register