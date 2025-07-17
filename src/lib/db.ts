// lib/db.ts
import mongoose from "mongoose";

let isConnected = false;

export const connectDB = async () => {
  if (isConnected) {
    return;
  }

  const uri = process.env.MONGODB_URI;

  if (!uri) {
    throw new Error("❌ MONGODB_URI not found in environment variables.");
  }

  try {
    await mongoose.connect(uri, {
      dbName: "devsnip", // optional
      bufferCommands: false,
    });
    isConnected = true;
    console.log("✅ Connected to MongoDB via Mongoose");
  } catch (error) {
    console.error("❌ Error connecting to MongoDB:", error);
    throw error;
  }
};
