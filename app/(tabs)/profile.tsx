import { useLocalSearchParams } from "expo-router";
import { ScrollView, StyleSheet, Text, View } from "react-native";

type ProfileParams = {
  employeeId?: string;
  fullName?: string;
  department?: string;
  position?: string;
  workEmail?: string;
  phoneNumber?: string;
};

function FieldRow({ label, value }: { label: string; value: string }) {
  return (
    <View style={styles.fieldRow}>
      <Text style={styles.label}>{label}</Text>
      <Text style={styles.value}>{value}</Text>
    </View>
  );
}

export default function Profile() {
  const params = useLocalSearchParams<ProfileParams>();

  const profileData = {
    employeeId: params.employeeId ?? "Not provided",
    fullName: params.fullName ?? "Not provided",
    department: params.department ?? "Not provided",
    position: params.position ?? "Not provided",
    workEmail: params.workEmail ?? "Not provided",
    phoneNumber: params.phoneNumber ?? "Not provided",
  };

  return (
    <View style={styles.screen}>
      <ScrollView contentContainerStyle={styles.content}>
        <View style={styles.card}>
          <Text style={styles.title}>Employee Profile</Text>
          <Text style={styles.subtitle}>
            Submitted details from the employee form
          </Text>

          <FieldRow label="Employee ID" value={profileData.employeeId} />
          <FieldRow label="Full Name" value={profileData.fullName} />
          <FieldRow label="Department" value={profileData.department} />
          <FieldRow label="Position" value={profileData.position} />
          <FieldRow label="Work Email" value={profileData.workEmail} />
          <FieldRow label="Phone Number" value={profileData.phoneNumber} />
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
  content: {
    padding: 16,
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
  fieldRow: {
    marginBottom: 14,
    borderBottomWidth: 1,
    borderBottomColor: "#e4e7eb",
    paddingBottom: 10,
  },
  label: {
    fontSize: 13,
    color: "#627d98",
    marginBottom: 2,
  },
  value: {
    fontSize: 16,
    color: "#102a43",
    fontWeight: "500",
  },
});
