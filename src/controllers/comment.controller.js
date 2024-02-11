import Post from "../schemas/Post.model.js";
import Follow from "../schemas/Follow.model.js";
import Like from "../schemas/Like.model.js";
import Comment from "../schemas/Comment.model.js";

export const createComment = async (req, res) => {
    const postID = req.params.id;
    const commentToCreate = req.body;
    commentToCreate.post = postID;

   if (req.file) {
     commentToCreate.media = req.file.path;
   }

    Comment.create(commentToCreate)
    .then((commentCreated) => {
      return Post.findById(postID)
      .populate('creator');
    })
    .then((postFound) => {
      postFound.commentsCount += 1;
      postFound.save(); 
    })
    .catch((err) => next(err));
}

export const deleteComment = async (req, res) => {
    const { id } = req.params;
    Comment.findByIdAndDelete(id)
    .then((comment) => {
      const postId = comment.post.valueOf();
      Post.findByIdAndUpdate(postId, { $inc: { commentsCount: -1 } })
        .then((postUpdated) => {
          res.status(204).send(comment);
        })
        .catch((err) => {
          next(createError(404, "Comment not found"));
        });
    })
    .catch((err) => {
      next(createError(404, "Comment not found"));
    });

}
