import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/options";
import UserModel from "@/models/user";
import LinkModel from "@/models/link";
import connectDB from "@/lib/connectDB";

// Allowed: lowercase letters, digits, hyphens, underscores (3–32 chars)
const HASH_REGEX = /^[a-z0-9_-]{3,32}$/;

export async function PATCH(req: NextRequest) {
  await connectDB();

  try {
    //  Auth
    const session = await getServerSession(authOptions);
    if (!session?.user) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    // ── Parse body
    const body = await req.json();
    const { newHash } = body as { newHash?: string };

    if (!newHash || typeof newHash !== "string") {
      return NextResponse.json(
        { message: "newHash is required." },
        { status: 400 }
      );
    }

    const sanitized = newHash.trim().toLowerCase();

    if (!HASH_REGEX.test(sanitized)) {
      return NextResponse.json(
        {
          message:
            "Invalid hash. Use 3–32 characters: lowercase letters, digits, hyphens, or underscores.",
        },
        { status: 400 }
      );
    }

    //  Resolve user 
    const owner = await UserModel.findOne({ email: session.user.email });
    if (!owner) {
      return NextResponse.json({ message: "User not found." }, { status: 404 });
    }

    // Ownership check 
    const existingLink = await LinkModel.findOne({ userId: owner._id });
    if (!existingLink) {
      return NextResponse.json(
        { message: "No shareable link found for this account." },
        { status: 404 }
      );
    }

    // Update limit check 
    if (existingLink.updatedtimes >= 5) {
      return NextResponse.json(
        {
          message:
            "Hash update limit reached. You can only update your hash 5 times.",
        },
        { status: 403 }
      );
    }

    // Uniqueness check 
    const taken = await LinkModel.findOne({
      hash: sanitized,
      userId: { $ne: owner._id }, // allow re-saving the same hash they already own
    });
    if (taken) {
      return NextResponse.json(
        { message: "This hash is already taken. Please choose another." },
        { status: 409 }
      );
    }

    // Update 
    existingLink.hash = sanitized;
    existingLink.updatedtimes += 1;
    existingLink.lastUpdatedAt = new Date();
    await existingLink.save();

    return NextResponse.json(
      {
        message: "Hash updated successfully.",
        hash: existingLink.hash,
        updatesRemaining: 5 - existingLink.updatedtimes,
        lastUpdatedAt: existingLink.lastUpdatedAt,
      },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      {
        message: "Unexpected server error: couldn't update hash.",
        error: error instanceof Error ? error.message : error,
      },
      { status: 500 }
    );
  }
}
