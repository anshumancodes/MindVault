import LinkModel from "@/models/link";
import ContentModel from "@/models/content";
import { NextRequest, NextResponse } from "next/server";
import connectDB from "@/lib/connectDB";
export async function POST(req: NextRequest) {
  await connectDB();
  try {
    const body = await req.json();
    const { sharedHash } = body;
    if (!sharedHash) {
      return NextResponse.json({ error: "URL is required" }, { status: 400 });
    }

    const hash = sharedHash;

    if (!hash) {
      return NextResponse.json(
        { error: "Invalid URL format. Missing parameter!" },
        { status: 404 }
      );
    }
    const user = await LinkModel.findOne({
      hash: hash,
    });
    if (!user) {
      return NextResponse.json(
        { error: "Invalid Shared Brain hash! No such Share brain found." },
        { status: 404 }
      );
    }
    const SharedBrainContent = await ContentModel.find({
      owner: user.userId,
    }).populate('owner').populate('tags');
    if (!SharedBrainContent || SharedBrainContent.length === 0) {
      return NextResponse.json(
        { error: "Content Not Found for the Shared Brain!" },
        { status: 404 }
      );
    }
    return NextResponse.json(
      {
        message: "Content fetched successfully for the brain.",
        Content: SharedBrainContent,

        success: true,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error fetching shared content:", error);
    return NextResponse.json(
       {
        error: error instanceof Error ? error.message : String(error),
        message:
          "Unable to process your request at the moment. Please try again.",
      },
      { status: 500 }
    );
  }
}
