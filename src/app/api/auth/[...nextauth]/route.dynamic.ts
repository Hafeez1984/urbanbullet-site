import NextAuth from "next-auth";
import { authOptions } from "@/lib/authOptions";
import { NextResponse } from "next/server";

export const dynamic = 'force-dynamic';

const handler = NextAuth(authOptions);

function getCorsHeaders(req: Request) {
  const origin = req.headers.get("origin") || "https://urbanbullet.in";
  const allowedOrigins = [
    "https://urbanbullet.in",
    "https://dev.urbanbullet.in",
    "http://localhost:3000",
  ];
  const isAllowed = allowedOrigins.includes(origin) || origin.endsWith(".urbanbullet.in");
  const allowOrigin = isAllowed ? origin : "https://urbanbullet.in";

  return {
    "Access-Control-Allow-Origin": allowOrigin,
    "Access-Control-Allow-Credentials": "true",
    "Access-Control-Allow-Methods": "GET, POST, OPTIONS",
    "Access-Control-Allow-Headers": "Content-Type, Authorization, X-Requested-With, Cookie",
  };
}

export async function OPTIONS(req: Request) {
  return new NextResponse(null, {
    status: 204,
    headers: getCorsHeaders(req),
  });
}

async function handleRequest(req: Request, ctx: any) {
  try {
    const res = await handler(req, ctx);
    const corsHeaders = getCorsHeaders(req);

    // If this is a session check request and NextAuth returned a redirect (30x),
    // return 200 OK with empty session `{}` so client next-auth/react does not trigger a window redirect.
    const url = new URL(req.url);
    if (url.pathname.endsWith('/session') && res.status >= 300 && res.status < 400) {
      return NextResponse.json({}, { status: 200, headers: corsHeaders });
    }

    Object.entries(corsHeaders).forEach(([key, value]) => {
      res.headers.set(key, value);
    });
    return res;
  } catch (error) {
    console.error("NextAuth route error:", error);
    const corsHeaders = getCorsHeaders(req);
    const url = new URL(req.url);
    if (url.pathname.endsWith('/session')) {
      return NextResponse.json({}, { status: 200, headers: corsHeaders });
    }
    return NextResponse.json({ error: "Internal Auth Error" }, { status: 500, headers: corsHeaders });
  }
}

export { handleRequest as GET, handleRequest as POST };
