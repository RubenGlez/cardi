import type { z } from "zod";
import { router } from "expo-router";
import { useMutation } from "@tanstack/react-query";

import type { signupSchema } from "@repo/db/schema";

import { getAuthApiUrl } from "~/utils/get-base-url";

export const useSignup = () => {
  const mutation = useMutation({
    mutationFn: async (values: z.infer<typeof signupSchema>) => {
      const response = await fetch(`${getAuthApiUrl()}/signup`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(values),
      });

      if (!response.ok) {
        throw new Error("Error signing up");
      }

      return response.json();
    },
    onSuccess() {
      router.push("/log-in");
    },
  });

  return mutation;
};
