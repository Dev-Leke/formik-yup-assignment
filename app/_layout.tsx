import { Stack } from "expo-router";

export default function RootLayout() {
  return (
    <Stack>
      {/* Auth Screens */}
      <Stack.Screen name="index" options={{ title: "Sign In" }} />

      <Stack.Screen name="sign-up" options={{ title: "Sign Up" }} />

      {/* Main App */}
      <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
    </Stack>
  );
}
