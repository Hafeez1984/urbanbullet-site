import { withAuth } from "next-auth/middleware";
import { NextResponse } from "next/server";

export default withAuth(
  function middleware(req) {
    return NextResponse.next();
  },
  {
    callbacks: {
      authorized: ({ token, req }) => {
        // Explicitly bypass authentication checks for /auth-gateway
        if (req.nextUrl.pathname.startsWith('/auth-gateway')) {
          return true;
        }
        return true;
      },
    },
  }
);

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - auth-gateway (public cross-domain NextAuth gateway)
     */
    "/((?!api|_next/static|_next/image|favicon.ico|auth-gateway).*)",
  ],
};
