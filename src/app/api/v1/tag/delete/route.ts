import connectDB from "@/lib/connectdb"; 
import TagModel from "@/model/Tag.model"; 
import tagSchema from "@/schemas/tagSchema";

export async function DELETE(req: Request) {
  await connectDB();

  const { tagname } = await req.json();
  const trimmedTagname = tagname?.trim();

  const validateTagSchema = tagSchema.safeParse({ name: trimmedTagname }); 

  if (!validateTagSchema.success) {
    return Response.json(
      {
        success: false,
        message: "Invalid tag",
      },
      {
        status: 400,
      }
    );
  }

  const existingTag = await TagModel.findOne({ title: trimmedTagname });
  if (!existingTag) {
    return Response.json(
      {
        success: false,
        message: "Tag does not exist",
      },
      {
        status: 404,
      }
    );
  }

  try {
    await TagModel.deleteOne({ title: trimmedTagname });
    return Response.json(
      {
        success: true,
        message: "Tag deleted successfully",
      },
      {
        status: 200,
      }
    );
  } catch (error) {
    return Response.json(
      {
        success: false,
        message: "Error deleting tag",
      },
      {
        status: 500,
      }
    );
  }
}
