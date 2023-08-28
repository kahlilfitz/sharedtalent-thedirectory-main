import * as React from "react";
import {
  Box,
  Heading,
  Flex,
  Radio,
  RadioGroup,
  Checkbox,
  CheckboxGroup,
  Divider,
  Textarea,
  FormLabel,
  FormControl,
  Input,
  Text as Label,
} from "@chakra-ui/react";
import { Select } from "chakra-react-select";
import { ErrorMessage } from "@hookform/error-message";

interface RegisterUserProps {
  setLanguagesSpoken: (e: any) => void;
  setServicesOffered: (e: any) => void;
  setBoroughs: (e: any) => void;
  registrationType: string;
  register: any;
  errors: any;
}

const labelProps = {
  fontWeight: "bold",
  fontSize: "14px",
  marginBottom: "1em",
  marginTop: "1em",
};

function RegisterVendor({
  setLanguagesSpoken,
  setServicesOffered,
  setBoroughs,
  registrationType,
  register,
  errors,
}: RegisterUserProps) {
  const [hasFamis, setHasFamis] = React.useState(false);
  const [hasNYCMWBE, setHasNYCMWBE] = React.useState(false);
  const [hasNYSMWBE, setHasNYSMWBE] = React.useState(false);

  const handleMWBETypes = (e: any) => {
    if (e.includes("has-famis")) {
      setHasFamis(true);
    } else {
      setHasFamis(false);
    }
    if (e.includes("has-nyc-mwbe")) {
      setHasNYCMWBE(true);
    } else {
      setHasNYCMWBE(false);
    }
    if (e.includes("has-nys-mwbe")) {
      setHasNYSMWBE(true);
    } else {
      setHasNYSMWBE(false);
    }
  };

  const selectControlObject = (e: any) => {
    return JSON.stringify(
      e.reduce((prev: any, current: any) => {
        prev[current.value] = current.value;
        return prev;
      }, {})
    );
  };
  const handleLanguagesSpoken = (e: any) => {
    setLanguagesSpoken(selectControlObject(e));
  };

  const handleServicesOffered = (e: any) => {
    setServicesOffered(selectControlObject(e));
  };

  const handleBoroughs = (e: any) => {
    setBoroughs(selectControlObject(e));
  };

  return (
    <Box>
      <Heading size="xs" mb="1em" marginTop="1em">
        MWBE?
      </Heading>
      <CheckboxGroup colorScheme="green" onChange={handleMWBETypes}>
        <Flex direction={["column"]} mb="1em" wrap="nowrap">
          <Checkbox value="has-famis">NYCDOE Vendor Number (FAMIS)</Checkbox>
          <Checkbox value="has-nyc-mwbe">
            NYC MWBE Certification Number
          </Checkbox>
          <Checkbox value="has-nys-mwbe">
            NYS MWBE Certification Number
          </Checkbox>
        </Flex>
      </CheckboxGroup>
      <Box mb="1em">
        <Heading size="xs" mb="1em">
          Do you have an active MTAC?
        </Heading>
        <RadioGroup {...register("hasMTAC")} name="hasMTAC" mb="1em">
          <Radio value="true" mx="10px">
            Yes
          </Radio>
          <Radio value="false" mx="10px">
            No
          </Radio>
        </RadioGroup>
      </Box>
      <Divider my="2em" />
      <Input
        type="hidden"
        name="registrationType"
        defaultValue={registrationType}
      />

      <Label {...labelProps}>Business Name</Label>
      <ErrorMessage
        errors={errors}
        as={<Label />}
        color="red"
        fontWeight="bold"
        name="businessName"
      />
      <Input {...register("businessName")} mb="1em" name="businessName" />
      {hasFamis && (
        <>
          <Label {...labelProps}>NYCDOE Vendor Number (FAMIS)</Label>
          <ErrorMessage
            errors={errors}
            as={<Label />}
            color="red"
            fontWeight="bold"
            name="famisNumber"
          />
          <Input {...register("famisNumber")} mb="1em" name="famisNumber" />
        </>
      )}
      {hasNYCMWBE && (
        <>
          <Label {...labelProps}>NYC MWBE Certification Number</Label>
          <ErrorMessage
            errors={errors}
            as={<Label />}
            color="red"
            fontWeight="bold"
            name="nycMwbeNumber"
          />
          <Input {...register("nycMwbeNumber")} mb="1em" name="nycMwbeNumber" />
        </>
      )}
      {hasNYSMWBE && (
        <>
          <Label {...labelProps}>NYS MWBE Certification Number</Label>
          <ErrorMessage
            errors={errors}
            as={<Label />}
            color="red"
            fontWeight="bold"
            name="nysMwbeNumber"
          />
          <Input {...register("nysMwbeNumber")} mb="1em" name="nysMwbeNumber" />
        </>
      )}
      <Box mb="1em">
        <Heading size="xs" mb="1em">
          Business Logo
        </Heading>

        {/* add upload image component here */}
      </Box>
      <Label {...labelProps}>Company Website</Label>
      <ErrorMessage
        errors={errors}
        as={<Label />}
        color="red"
        fontWeight="bold"
        name="companyWebsiteUrl"
      />
      <Input
        {...register("companyWebsiteUrl")}
        mb="1em"
        name="companyWebsiteUrl"
        type="url"
        placeholder="https://"
      />
      <Box mb="1em">
        <FormControl>
          <FormLabel fontSize="sm" htmlFor="languagesSpoken">
            Languages Spoken
          </FormLabel>
          <Select
            isMulti
            // eslint-disable-next-line
            // @ts-ignore
            mb="1em"
            tagVariant="solid"
            name="languagesSpoken"
            options={[
              { label: "Abkhazian", value: "Abkhazian" },
              { label: "Afar", value: "Afar" },
              { label: "Afrikaans", value: "Afrikaans" },
              { label: "Akan", value: "Akan" },
              { label: "Albanian", value: "Albanian" },
              { label: "Amharic", value: "Amharic" },
              { label: "Arabic", value: "Arabic" },
              { label: "Aragonese", value: "Aragonese" },
              { label: "Armenian", value: "Armenian" },
              { label: "Assamese", value: "Assamese" },
              { label: "Avaric", value: "Avaric" },
              { label: "Avestan", value: "Avestan" },
              { label: "Aymara", value: "Aymara" },
              { label: "Azerbaijani", value: "Azerbaijani" },
              { label: "Bambara", value: "Bambara" },
              { label: "Bashkir", value: "Bashkir" },
              { label: "Basque", value: "Basque" },
              { label: "Belarusian", value: "Belarusian" },
              { label: "Bengali", value: "Bengali" },
              { label: "Bihari", value: "Bihari" },
              { label: "Bislama", value: "Bislama" },
              { label: "Bosnian", value: "Bosnian" },
              { label: "Breton", value: "Breton" },
              { label: "Bulgarian", value: "Bulgarian" },
              { label: "Burmese", value: "Burmese" },
              { label: "Catalan", value: "Catalan" },
              { label: "Chamorro", value: "Chamorro" },
              { label: "Chechen", value: "Chechen" },
              { label: "Chichewa", value: "Chichewa" },
              { label: "Chinese", value: "Chinese" },
              { label: "Church Slavic", value: "Church Slavic" },
              { label: "Chuvash", value: "Chuvash" },
              { label: "Cornish", value: "Cornish" },
              { label: "Corsican", value: "Corsican" },
              { label: "Cree", value: "Cree" },
              { label: "Croatian", value: "Croatian" },
              { label: "Czech", value: "Czech" },
              { label: "Danish", value: "Danish" },
              { label: "Divehi", value: "Divehi" },
              { label: "Dutch", value: "Dutch" },
              { label: "Dzongkha", value: "Dzongkha" },
              { label: "English", value: "English", isFixed: true },
              { label: "Esperanto", value: "Esperanto" },
              { label: "Estonian", value: "Estonian" },
              { label: "Ewe", value: "Ewe" },
              { label: "Faroese", value: "Faroese" },
              { label: "Fijian", value: "Fijian" },
              { label: "Finnish", value: "Finnish" },
              { label: "French", value: "French" },
              { label: "Fulah", value: "Fulah" },
              { label: "Galician", value: "Galician" },
              { label: "Ganda", value: "Ganda" },
              { label: "German", value: "German" },
              { label: "Greek", value: "Greek" },
              { label: "Guarani", value: "Guarani" },
              { label: "Gujarati", value: "Gujarati" },
              { label: "Haitian", value: "Haitian" },
              { label: "Hausa", value: "Hausa" },
              { label: "Hebrew", value: "Hebrew" },
              { label: "Herero", value: "Herero" },
              { label: "Hindi", value: "Hindi" },
              { label: "Hiri Motu", value: "Hiri Motu" },
              { label: "Hungarian", value: "Hungarian" },
              { label: "Icelandic", value: "Icelandic" },
              { label: "Ido", value: "Ido" },
              { label: "Igbo", value: "Igbo" },
              { label: "Indonesian", value: "Indonesian" },
              {
                label:
                  "Interlingua (International Auxiliary Language Association)",
                value:
                  "Interlingua (International Auxiliary Language Association)",
              },
              { label: "Interlingue", value: "Interlingue" },
              { label: "Inuktitut", value: "Inuktitut" },
              { label: "Inupiaq", value: "Inupiaq" },
              { label: "Irish", value: "Irish" },
              { label: "Italian", value: "Italian" },
              { label: "Japanese", value: "Japanese" },
              { label: "Javanese", value: "Javanese" },
              { label: "Kalaallisut", value: "Kalaallisut" },
              { label: "Kannada", value: "Kannada" },
              { label: "Kanuri", value: "Kanuri" },
              { label: "Kartuli", value: "Kartuli" },
              { label: "Kashmiri", value: "Kashmiri" },
              { label: "Kazakh", value: "Kazakh" },
              { label: "Khmer", value: "Khmer" },
              { label: "Kikuyu", value: "Kikuyu" },
              { label: "Kinyarwanda", value: "Kinyarwanda" },
              { label: "Kirghiz", value: "Kirghiz" },
              { label: "Kirundi", value: "Kirundi" },
              { label: "Komi", value: "Komi" },
              { label: "Kongo", value: "Kongo" },
              { label: "Korean", value: "Korean" },
              { label: "Kurdish", value: "Kurdish" },
              { label: "Kwanyama", value: "Kwanyama" },
              { label: "Lao", value: "Lao" },
              { label: "Latin", value: "Latin" },
              { label: "Latvian", value: "Latvian" },
              { label: "Limburgish", value: "Limburgish" },
              { label: "Lingala", value: "Lingala" },
              { label: "Lithuanian", value: "Lithuanian" },
              { label: "Luba-Katanga", value: "Luba-Katanga" },
              { label: "Luxembourgish", value: "Luxembourgish" },
              { label: "Macedonian", value: "Macedonian" },
              { label: "Malagasy", value: "Malagasy" },
              { label: "Malay", value: "Malay" },
              { label: "Malayalam", value: "Malayalam" },
              { label: "Maltese", value: "Maltese" },
              { label: "Manx", value: "Manx" },
              { label: "Maori", value: "Maori" },
              { label: "Marathi", value: "Marathi" },
              { label: "Marshallese", value: "Marshallese" },
              { label: "Mongolian", value: "Mongolian" },
              { label: "Nauru", value: "Nauru" },
              { label: "Navajo", value: "Navajo" },
              { label: "Ndonga", value: "Ndonga" },
              { label: "Nepali", value: "Nepali" },
              { label: "North Ndebele", value: "North Ndebele" },
              { label: "Northern Sami", value: "Northern Sami" },
              { label: "Norwegian Bokmal", value: "Norwegian Bokmal" },
              { label: "Norwegian Nynorsk", value: "Norwegian Nynorsk" },
              { label: "Norwegian", value: "Norwegian" },
              { label: "Occitan", value: "Occitan" },
              { label: "Ojibwa", value: "Ojibwa" },
              { label: "Oriya", value: "Oriya" },
              { label: "Oromo", value: "Oromo" },
              { label: "Ossetian", value: "Ossetian" },
              { label: "Pali", value: "Pali" },
              { label: "Panjabi", value: "Panjabi" },
              { label: "Pashto", value: "Pashto" },
              { label: "Persian", value: "Persian" },
              { label: "Polish", value: "Polish" },
              { label: "Portuguese", value: "Portuguese" },
              { label: "Quechua", value: "Quechua" },
              { label: "Raeto-Romance", value: "Raeto-Romance" },
              { label: "Romanian", value: "Romanian" },
              { label: "Russian", value: "Russian" },
              { label: "Samoan", value: "Samoan" },
              { label: "Sango", value: "Sango" },
              { label: "Sanskrit", value: "Sanskrit" },
              { label: "Sardinian", value: "Sardinian" },
              { label: "Scottish Gaelic", value: "Scottish Gaelic" },
              { label: "Serbian", value: "Serbian" },
              { label: "Shona", value: "Shona" },
              { label: "Sichuan Yi", value: "Sichuan Yi" },
              { label: "Sindhi", value: "Sindhi" },
              { label: "Sinhala", value: "Sinhala" },
              { label: "Slovak", value: "Slovak" },
              { label: "Slovenian", value: "Slovenian" },
              { label: "Somali", value: "Somali" },
              { label: "South Ndebele", value: "South Ndebele" },
              { label: "Southern Sotho", value: "Southern Sotho" },
              { label: "Spanish", value: "Spanish" },
              { label: "Sundanese", value: "Sundanese" },
              { label: "Swahili", value: "Swahili" },
              { label: "Swati", value: "Swati" },
              { label: "Swedish", value: "Swedish" },
              { label: "Tagalog", value: "Tagalog" },
              { label: "Tahitian", value: "Tahitian" },
              { label: "Tajik", value: "Tajik" },
              { label: "Tamil", value: "Tamil" },
              { label: "Tatar", value: "Tatar" },
              { label: "Telugu", value: "Telugu" },
              { label: "Thai", value: "Thai" },
              { label: "Tibetan", value: "Tibetan" },
              { label: "Tigrinya", value: "Tigrinya" },
              { label: "Tonga", value: "Tonga" },
              { label: "Tsonga", value: "Tsonga" },
              { label: "Tswana", value: "Tswana" },
              { label: "Turkish", value: "Turkish" },
              { label: "Turkmen", value: "Turkmen" },
              { label: "Twi", value: "Twi" },
              { label: "Uighur", value: "Uighur" },
              { label: "Ukrainian", value: "Ukrainian" },
              { label: "Urdu", value: "Urdu" },
              { label: "Uzbek", value: "Uzbek" },
              { label: "Venda", value: "Venda" },
              { label: "Vietnamese", value: "Vietnamese" },
              { label: "Volapuk", value: "Volapuk" },
              { label: "Walloon", value: "Walloon" },
              { label: "Welsh", value: "Welsh" },
              { label: "Western Frisian", value: "Western Frisian" },
              { label: "Wolof", value: "Wolof" },
              { label: "Xhosa", value: "Xhosa" },
              { label: "Yiddish", value: "Yiddish" },
              { label: "Yoruba", value: "Yoruba" },
              { label: "Zhuang", value: "Zhuang" },
              { label: "Zulu", value: "Zulu" },
            ]}
            variant="filled"
            // defaultValue={"English"}
            placeholder="Select multiple..."
            onChange={handleLanguagesSpoken}
            closeMenuOnSelect={false}
          />
        </FormControl>
      </Box>
      <Box mb="1em">
        <Heading size="xs" mb="1em" marginTop="1em">
          Services Offered
        </Heading>
        <ErrorMessage
          errors={errors}
          as={<Label />}
          color="red"
          fontWeight="bold"
          name="servicesOffered"
        />
        <Select
          // eslint-disable-next-line
          // @ts-ignore
          mb="1em"
          name="servicesOffered"
          isMulti
          tagVariant="solid"
          options={[
            { label: "101 - PRINTING SUPPLIES", value: "101" },
            { label: "102 - TESTING MATERIALS", value: "102" },
            { label: "105 - AUTOMOTIVE SUPPLIES & MATERIALS", value: "105" },
            { label: "109 - FUEL SUPPLIES", value: "109" },
            { label: "110 - FOOD & FORAGE SUPPLIES", value: "110" },
            { label: "117 - POSTAGE & MAILING SERVICES", value: "117" },
            { label: "130 - INSTRUCTIONAL SUPPLIES", value: "130" },
            {
              label: "169 - BUILDING MAINTENANCE & CLEANING SUPPLIES",
              value: "169",
            },
            { label: "187 - KITCHEN UTENSILS", value: "187" },
            { label: "198 - GENERAL OFFICE SUPPLIES", value: "198" },
            { label: "199 - EDUCATIONAL/INSTRUCTIONAL SOFTWARE", value: "199" },
            {
              label:
                "302 - TELECOMMUNICATIONS EQUIPMENT/SYSTEMS (PURCHASES ONLY)",
              value: "302",
            },
            {
              label: "305 - MOTOR VEHICLES AND RELATED EQUIPMENT",
              value: "305",
            },
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
            {
              label: "414 - RENTALS - LAND, BUILDINGS, AND STRUCTURES",
              value: "414",
            },
            { label: "417 - ADVERTISING", value: "417" },
            { label: "423 - HEAT, LIGHT & POWER", value: "423" },
            {
              label:
                "433 - LEASING AND RENTAL OF COPYING AND DUPLICATING EQUIPMENT",
              value: "433",
            },
            { label: "442 - DATA LINES", value: "442" },
            {
              label:
                "451 - LOCAL BUSINESS MEETING AND RELATED EXPENDITURES (GENERAL)",
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
              label:
                "454 - NON-LOCAL WORKSHOP/CONFERENCE EXPENDITURES (SPECIAL)",
              value: "454",
            },
            {
              label:
                "461 - ADMISSION FEES AND TRANSPORTATION RELATED TO FIELD TRIPS",
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
            {
              label: "602 - TELECOMMUNICATIONS MAINTENANCE (GENERAL) ",
              value: "602",
            },
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
            {
              label: "670 - PAYMENTS TO CONTRACT SCHOOLS & CAMPS",
              value: "670",
            },
            {
              label: "671 - TRAINING PROGRAM FOR CITY EMPLOYEES",
              value: "671",
            },
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
              label:
                "695 - EDUCATIONAL & RECREATIONAL EXPENSES FOR YOUTH PROGRAMS",
              value: "695",
            },
          ]}
          variant="filled"
          placeholder="Select multiple..."
          onChange={handleServicesOffered}
          closeMenuOnSelect={false}
          isRequired
        />
      </Box>

      <Label {...labelProps}>Pitch Video Link</Label>
      <ErrorMessage
        errors={errors}
        as={<Label />}
        color="red"
        fontWeight="bold"
        name="pitchVideoUrl"
      />
      <Input {...register("pitchVideoUrl")} mb="1em" name="pitchVideoUrl" />

      <Divider my="2em" />

      <Label {...labelProps}>Owner/President First Name</Label>
      <ErrorMessage
        errors={errors}
        as={<Label />}
        color="red"
        fontWeight="bold"
        name="firstName"
      />
      <Input {...register("firstName")} mb="1em" name="firstName" />
      <Label {...labelProps}>Owner/President Last Name</Label>
      <ErrorMessage
        errors={errors}
        as={<Label />}
        color="red"
        fontWeight="bold"
        name="lastName"
      />
      <Input {...register("lastName")} mb="1em" name="lastName" />
      <Label {...labelProps}>Title</Label>
      <Input {...register("title")} mb="1em" name="title" />

      <Box mb="1em" hidden>
        <Heading size="xs" mb="1em">
          Profile Photo
        </Heading>
      </Box>
      <Box mb="1em">
        <Heading size="xs" mb="1em">
          Capability Statement
        </Heading>{" "}
        <ErrorMessage
          errors={errors}
          as={<Label />}
          color="red"
          fontWeight="bold"
          name="bio"
        />
        <Textarea {...register("bio")} maxLength={400} h="250px" name="bio" />
      </Box>
      <Label {...labelProps}>Phone Number</Label>
      <ErrorMessage
        errors={errors}
        as={<Label />}
        color="red"
        fontWeight="bold"
        name="phoneNumber"
      />
      <Input
        {...register("phoneNumber")}
        mb="1em"
        name="phoneNumber"
        type="tel"
      />
      <Label {...labelProps}>Address</Label>
      <ErrorMessage
        errors={errors}
        as={<Label />}
        color="red"
        fontWeight="bold"
        name="address"
      />
      <Input {...register("address")} mb="1em" name="address" />
      <Label {...labelProps}>City</Label>
      <ErrorMessage
        errors={errors}
        as={<Label />}
        color="red"
        fontWeight="bold"
        name="city"
      />
      <Input {...register("city")} mb="1em" name="city" />
      <Label {...labelProps}>State</Label>
      {/* <ErrorMessage
        errors={errors}
        as={<Label />}
        color="red"
        fontWeight="bold"
        name="state"
      /> */}
      <Input
        {...register("state")}
        mb="1em"
        name="state"
        value="New York"
        isReadOnly
      />
      <Box mb="1em">
        <Heading size="xs" mb="1em" marginTop="1em">
          Borough
        </Heading>
        <ErrorMessage
          errors={errors}
          as={<Label />}
          color="red"
          fontWeight="bold"
          name="borough"
        />
        <Select
          // eslint-disable-next-line
          // @ts-ignore
          mb="1em"
          {...register("borough")}
          name="borough"
          isMulti
          tagVariant="solid"
          options={[
            { label: "The Bronx", value: "The Bronx" },
            { label: "Brooklyn", value: "Brooklyn" },
            { label: "Manhattan", value: "Manhattan" },
            { label: "Queens", value: "Queens" },
            { label: "Staten Island", value: "Staten Island" },
          ]}
          variant="filled"
          onChange={handleBoroughs}
          closeMenuOnSelect={false}
        />
      </Box>
      <Divider my="2em" />
      <Label {...labelProps}>Inquiry Contact Name</Label>
      <Input mb="1em" name="inquiryContactName" />
      <Label {...labelProps}>Inquiry Contact Phone</Label>
      <Input mb="1em" name="inquiryContactPhone" type="tel" />
    </Box>
  );
}

export default RegisterVendor;
