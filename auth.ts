import NextAuth from "next-auth";
import { PrismaAdapter } from "@auth/prisma-adapter";
import { cookies } from "next/headers";
import { createHmac, timingSafeEqual } from "node:crypto";
import { db } from "@/lib/db";

function validAgeAttestation(value?: string) {
  if (!value || !process.env.AUTH_SECRET) return false;
  const [timestamp, supplied] = value.split(".");
  if (!timestamp || !supplied || !/^\d+$/.test(timestamp)) return false;
  const issuedAt = Number(timestamp);
  if (!Number.isFinite(issuedAt) || Date.now() - issuedAt > 15 * 60 * 1000 || issuedAt > Date.now()) return false;
  const expected = createHmac("sha256", process.env.AUTH_SECRET).update(timestamp).digest("hex");
  const a = Buffer.from(supplied, "hex");
  const b = Buffer.from(expected, "hex");
  return a.length === b.length && timingSafeEqual(a, b);
}

const resendEmailProvider = {
  id: "resend",
  name: "Email",
  type: "email" as const,
  from: process.env.EMAIL_FROM,
  apiKey: process.env.AUTH_RESEND_KEY,
  maxAge: 15 * 60,
  async sendVerificationRequest({ identifier, url, provider }: {
    identifier: string;
    url: string;
    provider: { from?: string; apiKey?: string };
  }) {
    if (!provider.apiKey || !provider.from) throw new Error("Email sign-in is not configured.");
    const response = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: { Authorization: `Bearer ${provider.apiKey}`, "Content-Type": "application/json" },
      body: JSON.stringify({
        from: provider.from, to: [identifier], subject: "Your Soteria Dialogue sign-in link",
        html: `<div style="font-family:Arial,sans-serif;line-height:1.6"><h2>Soteria Dialogue</h2><p>Your secure sign-in link expires in 15 minutes.</p><p><a href="${url}">Sign in to Soteria Dialogue</a></p><p>If you did not request this email, ignore it.</p></div>`,
        text: `Sign in to Soteria Dialogue: ${url}\n\nThis link expires in 15 minutes. If you did not request it, ignore this email.`
      })
    });
    if (!response.ok) throw new Error(`Resend could not send sign-in email (${response.status}).`);
  }
};

export const { handlers, auth, signIn, signOut } = NextAuth({
  adapter: PrismaAdapter(db),
  providers: [resendEmailProvider],
  trustHost: true,
  session: { strategy: "database", maxAge: 60 * 60 * 24 * 30 },
  pages: { signIn: "/" },
  callbacks: {
    async signIn({ user }) {
      const jar = await cookies();
      if (!validAgeAttestation(jar.get("soteria_age_attestation")?.value)) return false;
      return Boolean(user.email);
    }
  },
  events: {
    async signIn({ user }) {
      if (user.email) await db.user.updateMany({ where: { email: user.email }, data: { ageVerified: true } });
    }
  }
});
