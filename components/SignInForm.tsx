"use client";

import { useActionState } from "react";
import { signInAction, type SignInState } from "@/app/signin/actions";

export function SignInForm() {
  const [state, formAction, pending] = useActionState<SignInState, FormData>(
    signInAction,
    {},
  );

  return (
    <form action={formAction} className="flex flex-col gap-4">
      <label className="flex flex-col gap-1.5">
        <span className="text-xs font-semibold uppercase tracking-wide text-black/45">
          Email
        </span>
        <input
          name="email"
          type="email"
          required
          autoComplete="email"
          placeholder="you@hexamatics.com"
          className="rounded-xl border border-black/10 bg-white px-3.5 py-2.5 text-sm text-ink outline-none transition-colors focus:border-[#8B18E8]"
        />
      </label>

      <label className="flex flex-col gap-1.5">
        <span className="text-xs font-semibold uppercase tracking-wide text-black/45">
          Password
        </span>
        <input
          name="password"
          type="password"
          required
          autoComplete="current-password"
          placeholder="••••••••"
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
        {pending ? "Signing in…" : "Sign in"}
      </button>
    </form>
  );
}
