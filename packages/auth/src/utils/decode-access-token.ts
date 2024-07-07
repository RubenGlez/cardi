import jwt from "jsonwebtoken";
import { ACCESS_TOKEN_SECRET } from "../config";
import { AuthUser } from "../types/auth-user";

export function decodeAccessToken(token: string): AuthUser | null {
  try {
    const user = jwt.verify(token, ACCESS_TOKEN_SECRET) as AuthUser;
    return user;
  } catch (err) {
    return null;
  }
}
