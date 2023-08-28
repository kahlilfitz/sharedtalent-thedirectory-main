import {
  Heading,
  Image,
  Box,
  Center,
  Text,
  Stack,
  Button,
  Badge,
  useColorModeValue,
} from "@chakra-ui/react";
import { NavLink } from "react-router-dom";

import { ListItem, UnorderedList } from "@chakra-ui/react";

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
  { label: "316 - PURCHASE OF COPIERS AND DUPLICATING MACHINES", value: "316" },
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
  { label: "407 - MAINTENANCE & REPAIRS - AUTOMOTIVE EQUIPMENT", value: "407" },
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
  { label: "452 - LOCAL WORKSHOP/CONFERENCE EXPENSES (SPECIAL)", value: "452" },
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
    label: "676 - MAINTENANCE, GENERAL REPAIRS AND OPERATION OF INFRASTRUCTURE",
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

export default function VendorCard({ user }: any) {
  const {
    borough,
    businessLogoUrl,
    businessName,
    famisNumber,
    hasMTAC,
    id,
    inquiryContactName,
    languagesSpoken,
    nycMwbeNumber,
    nysMwbeNumber,
    servicesOffered,
  } = user;

  const languages = languagesSpoken
    ? Object.keys(JSON.parse(languagesSpoken))
    : [];
  const boros = borough ? Object.keys(JSON.parse(borough)).join(", ") : "";
  const services = servicesOffered
    ? Object.keys(JSON.parse(servicesOffered))
        .map((item) =>
          servicesArray
            .map((service: any) => {
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

  return (
    <Center py={2}>
      <Box
        maxW={"280px"}
        w={"full"}
        bg={useColorModeValue("white", "gray.900")}
        boxShadow={"xl"}
        rounded={"lg"}
        py={4}
        px={3}
        textAlign={"center"}
        border="1px solid #00000020"
        mr={2}
      >
        <Box
          width={"100px"}
          height="100px"
          border="1px solid #00000030"
          mb="10px"
          mx="auto"
          borderRadius={"full"}
          backgroundImage={`url(/images/${businessLogoUrl})`}
          backgroundRepeat={"no-repeat"}
          backgroundSize={"90% auto"}
          bgColor="transparent"
          backgroundPosition={"center center"}
        >
          <Image
            hidden
            alt="Logo"
            src={`/images/${businessLogoUrl}`}
            pos={"relative"}
          />
        </Box>
        <Heading fontSize={"2xl"} fontFamily={"body"}>
          {businessName}
        </Heading>
        <Text fontWeight={600} color={"gray.500"} mb={2}>
          {boros}
        </Text>

        <Stack align={"center"} justify={"center"} direction={"row"} mt={2}>
          {nycMwbeNumber && (
            <Badge
              backgroundColor="green"
              maxH="17px"
              color="#fff"
              borderRadius={"10px"}
              fontSize="11px"
            >
              NYC
            </Badge>
          )}
          {nysMwbeNumber && (
            <Badge
              backgroundColor="orange"
              maxH="17px"
              color="#fff"
              borderRadius={"10px"}
              fontSize="11px"
            >
              NYS
            </Badge>
          )}
          {famisNumber && (
            <Badge
              backgroundColor="purple"
              maxH="17px"
              color="#fff"
              borderRadius={"10px"}
              fontSize="11px"
            >
              FAMIS
            </Badge>
          )}
          {hasMTAC && (
            <Badge
              backgroundColor="blue"
              maxH="17px"
              color="#fff"
              borderRadius={"10px"}
              fontSize="11px"
            >
              MTAC
            </Badge>
          )}
        </Stack>
        <Box
          textAlign={"left"}
          color={useColorModeValue("gray.700", "gray.400")}
          px={3}
          fontSize="sm"
        >
          <Stack mt={1} spacing={2}>
            <Box>
              <Box>
                <strong>Services:</strong>
              </Box>
              <UnorderedList className="services-list">
                {services.map((service, index) => (
                  <ListItem key={index}>
                    <em>{service}</em>
                  </ListItem>
                ))}
              </UnorderedList>
            </Box>
            <Box>
              <Box>
                <strong>Languages:</strong>
              </Box>
              <UnorderedList className="languages-list">
                {languages.map((language, index) => (
                  <ListItem key={index}>
                    <em>{language}</em>
                  </ListItem>
                ))}
              </UnorderedList>{" "}
            </Box>
            <Box>
              <strong>Contact:</strong> {inquiryContactName}
            </Box>
          </Stack>
        </Box>

        <Stack mt={8} direction={"row"} spacing={4}>
          <Button
            to={`/vendor/${id}`}
            flex={1}
            fontSize={"sm"}
            rounded={"full"}
            bg={"primary.main"}
            color={"white"}
            boxShadow={"md"}
            _hover={{
              bg: "orange.400",
            }}
            _focus={{
              bg: "orange.400",
            }}
            as={NavLink}
          >
            View
          </Button>
        </Stack>
      </Box>
    </Center>
  );
}
