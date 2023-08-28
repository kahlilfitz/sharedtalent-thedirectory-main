import * as React from "react";
import { Button, ButtonProps } from "@chakra-ui/react";
import { NavLink } from "react-router-dom";

interface Props extends ButtonProps {
  href: string;
}
export const LinkButton: React.FC<Props> = ({ href, ...props }) => {
  return (
    <Button as={NavLink} textDecor="none !important" to={href} {...props}>
      {props.children}
    </Button>
  );
};
