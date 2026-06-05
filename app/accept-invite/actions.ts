"use server";

import { AuthError } from "next-auth";
import bcrypt from "bcryptjs";
import { z } from "zod";
import { prisma } from "@/lib/prisma";
import { signIn } from "@/lib/auth";

export interface AcceptState {
  error?: string;
}

const schema = z.object({
  token: z.string().min(1),
  name: z.string().trim().min(1, "Name is required").max(120),
  password: z.string().min(8, "Password must be at least 8 characters").max(200),
});

export async function acceptInviteAction(
  _prev: AcceptState | undefined,
  formData: FormData,
): Promise<AcceptState> {
  const parsed = schema.safeParse({
    token: formData.get("token"),
    name: formData.get("name"),
    password: formData.get("password"),
  });
  if (!parsed.success) {
    return { error: parsed.error.issues[0]?.message ?? "Invalid details." };
  }
  const { token, name, password } = parsed.data;

  const invite = await prisma.invitation.findUnique({ where: { token } });
  if (!invite || invite.acceptedAt || invite.expiresAt < new Date()) {
    return { error: "This invitation is invalid or has expired." };
  }

  const existing = await prisma.user.findUnique({
    where: { email: invite.email },
  });
  if (existing) {
    return {
      error: "An account with this email already exists. Try signing in.",
    };
  }

  const passwordHash = await bcrypt.hash(password, 12);
  await prisma.$transaction([
    prisma.user.create({
      data: { email: invite.email, name, role: invite.role, passwordHash },
    }),
    prisma.invitation.update({
      where: { id: invite.id },
      data: { acceptedAt: new Date() },
    }),
  ]);

  // Sign the new account in and redirect to the dashboard.
  try {
    await signIn("credentials", {
      email: invite.email,
      password,
      redirectTo: "/",
    });
    return {};
  } catch (error) {
    if (error instanceof AuthError) {
      // Account exists now; just send them to sign in manually.
      return { error: "Account created. Please sign in." };
    }
    throw error;
  }
}
