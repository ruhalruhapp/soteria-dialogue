import NextAuth from "next-auth";
import Resend from "next-auth/providers/resend";
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

export const { handlers, auth, signIn, signOut } = NextAuth({
  adapter: PrismaAdapter(db),
  providers: [Resend({ apiKey: process.env.AUTH_RESEND_KEY, from: process.env.EMAIL_FROM })],
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
