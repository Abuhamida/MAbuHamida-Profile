import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { parse } from "cookie";
import { jwtVerify } from "jose";  // Import from 'jose'

const JWT_SECRET = process.env.JWT_SECRET || "your_secret_key";  // Secret key from your environment

// Function to verify JWT token using 'jose'
const verifyJWT = async (token: string) => {
  try {
    const { payload } = await jwtVerify(token, new TextEncoder().encode(JWT_SECRET));
    return payload;  // Return decoded payload if token is valid
  } catch (err) {
    console.error("JWT verification failed", err);
    return null;  // Invalid token
  }
};

export async function middleware(req: NextRequest) {
  // Parse cookies from the request
  const cookies = parse(req.headers.get("cookie") || "");

  // Check if the token JWT cookie exists (corrected from 'session' to 'token')
  const token = cookies.token;

  // Get the current path of the request
  const { pathname } = req.nextUrl;

  if (token) {
    // Validate the session (JWT token)
    const validToken = await verifyJWT(token);

    if (validToken) {
      // If the user is logged in and tries to access the login page, redirect to the dashboard
      if (pathname === "/login") {
        return NextResponse.redirect(new URL("/dashboard", req.url));
      }
    } else {
      // If the JWT token is invalid, clear the session cookie and redirect to login
      const response = NextResponse.redirect(new URL("/login", req.url));
      response.cookies.delete("token");  // Delete the token cookie
      return response;
    }
  } else {
    // If the user is not logged in and tries to access protected routes, redirect to login
    if (pathname.startsWith("/dashboard")) {
      return NextResponse.redirect(new URL("/login", req.url));
    }
  }

  // Allow the request to proceed if it's not one of the protected routes or conditions
  return NextResponse.next();
}

// Middleware applies to specific routes
export const config = {
  matcher: ["/dashboard/:path*", "/login"], // Protect dashboard routes and handle login redirection
};
