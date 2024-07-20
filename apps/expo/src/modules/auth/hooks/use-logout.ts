import { router } from "expo-router";
import { useMutation } from "@tanstack/react-query";

import { getBaseUrl } from "~/utils/get-base-url";
import { useSession } from "./useSession";

export const useLogout = () => {
  const { session, setSession } = useSession();

  const mutation = useMutation({
    mutationFn: async () => {
      const response = await fetch(`${getBaseUrl()}/logout`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "x-client-source": "AUTH_API_MOBILE_SOURCE",
          "x-refresh-token": String(session?.refreshToken),
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
