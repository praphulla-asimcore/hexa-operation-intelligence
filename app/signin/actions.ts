"use server";

import { AuthError } from "next-auth";
import { signIn } from "@/lib/auth";

export interface SignInState {
  error?: string;
}

export async function signInAction(
  _prev: SignInState | undefined,
  formData: FormData,
): Promise<SignInState> {
  try {
    await signIn("credentials", {
      email: String(formData.get("email") ?? ""),
      password: String(formData.get("password") ?? ""),
      redirectTo: "/",
    });
    return {};
  } catch (error) {
    // A successful sign-in throws a redirect — let it propagate.
    if (error instanceof AuthError) {
      return { error: "Invalid email or password." };
    }
    throw error;
  }
}
