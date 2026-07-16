import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import CredentialsProvider from "next-auth/providers/credentials";

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
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          return null;
        }

        const email = credentials.email.toLowerCase();
        const password = credentials.password;

        // Custom Sign Up flow simulation
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
  secret: process.env.NEXTAUTH_SECRET,
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
