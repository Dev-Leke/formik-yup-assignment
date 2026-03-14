import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { Formik } from "formik";

import InputField from "../components/InputField";
import CustomButton from "../components/CustomButton";
import { signupSchema } from "../validation/signupSchema";

const SignUpScreen = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Sign Up</Text>
      <Text style={styles.subtitle}>
        Create a new account with secure credentials.
      </Text>

      <Formik
        initialValues={{
          fullName: "",
          email: "",
          password: "",
          confirmPassword: "",
        }}
        validationSchema={signupSchema}
        onSubmit={(values) => {
          console.log("User registered:", values);
        }}
      >
        {({
          handleChange,
          handleBlur,
          handleSubmit,
          values,
          errors,
          touched,
          isValid,
        }) => (
          <>
            <InputField
              label="Full Name"
              icon="person-outline"
              placeholder="Enter full name"
              value={values.fullName}
              onChangeText={handleChange("fullName")}
              onBlur={handleBlur("fullName")}
              error={touched.fullName && errors.fullName}
            />

            <InputField
              label="Email"
              icon="mail-outline"
              placeholder="Enter email"
              value={values.email}
              onChangeText={handleChange("email")}
              onBlur={handleBlur("email")}
              error={touched.email && errors.email}
            />

            <InputField
              label="Password"
              icon="lock-closed-outline"
              placeholder="Create password"
              secureTextEntry
              value={values.password}
              onChangeText={handleChange("password")}
              onBlur={handleBlur("password")}
              error={touched.password && errors.password}
            />

            <InputField
              label="Confirm Password"
              icon="checkmark-circle-outline"
              placeholder="Re-enter password"
              secureTextEntry
              value={values.confirmPassword}
              onChangeText={handleChange("confirmPassword")}
              onBlur={handleBlur("confirmPassword")}
              error={touched.confirmPassword && errors.confirmPassword}
            />

            <CustomButton
              title="Create Account"
              onPress={handleSubmit}
              disabled={!isValid}
            />
          </>
        )}
      </Formik>
    </View>
  );
};

export default SignUpScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#fff",
  },

  title: {
    fontSize: 32,
    fontWeight: "bold",
    marginBottom: 5,
  },

  subtitle: {
    fontSize: 16,
    color: "#666",
    marginBottom: 20,
  },
});
