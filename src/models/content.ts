import mongoose, { Schema, Document } from "mongoose";

export interface Content extends Document {
  link?: string;
  description?: string;
  type: string;
  title: string;
  tags?: mongoose.Types.ObjectId[];
  owner: mongoose.Types.ObjectId;
}

const ContentSchema = new Schema<Content>({
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
},{
  timestamps:true
});

const ContentModel =  mongoose.models.Content || mongoose.model<Content>("Content", ContentSchema);
export default ContentModel;
