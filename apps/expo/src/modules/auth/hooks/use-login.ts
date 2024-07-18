import type { z } from "zod";
import { useMutation } from "@tanstack/react-query";

import type { loginSchema } from "@repo/db/schema";

import { getAuthApiUrl } from "~/utils/get-base-url";
import { useStorageState } from "~/utils/use-storage-state";

interface PayloadResponse {
  accessToken: string;
}

export const useLogin = () => {
  const [_, setSession] = useStorageState("session");

  const mutation = useMutation({
    mutationFn: async (values: z.infer<typeof loginSchema>) => {
      const response = await fetch(`${getAuthApiUrl()}/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(values),
      });

      if (!response.ok) {
        throw new Error("Error logging in");
      }

      return response.json();
    },
    onSuccess(values: PayloadResponse) {
      setSession(values.accessToken);
    },
  });

  return mutation;
};
