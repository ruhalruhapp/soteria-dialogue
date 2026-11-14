import { createHmac } from "node:crypto";
import { NextRequest, NextResponse } from "next/server";

export const runtime = "nodejs";

export async function POST(request: NextRequest) {
  if (!process.env.AUTH_SECRET) return NextResponse.json({ error: "Authentication is not configured." }, { status: 503 });
  let body: { confirmsAdult?: boolean };
  try { body = await request.json(); } catch { return NextResponse.json({ error: "Invalid request." }, { status: 400 }); }
  if (body.confirmsAdult !== true) return NextResponse.json({ error: "You must confirm that you are 18 or older." }, { status: 400 });
  const timestamp = Date.now().toString();
  const signature = createHmac("sha256", process.env.AUTH_SECRET).update(timestamp).digest("hex");
  const response = NextResponse.json({ ok: true });
  response.cookies.set("soteria_age_attestation", `${timestamp}.${signature}`, {
    httpOnly: true, secure: process.env.NODE_ENV === "production", sameSite: "lax", path: "/", maxAge: 15 * 60
  });
  return response;
}
