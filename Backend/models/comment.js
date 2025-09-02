import mongoose from "mongoose";

const { Schema, model } = mongoose;

const CommentSchema = new Schema(
  {
    story: {
      type: Schema.Types.ObjectId,
      required: true,
      ref: "Story",
    },
    content: {
      type: String,
      required: [true, "Please provide content"],
      minlength: [3, "Content must be at least 3 characters long"],
    },
    author: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    likes: [
      {
        type: Schema.Types.ObjectId,
        ref: "User",
      },
    ],
    likeCount: {
      type: Number,
      default: 0,
    },
    star: {
      type: Number,
      default: 0,
    },
  },
  { timestamps: true }
);

const Comment = model("Comment", CommentSchema);

export default Comment;
