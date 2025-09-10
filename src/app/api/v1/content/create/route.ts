import ContentModel from "@/models/content";
import { NextResponse, NextRequest } from "next/server";
import contentSchema from "@/schemas/contentSchema";
import connectDB from "@/lib/connectDB";
import { authOptions } from "@/app/api/auth/[...nextauth]/options";
import { getServerSession } from "next-auth";
import UserModel from "@/models/user";
import TagModel from "@/models/tag";
export async function POST(req: NextRequest) {
  await connectDB();
  try {
    const session = await getServerSession(authOptions);

    if (!session || !session.user) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }
    const body = await req.json();
    const { link, description, title, type, tags } = body;

    const parsedData = contentSchema.safeParse({
      link,
      description,
      title,
      type,
      tags,
    });
    const owner = await UserModel.findOne({ email: session.user.email });

    if (!parsedData.success) {
      console.log(parsedData.error.flatten().fieldErrors);
      return NextResponse.json(
        {
          message: "validation failed!",
          errors: parsedData.error.flatten().fieldErrors,
        },
        { status: 400 }
      );
    }
    const tagsArray: string[] = Array.isArray(tags)
      ? tags.map((t) => t.trim()).filter(Boolean)
      : [];

    // Upsert tags in bulk (avoid duplicates, enforce unique titles)
    if (tagsArray.length > 0) {
      await TagModel.bulkWrite(
        tagsArray.map((tagTitle: string) => ({
          updateOne: {
            filter: { title: tagTitle },
            update: { $setOnInsert: { title: tagTitle } },
            upsert: true,
          },
        }))
      );
    }

    // Fetch the IDs of all tags (existing + newly created)
    const tagIds = tagsArray.length
      ? (await TagModel.find({ title: { $in: tagsArray } }, "_id")).map(
          (t) => t._id
        )
      : [];

    // Finally create content
    const createContent = await ContentModel.create({
      link,
      title,
      description,
      type,
      tags: tagIds,
      owner: owner._id,
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
        error: error instanceof Error ? error.message : error,
      },
      {
        status: 500,
      }
    );
  }
}
