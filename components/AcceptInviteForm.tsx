"use client";

import { useActionState } from "react";
import {
  acceptInviteAction,
  type AcceptState,
} from "@/app/accept-invite/actions";

export function AcceptInviteForm({
  token,
  email,
}: {
  token: string;
  email: string;
}) {
  const [state, formAction, pending] = useActionState<AcceptState, FormData>(
    acceptInviteAction,
    {},
  );

  return (
    <form action={formAction} className="flex flex-col gap-4">
      <input type="hidden" name="token" value={token} />

      <label className="flex flex-col gap-1.5">
        <span className="text-xs font-semibold uppercase tracking-wide text-black/45">
          Email
        </span>
        <input
          value={email}
          disabled
          className="rounded-xl border border-black/10 bg-black/[0.03] px-3.5 py-2.5 text-sm text-black/60"
        />
      </label>

      <label className="flex flex-col gap-1.5">
        <span className="text-xs font-semibold uppercase tracking-wide text-black/45">
          Full name
        </span>
        <input
          name="name"
          type="text"
          required
          autoComplete="name"
          placeholder="Your name"
          className="rounded-xl border border-black/10 bg-white px-3.5 py-2.5 text-sm text-ink outline-none transition-colors focus:border-[#8B18E8]"
        />
      </label>

      <label className="flex flex-col gap-1.5">
        <span className="text-xs font-semibold uppercase tracking-wide text-black/45">
          Set a password
        </span>
        <input
          name="password"
          type="password"
          required
          minLength={8}
          autoComplete="new-password"
          placeholder="At least 8 characters"
          className="rounded-xl border border-black/10 bg-white px-3.5 py-2.5 text-sm text-ink outline-none transition-colors focus:border-[#8B18E8]"
        />
      </label>

      {state?.error && (
        <p className="rounded-lg bg-red-50 px-3 py-2 text-sm text-red-600">
          {state.error}
        </p>
      )}

      <button
        type="submit"
        disabled={pending}
        className="mt-1 inline-flex items-center justify-center rounded-xl px-4 py-2.5 text-sm font-semibold text-white transition-opacity disabled:opacity-60"
        style={{ background: "linear-gradient(135deg, #E010C8, #8B18E8)" }}
      >
        {pending ? "Creating account…" : "Create account"}
      </button>
    </form>
  );
}
