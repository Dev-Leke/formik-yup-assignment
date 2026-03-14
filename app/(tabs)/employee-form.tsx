import CustomButton from "@/components/CustomButton";
import InputField from "@/components/InputField";
import { useRouter } from "expo-router";
import { Formik } from "formik";
import * as Yup from "yup";
import { Alert, ScrollView, StyleSheet, Text, View } from "react-native";

type EmployeeFormValues = {
  employeeId: string;
  fullName: string;
  department: string;
  position: string;
  workEmail: string;
  phoneNumber: string;
};

const employeeSchema = Yup.object({
  employeeId: Yup.string()
    .matches(/^EMP-\d{4}$/, "Employee ID must follow format EMP-1234")
    .required("Employee ID is required"),
  fullName: Yup.string()
    .matches(
      /^[a-zA-Z][a-zA-Z\s'-]*$/,
      "Full name can include letters, spaces, apostrophes, and hyphens"
    )
    .min(3, "Full name must be at least 3 characters")
    .max(60, "Full name must be 60 characters or less")
    .required("Full name is required"),
  department: Yup.string()
    .min(2, "Department must be at least 2 characters")
    .max(40, "Department must be 40 characters or less")
    .required("Department is required"),
  position: Yup.string()
    .min(2, "Position must be at least 2 characters")
    .max(40, "Position must be 40 characters or less")
    .required("Position is required"),
  workEmail: Yup.string()
    .email("Enter a valid work email address")
    .required("Work email is required"),
  phoneNumber: Yup.string()
    .matches(/^\d{10}$/, "Phone number must be exactly 10 digits")
    .required("Phone number is required"),
});

export default function EmployeeForm() {
  const router = useRouter();

  const initialValues: EmployeeFormValues = {
    employeeId: "",
    fullName: "",
    department: "",
    position: "",
    workEmail: "",
    phoneNumber: "",
  };

  return (
    <View style={styles.screen}>
      <ScrollView contentContainerStyle={styles.scrollContent} keyboardShouldPersistTaps="handled">
        <View style={styles.card}>
          <Text style={styles.title}>Employee Information</Text>
          <Text style={styles.subtitle}>Complete all fields before submitting.</Text>

          <Formik
            initialValues={initialValues}
            validationSchema={employeeSchema}
            validateOnMount
            onSubmit={async (values, { setSubmitting, resetForm }) => {
              await new Promise((resolve) => setTimeout(resolve, 1000));
              setSubmitting(false);

              Alert.alert("Form Submitted", "Employee information saved successfully.");
              router.push({
                pathname: "/(tabs)/profile",
                params: {
                  employeeId: values.employeeId,
                  fullName: values.fullName,
                  department: values.department,
                  position: values.position,
                  workEmail: values.workEmail,
                  phoneNumber: values.phoneNumber,
                },
              });

              resetForm();
            }}
          >
            {({
              values,
              errors,
              touched,
              handleBlur,
              handleSubmit,
              handleReset,
              setFieldValue,
              isSubmitting,
              isValid,
            }) => (
              <>
                <InputField
                  label="Employee ID"
                  icon="card-outline"
                  placeholder="EMP-1234"
                  value={values.employeeId}
                  onChangeText={(text) => setFieldValue("employeeId", text.toUpperCase())}
                  onBlur={handleBlur("employeeId")}
                  autoCapitalize="characters"
                  autoCorrect={false}
                  error={touched.employeeId ? errors.employeeId : undefined}
                />

                <InputField
                  label="Full Name"
                  icon="person-outline"
                  placeholder="Jane Doe"
                  value={values.fullName}
                  onChangeText={(text) => setFieldValue("fullName", text)}
                  onBlur={handleBlur("fullName")}
                  autoCapitalize="words"
                  autoCorrect={false}
                  error={touched.fullName ? errors.fullName : undefined}
                />

                <InputField
                  label="Department"
                  icon="business-outline"
                  placeholder="Human Resources"
                  value={values.department}
                  onChangeText={(text) => setFieldValue("department", text)}
                  onBlur={handleBlur("department")}
                  autoCapitalize="words"
                  error={touched.department ? errors.department : undefined}
                />

                <InputField
                  label="Position"
                  icon="briefcase-outline"
                  placeholder="HR Specialist"
                  value={values.position}
                  onChangeText={(text) => setFieldValue("position", text)}
                  onBlur={handleBlur("position")}
                  autoCapitalize="words"
                  error={touched.position ? errors.position : undefined}
                />

                <InputField
                  label="Work Email"
                  icon="mail-outline"
                  placeholder="employee@company.com"
                  value={values.workEmail}
                  onChangeText={(text) => setFieldValue("workEmail", text.trim())}
                  onBlur={handleBlur("workEmail")}
                  keyboardType="email-address"
                  autoCapitalize="none"
                  error={touched.workEmail ? errors.workEmail : undefined}
                />

                <InputField
                  label="Phone Number"
                  icon="call-outline"
                  placeholder="4035551234"
                  value={values.phoneNumber}
                  onChangeText={(text) =>
                    setFieldValue("phoneNumber", text.replace(/\D/g, "").slice(0, 10))
                  }
                  onBlur={handleBlur("phoneNumber")}
                  keyboardType="phone-pad"
                  error={touched.phoneNumber ? errors.phoneNumber : undefined}
                />

                <CustomButton
                  title="Submit Employee Form"
                  onPress={() => handleSubmit()}
                  disabled={!isValid}
                  loading={isSubmitting}
                />
                <CustomButton
                  title="Reset Form"
                  onPress={handleReset}
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
    padding: 16,
    flexGrow: 1,
  },
  card: {
    backgroundColor: "#fff",
    borderRadius: 14,
    padding: 18,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.08,
    shadowRadius: 8,
    elevation: 2,
  },
  title: {
    fontSize: 22,
    fontWeight: "700",
    color: "#102a43",
    marginBottom: 4,
  },
  subtitle: {
    fontSize: 14,
    color: "#486581",
    marginBottom: 16,
  },
});
