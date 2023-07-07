import React from "react";
import Card from "../../../components/Card";
import {
  Button,
  Center,
  Container,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Icon,
  Input,
  Stack,
  Text,
} from "@chakra-ui/react";
import { Formik, Form, Field } from "formik";
import { object, ref, string } from "yup";

const ResetPassword = () => {
  const resetValidationSchema = object({
    password: string()
      .min(6, "Password must be at least 6 characters")
      .required("Password is required"),
    repeatPassword: string()
      .oneOf([ref("password"), null], "Passwords must match")
      .required("Repeat password is required"),
  });
  return (
    <Container>
      <Center minH="100vh">
        <Card>
          <Text mt="4" fontWeight="medium" textStyle="h1">
            Reset Password
          </Text>
          <Text textStyle="p2" color="black.60" mt="4">
            Enter your new password.
          </Text>
          <Formik
            initialValues={{
              password: "",
              repeatPassword: "",
            }}
            onSubmit={(values) => {
              console.log(values);
            }}
            validationSchema={resetValidationSchema}
          >
            {() => (
              <Form>
                <Stack mt="8" spacing={6}>
                  <Field name="password">
                    {({ field, meta }) => (
                      <FormControl isInvalid={!!(meta.error && meta.touched)}>
                        <FormLabel htmlFor="password">New Password</FormLabel>
                        <Input
                          {...field}
                          name="password"
                          type="password"
                          placeholder="Enter your password...."
                        />{" "}
                        <FormErrorMessage>{meta.error}</FormErrorMessage>
                      </FormControl>
                    )}
                  </Field>
                  <Field name="repeatPassword">
                    {({ field, meta }) => (
                      <FormControl isInvalid={!!(meta.error && meta.touched)}>
                        <FormLabel htmlFor="repeatPassword">
                          New Repeat Password
                        </FormLabel>
                        <Input
                          {...field}
                          name="repeatPassword"
                          type="password"
                          placeholder="Enter your repeatPassword...."
                        />{" "}
                        <FormErrorMessage>{meta.error}</FormErrorMessage>
                      </FormControl>
                    )}
                  </Field>

                  <Button w="full" type="submit">
                    Reset Password
                  </Button>
                </Stack>
              </Form>
            )}
          </Formik>
        </Card>
      </Center>
    </Container>
  );
};

export default ResetPassword;
