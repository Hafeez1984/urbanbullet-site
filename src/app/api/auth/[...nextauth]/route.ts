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
  const res = await handler(req, ctx);
  const corsHeaders = getCorsHeaders(req);
  Object.entries(corsHeaders).forEach(([key, value]) => {
    res.headers.set(key, value);
  });
  return res;
}

export { handleRequest as GET, handleRequest as POST };
