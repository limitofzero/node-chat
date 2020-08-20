import { UserToken } from "shared-models/auth/sign-in/user-token";
import jwt_decode from "jwt-decode";

export const parseToken = (token: string | null): UserToken | null => {
  return token ? jwt_decode(token) as UserToken : null;
};

export const isTokenExpired = (token: string | null): boolean => {
  const parsed = parseToken(token);
  if (parsed) {
    const expDate = parsed.exp * 1000;
    return expDate < Date.now();
  }

  return true;
};