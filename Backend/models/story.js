import mongoose from "mongoose";
import slugify from "slugify";
import Comment from "./comment.js";

const { Schema, model } = mongoose;

const StorySchema = new Schema(
  {
    author: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    slug: String,
    title: {
      type: String,
      required: [true, "Please provide a title"],
      unique: true,
      minlength: [4, "Title must be at least 4 characters long"],
    },
    content: {
      type: String,
      required: [true, "Please provide content"],
      minlength: [10, "Content must be at least 10 characters long"],
    },
    image: {
      type: String,
      default: "default.jpg",
    },
    readtime: {
      type: Number,
      default: 3,
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
    comments: [
      {
        type: Schema.Types.ObjectId,
        ref: "Comment",
      },
    ],
    commentCount: {
      type: Number,
      default: 0,
    },
  },
  { timestamps: true }
);

// Generate slug before save
StorySchema.pre("save", function (next) {
  if (!this.isModified("title")) return next();
  this.slug = this.makeSlug();
  next();
});

// Cascade delete comments when a story is removed
StorySchema.pre("remove", async function (next) {
  await Comment.deleteMany({ story: this._id });
  next();
});

// Create slug from title
StorySchema.methods.makeSlug = function () {
  return slugify(this.title, {
    replacement: "-",
    remove: /[*+~.()'"!:@/?]/g,
    lower: true,
    strict: false,
    locale: "tr",
    trim: true,
  });
};

// ✅ Fix for OverwriteModelError
const Story = mongoose.models.Story || model("Story", StorySchema);

export default Story;
