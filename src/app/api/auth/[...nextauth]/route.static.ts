import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import CredentialsProvider from "next-auth/providers/credentials";
import { verifyTurnstileToken } from "@/lib/turnstile";

export const dynamic = "force-static";

export function generateStaticParams() {
  return [
    { nextauth: ["signin"] },
    { nextauth: ["signout"] },
    { nextauth: ["session"] },
    { nextauth: ["providers"] },
    { nextauth: ["csrf"] },
    { nextauth: ["callback"] }
  ];
}

console.log("[NextAuth Route] Init. NEXTAUTH_URL:", process.env.NEXTAUTH_URL, "Secret exists:", !!process.env.NEXTAUTH_SECRET);

const handler = NextAuth({
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID || "",
      clientSecret: process.env.GOOGLE_CLIENT_SECRET || "",
      authorization: {
        params: {
          prompt: "select_account",
        },
      },
    }),
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
        firstName: { label: "First Name", type: "text" },
        lastName: { label: "Last Name", type: "text" },
        isSignup: { label: "Is Signup", type: "text" },
        turnstileToken: { label: "Turnstile Token", type: "text" },
      },
      async authorize(credentials, req) {
        const creds = credentials as Record<string, string | undefined> | undefined;
        const turnstileToken =
          creds?.turnstileToken ||
          creds?.["cf-turnstile-response"] ||
          creds?.turnstile;

        const forwardedFor = req?.headers?.["x-forwarded-for"];
        const realIp = req?.headers?.["x-real-ip"];
        const clientIp =
          (typeof forwardedFor === "string" ? forwardedFor.split(",")[0]?.trim() : undefined) ||
          (typeof realIp === "string" ? realIp : undefined);

        if (!turnstileToken) {
          throw new Error("Cloudflare Turnstile token is required.");
        }

        const verification = await verifyTurnstileToken(turnstileToken, clientIp);
        if (!verification.success) {
          throw new Error("Cloudflare Turnstile verification failed. Please try again.");
        }

        if (!credentials?.email || !credentials?.password) {
          throw new Error("Email and password are required.");
        }

        const email = credentials.email.toLowerCase().trim();
        const password = credentials.password;

        if (!email.includes("@")) {
          throw new Error("Invalid email address.");
        }

        if (credentials.isSignup === "true") {
          if (password.length < 6) {
            throw new Error("Password must be at least 6 characters.");
          }
          const firstName = credentials.firstName || "New";
          const lastName = credentials.lastName || "User";
          return {
            id: email,
            name: `${firstName} ${lastName}`.trim(),
            email: email,
          };
        }

        if (email === "alex@streetrevolution.com") {
          return {
            id: "alex-rider",
            name: "Alex Rider",
            email: "alex@streetrevolution.com",
          };
        }

        if (email.includes("@") && password.length >= 6) {
          const displayName = email.split("@")[0];
          const capitalized = displayName.charAt(0).toUpperCase() + displayName.slice(1);
          return {
            id: email,
            name: `${capitalized} User`,
            email: email,
          };
        }

        throw new Error("Invalid email or password (minimum 6 characters).");
      },
    }),
  ],
  session: {
    strategy: "jwt",
  },
  secret: process.env.NEXTAUTH_SECRET,
  // @ts-ignore
  trustHost: true,
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
      }
      return token;
    },
    async session({ session, token }) {
      if (session.user) {
        (session.user as any).id = token.id;
      }
      return session;
    },
  },
});

export { handler as GET, handler as POST };
