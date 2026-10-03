import { AuthOptions } from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import CredentialsProvider from "next-auth/providers/credentials";

const getCookieDomain = () => {
  if (process.env.NEXTAUTH_COOKIE_DOMAIN) {
    return process.env.NEXTAUTH_COOKIE_DOMAIN;
  }
  if (process.env.NEXTAUTH_URL && process.env.NEXTAUTH_URL.includes("urbanbullet.in")) {
    return ".urbanbullet.in";
  }
  return undefined;
};

const cookieDomain = getCookieDomain();
const useSecure = process.env.NODE_ENV === "production" || process.env.NEXTAUTH_URL?.startsWith("https://");

export const authOptions: AuthOptions = {
  debug: true,
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
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          return null;
        }

        const email = credentials.email.toLowerCase();
        const password = credentials.password;

        if (credentials.isSignup === "true") {
          const firstName = credentials.firstName || "New";
          const lastName = credentials.lastName || "User";
          return {
            id: email,
            name: `${firstName} ${lastName}`,
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

        return null;
      },
    }),
  ],
  session: {
    strategy: "jwt",
  },
  pages: {
    signIn: "/account",
    error: "/account",
  },
  cookies: {
    sessionToken: {
      name: useSecure ? `__Secure-next-auth.session-token` : `next-auth.session-token`,
      options: {
        httpOnly: true,
        sameSite: "lax",
        path: "/",
        secure: useSecure,
        domain: cookieDomain,
      },
    },
    callbackUrl: {
      name: useSecure ? `__Secure-next-auth.callback-url` : `next-auth.callback-url`,
      options: {
        sameSite: "lax",
        path: "/",
        secure: useSecure,
        domain: cookieDomain,
      },
    },
    csrfToken: {
      name: useSecure ? `__Secure-next-auth.csrf-token` : `next-auth.csrf-token`,
      options: {
        httpOnly: true,
        sameSite: "lax",
        path: "/",
        secure: useSecure,
        domain: cookieDomain,
      },
    },
    pkceCodeVerifier: {
      name: useSecure ? `__Secure-next-auth.pkce.code_verifier` : `next-auth.pkce.code_verifier`,
      options: {
        httpOnly: true,
        sameSite: "lax",
        path: "/",
        secure: useSecure,
        domain: cookieDomain,
      },
    },
    state: {
      name: useSecure ? `__Secure-next-auth.state` : `next-auth.state`,
      options: {
        httpOnly: true,
        sameSite: "lax",
        path: "/",
        secure: useSecure,
        domain: cookieDomain,
      },
    },
    nonce: {
      name: useSecure ? `__Secure-next-auth.nonce` : `next-auth.nonce`,
      options: {
        httpOnly: true,
        sameSite: "lax",
        path: "/",
        secure: useSecure,
        domain: cookieDomain,
      },
    },
  },
  secret: process.env.NEXTAUTH_SECRET as string,
  // @ts-ignore
  trustHost: true,
  callbacks: {
    async redirect({ url, baseUrl }) {
      if (url.startsWith("/")) {
        return `${baseUrl}${url}`;
      }
      try {
        const parsedUrl = new URL(url);
        if (
          parsedUrl.hostname === "urbanbullet.in" ||
          parsedUrl.hostname.endsWith(".urbanbullet.in") ||
          parsedUrl.origin === baseUrl
        ) {
          return url;
        }
      } catch (e) {
        // Fallback
      }
      return `${baseUrl}/account`;
    },
    async jwt({ token, user }: any) {
      if (user) {
        token.id = user.id;
      }
      return token;
    },
    async session({ session, token }: any) {
      if (session.user) {
        (session.user as any).id = token.id;
      }
      return session;
    },
  },
};
