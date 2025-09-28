import { NextRequest, NextResponse } from "next/server";
import ContentModel from "@/models/content";
import connectDB from "@/lib/connectDB";

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const contentId = searchParams.get("contentId");
  await connectDB();

  try {
    const fetchedContent = await ContentModel.findById(contentId);

    if (!fetchedContent) {
      return NextResponse.json(
        { message: "Content doesn't exist!" },
        { status: 404 }
      );
    }

    return NextResponse.json(
      {
        message: "Content fetched successfully!",
        data: fetchedContent,
      },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      {
        message: "Unexpected server error: couldnt fetch content!",
        error: error,
      },
      {
        status: 500,
      }
    );
  }
}
