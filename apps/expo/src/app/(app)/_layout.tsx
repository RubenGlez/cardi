import { ActivityIndicator } from "react-native";
import { Redirect, Stack } from "expo-router";

import { useSession } from "~/modules/auth/hooks/useSession";

export default function AppLayout() {
  const { isLoading, session } = useSession();

  if (isLoading) {
    return <ActivityIndicator />;
  }

  if (!session?.accessToken) {
    return <Redirect href="/log-in" />;
  }

  return (
    <Stack>
      <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
    </Stack>
  );
}
