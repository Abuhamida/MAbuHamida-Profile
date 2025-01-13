import { NextResponse } from "next/server";
import { serialize } from "cookie";  // Make sure to install `cookie` package if not already

export async function POST(req: Request) {
  // Create the response object
  const response = NextResponse.json({ message: "Logged out successfully" });

  // Set the token cookie to be empty to "log out" the user
  response.cookies.set("token", "", {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",  // Set to `true` in production
    sameSite: "strict",  // Use 'strict' (lowercase) for the sameSite attribute
    path: "/",  // Make sure it applies across your domain
    expires: new Date(0),  // Set the cookie to expire immediately
  });

  // Return the response
  return response;
}
