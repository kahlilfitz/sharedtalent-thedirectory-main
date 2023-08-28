import * as React from "react";
import Layout from "components/Layout";
import useAuth from "hooks/useAuth";
import { Navigate, useLocation } from "react-router-dom";
import {
  Avatar,
  Badge,
  Box,
  Center,
  Divider,
  Flex,
  Heading,
  Image,
  Link,
  Spinner,
  Stack,
  Text,
} from "@chakra-ui/react";
import voca from "voca";
import axios from "axios";

const Vendor = (props: any) => {
  const { auth: me } = useAuth();
  const [loading, setLoading] = React.useState<boolean>(true);
  const [userData, setUserData] = React.useState<any>(null);
  const location = useLocation();
  const [vendorId] = React.useState(() => location.pathname.split("/").pop());

  const servicesArray = [
    { label: "101 - PRINTING SUPPLIES", value: "101" },
    { label: "102 - TESTING MATERIALS", value: "102" },
    { label: "105 - AUTOMOTIVE SUPPLIES & MATERIALS", value: "105" },
    { label: "109 - FUEL SUPPLIES", value: "109" },
    { label: "110 - FOOD & FORAGE SUPPLIES", value: "110" },
    { label: "117 - POSTAGE & MAILING SERVICES", value: "117" },
    { label: "130 - INSTRUCTIONAL SUPPLIES", value: "130" },
    { label: "169 - BUILDING MAINTENANCE & CLEANING SUPPLIES", value: "169" },
    { label: "187 - KITCHEN UTENSILS", value: "187" },
    { label: "198 - GENERAL OFFICE SUPPLIES", value: "198" },
    { label: "199 - EDUCATIONAL/INSTRUCTIONAL SOFTWARE", value: "199" },
    {
      label: "302 - TELECOMMUNICATIONS EQUIPMENT/SYSTEMS (PURCHASES ONLY)",
      value: "302",
    },
    { label: "305 - MOTOR VEHICLES AND RELATED EQUIPMENT", value: "305" },
    {
      label: "312 - IMPROVEMENTS TO PROPERTY OTHER THAN BUILDINGS ",
      value: "312",
    },
    { label: "314 - FURNITURE PURCHASES", value: "314" },
    { label: "315 - EQUIPMENT PURCHASES", value: "315" },
    {
      label: "316 - PURCHASE OF COPIERS AND DUPLICATING MACHINES",
      value: "316",
    },
    { label: "319 - SECURITY EQUIPMENT", value: "319" },
    {
      label: "331 - COMPUTER EQUIPMENT (Reimbursable Funded Only)",
      value: "331",
    },
    {
      label:
        "332 - COMPUTER AND OTHER DATA PROCESSING EQUIPMENT (TAX LEVY AND REIMBURSABLE) ",
      value: "332",
    },
    { label: "337 - TEXTBOOKS", value: "337" },
    { label: "338 - LIBRARY BOOKS AND MATERIALS", value: "338" },
    { label: "369 - FOOD SERVICE EQUIPMENT", value: "369" },
    { label: "402 - TELEPHONES & OTHER COMMUNICATIONS", value: "402" },
    { label: "403 - GENERAL SERVICES", value: "403" },
    {
      label: "407 - MAINTENANCE & REPAIRS - AUTOMOTIVE EQUIPMENT",
      value: "407",
    },
    {
      label: "412 - RENTAL AND/OR LEASING OF MISCELLANEOUS EQUIPMENT",
      value: "412",
    },
    {
      label:
        "413 - RENTAL AND/OR LEASING OF INFORMATION TECHNOLOGY (DATA PROCESSING) EQUIPMENT",
      value: "413",
    },
    { label: "414 - RENTALS - LAND, BUILDINGS, AND STRUCTURES", value: "414" },
    { label: "417 - ADVERTISING", value: "417" },
    { label: "423 - HEAT, LIGHT & POWER", value: "423" },
    {
      label: "433 - LEASING AND RENTAL OF COPYING AND DUPLICATING EQUIPMENT",
      value: "433",
    },
    { label: "442 - DATA LINES", value: "442" },
    {
      label: "451 - LOCAL BUSINESS MEETING AND RELATED EXPENDITURES (GENERAL)",
      value: "451",
    },
    {
      label: "452 - LOCAL WORKSHOP/CONFERENCE EXPENSES (SPECIAL)",
      value: "452",
    },
    {
      label: "453 - NON-LOCAL BUSINESS MEETING EXPENDITURES (GENERAL)",
      value: "453",
    },
    {
      label: "454 - NON-LOCAL WORKSHOP/CONFERENCE EXPENDITURES (SPECIAL)",
      value: "454",
    },
    {
      label: "461 - ADMISSION FEES AND TRANSPORTATION RELATED TO FIELD TRIPS",
      value: "461",
    },
    { label: "485 - TUITION EXPENSES", value: "485" },
    { label: "489 - PARENT INVOLVEMENT & ACTIVITY FUND", value: "489" },
    {
      label:
        "491 - COST OF SNACKS, BREAKFAST PROGRAM CONTRACTS & LUNCHES FOR CHILDREN (OTHER THAN THE SCHOOL LUNCH PROGRAM)",
      value: "491",
    },
    { label: "496 - ALLOWANCES TO PARTICIPANTS", value: "496" },
    { label: "499 - OTHER EXPENSES (GENERAL)", value: "499" },
    // {label:"", value: " "},
    { label: "600 - CONTRACTUAL SERVICES (GENERAL)", value: "600" },
    { label: "602 - TELECOMMUNICATIONS MAINTENANCE (GENERAL) ", value: "602" },
    {
      label: "607 - MAINTENANCE & REPAIRS - MOTOR VEHICLE EQUIPMENT",
      value: "607",
    },
    {
      label:
        "611 - MAINTENANCE & REPAIR OF PHOTOCOPYING OR DUPLICATING EQUIPMENT",
      value: "611",
    },
    { label: "612 - EQUIPMENT MAINTENANCE & REPAIR", value: "612" },
    {
      label:
        "613 - INFORMATION TECHNOLOGY(DATA PROCESSING ) EQUIPMENT – MAINTENANCE & REPAIR",
      value: "613",
    },
    { label: "615 - PRINTING SERVICES", value: "615" },
    { label: "619 - SECURITY SERVICES", value: "619" },
    { label: "622 - TEMPORARY SERVICES", value: "622" },
    { label: "624 - CLEANING SERVICES", value: "624" },
    { label: "633 - TRANSPORTATION EXPENDITURES", value: "633" },
    { label: "669 - TRANSPORTATION OF PUPILS", value: "669" },
    { label: "670 - PAYMENTS TO CONTRACT SCHOOLS & CAMPS", value: "670" },
    { label: "671 - TRAINING PROGRAM FOR CITY EMPLOYEES", value: "671" },
    {
      label:
        "676 - MAINTENANCE, GENERAL REPAIRS AND OPERATION OF INFRASTRUCTURE",
      value: "676",
    },
    {
      label:
        "681 - PROFESSIONAL SERVICES - ACCOUNTING, AUDITING & ACTUARIAL SERVICES – COMPANY & INDIVIDUAL CONSULTANTS",
      value: "681",
    },
    {
      label:
        "682 - PROFESSIONAL SERVICES - LEGAL & ARBITRATION SERVICES - COMPANY & INDIVIDUAL CONSULTANTS",
      value: "682",
    },
    {
      label:
        "683 - PROFESSIONAL SERVICES - ENGINEERING & ARCHITECTURAL SERVICES – COMPANY & INDIVIDUAL CONSULTANTS",
      value: "683",
    },
    {
      label:
        "684 - PROFESSIONAL SERVICES - COMPUTER SERVICES - COMPANY & INDIVIDUAL CONSULTANTS",
      value: "684",
    },
    {
      label:
        "685 - PROFESSIONAL SERVICES - EDUCATION - COMPANY & INDIVIDUAL CONSULTANTS",
      value: "685",
    },
    {
      label:
        "686 - PROFESSIONAL SERVICES - OTHER - COMPANY & INDIVIDUAL CONSULTANTS",
      value: "686",
    },
    {
      label:
        "687 - EDUCATIONAL RESEARCH & EVALUATION SERVICES - COMPANY & INDIVIDUAL CONSULTANTS",
      value: "687",
    },
    {
      label:
        "689 - PROFESSIONAL SERVICE - CURRICULUM & PROFESSIONAL STAFF DEVELOPMENT",
      value: "689",
    },
    {
      label: "695 - EDUCATIONAL & RECREATIONAL EXPENSES FOR YOUTH PROGRAMS",
      value: "695",
    },
  ];

  React.useEffect(() => {
    if (!userData) {
      axios.get(`/users/user/${vendorId}`).then((response: any) => {
        setUserData(response.data[0]);
        setLoading(false);
      });
    }
  }, [me, userData, vendorId]);

  const textProps = {
    fontSize: { base: "16px", md: "12px" },
  };

  if (loading)
    return (
      <>
        <Spinner />
      </>
    );

  const {
    firstName,
    address,
    avatar,
    bio,
    borough,
    businessLogoUrl,
    businessName,
    city,
    companyWebsiteUrl,
    email,
    famisNumber,
    hasMTAC,
    inquiryContactName,
    inquiryContactPhone,
    languagesSpoken,
    lastName,
    nycMwbeNumber,
    nysMwbeNumber,
    phoneNumber,
    pitchVideoUrl,
    servicesOffered,
    state,
  } = userData;

  const languages = languagesSpoken
    ? Object.keys(JSON.parse(languagesSpoken))
    : [];
  const boros = borough ? Object.keys(JSON.parse(borough)).join(", ") : "";
  const services = servicesOffered
    ? Object.keys(JSON.parse(servicesOffered))
        .map((item) =>
          servicesArray
            .map((service) => {
              if (service.value === item) {
                return service.label;
              }
              return false;
            })
            .filter(Boolean)
        )
        .join("|")
        .split("|")
    : [];

  if (!me.id || me.role !== "USER") return <Navigate to="/" />;

  return (
    <Layout>
      <Flex
        justifyContent="between"
        direction={{ base: "row-reverse", md: "row" }}
        wrap={{ base: "wrap-reverse", md: "nowrap" }}
        pt="2em"
      >
        <Box
          maxW={{ base: "100%", md: "160px" }}
          w="100%"
          minW="150px"
          borderRight={{ base: "0px", md: "1px solid #00000030" }}
        >
          <Stack spacing={1}>
            {businessLogoUrl && (
              <Image
                src={`/images/${businessLogoUrl}`}
                alt="logo"
                width="145px"
              />
            )}
            {!businessLogoUrl && <Box mt={"35px"}></Box>}
            {famisNumber && (
              <Text {...textProps}>
                <strong>FAMIS:</strong> {famisNumber}
              </Text>
            )}
            {nycMwbeNumber && (
              <Text {...textProps}>
                <strong>NYC:</strong> {nycMwbeNumber}
              </Text>
            )}
            {nysMwbeNumber && (
              <Text {...textProps}>
                <strong>NYS:</strong> {nysMwbeNumber}
              </Text>
            )}
            {hasMTAC && (
              <Text {...textProps}>
                <strong>MTAC:</strong> Yes
              </Text>
            )}
            <Heading fontSize="12px" pt="1.5em">
              Contact Details:
            </Heading>
            <Text {...textProps}>
              {address}
              <br />
              {state}, {city}
            </Text>
            <Text {...textProps}>{boros}</Text>
            <Text {...textProps}>{phoneNumber}</Text>
            <Heading fontSize="12px" pt="1.5em">
              Languages Spoken:
            </Heading>
            <Text {...textProps}>
              {languages.map((language, index) => (
                <Badge
                  key={index}
                  variant="outline"
                  fontSize={"10px"}
                  borderRadius="5px"
                  mr="1"
                  mb="1"
                >
                  {language}
                </Badge>
              ))}
            </Text>
            <Heading fontSize="12px" pt="1.5em">
              Inquiry Contact
            </Heading>
            <Text {...textProps}>{inquiryContactName}</Text>
            <Text {...textProps}>{inquiryContactPhone}</Text>
          </Stack>
        </Box>
        <Box w="100%" px={{ base: "2px", md: "10px" }}>
          <Flex justifyContent="between">
            <Box w="100%">
              <Heading as="h1" size="lg">
                {businessName}
              </Heading>
              <Text fontSize="14">
                <Link
                  href={`mailto:${email}`}
                  target="_blank"
                  textDecoration="underline"
                >
                  email
                </Link>{" "}
                &bull;{" "}
                <Link
                  href={companyWebsiteUrl}
                  target="_blank"
                  textDecoration="underline"
                >
                  website
                </Link>
              </Text>
            </Box>
            <Box w="25%">
              <Center>
                <Avatar
                  src={`/images/${avatar}`}
                  size="lg"
                  mr={2}
                  display={{ base: "none", md: "block" }}
                />
                <Avatar
                  src={`/images/${avatar}`}
                  size="sm"
                  mr={2}
                  display={{ base: "block", md: "none" }}
                />
                <Text fontSize="14">
                  {voca.titleCase(`${firstName} ${lastName}`)}
                </Text>
              </Center>
            </Box>
          </Flex>
          <Divider
            borderWidth="1px"
            borderColor={"#808080"}
            borderRadius="10px"
            my="1em"
          />
          <Box maxW={"850px"}>
            <Box mb="2em">
              <Heading as="h2" size="md">
                Capability Statement
              </Heading>
              <Text fontSize="14">{bio}</Text>
            </Box>
            <Box mb="2em">
              <Heading as="h2" size="md">
                Services Offered
              </Heading>

              {services.map((service, index) => (
                <Badge
                  key={index}
                  variant="outline"
                  borderRadius="5px"
                  mr="1"
                  mb="1"
                >
                  {service}
                </Badge>
              ))}
            </Box>
            {pitchVideoUrl && (
              <Box mb="2em">
                <Heading as="h2" size="md">
                  Pitch Video
                </Heading>
                <Box
                  h={{ base: "300px", md: "500px", lg: "443" }}
                  w={{ base: "auto", md: "788.54px", lg: "100%" }}
                >
                  <iframe
                    title="Pitch Video"
                    frameBorder="0"
                    scrolling="no"
                    marginHeight={0}
                    marginWidth={0}
                    width="100%"
                    height="100%"
                    src={
                      pitchVideoUrl +
                      `?autoplay=0&fs=0&iv_load_policy=3&showinfo=0&rel=0&cc_load_policy=0&start=0&end=0`
                    }
                  ></iframe>
                </Box>
              </Box>
            )}
          </Box>
        </Box>
      </Flex>
    </Layout>
  );
};
export default Vendor;
