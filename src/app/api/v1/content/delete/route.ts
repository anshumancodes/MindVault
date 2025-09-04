import { NextRequest, NextResponse } from "next/server";
import ContentModel from "@/models/content";
import connectDB from "@/lib/connectDB";

export async function POST(req: NextRequest) {
  const body = await req.json();
  const { contentId } = body;

  await connectDB();

  try {
    const deletedContent = await ContentModel.findByIdAndDelete(contentId);;

    if (!deletedContent) {
      return NextResponse.json(
        { message: "Content doesn't exist!" },
        { status: 404 }
      );
    }

    return NextResponse.json(
      {
        message: "Content deleted successfully!",
        data: deletedContent,
      },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      {
        message: "Unexpected server error: couldnt delete content!",
        error: error,
      },
      {
        status: 500,
      }
    );
  }
}
