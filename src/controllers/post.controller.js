import Post from "../schemas/Post.model.js";
import Follow from "../schemas/Follow.model.js";
import Like from "../schemas/Like.model.js";
import Comment from "../schemas/Comment.model.js";


export const getPosts = async (req, res ) => {

  //busco los post del usuario autenticado
   const posts =  await Post.find({creator: req.currentUserId})
   .populate({path: 'creator comments', options:{_recursed: true}})
   .populate({ 
    path: "comments",
    populate: {
      path: "commentCreator"}
    })
   console.log(posts);
   return res.json(posts);
}

export const createPosts = async (req, res ) => {

    const { creator, content, likesCount, commentsCount, media} = req.body;

    const newPost = new Post({
        creator: req.currentUserId,
        content,
        likesCount,
        commentsCount,
        media
    });
    const savedPost = await newPost.save();
    res.json(savedPost);

}
//el post pinchado
export const getPost = async (req, res ) => {
    const post = await Post.findById(req.params.id) //lo que vienen en la url
    if(!post){
        return res.status(404).json({message: "post not found"});
    }else{
        return res.json(post);
    }
};

export const editPosts = async (req, res ) => {
    const postID = req.params.id;
    const post = await Post.findByIdAndUpdate(postID, req.body, {new: true});
    if(!post){
        return res.status(404).json({message: "post not found"});
    }else{
        return res.json(post);
    };
};
export const deletePosts = async (req, res ) => {
  const postID = req.params.id;
  console.log(`postID ${postID}`);
    const post = await Post.findByIdAndDelete(postID);
    if(!post){
      return res.status(404).json({message: "post not found"});
    }else{
      return res.json(post);
    };
};

export const like = (req, res, next) => {
  const {id} = req.params;
  const userID = req.currentUserId;

  Like.findOne({ userWhoLikes: userID, like: id })
    .then((likeFound) => {
      if (likeFound) {
        Like.findOneAndDelete({ userWhoLikes: userID, like: id })
          .then((likeDeleted) => {
            res.status(204).send(likeDeleted);
            Post.findByIdAndUpdate(id, { $inc: { likesCount: -1 } })
              .then((postUpdated) => {})
              .catch((err) => next(err));
          })
          .catch((err) => next(err));
      } else {
        Like.create({ userWhoLikes: userID, like: id })
          .then((likeCreated) => {
            res.status(204).send(likeCreated);
            Post.findById(id)
            .populate('creator')
              .then((postFound) => {
                postFound.likesCount += 1;
                postFound.save();
              })
              .catch((err) => next(err));
          })
          .catch((err) => next(err));
      }
    })
    .catch((err) => next(err));
};


