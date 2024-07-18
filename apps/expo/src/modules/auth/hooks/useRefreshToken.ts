import { useSecureStore } from "~/utils/use-secure-store";

const key = "refresh_token";

export const useRefreshToken = () => {
  const [[isLoading, refreshToken], setRefreshToken] = useSecureStore(key);

  return { isLoading, refreshToken, setRefreshToken };
};
