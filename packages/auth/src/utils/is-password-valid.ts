import bcrypt from "bcrypt";

export const isPasswordValid = async (
  inputPassword: string,
  storedPassword: string,
) => {
  return bcrypt.compare(inputPassword, storedPassword);
};
