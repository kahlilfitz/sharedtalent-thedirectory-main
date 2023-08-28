import * as React from "react";
import {
  Box,
  Button,
  ButtonGroup,
  useToast,
  Center,
  Flex,
  Heading,
  Input,
  LinkProps,
  Spinner,
  Stack,
  Text,
  Textarea,
} from "@chakra-ui/react";
import Layout from "components/Layout";
import { NavLink } from "react-router-dom";
import useAuth from "hooks/useAuth";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { ErrorMessage } from "@hookform/error-message";
import { Select, MultiValue, ActionMeta } from "chakra-react-select";
import axios from "axios";

const Profile = () => {
  const { auth: me } = useAuth();
  const toast = useToast();
  const [loading, setLoading] = React.useState(true);
  const USER_URL = `/users/${me.id}`;

  const [borough, setBorough] = React.useState<any>("");

  const [gradeBand, setGradeBand] = React.useState<any>("");

  const [languagesSpoken, setLanguagesSpoken] = React.useState<any>("");

  const [servicesOffered, setServicesOffered] = React.useState<any>("");

  const boroughsArray = [
    { label: "The Bronx", value: "The Bronx" },
    { label: "Brooklyn", value: "Brooklyn" },
    { label: "Manhattan", value: "Manhattan" },
    { label: "Queens", value: "Queens" },
    { label: "Staten Island", value: "Staten Island" },
  ];
  const languagesSpokenArray = [
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
      label: "Interlingua (International Auxiliary Language Association)",
      value: "Interlingua (International Auxiliary Language Association)",
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
  ];
  const servicesOfferedArray = [
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
    setGradeBand(me?.userData?.gradeBand);
    setBorough(me?.userData?.borough);
    setLanguagesSpoken(me?.userData?.languagesSpoken);
    setBorough(me?.userData?.borough);
    setServicesOffered(me?.userData?.servicesOffered);
    setLoading(false);
  }, [me]);

  const VendorProfileSchema = yup.object().shape({
    email: yup.string().email().required("Required"),
    firstName: yup.string().required("Required"),
    lastName: yup.string().required("Required"),
    bio: yup.string().required("Required"),
    borough: yup.string().required("Required"),
    address: yup.string().required("Required"),
    businessName: yup.string().required("Required"),
    city: yup.string().required("Required"),
    companyWebsiteUrl: yup.string().required("Required"),
    famisNumber: yup.string().required("Required"),
    inquiryContactName: yup.string().required("Required"),
    inquiryContactPhone: yup.string().required("Required"),
    nycMwbeNumber: yup.string().required("Required"),
    nysMwbeNumber: yup.string().required("Required"),
    phoneNumber: yup.string().required("Required"),
    pitchVideoUrl: yup.string().required("Required"),
    registrationType: yup.string().required("Required"),
    state: yup.string().required("Required"),
    title: yup.string().required("Required"),
    // hasMTAC: yup.boolean(),
  });
  const ProfileSchema = yup.object().shape({
    email: yup.string().email().required("Required"),
    firstName: yup.string().required("Required"),
    lastName: yup.string().required("Required"),
    borough: yup.string().required("Required"),
    address: yup.string().required("Required"),
    city: yup.string().required("Required"),
    gradeBand: yup.string().required("Required"),
    phoneNumber: yup.string().required("Required"),
    registrationType: yup.string().required("Required"),
    state: yup.string().required("Required"),
    title: yup.string().required("Required"),
    officeDepartment: yup.string(),
    districtBoroNumber: yup.string(),
  });

  const vendorDefaultValues = {
    address: me?.userData?.address || "",
    bio: me?.userData?.bio || "",
    borough: me?.userData?.borough || "",
    businessLogoUrl: me?.userData?.businessLogoUrl || "",
    businessName: me?.userData?.businessName || "",
    city: me?.userData?.city || "",
    companyWebsiteUrl: me?.userData?.companyWebsiteUrl || "",
    email: me?.userData?.email || "",
    famisNumber: me?.userData?.famisNumber || "",
    firstName: me?.userData?.firstName || "",
    inquiryContactName: me?.userData?.inquiryContactName || "",
    inquiryContactPhone: me?.userData?.inquiryContactPhone || "",
    languagesSpoken: me?.userData?.languagesSpoken || "",
    lastName: me?.userData?.lastName || "",
    nycMwbeNumber: me?.userData?.nycMwbeNumber || "",
    nysMwbeNumber: me?.userData?.nysMwbeNumber || "",
    phoneNumber: me?.userData?.phoneNumber || "",
    pitchVideoUrl: me?.userData?.pitchVideoUrl || "",
    registrationType: me?.userData?.registrationType || "",
    servicesOffered: me?.userData?.servicesOffered || "",
    state: me?.userData?.state || "",
    title: me?.userData?.title || "",
  };
  const defaultValues = {
    address: me?.userData?.address || "",
    borough: me?.userData?.borough || "",
    city: me?.userData?.city || "",
    officeDepartment: me?.userData?.officeDepartment || "",
    districtBoroNumber: me?.userData?.districtBoroNumber || "",
    email: me?.userData?.email || "",
    famisNumber: me?.userData?.famisNumber || "",
    firstName: me?.userData?.firstName || "",
    gradeBand: me?.userData?.gradeBand || "",
    lastName: me?.userData?.lastName || "",
    phoneNumber: me?.userData?.phoneNumber || "",
    registrationType: me?.userData?.registrationType || "",
    state: me?.userData?.state || "",
    title: me?.userData?.title || "",
  };

  const {
    register,
    handleSubmit,
    formState: { errors, isDirty, isSubmitting },
    reset,
  } = useForm({
    defaultValues: me?.role === "VENDOR" ? vendorDefaultValues : defaultValues,
    resolver: yupResolver(
      me?.role === "VENDOR" ? VendorProfileSchema : ProfileSchema
    ),
  });

  const handleUpdate = (data: any) => {
    axios
      .post(USER_URL, {
        ...data,
      })
      .then(() => {
        toast({ description: "Info updated!" });
      });
  };
  function triggerInput(enteredName: string, enteredValue: string) {
    const input = document.querySelector(enteredName);

    // eslint-disable-next-line
    // @ts-ignore
    const lastValue = input?.value;
    // eslint-disable-next-line
    // @ts-ignore
    input.value = enteredValue;
    const event = new Event("input", { bubbles: true });
    // eslint-disable-next-line
    // @ts-ignore
    const tracker = input?._valueTracker;
    if (tracker) {
      tracker.setValue(lastValue);
    }
    input?.dispatchEvent(event);
  }

  const handleGradeBand = (
    newValue: MultiValue<{ label: string; value: any } | undefined>,
    actionMeta: ActionMeta<{ label: string; value: any } | undefined>
  ) => {
    const values = JSON.stringify(
      newValue.reduce((prev: any, current: any) => {
        prev[current.value] = current.value;
        return prev;
      }, {})
    );
    if (values !== "{}") {
      setGradeBand(values);
      triggerInput("#gradeBand", values);
    } else {
      setGradeBand("");
      triggerInput("#gradeBand", "");
    }
  };
  const handleBoroughs = (
    newValue: MultiValue<{ label: string; value: any } | undefined>,
    actionMeta: ActionMeta<{ label: string; value: any } | undefined>
  ) => {
    const values = JSON.stringify(
      newValue.reduce((prev: any, current: any) => {
        prev[current.value] = current.value;
        return prev;
      }, {})
    );
    if (values !== "{}") {
      setBorough(values);
      triggerInput("#borough", values);
    } else {
      setBorough("");
      triggerInput("#borough", "");
    }
  };
  const handleLanguagesSpoken = (
    newValue: MultiValue<{ label: string; value: any } | undefined>,
    actionMeta: ActionMeta<{ label: string; value: any } | undefined>
  ) => {
    const values = JSON.stringify(
      newValue.reduce((prev: any, current: any) => {
        prev[current.value] = current.value;
        return prev;
      }, {})
    );
    if (values !== "{}") {
      setLanguagesSpoken(values);
      triggerInput("#languagesSpoken", values);
    } else {
      setLanguagesSpoken("");
      triggerInput("#languagesSpoken", "");
    }
  };
  const handleServicesOffered = (
    newValue: MultiValue<{ label: string; value: any } | undefined>,
    actionMeta: ActionMeta<{ label: string; value: any } | undefined>
  ) => {
    const values = JSON.stringify(
      newValue.reduce((prev: any, current: any) => {
        prev[current.value] = current.value;
        return prev;
      }, {})
    );
    if (values !== "{}") {
      setServicesOffered(values);
      triggerInput("#servicesOffered", values);
    } else {
      setServicesOffered("");
      triggerInput("#servicesOffered", "");
    }
  };

  const setDefaultValue = (obj: any, type?: string) => {
    if (!obj) {
      return;
    }
    if (type === "servicesOffered") {
      const values = Object.keys(JSON.parse(obj)).map((item, index) =>
        servicesOfferedArray.find((service) => item === service.value)
      );
      return values;
    }
    return Object.keys(JSON.parse(obj)).map((item, index) => ({
      label: item,
      value: JSON.parse(obj)[item],
    }));
  };

  const handleErrors = (errors: any) => console.error(errors);
  const formTextProps = {
    fontWeight: "bold",
    marginTop: "10px",
    fontSize: "14px",
    marginBottom: "5px",
  };

  if (loading)
    return (
      <Center>
        <Spinner />
      </Center>
    );
  if (!me) return null;

  return (
    <Layout>
      <Box pt={10} pb={20} w="100%">
        <Heading pb={10} fontSize={{ base: "2xl", md: "3xl" }}>
          Profile
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
              <Box>
                <form onSubmit={handleSubmit(handleUpdate, handleErrors)}>
                  <Box className="profile-fields">
                    <Stack spacing={4} maxW="500px">
                      {me?.role === "VENDOR" && (
                        <Box>
                          <Text {...formTextProps}>Email</Text>
                          <Input
                            {...register("email")}
                            variant="outline"
                            name="email"
                            isDisabled
                            isReadOnly
                          />

                          <Text {...formTextProps}>First Name</Text>
                          <ErrorMessage
                            errors={errors}
                            as={<Text />}
                            color="red"
                            fontWeight="bold"
                            name="firstName"
                          />
                          <Input
                            mb="1em"
                            {...register("firstName")}
                            variant="outline"
                            name="firstName"
                          />

                          <Text {...formTextProps}>Last Name</Text>
                          <ErrorMessage
                            errors={errors}
                            as={<Text />}
                            color="red"
                            fontWeight="bold"
                            name="lastName"
                          />
                          <Input
                            mb="1em"
                            {...register("lastName")}
                            variant="outline"
                            name="lastName"
                          />

                          <Text {...formTextProps}>Title</Text>
                          <ErrorMessage
                            errors={errors}
                            as={<Text />}
                            color="red"
                            fontWeight="bold"
                            name="title"
                          />
                          <Input
                            mb="1em"
                            {...register("title")}
                            variant="outline"
                            name="title"
                          />

                          <Text {...formTextProps}>Business Name</Text>
                          <ErrorMessage
                            errors={errors}
                            as={<Text />}
                            color="red"
                            fontWeight="bold"
                            name="businessName"
                          />
                          <Input
                            mb="1em"
                            {...register("businessName")}
                            variant="outline"
                            name="businessName"
                          />

                          <Text {...formTextProps}>Company Website</Text>
                          <ErrorMessage
                            errors={errors}
                            as={<Text />}
                            color="red"
                            fontWeight="bold"
                            name="companyWebsiteUrl"
                          />
                          <Input
                            mb="1em"
                            {...register("companyWebsiteUrl")}
                            variant="outline"
                            name="companyWebsiteUrl"
                          />
                          <Box mb="1em">
                            <ErrorMessage
                              errors={errors}
                              as={<Text />}
                              color="red"
                              fontWeight="bold"
                              name="languagesSpoken"
                            />
                            <Input
                              mb="1em"
                              // eslint-disable-next-line
                              // @ts-ignore
                              {...register("languagesSpoken")}
                              variant="outline"
                              style={{ opacity: 0, height: 0, width: 0 }}
                              id="languagesSpoken"
                              name="languagesSpoken"
                              // eslint-disable-next-line
                              // @ts-ignore
                              // ref={languagesSpokenRef}
                              defaultValue={languagesSpoken}
                            />
                            <Heading size="xs" mb="1em" marginTop="1em">
                              Languages Spoken
                            </Heading>
                            <Select
                              isMulti
                              // eslint-disable-next-line
                              // @ts-ignore
                              options={languagesSpokenArray}
                              // eslint-disable-next-line
                              // @ts-ignore
                              defaultValue={setDefaultValue(
                                me?.userData?.languagesSpoken
                              )}
                              onChange={handleLanguagesSpoken}
                            />
                          </Box>
                          <Box mb="1em">
                            <ErrorMessage
                              errors={errors}
                              as={<Text />}
                              color="red"
                              fontWeight="bold"
                              name="servicesOffered"
                            />
                            <Input
                              mb="1em"
                              // eslint-disable-next-line
                              // @ts-ignore
                              {...register("servicesOffered")}
                              variant="outline"
                              style={{ opacity: 0, height: 0, width: 0 }}
                              id="servicesOffered"
                              name="servicesOffered"
                              // eslint-disable-next-line
                              // @ts-ignore
                              // ref={servicesOfferedRef}
                              defaultValue={servicesOffered}
                            />
                            <Heading size="xs" mb="1em" marginTop="1em">
                              Services Offered
                            </Heading>
                            <Select
                              isMulti
                              // eslint-disable-next-line
                              // @ts-ignore
                              options={servicesOfferedArray}
                              // eslint-disable-next-line
                              // @ts-ignore
                              defaultValue={setDefaultValue(
                                me?.userData?.servicesOffered,
                                "servicesOffered"
                              )}
                              onChange={handleServicesOffered}
                            />
                          </Box>
                          <Text {...formTextProps}>Pitch Video Link</Text>
                          <ErrorMessage
                            errors={errors}
                            as={<Text />}
                            color="red"
                            fontWeight="bold"
                            name="pitchVideoUrl"
                          />
                          <Input
                            mb="1em"
                            {...register("pitchVideoUrl")}
                            variant="outline"
                            name="pitchVideoUrl"
                          />

                          <Text {...formTextProps}>Capacity Statement</Text>
                          <ErrorMessage
                            errors={errors}
                            as={<Text />}
                            color="red"
                            fontWeight="bold"
                            name="bio"
                          />
                          <Textarea
                            mb="1em"
                            {...register("bio")}
                            variant="outline"
                            name="bio"
                          />
                          <Text {...formTextProps}>Phone</Text>
                          <ErrorMessage
                            errors={errors}
                            as={<Text />}
                            color="red"
                            fontWeight="bold"
                            name="phoneNumber"
                          />
                          <Input
                            mb="1em"
                            {...register("phoneNumber")}
                            variant="outline"
                            name="phoneNumber"
                          />

                          <Text {...formTextProps}>Address</Text>
                          <ErrorMessage
                            errors={errors}
                            as={<Text />}
                            color="red"
                            fontWeight="bold"
                            name="address"
                          />
                          <Input
                            mb="1em"
                            {...register("address")}
                            variant="outline"
                            name="address"
                          />

                          <Text {...formTextProps}>City</Text>
                          <ErrorMessage
                            errors={errors}
                            as={<Text />}
                            color="red"
                            fontWeight="bold"
                            name="city"
                          />
                          <Input
                            mb="1em"
                            {...register("city")}
                            variant="outline"
                            name="city"
                          />

                          <Text {...formTextProps}>State</Text>
                          <ErrorMessage
                            errors={errors}
                            as={<Text />}
                            color="red"
                            fontWeight="bold"
                            name="state"
                          />
                          <Input
                            mb="1em"
                            {...register("state")}
                            variant="outline"
                            name="state"
                          />

                          <Box mb="1em">
                            <ErrorMessage
                              errors={errors}
                              as={<Text />}
                              color="red"
                              fontWeight="bold"
                              name="borough"
                            />
                            <Input
                              {...register("borough")}
                              variant="outline"
                              style={{ opacity: 0, height: 0, width: 0 }}
                              m={0}
                              p={0}
                              id="borough"
                              name="borough"
                              // eslint-disable-next-line
                              // @ts-ignore
                              // ref={boroughRef}
                              defaultValue={borough}
                            />
                            <Heading size="xs" mb="1em" marginTop="1em">
                              Borough
                            </Heading>
                            <Select
                              isMulti
                              // eslint-disable-next-line
                              // @ts-ignore
                              options={boroughsArray}
                              // eslint-disable-next-line
                              // @ts-ignore
                              defaultValue={setDefaultValue(
                                me?.userData?.borough
                              )}
                              onChange={handleBoroughs}
                            />
                          </Box>
                          <Text {...formTextProps}>Inquiry Contact Name</Text>
                          <ErrorMessage
                            errors={errors}
                            as={<Text />}
                            color="red"
                            fontWeight="bold"
                            name="inquiryContactName"
                          />
                          <Input
                            mb="1em"
                            {...register("inquiryContactName")}
                            variant="outline"
                            name="inquiryContactName"
                          />
                          <Text {...formTextProps}>Inquiry Contact Phone</Text>
                          <ErrorMessage
                            errors={errors}
                            as={<Text />}
                            color="red"
                            fontWeight="bold"
                            name="inquiryContactPhone"
                          />
                          <Input
                            mb="1em"
                            {...register("inquiryContactPhone")}
                            variant="outline"
                            name="inquiryContactPhone"
                          />

                          <Input
                            variant="outline"
                            name="famisNumber"
                            //

                            type="hidden"
                          />
                          <Input
                            variant="outline"
                            name="nycMwbeNumber"
                            //

                            type="hidden"
                          />
                          <Input
                            variant="outline"
                            name="nysMwbeNumber"
                            //

                            type="hidden"
                          />
                          <Input name="registrationType" type="hidden" />
                        </Box>
                      )}
                      {me?.role !== "VENDOR" && (
                        <Box>
                          <Input name="registrationType" type="hidden" />
                          <Text {...formTextProps}>Email</Text>
                          <Input
                            {...register("email")}
                            variant="outline"
                            name="email"
                            isDisabled
                            isReadOnly
                          />

                          <Text {...formTextProps}>First Name</Text>
                          <ErrorMessage
                            errors={errors}
                            as={<Text />}
                            color="red"
                            fontWeight="bold"
                            name="firstName"
                          />
                          <Input
                            mb="1em"
                            {...register("firstName")}
                            variant="outline"
                            name="firstName"
                          />
                          <Text {...formTextProps}>Last Name</Text>
                          <ErrorMessage
                            errors={errors}
                            as={<Text />}
                            color="red"
                            fontWeight="bold"
                            name="lastName"
                          />
                          <Input
                            mb="1em"
                            {...register("lastName")}
                            variant="outline"
                            name="lastName"
                          />
                          <Text {...formTextProps}>Title</Text>
                          <ErrorMessage
                            errors={errors}
                            as={<Text />}
                            color="red"
                            fontWeight="bold"
                            name="title"
                          />
                          <Input
                            mb="1em"
                            {...register("title")}
                            variant="outline"
                            name="title"
                          />

                          <Text {...formTextProps}>Office/Department</Text>
                          <ErrorMessage
                            errors={errors}
                            as={<Text />}
                            color="red"
                            fontWeight="bold"
                            name="officeDepartment"
                          />
                          <Input
                            mb="1em"
                            // eslint-disable-next-line
                            // @ts-ignore
                            {...register("officeDepartment")}
                            variant="outline"
                            name="officeDepartment"
                          />
                          <Text {...formTextProps}>
                            District Borough Number (DBN)
                          </Text>
                          <ErrorMessage
                            errors={errors}
                            as={<Text />}
                            color="red"
                            fontWeight="bold"
                            name="districtBoroNumber"
                          />
                          <Input
                            mb="1em"
                            // eslint-disable-next-line
                            // @ts-ignore
                            {...register("districtBoroNumber")}
                            variant="outline"
                            name="districtBoroNumber"
                          />
                          <Box mb="1em">
                            <ErrorMessage
                              errors={errors}
                              as={<Text />}
                              color="red"
                              fontWeight="bold"
                              name="gradeBand"
                            />
                            <Input
                              mb="1em"
                              // eslint-disable-next-line
                              // @ts-ignore
                              {...register("gradeBand")}
                              variant="outline"
                              style={{ opacity: 0, height: 0, width: 0 }}
                              id="gradeBand"
                              name="gradeBand"
                              // eslint-disable-next-line
                              // @ts-ignore
                              // ref={gradeBandRef}
                              defaultValue={gradeBand}
                            />
                            <Heading size="xs" mb="1em" marginTop="1em">
                              Grade Band
                            </Heading>
                            <Select
                              isMulti
                              options={[
                                // eslint-disable-next-line
                                // @ts-ignore
                                { label: "ES", value: "ES" },
                                // eslint-disable-next-line
                                // @ts-ignore
                                { label: "MS", value: "MS" },
                                // eslint-disable-next-line
                                // @ts-ignore
                                { label: "HS", value: "HS" },
                              ]}
                              // eslint-disable-next-line
                              // @ts-ignore
                              defaultValue={setDefaultValue(
                                me?.userData?.gradeBand
                              )}
                              onChange={handleGradeBand}
                            />
                          </Box>
                          <Text {...formTextProps}>Phone Number</Text>
                          <ErrorMessage
                            errors={errors}
                            as={<Text />}
                            color="red"
                            fontWeight="bold"
                            name="phoneNumber"
                          />
                          <Input
                            mb="1em"
                            {...register("phoneNumber")}
                            variant="outline"
                            name="phoneNumber"
                          />

                          <Text {...formTextProps}>Address</Text>
                          <ErrorMessage
                            errors={errors}
                            as={<Text />}
                            color="red"
                            fontWeight="bold"
                            name="address"
                          />
                          <Input
                            mb="1em"
                            {...register("address")}
                            variant="outline"
                            name="address"
                          />
                          <Text {...formTextProps}>City</Text>
                          <ErrorMessage
                            errors={errors}
                            as={<Text />}
                            color="red"
                            fontWeight="bold"
                            name="city"
                          />
                          <Input
                            mb="1em"
                            {...register("city")}
                            variant="outline"
                            name="city"
                          />

                          <Text {...formTextProps}>State</Text>
                          <ErrorMessage
                            errors={errors}
                            as={<Text />}
                            color="red"
                            fontWeight="bold"
                            name="state"
                          />
                          <Input
                            mb="1em"
                            {...register("state")}
                            variant="outline"
                            name="state"
                            isReadOnly
                          />
                          <Box mb="1em">
                            <ErrorMessage
                              errors={errors}
                              as={<Text />}
                              color="red"
                              fontWeight="bold"
                              name="borough"
                            />
                            <Input
                              {...register("borough")}
                              variant="outline"
                              style={{ opacity: 0, height: 0, width: 0 }}
                              m={0}
                              p={0}
                              id="borough"
                              name="borough"
                              // eslint-disable-next-line
                              // @ts-ignore
                              // ref={boroughRef}
                              defaultValue={borough}
                            />
                            <Heading size="xs" mb="1em" marginTop="1em">
                              Borough
                            </Heading>
                            <Select
                              isMulti
                              options={[
                                // eslint-disable-next-line
                                // @ts-ignore
                                { label: "The Bronx", value: "The Bronx" },
                                // eslint-disable-next-line
                                // @ts-ignore
                                { label: "Brooklyn", value: "Brooklyn" },
                                // eslint-disable-next-line
                                // @ts-ignore
                                { label: "Manhattan", value: "Manhattan" },
                                // eslint-disable-next-line
                                // @ts-ignore
                                { label: "Queens", value: "Queens" },
                                // eslint-disable-next-line
                                // @ts-ignore
                                {
                                  label: "Staten Island",
                                  value: "Staten Island",
                                },
                              ]}
                              // eslint-disable-next-line
                              // @ts-ignore
                              defaultValue={setDefaultValue(
                                me?.userData?.borough
                              )}
                              onChange={handleBoroughs}
                            />
                          </Box>
                        </Box>
                      )}
                    </Stack>
                  </Box>
                  <Box>
                    <ButtonGroup>
                      {isDirty && (
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => reset()}
                        >
                          Cancel
                        </Button>
                      )}
                      <Button
                        type="submit"
                        isDisabled={isSubmitting || !isDirty}
                        isLoading={isSubmitting}
                        colorScheme="yellow"
                        size="sm"
                      >
                        Update
                      </Button>
                    </ButtonGroup>
                  </Box>
                </form>
              </Box>
            </Stack>
          </Box>
        </Flex>
      </Box>
    </Layout>
  );
};

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

export default Profile;
