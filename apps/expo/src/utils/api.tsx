import { useState } from "react";
import * as SecureStore from "expo-secure-store";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { httpBatchLink, loggerLink } from "@trpc/client";
import { createTRPCReact } from "@trpc/react-query";
import superjson from "superjson";

import type { AppRouter } from "@repo/trpc";

import type { Session } from "~/modules/auth/hooks/useSession";
import { getBaseUrl } from "./get-base-url";

export const api = createTRPCReact<AppRouter>();
export { type RouterInputs, type RouterOutputs } from "@repo/trpc";

const getHeaders = async () => {
  const headers = new Map<string, string>();
  headers.set("x-client-source", "AUTH_API_MOBILE_SOURCE");

  const sessionString = await SecureStore.getItemAsync("session");
  if (sessionString) {
    try {
      const session = JSON.parse(sessionString) as Session;
      const token = session.accessToken;
      if (token) {
        headers.set("Authorization", `Bearer ${token}`);
      }
    } catch (error) {
      console.error("Failed to parse session string:", error);
    }
  }

  return Object.fromEntries(headers);
};

export function TRPCProvider({ children }: { children: React.ReactNode }) {
  const [queryClient] = useState(() => new QueryClient());
  const [trpcClient] = useState(() =>
    api.createClient({
      links: [
        loggerLink({
          enabled: (opts) =>
            process.env.NODE_ENV === "development" ||
            (opts.direction === "down" && opts.result instanceof Error),
          colorMode: "ansi",
        }),
        httpBatchLink({
          transformer: superjson,
          url: `${getBaseUrl()}/api/trpc`,
          headers: getHeaders,
        }),
      ],
    }),
  );

  return (
    <api.Provider client={trpcClient} queryClient={queryClient}>
      <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
    </api.Provider>
  );
}
