import { redirect } from "next/navigation";
import { auth } from "@/lib/auth";
import { AuthShell } from "@/components/AuthShell";
import { SignInForm } from "@/components/SignInForm";

export const dynamic = "force-dynamic";

export default async function SignInPage() {
  const session = await auth();
  if (session?.user) {
    redirect("/");
  }

  return (
    <AuthShell
      title="Sign in"
      subtitle="Welcome back to Hexa Operation Intelligence."
    >
      <SignInForm />
    </AuthShell>
  );
}
