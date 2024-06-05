import React, { useState, useRef, useEffect } from "react";
import { Container, Text, VStack, Input, Button, useToast, Box } from "@chakra-ui/react";
import { FaCheckCircle, FaTimesCircle } from "react-icons/fa";

const kanaList = [
  { kana: "あ", romaji: "a" },
  { kana: "い", romaji: "i" },
  { kana: "う", romaji: "u" },
  { kana: "え", romaji: "e" },
  { kana: "お", romaji: "o" },
  // Add more kana characters as needed
];

const Index = () => {
  const [currentKanaIndex, setCurrentKanaIndex] = useState(0);
  const [inputValue, setInputValue] = useState("");
  const inputRef = useRef(null);
  const toast = useToast();

  useEffect(() => {
    inputRef.current.focus();
  }, [currentKanaIndex]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (inputValue.trim().toLowerCase() === kanaList[currentKanaIndex].romaji) {
      toast({
        title: "Correct!",
        description: "You got it right!",
        status: "success",
        duration: 2000,
        isClosable: true,
        icon: <FaCheckCircle />,
      });
      setCurrentKanaIndex((prevIndex) => (prevIndex + 1) % kanaList.length);
      setInputValue("");
    } else {
      toast({
        title: "Incorrect!",
        description: "Try again.",
        status: "error",
        duration: 2000,
        isClosable: true,
        icon: <FaTimesCircle />,
      });
      setInputValue("");
    }
  };

  return (
    <Container centerContent maxW="container.md" height="100vh" display="flex" flexDirection="column" justifyContent="center" alignItems="center">
      <VStack spacing={4}>
        <Text fontSize="4xl">{kanaList[currentKanaIndex].kana}</Text>
        <Box as="form" onSubmit={handleSubmit} width="100%" display="flex" justifyContent="center">
          <Input ref={inputRef} value={inputValue} onChange={(e) => setInputValue(e.target.value)} placeholder="Enter romaji" size="lg" width="50%" textAlign="center" />
          <Button type="submit" colorScheme="teal" size="lg" ml={4}>
            Submit
          </Button>
        </Box>
      </VStack>
    </Container>
  );
};

export default Index;
