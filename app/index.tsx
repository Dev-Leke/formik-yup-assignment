import CustomButton from "@/components/CustomButton";
import InputField from "@/components/InputField";
import { useRouter } from "expo-router";
import { Formik } from "formik";
import * as Yup from "yup";
import { Alert, StyleSheet, Text, View } from "react-native";

type SignInValues = {
  email: string;
  password: string;
};

const signInSchema = Yup.object({
  email: Yup.string().email("Enter a valid email address").required("Email is required"),
  password: Yup.string()
    .min(8, "Password must be at least 8 characters")
    .required("Password is required"),
});

export default function SignIn() {
  const router = useRouter();

  const initialValues: SignInValues = { email: "", password: "" };

  return (
    <View style={styles.screen}>
      <View style={styles.card}>
        <Text style={styles.title}>Welcome Back</Text>
        <Text style={styles.subtitle}>Sign in to continue</Text>

        <Formik
          initialValues={initialValues}
          validationSchema={signInSchema}
          validateOnMount
          onSubmit={async (values, { setSubmitting }) => {
            await new Promise((resolve) => setTimeout(resolve, 900));
            setSubmitting(false);
            Alert.alert("Signed in", `Welcome, ${values.email}`);
            router.replace("/(tabs)/employee-form");
          }}
        >
          {({
            values,
            errors,
            touched,
            handleChange,
            handleBlur,
            handleSubmit,
            isSubmitting,
            isValid,
          }) => (
            <>
              <InputField
                label="Email"
                icon="mail-outline"
                placeholder="name@company.com"
                value={values.email}
                onChangeText={handleChange("email")}
                onBlur={handleBlur("email")}
                keyboardType="email-address"
                autoCapitalize="none"
                error={touched.email ? errors.email : undefined}
              />

              <InputField
                label="Password"
                icon="lock-closed-outline"
                placeholder="At least 8 characters"
                value={values.password}
                onChangeText={handleChange("password")}
                onBlur={handleBlur("password")}
                secureTextEntry
                error={touched.password ? errors.password : undefined}
              />

              <CustomButton
                title="Sign In"
                onPress={() => handleSubmit()}
                disabled={!isValid}
                loading={isSubmitting}
              />
              <CustomButton
                title="Create New Account"
                onPress={() => router.push("/sign-up")}
                disabled={isSubmitting}
              />
            </>
          )}
        </Formik>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    justifyContent: "center",
    backgroundColor: "#f0f6f7",
    padding: 20,
  },
  card: {
    backgroundColor: "#fff",
    borderRadius: 14,
    padding: 20,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.08,
    shadowRadius: 8,
    elevation: 2,
  },
  title: {
    fontSize: 24,
    fontWeight: "700",
    color: "#102a43",
    marginBottom: 6,
  },
  subtitle: {
    fontSize: 15,
    color: "#486581",
    marginBottom: 20,
  },
});
