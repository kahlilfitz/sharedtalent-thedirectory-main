import * as React from "react";
import { BiExit, BiUser, BiSearch } from "react-icons/bi";
import { GiHamburgerMenu } from "react-icons/gi";
import {
  Avatar,
  Box,
  Fade,
  HStack,
  IconButton,
  Menu,
  MenuButton,
  MenuDivider,
  MenuItem,
  MenuList,
  useColorModeValue,
  Flex,
} from "@chakra-ui/react";

import { NavLink } from "react-router-dom";
import { Limiter } from "components/Limiter";
import { LinkButton } from "components/LinkButton";
import Logo from "components/Logo";
import useAuth from "hooks/useAuth";
import { useNavigate } from "react-router-dom";

export default function Nav() {
  const navigate = useNavigate();
  const { auth: me, setAuth } = useAuth();

  const logout = () => {
    setAuth({});
    localStorage.removeItem("DIRECTORY_USER");
    navigate("/");
  };

  return (
    <Box
      w="100%"
      pos="fixed"
      top={0}
      left={0}
      borderBottom="1px solid"
      borderColor={useColorModeValue("gray.100", "gray.700")}
      zIndex={500}
    >
      <Limiter
        display="flex"
        transition="200ms all"
        py={{ base: 4, md: 3 }}
        bg={useColorModeValue("white", "gray.800")}
        justifyContent="space-between"
        alignItems="center"
        w="100%"
      >
        {/* Left link list */}
        <HStack>
          <Logo />
        </HStack>

        {/* Right link list */}
        {!me?.role && (
          <Fade in>
            <HStack spacing={4} display={{ base: "none", md: "flex" }}>
              <LinkButton href="/login" variant="ghost">
                Login
              </LinkButton>
              <LinkButton
                href="/register"
                variant="solid"
                bgColor="primary.main"
              >
                Register
              </LinkButton>
            </HStack>
          </Fade>
        )}

        {(me?.role === "USER" || me?.role === "ADMIN") && (
          <Flex
            border={"0px solid red"}
            width="100%"
            justifyContent={"flex-end"}
          >
            <LinkButton
              display={{ base: "none", md: "flex" }}
              variant="solid"
              href="/search"
              borderRadius={"10px"}
              bgColor={"primary.main"}
              size="sm"
              mr="2"
              boxShadow={"md"}
            >
              Search Directory
            </LinkButton>
          </Flex>
        )}

        {/* Right menu list */}
        <Menu placement="bottom-end">
          <MenuButton
            as={IconButton}
            display={{ base: "flex", md: me.role ? "flex" : "none" }}
            variant="ghost"
            borderRadius="full"
            icon={
              me.role ? (
                <Avatar
                  size="sm"
                  src={`/images/${me?.userData?.avatar}` || undefined}
                />
              ) : (
                <Box as={GiHamburgerMenu} />
              )
            }
          />

          <MenuList fontSize="md">
            {me.role ? (
              <>
                <NavLink to="/search">
                  <MenuItem icon={<Box as={BiSearch} boxSize="16px" />}>
                    Search Directory
                  </MenuItem>
                </NavLink>
                <MenuDivider />
                <NavLink to="/profile">
                  <MenuItem icon={<Box as={BiUser} boxSize="16px" />}>
                    Profile
                  </MenuItem>
                </NavLink>
                <MenuDivider />
                <MenuItem
                  onClick={() => logout()}
                  icon={<Box as={BiExit} boxSize="16px" />}
                >
                  Logout
                </MenuItem>
              </>
            ) : (
              <>
                <NavLink to="/login">
                  <MenuItem>Login</MenuItem>
                </NavLink>
                <NavLink to="/register">
                  <MenuItem fontWeight="semibold">Register</MenuItem>
                </NavLink>
              </>
            )}
          </MenuList>
        </Menu>
      </Limiter>
    </Box>
  );
}
