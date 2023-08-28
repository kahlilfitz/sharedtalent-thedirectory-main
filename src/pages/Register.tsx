import * as React from "react";
import {
  Box,
  Button,
  Center,
  Heading,
  Stack,
  Radio,
  RadioGroup,
  Checkbox,
  FormLabel,
  FormControl,
  Link,
  Input,
  Text,
} from "@chakra-ui/react";

import Layout from "components/Layout";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { ErrorMessage } from "@hookform/error-message";

import RegisterUser from "components/RegisterPages/registerUser";
import RegisterVendor from "components/RegisterPages/registerVendor";
import axios from "axios";
import { v4 as uuidv4 } from "uuid";
import { useNavigate } from "react-router-dom";

const phoneRegExp =
  /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/;

const VendorRegisterSchema = yup.object().shape({
  email: yup.string().email("Invalid email").required("Required"),
  password: yup
    .string()
    .min(8, "Must be at least 8 characters")
    .max(32)
    .required("Required"),
  businessName: yup.string().required("Required"),
  companyWebsiteUrl: yup.string().required("Required"),
  pitchVideoUrl: yup.string().required("Required"),
  firstName: yup.string().required("Required"),
  lastName: yup.string().required("Required"),
  address: yup.string().required("Required"),
  city: yup.string().required("Required"),
  borough: yup.array().of(
    yup.object().shape({
      label: yup.string().required(),
      value: yup.string().required("Please select a borough"),
    })
  ),
  bio: yup.string().required("Required"),
  phoneNumber: yup.string().matches(phoneRegExp, "Phone number is not valid"),
});

const NonvendorRegisterSchema = yup.object().shape({
  email: yup.string().email("Invalid email").required("Required"),
  password: yup
    .string()
    .min(8, "Must be at least 8 characters")
    .max(32)
    .required("Required"),
  firstName: yup.string().required("Required"),
  lastName: yup.string().required("Required"),
  officeDepartment: yup.string().required("Required"),
  districtBoroNumber: yup.string().required("Required"),
  phoneNumber: yup.string().matches(phoneRegExp, "Phone number is not valid"),
});

export default function Register() {
  const navigate = useNavigate();
  const loading = false;
  const [registrationType, setRegistrationType] = React.useState("");

  const [languagesSpoken, setLanguagesSpoken] = React.useState<any>(null);
  const [servicesOffered, setServicesOffered] = React.useState<any>(null);
  const [borough, setBoroughs] = React.useState<any>(null);
  const [gradeBand, setGradeBands] = React.useState<any>(null);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    resolver: yupResolver(
      registrationType === "vendor"
        ? VendorRegisterSchema
        : NonvendorRegisterSchema
    ),
  });
  const onSubmitHandler = (data: any) => {
    try {
      axios
        .post("/users/create", {
          ...data,
          id: uuidv4(),
          role: registrationType === "vendor" ? "VENDOR" : "USER",
          createdAt: new Date(),
          updatedAt: new Date(),
          languagesSpoken,
          servicesOffered,
          borough,
          gradeBand,
          registrationType,
        })
        .then((response) => {
          // console.log(response.data);
        })
        .catch((error) => console.error(`There was an error: ${error}`));
      reset();
      //set cookie that expires, then go to homepage

      navigate("/");
    } catch (e) {
      // console.log(e);
    }
  };

  const handleSetRegistrationType = (e: string) => {
    setRegistrationType(e);
  };
  const onInvalid = (errors: any) => "an error occurred";

  return (
    <Layout>
      <Center flexDir="column" mt={10} className="register-form">
        <Box w={["100%", 400]}>
          <form onSubmit={handleSubmit(onSubmitHandler, onInvalid)}>
            <Heading as="h1" mb="1em">
              Register
            </Heading>
            <FormControl>
              <FormLabel htmlFor="name">Registration Type</FormLabel>
              <RadioGroup onChange={handleSetRegistrationType} mb="1em">
                <Radio value="vendor" mx="10px">
                  Vendor
                </Radio>
                <Radio value="nonVendor" mx="10px">
                  District or School Administrator
                </Radio>
              </RadioGroup>
            </FormControl>
            <Stack spacing={2} maxW="500px">
              {registrationType && (
                <Box>
                  <Text fontWeight="bold">Email</Text>
                  <ErrorMessage
                    errors={errors}
                    as={<Text />}
                    color="red"
                    fontWeight="bold"
                    name="email"
                  />
                  <Input
                    {...register("email")}
                    name="email"
                    mb="1em"
                    placeholder="email@gmail.com"
                    isRequired
                  />
                  <Text fontWeight="bold">Password</Text>
                  <ErrorMessage
                    errors={errors}
                    as={<Text />}
                    color="red"
                    fontWeight="bold"
                    name="password"
                  />
                  <Input
                    {...register("password")}
                    name="password"
                    mb="1em"
                    type="password"
                    placeholder="********"
                    isRequired
                  />
                  {registrationType === "vendor" && (
                    <RegisterVendor
                      registrationType={registrationType}
                      setLanguagesSpoken={setLanguagesSpoken}
                      setServicesOffered={setServicesOffered}
                      setBoroughs={setBoroughs}
                      register={register}
                      errors={errors}
                    />
                  )}
                  {registrationType === "nonVendor" && (
                    <RegisterUser
                      registrationType={registrationType}
                      // eslint-disable-next-line
                      // @ts-ignore
                      setGradeBands={setGradeBands}
                      setBoroughs={setBoroughs}
                      register={register}
                      errors={errors}
                    />
                  )}
                  <Checkbox {...register("confirmTerms")} isRequired /> Please
                  confirm that you agree to our{" "}
                  <Link
                    href="/terms"
                    // eslint-disable-next-line
                    // @ts-ignore
                    fontWeight="bold"
                  >
                    terms of service
                  </Link>
                  <Button
                    bgColor={"primary.main"}
                    type="submit"
                    w="100%"
                    isLoading={loading}
                    isDisabled={loading}
                    marginTop="2em"
                  >
                    Register
                  </Button>
                </Box>
              )}
              <Link href="/login">Already have an account?</Link>
            </Stack>
          </form>
        </Box>
      </Center>
    </Layout>
  );
}
