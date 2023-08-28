import React from "react";
import {
  Box,
  Heading,
  Stack,
  Flex,
  LinkProps,
  Image,
  useToast,
} from "@chakra-ui/react";
import Uploader from "components/Uploader";
import Layout from "components/Layout";
import useAuth from "hooks/useAuth";
import { NavLink, useSearchParams } from "react-router-dom";

export default function ProfileLogo() {
  const { auth: me, setAuth } = useAuth();
  const [searchParams] = useSearchParams();
  const toast = useToast();

  function handleUpdateUserData(data: any) {
    setAuth({
      ...me,
      userData: {
        ...me.userData,
        ...data,
      },
    });
  }

  React.useEffect(() => {
    if (searchParams.get("logoUpdated") === "true") {
      toast({ description: "Company logo updated!" });
    }
  }, [searchParams, toast]);

  return (
    <Layout>
      <Box pt={10} pb={20} w="100%">
        <Heading pb={10} fontSize={{ base: "2xl", md: "3xl" }}>
          Update Company Logo
        </Heading>
        <Flex flexWrap={{ base: "wrap", md: "unset" }}>
          <Box pos="relative">
            <Stack
              position="sticky"
              top="100px"
              minW={{ base: "unset", md: "200px" }}
              mr={8}
              flexDir={{ base: "column", md: "column" }}
              mb={{ base: 8, md: 0 }}
              spacing={{ base: 4, md: 4 }}
            >
              <ProfileLink href="/profile">Details</ProfileLink>
              {me.role !== "USER" && (
                <ProfileLink href="/profile/profile-logo">
                  Company Logo
                </ProfileLink>
              )}
              <ProfileLink href="/profile/profile-photo">
                Profile Photo
              </ProfileLink>
            </Stack>
          </Box>
          <Box w="100%">
            <Stack spacing={6}>
              <Box boxSize="sm" maxWidth="300" textAlign="center">
                {me?.userData?.businessLogoUrl && (
                  <Image
                    src={`/images/${me?.userData?.businessLogoUrl}`}
                    title="Company Logo"
                    border="1px solid #00000050"
                    borderRadius="10px"
                    w="300px"
                    m="20px"
                  />
                )}
                {me.role !== "USER" && (
                  <Uploader
                    isBusinessLogo={true}
                    userId={me.id}
                    updateUserData={handleUpdateUserData}
                  />
                )}
              </Box>
            </Stack>
          </Box>
        </Flex>
      </Box>
    </Layout>
  );
}

interface ProfileLinkProps extends LinkProps {
  href: string;
}
const ProfileLink: React.FC<ProfileLinkProps> = ({ href, ...props }: any) => {
  return (
    <NavLink to={href} style={{ textDecoration: "underline" }}>
      {props.children}
    </NavLink>
  );
};
