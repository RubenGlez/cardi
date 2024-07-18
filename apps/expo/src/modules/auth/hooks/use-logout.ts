import type { z } from "zod";
import { useMutation } from "@tanstack/react-query";

import type { logoutSchema } from "@repo/db/schema";

import { getAuthApiUrl } from "~/utils/get-base-url";

export const useLogout = () => {
  const mutation = useMutation({
    mutationFn: async (values: z.infer<typeof logoutSchema>) => {
      const response = await fetch(`${getAuthApiUrl()}/logout`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(values),
      });

      if (!response.ok) {
        throw new Error("Error logging out");
      }

      return response.json();
    },
  });

  return mutation;
};
