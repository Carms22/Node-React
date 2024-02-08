import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';
//const Score = require('./Score.model')

const ROLLUSER =['Driver', 'Buddy']
const EMAIL_PATTERN = /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i
const PASSWORD_PATTERN = /^.{8,}$/i
const SALT_ROUNDS = 10


const userSchema = new mongoose.Schema({
  name:{
    type: String,
    required: [true, 'Name is requiered'],
    minLength: [3, 'Name must contain at least 3 characters.'],
    unique: [true, 'Username must be unique'],
    trim: true
  },
  email: {
    type: String,
    required: [true, 'Email is required.'],
    match: [EMAIL_PATTERN, 'Email must be valid.'],
    unique: true,
  },
  password: {
    type: String,
    required: [true, 'Password is required.'],
    match: [PASSWORD_PATTERN, 'Password must contain at least 8 characters.']
  },
  image: {
    type: String,
    default: "https://img2.freepng.es/20180227/xqe/kisspng-cartoon-drawing-cartoon-car-5a9530ed8f4b48.9168319215197268295869.jpg"
  },
  profile:{
    type: String,
    default: "public"
  }
},
{
  toJSON: {
    virtuals: true,
    transform: (doc, ret) => {
      delete ret.__v;
      delete ret._id;
      delete ret.password;

    }
  }
},


{
    toObject: { virtuals: true },
    toJSON: { virtuals: true }
  },
  { timestamps: true}
)

userSchema.virtual("posts", {
  ref: "Post",
  localField: "_id",
  foreignField: "creator",
  justOne: true,
});

userSchema.virtual("follows", {
  ref: "Follow",
  localField: "_id",
  foreignField: "follower",
  justOne: true,
});

userSchema.virtual("follows", {
  ref: "Follow",
  localField: "_id",
  foreignField: "following",
  justOne: true,
});

userSchema.virtual("likes", {
ref: "Like",
localField: "_id",
foreignField: "userWhoLikes",
justOne: true,
});

userSchema.virtual("comments", {
ref: "Comment",
localField: "_id",
foreignField: "commentCreator",
justOne: true,
});

userSchema.virtual("messages", {
ref: "Message",
localField: "_id",
foreignField: "sender",
justOne: true,
});

userSchema.virtual("messages", {
ref: "Message",
localField: "_id",
foreignField: "receiver",
justOne: true,
});


userSchema.pre('save', function(next){
  console.log(`userSchema.pre('save' ${this.password}`);
  if(this.isModified('password')){
    bcrypt.hash(this.password, SALT_ROUNDS)
      .then(hash =>{
        this.password = hash;
        next()
      } )
  } else {
    next()
  }
})


userSchema.methods.checkPassword = function(passwordToCompare) {
  console.log(`passwordToCompare ${passwordToCompare}`);
  console.log(`this password ${this.password}`);
  return bcrypt.compare(passwordToCompare, this.password);
}

export default mongoose.model('User', userSchema);
