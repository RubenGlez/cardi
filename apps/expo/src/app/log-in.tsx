import { useState } from "react";
import { Text, TextInput, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Link } from "expo-router";

import { useLogin } from "~/modules/auth/hooks/use-login";

export default function LoginPage() {
  const { mutate } = useLogin();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = () => {
    mutate({ email, password });
  };

  return (
    <SafeAreaView className="bg-background">
      <View className="h-full justify-center gap-6 p-6">
        <Text className="text-center text-3xl font-bold text-foreground">
          Login
        </Text>

        <TextInput
          className="rounded border border-border p-3"
          placeholder="Email"
          value={email}
          onChangeText={setEmail}
          keyboardType="email-address"
          autoCapitalize="none"
        />

        <TextInput
          className="rounded border border-border p-3"
          placeholder="Password"
          value={password}
          onChangeText={setPassword}
          secureTextEntry
        />

        <TouchableOpacity
          className="rounded bg-primary p-3"
          onPress={handleLogin}
        >
          <Text className="text-center font-bold text-white">Log In</Text>
        </TouchableOpacity>

        <Text className="text-foreground">
          Don't have an account?{" "}
          <Link href={"/sign-up"} className="text-primary">
            Sign up
          </Link>
        </Text>
      </View>
    </SafeAreaView>
  );
}
