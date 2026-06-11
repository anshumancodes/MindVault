import mongoose, { Schema, Document } from "mongoose";

export interface Link extends Document {
  hash: string;
  userId: mongoose.Types.ObjectId;
  updatedtimes: number;
  lastUpdatedAt: Date;
}

const linkSchema = new Schema<Link>(
  {
    hash: {
      type: String,
      required: true,
      unique: true,
    },
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    updatedtimes:{
      type:Number,
      default:0,
      max:5
    },
    lastUpdatedAt:{
      type:Date,
      default:Date.now
    }

  },
  {
    timestamps: true,
  }
);

const LinkModel =
  mongoose.models.Link || mongoose.model<Link>("Link", linkSchema);
export default LinkModel;
