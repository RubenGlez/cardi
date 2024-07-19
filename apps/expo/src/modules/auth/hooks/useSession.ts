import { useCallback } from "react";

import { useSecureStore } from "~/utils/use-secure-store";

const accessTokenKey = "access_token";
const refreshTokenKey = "refresh_token";

export interface Session {
  accessToken: string;
  refreshToken: string;
}

export const useSession = () => {
  const [[isLoadingRefrehsToken, accessToken], setAccessToken] =
    useSecureStore(accessTokenKey);
  const [[isLoadingAccessToken, refreshToken], setRefreshToken] =
    useSecureStore(refreshTokenKey);

  const session = {
    accessToken,
    refreshToken,
  };

  const isLoading = isLoadingRefrehsToken || isLoadingAccessToken;

  const setSession = useCallback(
    (val: Session | null, cb?: () => void) => {
      setAccessToken(val?.accessToken ?? null, () => {
        setRefreshToken(val?.refreshToken ?? null, () => {
          cb?.();
        });
      });
    },
    [setAccessToken, setRefreshToken],
  );

  const clearSession = useCallback(() => {
    setAccessToken(null, () => {
      setRefreshToken(null);
    });
  }, [setAccessToken, setRefreshToken]);

  return { isLoading, session, setSession, clearSession };
};
