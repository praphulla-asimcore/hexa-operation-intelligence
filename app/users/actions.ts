"use server";

import crypto from "node:crypto";
import { revalidatePath } from "next/cache";
import { z } from "zod";
import { Role } from "@prisma/client";
import { prisma } from "@/lib/prisma";
import { auth } from "@/lib/auth";
import { sendInvitationEmail } from "@/lib/email";

const INVITE_TTL_MS = 7 * 24 * 60 * 60 * 1000; // 7 days

async function requireAdmin() {
  const session = await auth();
  if (!session?.user || session.user.role !== "ADMIN") {
    throw new Error("Not authorized");
  }
  return session;
}

export interface InviteState {
  error?: string;
  success?: string;
}

const inviteSchema = z.object({
  email: z.string().email(),
  role: z.enum(["ADMIN", "USER"]),
});

export async function inviteUserAction(
  _prev: InviteState | undefined,
  formData: FormData,
): Promise<InviteState> {
  const session = await requireAdmin();

  const parsed = inviteSchema.safeParse({
    email: formData.get("email"),
    role: formData.get("role"),
  });
  if (!parsed.success) {
    return { error: "Enter a valid email and select a role." };
  }

  const email = parsed.data.email.toLowerCase();
  const role = parsed.data.role as Role;

  const existingUser = await prisma.user.findUnique({ where: { email } });
  if (existingUser) {
    return { error: "A user with that email already exists." };
  }

  const token = crypto.randomBytes(32).toString("hex");
  const expiresAt = new Date(Date.now() + INVITE_TTL_MS);

  // Upsert so re-inviting the same email refreshes the token and expiry.
  await prisma.invitation.upsert({
    where: { email },
    update: { role, token, expiresAt, acceptedAt: null, invitedById: session.user.id },
    create: { email, role, token, expiresAt, invitedById: session.user.id },
  });

  try {
    await sendInvitationEmail({
      to: email,
      role,
      token,
      invitedByName: session.user.name,
    });
  } catch (error) {
    return {
      error: `Invitation saved but the email failed to send: ${
        (error as Error).message
      }`,
    };
  }

  revalidatePath("/users");
  return { success: `Invitation sent to ${email} as ${role === "ADMIN" ? "Administrator" : "Member"}.` };
}

export async function revokeInvitationAction(formData: FormData): Promise<void> {
  await requireAdmin();
  const id = String(formData.get("id") ?? "");
  if (!id) return;
  await prisma.invitation.delete({ where: { id } }).catch(() => undefined);
  revalidatePath("/users");
}

export async function removeUserAction(formData: FormData): Promise<void> {
  const session = await requireAdmin();
  const id = String(formData.get("id") ?? "");
  if (!id || id === session.user.id) return; // never remove yourself

  const target = await prisma.user.findUnique({ where: { id } });
  if (!target) return;

  // Keep at least one administrator.
  if (target.role === Role.ADMIN) {
    const adminCount = await prisma.user.count({ where: { role: Role.ADMIN } });
    if (adminCount <= 1) return;
  }

  await prisma.user.delete({ where: { id } });
  revalidatePath("/users");
}
