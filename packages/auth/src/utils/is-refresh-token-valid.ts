import { decodeAccessToken } from "./decode-access-token";

export const isRefreshTokenValid = (refreshToken: string) => {
  return decodeAccessToken(refreshToken) !== null;
};
