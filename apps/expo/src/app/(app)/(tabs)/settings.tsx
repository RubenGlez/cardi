import { Text, TouchableOpacity, View } from "react-native";

import { useLogout } from "~/modules/auth/hooks/use-logout";

export default function SettingsTab() {
  const { mutate } = useLogout();
  const handleLogout = () => {
    mutate();
  };

  return (
    <View className="h-full w-full bg-background p-4">
      <Text className="pb-2 text-center text-5xl font-bold text-foreground">
        Settings Page
      </Text>

      <TouchableOpacity
        className="rounded bg-primary p-3"
        onPress={handleLogout}
      >
        <Text className="text-center font-bold text-white">Log Out</Text>
      </TouchableOpacity>
    </View>
  );
}
