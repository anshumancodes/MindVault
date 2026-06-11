import { NextResponse } from "next/server";
import { pingDB } from "@/lib/keepdbup";

export async function GET(request: Request) {
  if (process.env.NODE_ENV === "production") {
    const secret = process.env.CRON_SECRET;
    const authHeader = request.headers.get("authorization");

    if (!secret || authHeader !== `Bearer ${secret}`) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }
  }

  const result = await pingDB();

  return NextResponse.json(result, {
    status: result.success ? 200 : 500,
  });
}
