import * as React from "react";
import type { FieldError, FieldErrors, Merge } from "react-hook-form";
import { FormErrorMessage } from "@chakra-ui/react";

interface Props {
  error?: FieldError | Merge<FieldError, FieldErrors<any>> | string | any;
}

export const InputError: React.FC<Props> = (props) => {
  if (!props.error) return null;
  return (
    <>
      {typeof props.error === "string" ? (
        <FormErrorMessage>{props.error}</FormErrorMessage>
      ) : props.error.message ? (
        <FormErrorMessage>{props.error.message}</FormErrorMessage>
      ) : (
        props.error.types &&
        Object.values(props.error.types).map((error: any, i) => (
          <FormErrorMessage key={i}>{error}</FormErrorMessage>
        ))
      )}
    </>
  );
};
