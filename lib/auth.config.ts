import type { NextAuthConfig } from "next-auth";
import type { Role } from "@prisma/client";

/**
 * Edge-safe NextAuth config. Contains no database/bcrypt access so it can be
 * imported by middleware (edge runtime). The Credentials provider lives in
 * `lib/auth.ts` (node runtime) and is spread on top of this.
 */
export const authConfig = {
  trustHost: true,
  pages: { signIn: "/signin" },
  session: { strategy: "jwt" },
  providers: [],
  callbacks: {
    // Invoked by middleware to gate matched routes. The matcher already
    // excludes public paths, so any matched request must be authenticated.
    authorized({ auth }) {
      return !!auth?.user;
    },
    jwt({ token, user }) {
      if (user) {
        token.id = user.id as string;
        token.role = user.role as Role;
      }
      return token;
    },
    session({ session, token }) {
      if (session.user) {
        session.user.id = token.id as string;
        session.user.role = token.role as Role;
      }
      return session;
    },
  },
} satisfies NextAuthConfig;
