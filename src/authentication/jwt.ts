import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

const JWT_SECRET = process.env.KEY_SECRET || "default_key";

export const generateToken = (payload: any) => {
  return jwt.sign(JSON.stringify(payload), JWT_SECRET);
};

export const verifyToken = (token: string) => {
  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    return decoded;
  } catch (error) {
    throw new Error("Token inválido");
  }
};
