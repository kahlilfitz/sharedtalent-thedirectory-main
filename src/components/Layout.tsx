import React from "react";
import { Box } from "@chakra-ui/react";
import Header from "components/Header";
import Footer from "components/Footer";
import { Limiter } from "components/Limiter";

type Props = {
  children: React.ReactNode | React.ReactNode[];
};

export default function Layout(props: Props) {
  return (
    <Box {...props}>
      <Header />
      <Limiter>{props?.children}</Limiter>
      <Footer />
    </Box>
  );
}
