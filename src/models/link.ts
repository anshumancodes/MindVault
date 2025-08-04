import mongoose, { Schema, Document } from "mongoose";

export interface Link extends Document {
    hash: string;
    userId: mongoose.Types.ObjectId;
}

const linkSchema=new Schema <Link>({
    hash:{
        type:String,
        required:true,
        unique:true
    },
    userId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User",
        required:true
    }
})

const LinkModel=mongoose.model<Link>("Link",linkSchema)
export default LinkModel