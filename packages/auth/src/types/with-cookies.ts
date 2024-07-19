export type WithCookies<T> = {
  cookies: {
    accessToken?: string;
    refreshToken?: string;
  };
} & T;
