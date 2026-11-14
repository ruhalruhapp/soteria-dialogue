import { NextResponse } from "next/server";
import { db } from "@/lib/db";

export const runtime = "nodejs";

export async function GET() {
  try {
    await db.$queryRaw`SELECT 1`;
    return NextResponse.json({ status: "ok", service: "soteria-dialogue", database: "connected", timestamp: new Date().toISOString() });
  } catch {
    return NextResponse.json({ status: "degraded", service: "soteria-dialogue", database: "unavailable", timestamp: new Date().toISOString() }, { status: 503 });
  }
}
