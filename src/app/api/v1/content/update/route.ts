import connectDB from "@/lib/connectdb";
import ContentModel from "@/model/Content.model";
import contentSchema from "@/schemas/contentSchema";

export async function PUT(req: Request) {
  await connectDB();

  const { id, link, type, title, tags } = await req.json();

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

  const updateContent = await ContentModel.findByIdAndUpdate(id, {
    link,
    type,
    title,
    tags,
  });

  if (!updateContent) {
    return Response.json(
      {
        success: false,
        message: "Error updating content",
      },
      {
        status: 500,
      }
    );
  }

  return Response.json(
    {
      success: true,
      message: "Content updated successfully",
      data: updateContent,
    },
    {
      status: 200,
    }
  );
}
