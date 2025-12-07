import mongoose, { Schema, Document } from "mongoose";
import generateEmbedding from "@/lib/generateEmbedding";
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
      index:true
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
