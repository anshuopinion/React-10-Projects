import React from "react";
import { Card as ChakraCard } from "@chakra-ui/react";
const Card = ({ children, showCard = false, ...props }) => {
  return (
    <ChakraCard
      bg={{
        base: showCard ? "white" : "transparent",
        md: "white",
      }}
      p={{
        base: showCard ? "4" : "0",
        md: "6",
      }}
      borderRadius={{
        base: showCard ? "1rem" : "none",
        md: "1rem",
      }}
      w="456px"
      boxShadow={{
        base: showCard ? "md" : "none",
        md: "lg",
      }}
      {...props}
    >
      {children}
    </ChakraCard>
  );
};

export default Card;
