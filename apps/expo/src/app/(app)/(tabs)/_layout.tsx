import { Text } from "react-native";
import { Tabs } from "expo-router";

export default function TabLayout() {
  const tabBarIcon = (props: {
    focused: boolean;
    color: string;
    size: number;
  }) => <Text style={{ color: props.color }}>Icon</Text>;

  return (
    <Tabs screenOptions={{ headerShown: false }}>
      <Tabs.Screen
        name="index"
        options={{
          title: "Home",
          tabBarIcon,
        }}
      />
      <Tabs.Screen
        name="settings"
        options={{
          title: "Settings",
          tabBarIcon,
        }}
      />
    </Tabs>
  );
}
