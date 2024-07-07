import jwt from "jsonwebtoken";
import { AuthUser } from "../types/user";
import { REFRESH_TOKEN_SECRET } from "../config";

export function generateRefreshToken(user: AuthUser) {
  const refreshToken = jwt.sign(user, REFRESH_TOKEN_SECRET, {
    expiresIn: "20m",
  });
  // TODO: save refreshToken in DB
  return refreshToken;
}
