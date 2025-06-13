import mongoose, { Schema, HydratedDocument } from "mongoose";
import bcrypt from "bcrypt";

export interface User extends Document {
  name: string;
  username: string;
  password: string;
  email: string;
  avatar: string;
  accessToken: string;
}

const userSchema = new Schema<User>({
  name: {
    type: String,
    required: true,
  },
  username: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  avatar: {
    type: String,
  },
  accessToken: {
    type: String,
    required: true,
  },
});

// save with hashing the password
userSchema.pre<User>("save", async function (next) {
  const user = this as HydratedDocument<User>;

  if (!user.isModified("password")) {
    return next();
  }
  try {
    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(user.password, salt);
    next();
  } catch (error) {
    next(error as any);
  }
});

userSchema.methods.comparePassword = async function (
  password: string
): Promise<boolean> {
  return bcrypt.compare(password, this.password);
};

const UserModel = mongoose.model<User>("User", userSchema);

export default UserModel;
