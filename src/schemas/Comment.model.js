import mongoose from "mongoose";

const commentSchema = new mongoose.Schema({
    post: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Post",
    },
    commentCreator: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
    },
    content: {
        type: String,
        maxlength: 250,
    },
    media: {
        type: String,
    }
}, { 
    timestamps: true
});

commentSchema.pre("save", function (next) {
    const hasContent = this.content || this.media || this.gif;
    return hasContent ? next() : next(new Error("No Content provided"));
  });

  export default mongoose.model('Comment', commentSchema);