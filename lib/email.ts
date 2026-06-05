import { Resend } from "resend";
import type { Role } from "@prisma/client";

/** Resolve the public base URL used to build invitation links. */
export function getBaseUrl(): string {
  if (process.env.APP_URL) return process.env.APP_URL;
  if (process.env.AUTH_URL) return process.env.AUTH_URL;
  if (process.env.NEXTAUTH_URL) return process.env.NEXTAUTH_URL;
  if (process.env.VERCEL_PROJECT_PRODUCTION_URL)
    return `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`;
  return "http://localhost:3000";
}

interface InvitationEmailOptions {
  to: string;
  role: Role;
  token: string;
  invitedByName?: string | null;
}

/**
 * Sends the invitation email via Resend. The link carries a single-use token
 * that the invitee exchanges for an account on the accept-invite page.
 */
export async function sendInvitationEmail({
  to,
  role,
  token,
  invitedByName,
}: InvitationEmailOptions): Promise<void> {
  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) {
    throw new Error("RESEND_API_KEY is not configured");
  }

  const from =
    process.env.EMAIL_FROM ??
    "Hexa Operation Intelligence <onboarding@resend.dev>";
  const link = `${getBaseUrl()}/accept-invite?token=${encodeURIComponent(token)}`;
  const roleLabel = role === "ADMIN" ? "Administrator" : "Member";
  const inviter = invitedByName ? `${invitedByName} has` : "You have been";

  const resend = new Resend(apiKey);
  const { error } = await resend.emails.send({
    from,
    to,
    subject: "You're invited to Hexa Operation Intelligence",
    html: `
<!doctype html>
<html>
  <body style="margin:0;background:#f7f8ff;font-family:Inter,-apple-system,Segoe UI,Roboto,sans-serif;color:#0a0a0f;">
    <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="padding:32px 16px;">
      <tr><td align="center">
        <table role="presentation" width="100%" style="max-width:520px;background:#ffffff;border:1px solid rgba(10,10,15,0.07);border-radius:18px;overflow:hidden;">
          <tr><td style="height:6px;background:linear-gradient(90deg,#E010C8,#8B18E8,#2020EE);"></td></tr>
          <tr><td style="padding:32px 32px 8px;">
            <div style="font-size:22px;font-weight:800;background:linear-gradient(90deg,#E010C8,#8B18E8);-webkit-background-clip:text;background-clip:text;color:transparent;">Hexa Operation Intelligence</div>
          </td></tr>
          <tr><td style="padding:8px 32px 0;">
            <p style="font-size:15px;line-height:1.6;color:#0a0a0f;">
              ${inviter} invited to join <strong>Hexa Operation Intelligence</strong> as
              <strong>${roleLabel}</strong>.
            </p>
            <p style="font-size:15px;line-height:1.6;color:rgba(10,10,15,0.6);">
              Click below to verify your email and set your password. This link expires in 7 days.
            </p>
          </td></tr>
          <tr><td style="padding:16px 32px 8px;">
            <a href="${link}" style="display:inline-block;padding:12px 22px;border-radius:12px;background:linear-gradient(135deg,#E010C8,#8B18E8);color:#ffffff;font-weight:600;font-size:14px;text-decoration:none;">Accept invitation</a>
          </td></tr>
          <tr><td style="padding:8px 32px 28px;">
            <p style="font-size:12px;line-height:1.6;color:rgba(10,10,15,0.45);">
              Or paste this link into your browser:<br/>
              <a href="${link}" style="color:#8B18E8;word-break:break-all;">${link}</a>
            </p>
          </td></tr>
          <tr><td style="padding:16px 32px;border-top:1px solid rgba(10,10,15,0.07);">
            <p style="font-size:12px;color:rgba(10,10,15,0.45);margin:0;">Hexamatics Group</p>
          </td></tr>
        </table>
      </td></tr>
    </table>
  </body>
</html>`,
  });

  if (error) {
    throw new Error(error.message ?? "Failed to send invitation email");
  }
}
