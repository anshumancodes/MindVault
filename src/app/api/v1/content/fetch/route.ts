import { NextRequest, NextResponse } from "next/server";
import ContentModel from "@/models/content";
import connectDB from "@/lib/connectDB";

export async function PATCH(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const contentId = searchParams.get("contentId");

  if (!contentId) {
    return NextResponse.json(
      { message: "contentId is required" },
      { status: 400 }
    );
  }

  await connectDB();

  try {
    const body = await req.json();

    const updatedContent = await ContentModel.findByIdAndUpdate(
      contentId,
      { $set: body },
      { new: true, runValidators: true }
    );

    if (!updatedContent) {
      return NextResponse.json(
        { message: "Content doesn't exist!" },
        { status: 404 }
      );
    }

    return NextResponse.json(
      {
        message: "Content updated successfully!",
        data: updatedContent,
      },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      {
        message: "Unexpected server error: couldn't update content!",
        error,
      },
      { status: 500 }
    );
  }
}
