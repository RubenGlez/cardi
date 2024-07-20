import type { z } from "zod";
import { router } from "expo-router";
import { useMutation } from "@tanstack/react-query";

import type { loginSchema } from "@repo/db/schema";

import type { Session } from "./useSession";
import { getBaseUrl } from "~/utils/get-base-url";
import { useSession } from "./useSession";

export const useLogin = () => {
  const { setSession } = useSession();

  const mutation = useMutation({
    mutationFn: async (values: z.infer<typeof loginSchema>) => {
      const response = await fetch(`${getBaseUrl()}/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "x-client-source": "AUTH_API_MOBILE_SOURCE",
        },
        body: JSON.stringify(values),
      });

      if (!response.ok) {
        throw new Error("Error logging in");
      }

      const res = response.json();
      return res;
    },
    onSuccess(values: Session) {
      setSession(values, () => {
        router.push("/");
      });
    },
  });

  return mutation;
};
