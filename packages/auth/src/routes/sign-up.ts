import type { RequestHandler } from "express";

import { signupSchema } from "@repo/db/schema";

import { createUser } from "../utils/create-user";
import { isUserAlreadyExist } from "../utils/is-user-already-exist";

export const signUp: RequestHandler = async (req, res) => {
  try {
    // Validate the request body
    const { success, error, data } = signupSchema.safeParse(req.body);

    if (!success) {
      return res
        .status(400)
        .json({ error: "Validation Error", details: error.format() });
    }

    const { email, password, role } = data;

    // Check if the user already exists
    if (await isUserAlreadyExist(email)) {
      return res
        .status(409)
        .json({ error: "Conflict", message: "User already exists" });
    }

    // Create a new user
    await createUser({ email, password, role });

    // Respond with a success message
    return res.status(201).json({ message: "User created" });
  } catch (error) {
    console.error(error); // Log the error for debugging
    return res.status(500).json({ error: "Internal Server Error" });
  }
};
