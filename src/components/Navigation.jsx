import { Link } from "react-router-dom";
import { Box, Button } from "@chakra-ui/react";

const Navigation = () => {
  return (
    <Box display="flex" justifyContent="space-between" p={4} bg="gray.100">
      <Button as={Link} to="/" colorScheme="teal">
        Home
      </Button>
      <Button as={Link} to="/progress" colorScheme="teal">
        Progress
      </Button>
    </Box>
  );
};

export default Navigation;
