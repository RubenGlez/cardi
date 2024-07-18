import { router } from "expo-router";
import { useMutation } from "@tanstack/react-query";

import { getAuthApiUrl } from "~/utils/get-auth-api-url";
import { useSession } from "./useSession";

export const useLogout = () => {
  const { setSession } = useSession();

  const mutation = useMutation({
    mutationFn: async () => {
      const response = await fetch(`${getAuthApiUrl()}/logout`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "x-trpc-source": String(process.env.AUTH_API_MOBILE_SOURCE),
        },
      });

      if (!response.ok) {
        throw new Error("Error logging out");
      }

      return response.json();
    },
    onSuccess() {
      setSession(null, () => {
        router.push("/log-in");
      });
    },
  });

  return mutation;
};
