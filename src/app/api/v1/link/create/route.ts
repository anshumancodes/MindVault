import crypto from "crypto";
import LinkModel from "@/models/link";
import UserModel from "@/models/user";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/options";
import { NextResponse } from "next/server";

export async function POST() {
  const baseUrl ="https://mindvault.anshumancdx.xyz";

  try {
    const session = await getServerSession(authOptions);
    if (!session?.user?.email) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    const user = await UserModel.findOne({ email: session.user.email });
    if (!user) {
      return NextResponse.json({ message: "User not found" }, { status: 404 });
    }

    const userId = user._id;

    // Check if a link hash already exists for this user
    const existingLink = await LinkModel.findOne({ userId });

    if (existingLink) {
      return NextResponse.json(
        {
          message: "Existing link found!",
          shareUrl: `${baseUrl}/mind/share/${existingLink.hash}`,
          link: existingLink,
        },
        { status: 200 }
      );
    }

    // Otherwise generate a new unique hash and create one
    for (let attempt = 0; attempt < 5; attempt++) {
      try {
        const hash = crypto.randomBytes(6).toString("hex");
        const linkDoc = await LinkModel.create({ hash, userId });

        return NextResponse.json(
          {
            message: "Link hash created successfully!",
            shareUrl: `${baseUrl}/mind/share/${linkDoc.hash}`,
            link: linkDoc,
          },
          { status: 201 }
        );
      } catch (err: unknown) {
        const mongoError = err as { code?: number; message?: string };
        if (mongoError.code === 11000) {
          continue; // if duplicate hash then the function basically  retries
        }

        const message = err instanceof Error ? err.message : "Unknown error";
        return NextResponse.json({ message, error: err }, { status: 500 });
      }
    }

    return NextResponse.json(
      { message: "Failed to generate unique hash after multiple attempts" },
      { status: 500 }
    );
  } catch (error: unknown) {
    let message = "Internal server error";
    if (error instanceof Error) {
      message = error.message;
    }

    return NextResponse.json({ message, error }, { status: 500 });
  }
}
