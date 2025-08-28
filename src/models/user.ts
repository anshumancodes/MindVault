import mongoose, { Schema, HydratedDocument } from "mongoose";
import bcrypt from "bcrypt";

export interface User extends Document {
  name: string;
  username: string;
  password?: string;
  email: string;
  avatar: string;
  accessToken?: string;
  provider?: string;
  comparePassword: (password: string) => Promise<boolean>;
}

const userSchema = new Schema<User>(
  {
    name: {
      type: String,
      required: true,
    },
    username: {
      type: String,
      required: true,
      maxlength: 12,
    },
    password: {
      type: String,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    accessToken: {
      type: String,
      required: false,
    },
    provider: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

userSchema.methods.comparePassword = async function (password: string) {
  return await bcrypt.compare(password, this.password);
};

// save with hashing the password
userSchema.pre("save", async function (this: HydratedDocument<User>) {
  if (!this.isModified("password") || !this.password) return;

  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
});


userSchema.methods.comparePassword = async function (
  password: string
): Promise<boolean> {
  return bcrypt.compare(password, this.password);
};

const UserModel =
  mongoose.models.User || mongoose.model<User>("User", userSchema);

export default UserModel;
