import CustomButton from "@/components/CustomButton";
import InputField from "@/components/InputField";
import { useRouter } from "expo-router";
import { Formik } from "formik";
import { Alert, ScrollView, StyleSheet, Text, View } from "react-native";
import * as Yup from "yup";

type SignUpValues = {
  fullName: string;
  email: string;
  password: string;
  confirmPassword: string;
};

const signUpSchema = Yup.object({
  fullName: Yup.string()
    .matches(
      /^[a-zA-Z\s'-]+$/,
      "Full name can include letters, spaces, apostrophes, and hyphens",
    )
    .min(3, "Full name must be at least 3 characters")
    .max(60, "Full name must be 60 characters or less")
    .required("Full name is required"),
  email: Yup.string()
    .email("Enter a valid email address")
    .required("Email is required"),
  password: Yup.string()
    .matches(
      /^(?=.*[A-Za-z])(?=.*\d).+$/,
      "Password must contain at least one letter and one number",
    )
    .min(8, "Password must be at least 8 characters")
    .required("Password is required"),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref("password")], "Passwords must match")
    .required("Please confirm your password"),
});

export default function SignUp() {
  const router = useRouter();

  const initialValues: SignUpValues = {
    fullName: "",
    email: "",
    password: "",
    confirmPassword: "",
  };

  return (
    <View style={styles.screen}>
      <ScrollView
        contentContainerStyle={styles.scrollContent}
        keyboardShouldPersistTaps="handled"
      >
        <View style={styles.card}>
          <Text style={styles.title}>Create Account</Text>
          <Text style={styles.subtitle}>
            Set up your employee app credentials
          </Text>

          <Formik
            initialValues={initialValues}
            validationSchema={signUpSchema}
            validateOnMount
            onSubmit={async (_values, { setSubmitting, resetForm }) => {
              await new Promise((resolve) => setTimeout(resolve, 1000));
              setSubmitting(false);
              resetForm();
              Alert.alert(
                "Account created",
                "Sign in with your new credentials.",
              );
              router.replace("/");
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
                  label="Full Name"
                  icon="person-outline"
                  placeholder="Jane Doe"
                  value={values.fullName}
                  onChangeText={handleChange("fullName")}
                  onBlur={handleBlur("fullName")}
                  autoCapitalize="words"
                  error={touched.fullName ? errors.fullName : undefined}
                />

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

                <InputField
                  label="Confirm Password"
                  icon="shield-checkmark-outline"
                  placeholder="Re-enter your password"
                  value={values.confirmPassword}
                  onChangeText={handleChange("confirmPassword")}
                  onBlur={handleBlur("confirmPassword")}
                  secureTextEntry
                  error={
                    touched.confirmPassword ? errors.confirmPassword : undefined
                  }
                />

                <CustomButton
                  title="Create Account"
                  onPress={() => handleSubmit()}
                  disabled={!isValid}
                  loading={isSubmitting}
                />
                <CustomButton
                  title="Back to Sign In"
                  onPress={() => router.replace("/")}
                  disabled={isSubmitting}
                />
              </>
            )}
          </Formik>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: "#f0f6f7",
  },
  scrollContent: {
    padding: 20,
    flexGrow: 1,
    justifyContent: "center",
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
