import type { z } from "zod";
import { router } from "expo-router";
import { useMutation } from "@tanstack/react-query";

import type { loginSchema } from "@repo/db/schema";

import { getAuthApiUrl } from "~/utils/get-auth-api-url";
import { useSession } from "./useSession";

interface LoginResponse {
  data: {
    accessToken: string;
    refreshToken: string;
  };
}

export const useLogin = () => {
  const { setSession } = useSession();

  const mutation = useMutation({
    mutationFn: async (values: z.infer<typeof loginSchema>) => {
      const response = await fetch(`${getAuthApiUrl()}/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "x-trpc-source": String(process.env.AUTH_API_MOBILE_SOURCE),
        },
        body: JSON.stringify(values),
      });

      if (!response.ok) {
        throw new Error("Error logging in");
      }

      return response.json();
    },
    onSuccess(values: LoginResponse) {
      setSession(values.data, () => {
        router.push("/");
      });
    },
  });

  return mutation;
};
