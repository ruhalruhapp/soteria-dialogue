import { auth } from "@/auth";
import { AppShell } from "@/components/AppShell";
import { SignInGate } from "@/components/SignInGate";

export const dynamic = "force-dynamic";

export default async function Home() {
  const session = await auth();
  if (!session?.user?.email) return <SignInGate />;
  return <AppShell userEmail={session.user.email} />;
}
