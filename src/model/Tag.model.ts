import mongoose, { Schema, Document } from "mongoose";

export interface Tag extends Document {
  title: string;
}

const TagSchema = new Schema<Tag>({
  title: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    maxlength: 12
  }
});

const TagModel = mongoose.model<Tag>("Tag", TagSchema);
export default TagModel;
