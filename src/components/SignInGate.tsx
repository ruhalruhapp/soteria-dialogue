"use client";

import { useState } from "react";
import { signIn } from "next-auth/react";

export function SignInGate() {
  const [email, setEmail] = useState("");
  const [confirmsAdult, setConfirmsAdult] = useState(false);
  const [busy, setBusy] = useState(false);
  const [message, setMessage] = useState("");

  async function submit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault(); setMessage("");
    if (!confirmsAdult) { setMessage("Please confirm that you are 18 or older."); return; }
    setBusy(true);
    try {
      const response = await fetch("/api/age-attestation", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ confirmsAdult }) });
      if (!response.ok) { const result = await response.json(); throw new Error(result.error || "Could not verify your confirmation."); }
      await signIn("resend", { email: email.trim(), redirectTo: "/" });
    } catch (error) { setMessage(error instanceof Error ? error.message : "Unable to send your sign-in link."); setBusy(false); }
  }

  return (
    <main className="flex min-h-screen items-center justify-center px-5 py-12">
      <section className="w-full max-w-md space-y-8">
        <div className="flex flex-col items-center gap-5 text-center">
          <div className="size-24 rounded-full bg-primary/10 flex items-center justify-center window-glow"><div className="size-14 rounded-full bg-primary/20 breathe-anim" /></div>
          <div className="space-y-2"><p className="text-xs uppercase tracking-[0.25em] text-muted-foreground">Soteria Dialogue</p><h1 className="text-2xl font-light">Being With</h1><p className="text-sm leading-relaxed text-muted-foreground">A space for presence, dialogue, and shared understanding. Sign in with a private email link.</p></div>
        </div>
        <form onSubmit={submit} className="space-y-5 rounded-xl border border-border/60 bg-card/40 p-5">
          <div className="space-y-2"><label htmlFor="email" className="text-xs text-muted-foreground">Email address</label><input id="email" type="email" required autoComplete="email" value={email} onChange={(event) => setEmail(event.target.value)} placeholder="you@example.com" className="w-full rounded-md border border-border bg-background px-3 py-2.5 text-sm outline-none focus:ring-2 focus:ring-primary/40" /></div>
          <label className="flex items-start gap-3 text-xs leading-relaxed text-muted-foreground"><input type="checkbox" checked={confirmsAdult} onChange={(event) => setConfirmsAdult(event.target.checked)} className="mt-0.5 size-4 shrink-0 accent-primary" /><span>I confirm that I am 18 years of age or older. This is an adult-only platform.</span></label>
          <button type="submit" disabled={busy || !email.trim() || !confirmsAdult} className="w-full rounded-md bg-primary px-4 py-3 text-sm font-medium text-primary-foreground disabled:cursor-not-allowed disabled:opacity-50">{busy ? "Sending secure link…" : "Email me a sign-in link"}</button>
          {message && <p role="alert" className="text-xs text-destructive">{message}</p>}
          <p className="text-[11px] leading-relaxed text-muted-foreground/70">We use email only to authenticate your account. Your sign-in link expires after 15 minutes. Do not use this preview for urgent or emergency support.</p>
        </form>
        <p className="text-center text-[11px] leading-relaxed text-muted-foreground/60">By continuing, you acknowledge that this is an early private preview, not a clinical service or emergency response service.</p>
      </section>
    </main>
  );
}
