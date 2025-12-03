import connectDB from "@/lib/connectDB";
import { NextResponse } from "next/server";
import ContentModel from "@/models/content";
import generateEmbedding from "@/lib/generateEmbedding";
import mongoose from "mongoose";
export async function GET(req: Request) {
  try {
    await connectDB();

    const { searchParams } = new URL(req.url);
    const query = searchParams.get("query");
    const userId = searchParams.get("userId");

    if (!query || !userId) {
      return NextResponse.json(
        { error: "query and userId are required" },
        { status: 400 }
      );
    }

    const embedding = await generateEmbedding(query);

    const results = await ContentModel.aggregate([
      {
        $vectorSearch: {
          index: "default",
          path: "embedding",
          queryVector: embedding,
          numCandidates: 50,
          limit: 8,
          filter: { owner: new mongoose.Types.ObjectId(userId) },
        },
      },
      {
        $project: {
          title: 1,
          type: 1,
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