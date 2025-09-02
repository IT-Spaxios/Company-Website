// models/Chat.js
import mongoose from "mongoose";

const ChatSchema = new mongoose.Schema(
  {
    serviceCategory: { type: String, required: true },
    subCategory: { type: String },
    name: { type: String, required: true },
    contact: { type: String, required: true },
    email: { type: String, required: true },
    message: { type: String }
  },
  { timestamps: true } // creates createdAt and updatedAt automatically
);

export default mongoose.model("Chat", ChatSchema);
