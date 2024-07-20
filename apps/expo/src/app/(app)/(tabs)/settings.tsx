import { Text, TouchableOpacity, View } from "react-native";

import { useLogout } from "~/modules/auth/hooks/use-logout";
import { useSession } from "~/modules/auth/hooks/useSession";
import { api } from "~/utils/api";

export default function SettingsTab() {
  const { mutate } = useLogout();
  const { session } = useSession();
  const handleLogout = () => {
    mutate();
  };

  const userId = session?.userId ?? "";

  const { data } = api.user.byId.useQuery(
    { id: userId },
    {
      enabled: !!userId,
      staleTime: 1000 * 60 * 1, // 1 Minute
    },
  );

  return (
    <View className="h-full w-full bg-background p-4">
      <Text className="pb-2 text-center text-5xl font-bold text-foreground">
        Settings Page
      </Text>

      <Text>Welcome!</Text>
      <Text>Id: {data?.id}</Text>
      <Text>Name: {data?.name}</Text>
      <Text>Email: {data?.email}</Text>
      <Text>Role: {data?.role}</Text>

      <TouchableOpacity
        className="rounded bg-primary p-3"
        onPress={handleLogout}
      >
        <Text className="text-center font-bold text-white">Log Out</Text>
      </TouchableOpacity>
    </View>
  );
}
