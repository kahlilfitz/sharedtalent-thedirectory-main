import React from "react";
import { Box, Heading } from "@chakra-ui/react";
import { NavLink } from "react-router-dom";

function Logo(props: any) {
  return (
    <Box lineHeight="0" maxW="285px" mb="1em">
      <NavLink to="/">
        <Heading
          mb="0px"
          textTransform={"uppercase"}
          {...props}
          className="Logo"
        >
          <Box color="primary.main" display="inline">
            The
          </Box>
          Directory
        </Heading>
        <Box fontSize="10px" ml="24%" textAlign="right">
          powered by shar
          <Box color="primary.main" display="inline">
            ED
          </Box>
          talent
        </Box>
      </NavLink>
    </Box>
  );
}

export default Logo;
