"use client";

import { useActionState, useEffect, useRef } from "react";
import { inviteUserAction, type InviteState } from "@/app/users/actions";

export function InviteForm() {
  const [state, formAction, pending] = useActionState<InviteState, FormData>(
    inviteUserAction,
    {},
  );
  const formRef = useRef<HTMLFormElement>(null);

  useEffect(() => {
    if (state?.success) formRef.current?.reset();
  }, [state]);

  return (
    <form
      ref={formRef}
      action={formAction}
      className="flex flex-col gap-3 sm:flex-row sm:items-end"
    >
      <label className="flex flex-1 flex-col gap-1.5">
        <span className="text-xs font-semibold uppercase tracking-wide text-black/45">
          Email
        </span>
        <input
          name="email"
          type="email"
          required
          placeholder="person@hexamatics.com"
          className="rounded-xl border border-black/10 bg-white px-3.5 py-2.5 text-sm text-ink outline-none transition-colors focus:border-[#8B18E8]"
        />
      </label>

      <label className="flex flex-col gap-1.5 sm:w-44">
        <span className="text-xs font-semibold uppercase tracking-wide text-black/45">
          Role
        </span>
        <select
          name="role"
          defaultValue="USER"
          className="rounded-xl border border-black/10 bg-white px-3.5 py-2.5 text-sm text-ink outline-none transition-colors focus:border-[#8B18E8]"
        >
          <option value="USER">Member</option>
          <option value="ADMIN">Administrator</option>
        </select>
      </label>

      <button
        type="submit"
        disabled={pending}
        className="inline-flex items-center justify-center rounded-xl px-5 py-2.5 text-sm font-semibold text-white transition-opacity disabled:opacity-60"
        style={{ background: "linear-gradient(135deg, #E010C8, #8B18E8)" }}
      >
        {pending ? "Sending…" : "Send invite"}
      </button>

      {(state?.error || state?.success) && (
        <p
          className={`w-full rounded-lg px-3 py-2 text-sm sm:basis-full ${
            state.error
              ? "bg-red-50 text-red-600"
              : "bg-emerald-50 text-emerald-700"
          }`}
        >
          {state.error ?? state.success}
        </p>
      )}
    </form>
  );
}
