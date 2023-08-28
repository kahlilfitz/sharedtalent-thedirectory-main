import * as React from "react";
import { Box, Heading, Input, Text } from "@chakra-ui/react";
import { Select } from "chakra-react-select";
import { ErrorMessage } from "@hookform/error-message";

interface RegisterUserProps {
  setGradeBands: (e: any) => void;
  setBoroughs: (e: any) => void;
  registrationType: string;
  register: any;
  errors: any;
}

function RegisterUser({
  setGradeBands,
  setBoroughs,
  registrationType,
  register,
  errors,
}: RegisterUserProps) {
  const selectControlObject = (e: any) => {
    return JSON.stringify(
      e.reduce((prev: any, current: any) => {
        prev[current.value] = current.value;
        return prev;
      }, {})
    );
  };

  const handleGradeBandChange = (gradeBand: any) => {
    setGradeBands(selectControlObject(gradeBand));
  };
  const handleBoroughs = (e: any) => {
    setBoroughs(selectControlObject(e));
  };

  return (
    <Box>
      <Input
        type="hidden"
        name="registrationType"
        defaultValue={registrationType}
      />
      <Input type="hidden" name="businessName" defaultValue={""} />
      <Text fontWeight="bold">First Name</Text>
      <ErrorMessage
        errors={errors}
        as={<Text />}
        color="red"
        fontWeight="bold"
        name="firstName"
      />
      <Input mb="1em" {...register("firstName")} name="firstName" />
      <Text fontWeight="bold">Last Name</Text>
      <ErrorMessage
        errors={errors}
        as={<Text />}
        color="red"
        fontWeight="bold"
        name="lastName"
      />
      <Input mb="1em" {...register("lastName")} name="lastName" />
      <Text fontWeight="bold">Title</Text>
      <ErrorMessage
        errors={errors}
        as={<Text />}
        color="red"
        fontWeight="bold"
        name="title"
      />
      <Input {...register("title")} mb="1em" name="title" />
      <Text fontWeight="bold">Office/Department</Text>
      <ErrorMessage
        errors={errors}
        as={<Text />}
        color="red"
        fontWeight="bold"
        name="officeDepartment"
      />
      <Input
        mb="1em"
        {...register("officeDepartment")}
        name="officeDepartment"
      />
      <Text fontWeight="bold">District Borough Number (DBN)</Text>
      <ErrorMessage
        errors={errors}
        as={<Text />}
        color="red"
        fontWeight="bold"
        name="districtBoroNumber"
      />
      <Input
        mb="1em"
        {...register("districtBoroNumber")}
        name="districtBoroNumber"
      />

      <Box mb="1em">
        <Heading size="xs" mb="1em" marginTop="1em">
          Grade Band
        </Heading>
        <Select
          // eslint-disable-next-line
          // @ts-ignore
          mb="1em"
          isMulti
          tagVariant="solid"
          options={[
            { label: "ES", value: "ES" },
            { label: "MS", value: "MS" },
            { label: "HS", value: "HS" },
          ]}
          closeMenuOnSelect={false}
          onChange={handleGradeBandChange}
        />
      </Box>

      <Text fontWeight="bold">Phone Number</Text>
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
        name="phoneNumber"
        type="tel"
      />
      <Text fontWeight="bold">Address</Text>
      <ErrorMessage
        errors={errors}
        as={<Text />}
        color="red"
        fontWeight="bold"
        name="address"
      />
      <Input {...register("address")} mb="1em" name="address" />
      <Text fontWeight="bold">City</Text>
      <ErrorMessage
        errors={errors}
        as={<Text />}
        color="red"
        fontWeight="bold"
        name="city"
      />
      <Input {...register("city")} mb="1em" name="city" />
      <Text fontWeight="bold">State</Text>
      <ErrorMessage
        errors={errors}
        as={<Text />}
        color="red"
        fontWeight="bold"
        name="state"
      />
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
          as={<Text />}
          color="red"
          fontWeight="bold"
          name="borough"
        />
        <Select
          // eslint-disable-next-line
          // @ts-ignore
          mb="1em"
          tagVariant="solid"
          isMulti
          {...register("borough")}
          name="borough"
          options={[
            { label: "The Bronx", value: "The Bronx" },
            { label: "Brooklyn", value: "Brooklyn" },
            { label: "Manhattan", value: "Manhattan" },
            { label: "Queens", value: "Queens" },
            { label: "Staten Island", value: "Staten Island" },
          ]}
          variant="filled"
          onChange={handleBoroughs}
        />
      </Box>
    </Box>
  );
}

export default RegisterUser;
