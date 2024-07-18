import { useSecureStore } from "~/utils/use-secure-store";

const key = "access_token";

export const useAccessToken = () => {
  const [[isLoading, accessToken], setAccessToken] = useSecureStore(key);

  return { isLoading, accessToken, setAccessToken };
};
