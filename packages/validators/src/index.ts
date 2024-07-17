import { z } from "zod";

export const unused = z.string().describe(
  `This lib is currently not used as we use drizzle-zod for simple schemas
   But as your application grows and you need other validators to share
   with back and frontend, you can put them in here
  `,
);

export const logInInputSchema = z.object({
  email: z.string().email({ message: "Invalid email address" }),
  password: z
    .string()
    .min(6, { message: "Password must be at least 6 characters long" }),
});

export const logOutInputSchema = z.object({
  refreshToken: z.string({ message: "refreshToken is required" }),
});

export const refreshTokenInputSchema = z.object({
  userId: z.string({ message: "userId is required" }),
  refreshToken: z.string({ message: "refreshToken is required" }),
});

export const signUpInputSchema = z.object({
  email: z.string().email({ message: "Invalid email address" }),
  password: z
    .string()
    .min(6, { message: "Password must be at least 6 characters long" }),
});
