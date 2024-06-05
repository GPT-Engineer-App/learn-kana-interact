import React from "react";
import { Container, Text, VStack } from "@chakra-ui/react";

const Progress = () => {
  return (
    <Container centerContent maxW="container.md" height="100vh" display="flex" flexDirection="column" justifyContent="center" alignItems="center">
      <VStack spacing={4}>
        <Text fontSize="4xl">Progress Summary</Text>
        <Text fontSize="2xl">Coming Soon...</Text>
      </VStack>
    </Container>
  );
};

export default Progress;
