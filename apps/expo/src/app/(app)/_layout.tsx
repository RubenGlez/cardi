import { Text } from "react-native";
import { Redirect, Stack } from "expo-router";

import { useStorageState } from "~/utils/use-storage-state";

export default function AppLayout() {
  const [[session, isLoading]] = useStorageState("session");

  if (isLoading) {
    return <Text>Loading...</Text>;
  }

  if (!session) {
    return <Redirect href="/log-in" />;
  }

  return <Stack />;
}
