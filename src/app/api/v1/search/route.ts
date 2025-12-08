import connectDB from "@/lib/connectDB";
import { NextResponse } from "next/server";
import ContentModel from "@/models/content";
import generateEmbedding from "@/lib/generateEmbedding";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/options";
import UserModel from "@/models/user";
export async function GET(req: Request) {
  try {
    await connectDB();
    const session = await getServerSession(authOptions);
    const { searchParams } = new URL(req.url);
    const query = searchParams.get("query");
    const userEmail = session?.user?.email;
    const user = await UserModel.findOne({ email: userEmail });

    if (!query) {
      return NextResponse.json({ error: "query is required" }, { status: 400 });
    }

    const embedding = await generateEmbedding(query);

    const results = await ContentModel.aggregate([
      {
        $vectorSearch: {
          index: "vector_index",
          path: "embedding",
          queryVector: embedding,
          numCandidates: 50,
          limit: 8,
          filter: { owner: user._id },
        },
      },
      {
        $project: {
          _id: 1,
          link: 1,
          description: 1,
          type: 1,
          title: 1,
          tags: 1,
          owner: 1,
          createdAt: 1,
          updatedAt: 1,
          score: { $meta: "vectorSearchScore" },
        },
      },
    ]);

    return NextResponse.json(results);
  } catch (error) {
    console.error("Semantic Search Error:", error);
    return NextResponse.json(
      { error: "Something went wrong" },
      { status: 500 }
    );
  }
}
