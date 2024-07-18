import "@bacons/text-decoder/install";

import { Redirect, Slot } from "expo-router";
import { StatusBar } from "expo-status-bar";

import { TRPCProvider } from "~/utils/api";

import "../styles.css";

import { Text } from "react-native";

import { useStorageState } from "~/utils/use-storage-state";

export default function RootLayout() {
  const [[session, isLoading]] = useStorageState("session");

  if (isLoading) {
    return <Text>Loading...</Text>;
  }

  if (session) {
    return <Redirect href="/" />;
  }

  return (
    <TRPCProvider>
      <Slot />

      <StatusBar />
    </TRPCProvider>
  );
}
