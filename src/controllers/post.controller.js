import Post from "../schemas/Post.model.js";
import Follow from "../schemas/Follow.model.js";
import Like from "../schemas/Like.model.js";
import Comment from "../schemas/Comment.model.js";


export const getPosts = async (req, res ) => {

  //busco los post del usuario autenticado
   const posts =  await Post.find({creator: req.currentUser.id})
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

    console.log('entro en create comment');
    const { creator, content, likesCount, commentsCount, gif, media} = req.body;
    const newPost = new Post({
        creator: req.currentUser.id,
        content,
        likesCount,
        commentsCount,
        gif,
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
    const post = await Post.findByIdAndDelete(postID);
    if(!post){
      return res.status(404).json({message: "post not found"});
    }else{
      return res.json(post);
    };
};
//////
export const explore = (req, res, next) => {
  const userID = req.currentUser.id;
  
  Post.find()
    .limit(50)
    .populate("creator")
    .then((posts) => {
      posts.forEach((post) => {
        post.hour = moment(post.createdAt).format('DD/MM/YY - hh:mm')
        Like.findOne({
          $and: [{ like: post._id }, { userWhoLikes: userID }],
        })
          .then((likeFound) => {
            return (post.alreadyLiked = likeFound ? true : false);
          })
          .catch((err) => next(err));      
      })
    posts.sort((a, b) => {
      return b.createdAt - a.createdAt
    })
    res.render("posts/explore", { posts });
    })
    .catch((err) => next(err));
};

export const like = (req, res, next) => {
  const {id} = req.params;
  const userID = req.currentUser.id;

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


