import mongoose from "mongoose";

const postSchema = new mongoose.Schema(
  {
    creator: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    content: {
      type: String,
      maxlength: 250,
    },
    media: {
      type: String,
    },
    likesCount: {
      type: Number,
      required: true,
      default: 0,
    },
    commentsCount: {
      type: Number,
      required: true,
      default: 0,
    }
  },
  {
    timestamps: true,
    toObject: { virtuals: true },
  }
);

postSchema.virtual("likes", {
  ref: "Like",
  localField: "_id",
  foreignField: "post",
  justOne: false,
});

postSchema.virtual("comments", {
  ref: "Comment",
  localField: "_id",
  foreignField: "post",
  justOne: false,
});

postSchema.pre("save", function (next) {
  const hasContent = this.content || this.media || this.gif;
  return hasContent ? next() : next(new Error("No Content provided"));
});

export default mongoose.model("Post", postSchema);

