import connectDB from "@/lib/connectDB";
import mongoose from "mongoose";

export async function pingDB(): Promise<{ success: boolean; message: string }> {
  try {
    await connectDB();
    await mongoose.connection.db!.command({ ping: 1 });

    const ts = new Date().toISOString();
    console.log(`[keepdbup] DB ping successful at ${ts}`);

    return { success: true, message: `DB ping OK at ${ts}` };
  } catch (error) {
    const msg =
      error instanceof Error ? error.message : "Unknown error during DB ping";
    console.error("[keepdbup] DB ping failed:", msg);
    return { success: false, message: msg };
  }
}
