
import ContentModel from "@/model/Content.model";
import connectDB from "@/lib/connectdb";

export async function DELETE(req: Request) {
  await connectDB();

  try {
    const { id } = await req.json();

    const content = await ContentModel.findById(id);

    if (!content) {
      return Response.json(
        {
          success: false,
          message: "Content not found",
        },
        { status: 404 }
      );
    }

    const deleteResult = await ContentModel.deleteOne({ _id: id });

    if (deleteResult.deletedCount === 0) {
      return Response.json(
        {
          success: false,
          message: "Error deleting content",
        },
        { status: 500 }
      );
    }

    return Response.json(
      {
        success: true,
        message: "Content deleted successfully",
        data: deleteResult,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error deleting content:", error);
    return Response.json(
      {
        success: false,
        message: "Internal server error",
      },
      { status: 500 }
    );
  }
}
