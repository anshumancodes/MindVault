import ContentModel from "@/models/content";
import { NextResponse, NextRequest } from "next/server";
import contentSchema from "@/schemas/contentSchema";
import connectDB from "@/lib/connectDB";

export async function POST(req: NextRequest) {
  await connectDB();
  try {
    const body = await req.json();
    const { link, description, title, type, tags } = body;

    const parsedData = contentSchema.safeParse({
      link,
      description,
      title,
      type,
      tags,
    });
    if (!parsedData.success) {
      return NextResponse.json(
        {
          message: "validation failed!",
          errors: parsedData.error.flatten().fieldErrors,
        },
        { status: 400 }
      );
    }
    const createContent = await ContentModel.create({
      link,
      title,
      description,
      type,
      tags,
    });

    return NextResponse.json(
      {
        message: "added content successfully!",
        content: createContent, 
      },
      { status: 201 }
    );
  } catch (error) {
    return NextResponse.json(
      {
        message: "Unexpected server error: couldnt create content!",
      },
      {
        status: 500,
      }
    );
  }
}
