import CustomButton from "@/components/CustomButton";
import { useRouter } from "expo-router";
import { Text, View } from "react-native";

export default function SignIn() {
  const router = useRouter();

  return (
    <View>
      <Text>Sign In Screen</Text>

      <CustomButton
        title="Go to Sign Up "
        onPress={() => router.push("/sign-up")}
        disabled={null}
      />

      <CustomButton
        title="Login"
        onPress={() => router.replace("/(tabs)/employee-form")}
        disabled={null}
      />
    </View>
  );
}
