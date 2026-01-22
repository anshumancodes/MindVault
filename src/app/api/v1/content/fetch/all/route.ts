import { authOptions } from "@/app/api/auth/[...nextauth]/options";
import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import connectDB from "@/lib/connectDB";
import UserModel from "@/models/user";
import ContentModel from "@/models/content";

export async function GET() {
  await connectDB();

  try {
    // check session
    const session = await getServerSession(authOptions);

    if (!session || !session.user) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    // find owner by email
    const owner = await UserModel.findOne({ email: session.user.email });
    if (!owner) {
      return NextResponse.json({ message: "Owner not found" }, { status: 404 });
    }

    // fetch all content by owner ID
    const contents = await ContentModel.find({ owner: owner._id })
      .select("-embedding")
      .populate("tags", "title")
      .sort({ createdAt: -1 });

    return NextResponse.json(
      {
        message: "Contents fetched successfully!",
        data: contents,
      },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      {
        message: "Unexpected server error: couldn't fetch contents!",
        error: (error as Error).message,
      },
      { status: 500 }
    );
  }
}
