import { generateToken } from "@/app/lib/jwt";
import { serialize } from "cookie";

export async function POST(req: Request) {
  // Parse the JSON body
  const { username, password } = await req.json();

  const expectedUsername = process.env.USER_NAME;
  const expectedPassword = process.env.USER_PASSWORD;

  // Check if the provided username and password match the environment variables
  if (username === expectedUsername && password === expectedPassword) {
    const token = generateToken({ username });

    // Set the cookie
    const headers = new Headers();
    headers.set(
      "Set-Cookie",
      serialize("token", token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "strict",
        path: "/",
        maxAge: 3600, // 1 hour
      })
    );

    // Return success response with the token cookie
    return new Response(JSON.stringify({ message: "Login successful" }), {
      status: 200,
      headers,
    });
  }

  // If the login fails, return an error response
  return new Response(
    JSON.stringify({ message: "Invalid credentials" }),
    { status: 401 }
  );
}
