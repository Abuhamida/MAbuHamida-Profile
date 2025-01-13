import { NextApiRequest, NextApiResponse } from "next";
import { verifyToken } from "../../lib/jwt";
import { NextResponse } from "next/server";
export default function handler(req: NextApiRequest, res: NextApiResponse) {
  const token = req.cookies.token;

  if (!token) {
    return res.status(401).json({ message: "Unauthorized" });
  }

  const payload = verifyToken(token);

  if (!payload) {
    return NextResponse.json({ message: "Invalid or expired token" });
  }

  return NextResponse.json({ message: "Authenticated", user: payload });
}
