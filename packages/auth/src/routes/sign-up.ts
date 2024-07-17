import type { RequestHandler } from "express";

import { signUpInputSchema } from "@repo/validators";

import { createUser } from "../utils/create-user";
import { isUserAlreadyExist } from "../utils/is-user-already-exist";

export const signUp: RequestHandler = async (req, res) => {
  try {
    const { success, error, data } = signUpInputSchema.safeParse(req.body);

    if (!success) {
      return res.error(400, "Validation error", error.format());
    }

    const { email, password } = data;

    if (await isUserAlreadyExist(email)) {
      return res.error(400, "Unauthorized");
    }

    const user = await createUser(email, password);

    res.success(user, 201);
  } catch (e) {
    res.error(500, "Internal Server Error");
  }
};
