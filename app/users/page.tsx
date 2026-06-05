import { redirect } from "next/navigation";
import Link from "next/link";
import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { AmbientBackground } from "@/components/AmbientBackground";
import { Nav } from "@/components/Nav";
import { InviteForm } from "@/components/InviteForm";
import { revokeInvitationAction, removeUserAction } from "./actions";

export const dynamic = "force-dynamic";

function RoleBadge({ role }: { role: "ADMIN" | "USER" }) {
  const isAdmin = role === "ADMIN";
  return (
    <span
      className="rounded-full px-2.5 py-0.5 text-[11px] font-semibold uppercase tracking-wide"
      style={
        isAdmin
          ? { background: "linear-gradient(90deg,#E010C8,#8B18E8)", color: "#fff" }
          : { background: "rgba(10,10,15,0.05)", color: "rgba(10,10,15,0.55)" }
      }
    >
      {isAdmin ? "Administrator" : "Member"}
    </span>
  );
}

export default async function UsersPage() {
  const session = await auth();
  if (!session?.user) redirect("/signin");
  if (session.user.role !== "ADMIN") redirect("/");

  const [users, invitations] = await Promise.all([
    prisma.user.findMany({ orderBy: { createdAt: "asc" } }),
    prisma.invitation.findMany({
      where: { acceptedAt: null },
      orderBy: { createdAt: "desc" },
    }),
  ]);

  const now = new Date();

  return (
    <div className="relative flex min-h-screen flex-col overflow-x-hidden bg-canvas text-ink">
      <AmbientBackground />

      <div className="relative z-10 flex flex-1 flex-col">
        <Nav user={{ name: session.user.name ?? "", role: session.user.role }} />

        <main className="mx-auto w-full max-w-5xl flex-1 px-5 py-12 sm:px-8">
          <div className="mb-8">
            <Link
              href="/"
              className="text-sm font-medium text-black/45 transition-colors hover:text-ink"
            >
              ← Back to dashboard
            </Link>
            <h1 className="mt-3 text-3xl font-black tracking-tight">User management</h1>
            <p className="mt-1 text-black/55">
              Invite teammates and manage access. Invitations are verified by email.
            </p>
          </div>

          {/* Invite */}
          <section className="mb-10 rounded-2xl border border-black/[0.07] bg-white/80 p-6 backdrop-blur-xl">
            <h2 className="mb-4 text-sm font-bold uppercase tracking-widest text-black/45">
              Invite a user
            </h2>
            <InviteForm />
          </section>

          {/* Members */}
          <section className="mb-10">
            <h2 className="mb-4 text-sm font-bold uppercase tracking-widest text-black/45">
              Members ({users.length})
            </h2>
            <div className="overflow-hidden rounded-2xl border border-black/[0.07] bg-white/80 backdrop-blur-xl">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-black/[0.07] text-left text-xs uppercase tracking-wide text-black/40">
                    <th className="px-5 py-3 font-semibold">Name</th>
                    <th className="px-5 py-3 font-semibold">Email</th>
                    <th className="px-5 py-3 font-semibold">Role</th>
                    <th className="px-5 py-3" />
                  </tr>
                </thead>
                <tbody>
                  {users.map((u) => (
                    <tr key={u.id} className="border-b border-black/[0.04] last:border-0">
                      <td className="px-5 py-3 font-medium">
                        {u.name}
                        {u.id === session.user.id && (
                          <span className="ml-2 text-xs text-black/35">(you)</span>
                        )}
                      </td>
                      <td className="px-5 py-3 text-black/60">{u.email}</td>
                      <td className="px-5 py-3">
                        <RoleBadge role={u.role} />
                      </td>
                      <td className="px-5 py-3 text-right">
                        {u.id !== session.user.id && (
                          <form action={removeUserAction}>
                            <input type="hidden" name="id" value={u.id} />
                            <button
                              type="submit"
                              className="text-xs font-semibold text-red-500 transition-colors hover:text-red-700"
                            >
                              Remove
                            </button>
                          </form>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>

          {/* Pending invitations */}
          <section>
            <h2 className="mb-4 text-sm font-bold uppercase tracking-widest text-black/45">
              Pending invitations ({invitations.length})
            </h2>
            {invitations.length === 0 ? (
              <p className="rounded-2xl border border-dashed border-black/10 bg-white/50 px-5 py-8 text-center text-sm text-black/45">
                No pending invitations.
              </p>
            ) : (
              <div className="overflow-hidden rounded-2xl border border-black/[0.07] bg-white/80 backdrop-blur-xl">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b border-black/[0.07] text-left text-xs uppercase tracking-wide text-black/40">
                      <th className="px-5 py-3 font-semibold">Email</th>
                      <th className="px-5 py-3 font-semibold">Role</th>
                      <th className="px-5 py-3 font-semibold">Status</th>
                      <th className="px-5 py-3" />
                    </tr>
                  </thead>
                  <tbody>
                    {invitations.map((inv) => {
                      const expired = inv.expiresAt < now;
                      return (
                        <tr key={inv.id} className="border-b border-black/[0.04] last:border-0">
                          <td className="px-5 py-3 text-black/70">{inv.email}</td>
                          <td className="px-5 py-3">
                            <RoleBadge role={inv.role} />
                          </td>
                          <td className="px-5 py-3">
                            <span
                              className={`text-xs font-semibold ${
                                expired ? "text-red-500" : "text-amber-600"
                              }`}
                            >
                              {expired
                                ? "Expired"
                                : `Expires ${inv.expiresAt.toLocaleDateString()}`}
                            </span>
                          </td>
                          <td className="px-5 py-3 text-right">
                            <form action={revokeInvitationAction}>
                              <input type="hidden" name="id" value={inv.id} />
                              <button
                                type="submit"
                                className="text-xs font-semibold text-black/45 transition-colors hover:text-red-600"
                              >
                                Revoke
                              </button>
                            </form>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            )}
          </section>
        </main>
      </div>
    </div>
  );
}
