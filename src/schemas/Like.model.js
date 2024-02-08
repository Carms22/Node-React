import mongoose from "mongoose";

const likeSchema = new mongoose.Schema({    
    userWhoLikes: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    like: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Post'
    }
})

export default mongoose.model('Like', likeSchema);

