import connectDB from "@/lib/connectdb";
import TagModel from "@/model/Tag.model";
import tagSchema from "@/schemas/tagSchema";

export async function POST(req: Request) {
  await connectDB();

  const { tagname } = await req.json();

  const validateTagSchema = tagSchema.safeParse({
    tagname,
  });

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

  const existingTag = await TagModel.findOne({ title: tagname });
  if (existingTag) {
    return Response.json(
      {
        success: false,
        message: "Tag already exists",
      },
      {
        status: 409,
      }
    );
  }

  try {
    const newTag = await TagModel.create({
      title: tagname,
    });

    return Response.json(
      {
        success: true,
        message: "Tag created successfully",
        data: newTag,
      },
      {
        status: 201,
      }
    );
  } catch (error) {
    return Response.json(
      {
        success: false,
        message: "Error creating tag",
      },
      {
        status: 500,
      }
    );
  }
}
