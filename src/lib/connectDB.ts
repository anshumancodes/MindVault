import mongoose from "mongoose";
import "@/models/tag";
import "@/models/content";
import "@/models/user";
type ConnectionObject = {
  isConnected?: number;
};

const connection: ConnectionObject = {};

async function connectDB(): Promise<void> {
  if (connection.isConnected) {
    console.log("Already connected to MongoDB");
    return;
  }

  try {
    if (!process.env.MONGODB_CONNECTION_URI || !process.env.DB_NAME) {
      throw new Error("Missing MongoDB environment variables");
    }

    const connectionInstance = await mongoose.connect(
      `${process.env.MONGODB_CONNECTION_URI}${process.env.DB_NAME}`
    );

    connection.isConnected = 1;
    console.log(
      `MongoDB successfully connected. DB Host = ${connectionInstance.connection.host}`
    );
  } catch (error) {
    console.error("Error connecting to MongoDB [at connectDB]:", error);
  }
}

export default connectDB;
