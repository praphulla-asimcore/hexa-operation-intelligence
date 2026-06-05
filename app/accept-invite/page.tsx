import { prisma } from "@/lib/prisma";
import { AuthShell } from "@/components/AuthShell";
import { AcceptInviteForm } from "@/components/AcceptInviteForm";

export const dynamic = "force-dynamic";

export default async function AcceptInvitePage({
  searchParams,
}: {
  searchParams: Promise<{ token?: string }>;
}) {
  const { token } = await searchParams;

  const invite = token
    ? await prisma.invitation.findUnique({ where: { token } })
    : null;

  const invalid =
    !invite || !!invite.acceptedAt || invite.expiresAt < new Date();

  if (invalid) {
    return (
      <AuthShell
        title="Invitation unavailable"
        subtitle="This invitation link is invalid, already used, or expired. Ask an administrator to send a new one."
      >
        <a
          href="/signin"
          className="inline-flex items-center justify-center rounded-xl border border-black/10 px-4 py-2.5 text-sm font-semibold text-ink/80 transition-colors hover:border-black/20 hover:text-ink"
        >
          Go to sign in
        </a>
      </AuthShell>
    );
  }

  const roleLabel = invite.role === "ADMIN" ? "Administrator" : "Member";

  return (
    <AuthShell
      title="Accept your invitation"
      subtitle={`You've been invited as ${roleLabel}. Set a password to finish.`}
    >
      <AcceptInviteForm token={invite.token} email={invite.email} />
    </AuthShell>
  );
}
