import { useState } from "react";
import { Text, TextInput, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Link } from "expo-router";

import { useSignup } from "~/modules/auth/hooks/use-signup";

export default function SignupPage() {
  const { mutate } = useSignup();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSignup = () => {
    mutate({ email, password, role: "business" });
  };

  return (
    <SafeAreaView className="bg-background">
      <View className="h-full justify-center gap-6 p-6">
        <Text className="text-center text-3xl font-bold text-foreground">
          Signup
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
          onPress={handleSignup}
        >
          <Text className="text-center font-bold text-white">Sign up</Text>
        </TouchableOpacity>

        <Text className="text-foreground">
          Already have an account?{" "}
          <Link href={"/log-in"} className="text-primary">
            Log in
          </Link>
        </Text>
      </View>
    </SafeAreaView>
  );
}
