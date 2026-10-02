'use client';
import { SessionProvider } from "next-auth/react";
export default function AuthProvider({ children }: { children: React.ReactNode }) {
  const basePath = process.env.NEXT_PUBLIC_AUTH_URL;
  return <SessionProvider basePath={basePath}>{children}</SessionProvider>;
}
