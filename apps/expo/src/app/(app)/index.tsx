import { Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Stack } from "expo-router";

export default function HomePage() {
  const signOut = () => {
    // TODO
  };

  return (
    <SafeAreaView className="bg-background">
      <Stack.Screen options={{ title: "Home Page" }} />

      <View className="h-full w-full bg-background p-4">
        <Text className="pb-2 text-center text-5xl font-bold text-foreground">
          Home Page
        </Text>

        <Text
          onPress={() => {
            // The `app/(app)/_layout.tsx` will redirect to the sign-in screen.
            signOut();
          }}
        >
          Sign Out
        </Text>
      </View>
    </SafeAreaView>
  );
}
