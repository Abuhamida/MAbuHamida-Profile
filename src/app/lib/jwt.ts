import jwt from "jsonwebtoken";

const SECRET_KEY = process.env.JWT_SECRET || "your-secret-key";

export function generateToken(payload: object): string {
  return jwt.sign(payload, SECRET_KEY, { expiresIn: "1h" });
}

export function verifyToken(token: string): object | null {
  try {
    return jwt.verify(token, SECRET_KEY) as object;
  } catch (error) {
    return null;
  }
}
