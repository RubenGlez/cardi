import jwt from "jsonwebtoken";
import { AuthUser } from "../types/auth-user";
import { ACCESS_TOKEN_SECRET } from "../config";

export function generateAccessToken(user: AuthUser) {
  return jwt.sign(user, ACCESS_TOKEN_SECRET, { expiresIn: "15m" });
}
