import ContentModel from "@/model/Content.model";
import connectDB from "@/lib/connectdb";
import contentSchema from "@/schemas/contentSchema";

export async function POST(req: Request) {
  await connectDB();

  const { link, type, title, tags } = await req.json();

  const validateContentShema = contentSchema.safeParse({
    link,
    type,
    title,
    tags,
  });

  if (!validateContentShema.success) {
    return Response.json(
      {
        success: false,
        message: "Invalid content",
      },
      {
        status: 409,
      }
    );
  }

  const newContent = await ContentModel.create({
    link,
    type,
    title,
    tags,
  });

  if (!newContent) {
    return Response.json(
      {
        success: false,
        message: "Error creating content",
      },
      {
        status: 500,
      }
    );
  }

  return Response.json(
    {
      success: true,
      message: "Content created successfully",
      data: newContent,
    },
    {
      status: 201,
    }
  );
}
