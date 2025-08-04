import mongoose, { Schema, Document } from "mongoose";

export interface Content extends Document {
  link: string;
  type: string;
  title: string;
  tags: mongoose.Types.ObjectId[];
  owner: mongoose.Types.ObjectId;
}

const ContentSchema = new Schema<Content>({
  link: {
    type: String,
    required: true,
  },
  type: {
    type: String,
    required: true,
  },
  title: {
    type: String,
    required: true,
  },
  tags: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: "Tag",
    required: true,
  }],
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
});

const ContentModel = mongoose.model<Content>("Content", ContentSchema);
export default ContentModel;
