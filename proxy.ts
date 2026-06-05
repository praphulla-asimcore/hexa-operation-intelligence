import NextAuth from "next-auth";
import { authConfig } from "@/lib/auth.config";

// Edge proxy (formerly middleware) uses the database-free config. The
// `authorized` callback gates every matched route; unauthenticated users are
// redirected to /signin.
export default NextAuth(authConfig).auth;

export const config = {
  matcher: [
    // Protect everything except NextAuth's own routes, Next internals, the
    // sign-in page, and the public invite-acceptance page.
    "/((?!api/auth|_next/static|_next/image|favicon.ico|signin|accept-invite).*)",
  ],
};
