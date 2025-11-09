import ContentModel from "@/models/content";
import LinkModel from "@/models/link";
import { NextRequest, NextResponse } from "next/server";

export default async function POST(req: NextRequest) {
  try {
    const url = req.nextUrl.searchParams.get("url");

    if (!url) {
      return NextResponse.json({ error: "URL is required" }, { status: 400});
    }

    const match = url.match(/\/share\/([^/]+)/);
    const hash = match ? match[1] : null;

    if (!hash) {
      return NextResponse.json(
        { error: "Invalid URL format. Missing parameter!" },
        { status: 404}
      );
    }
    const user = await LinkModel.findOne({
      hash: hash,
    });
    if (!user) {
      return NextResponse.json(
        { error: "Invalid Shared Brain hash! No such Share brain found." },
        { status: 404}
      );
    }
    const SharedBrainContent = await ContentModel.find({
      owner: user._id,
    });
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
    return NextResponse.json(
      {
        error:
          "Unable to process Your request at the moment . Please try again.",
      },
      { status: 500 }
    );
  }
}
