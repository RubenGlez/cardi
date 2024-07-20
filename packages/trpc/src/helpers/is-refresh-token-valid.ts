import { decodeAccessToken } from "./decode-access-token";

export const isRefreshTokenValid = (refreshToken: string): boolean => {
  const decodedToken = decodeAccessToken(refreshToken);

  if (!decodedToken) {
    return false; // Token is invalid
  }

  const { exp } = decodedToken;

  if (typeof exp !== "number") {
    return false; // Invalid token format
  }

  const currentTime = Math.floor(Date.now() / 1000); // Current time in seconds since epoch

  if (exp < currentTime) {
    return false; // Token has expired
  }

  return true; // Token is valid and not expired
};
