import CustomButton from "@/components/CustomButton";
import InputField from "@/components/InputField";
import { loginSchema } from "@/validation/loginSchema";
import { useRouter } from "expo-router";
import { Formik } from "formik";
import { StyleSheet, Text, View } from "react-native";

export default function SignIn() {
  const router = useRouter();

  return (
    <View style={{ flex: 1, padding: 20 }}>
      <Text style={{ fontSize: 24, fontWeight: "bold", marginBottom: 20 }}>
        Sign In
      </Text>
      <Formik
        initialValues={{ email: "", password: "" }}
        onSubmit={() => router.push("/(tabs)/employee-form")}
        style={{ flex: 1, justifyContent: "center", padding: 20 }}
        validationSchema={loginSchema}
      >
        {({
          values,
          handleChange,
          handleBlur,
          handleSubmit,
          errors,
          touched,
          isValid,
        }) => (
          <>
            <InputField
              label="Email"
              icon="mail"
              placeholder="Enter your email"
              value={values.email}
              onChangeText={handleChange("email")}
              onBlur={handleBlur("email")}
              error={touched.email && errors.email}
            />
            <InputField
              label="Password"
              icon="lock-closed"
              placeholder="Enter your password"
              value={values.password}
              onChangeText={handleChange("password")}
              onBlur={handleBlur("password")}
              secureTextEntry
              error={touched.password && errors.password}
            />
            <CustomButton
              title="Sign In"
              onPress={handleSubmit}
              disabled={!isValid}
            />

            <Text style={styles.link} onPress={() => router.push("/sign-up")}>
              {" "}
              Don't have an account? Sign Up{" "}
            </Text>
          </>
        )}
      </Formik>
    </View>
  );
}

const styles = StyleSheet.create({
  link: {
    marginTop: 20,
    color: "#007BFF",
    textAlign: "center",
  },
});
