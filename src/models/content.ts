import mongoose, { Schema, Document } from "mongoose";
import { GoogleGenAI } from "@google/genai";
export interface Content extends Document {
  link?: string;
  description?: string;
  type: string;
  title: string;
  tags?: mongoose.Types.ObjectId[];
  owner: mongoose.Types.ObjectId;
  embedding: number[];
}

const ContentSchema = new Schema<Content>(
  {
    link: {
      type: String,
    },
    description: {
      type: String,
    },
    type: {
      type: String,
      required: true,
    },
    title: {
      type: String,
      required: true,
    },
    tags: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Tag",
      },
    ],
    owner: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    embedding: {
      type: [Number],
      index: false,
    },
  },
  {
    timestamps: true,
  }
);


// its basically a pre save hook to create embeddings for my content title.
const ai = new GoogleGenAI({ apiKey: "YOUR_API_KEY" });
async function generateEmbedding(text: string): Promise<number[]> {
  const res = await ai.models.embedContent({
    model: "text-embedding-005",
    contents: [text],
  });

  const embedding = res?.embeddings?.[0]?.values;

  if (!embedding) {
    throw new Error("Failed to generate embedding");
  }

  return Array.from(embedding);
}

ContentSchema.pre("save", async function (next) {
  if (!this.isModified("title")) return next(); // avoid regenerating always
  try {
    this.embedding = await generateEmbedding(this.title);
    next();
  } catch (err) {
    next(err as any);
  }
});

const ContentModel =
  mongoose.models.Content || mongoose.model<Content>("Content", ContentSchema);
export default ContentModel;
