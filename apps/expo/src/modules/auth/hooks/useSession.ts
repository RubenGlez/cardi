import { useCallback } from "react";

import { useSecureStore } from "~/utils/use-secure-store";

export interface Session {
  userId: string;
  accessToken: string;
  refreshToken: string;
}

const key = "session";

function parseSession(sessionString: string | null): Session | null {
  if (!sessionString) return null;
  try {
    return JSON.parse(sessionString) as Session;
  } catch (error) {
    console.error("Failed to parse session string:", error);
    return null;
  }
}

function stringifySession(session: Session | null): string | null {
  return session ? JSON.stringify(session) : null;
}

export function useSession() {
  const [secureStoreState, setSecureStoreState] = useSecureStore(key);

  const sessionState: [boolean, Session | null] = [
    secureStoreState[0],
    parseSession(secureStoreState[1]),
  ];

  const setSession = useCallback(
    (session: Session | null, callback?: () => void) => {
      const sessionString = stringifySession(session);
      setSecureStoreState(sessionString, callback);
    },
    [setSecureStoreState],
  );

  const [isLoading, session] = sessionState;

  return { setSession, isLoading, session };
}
