import User from "../schemas/User.mondel.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import {TOKEN_SECRET} from "../config.js"
import Follow from "../schemas/Follow.model.js";

//module.export.register ===
export const register = async (req, res) =>{
    console.log('entro en register');
    const {name, email, password} = req.body;
    console.log(req);

    try {
        const userFound = await User.findOne({email});
        if(userFound){
            return res.status(400).json( {mesage:'email already esxist'})
        }else{
            const passwordHash = await bcrypt.hash(password, 10);
        const newUser =  new User({
            name,
            email, 
            password: passwordHash
        });

        const userSaved = await newUser.save();
        jwt.sign(
            {
              id: userSaved._id,
            },
            TOKEN_SECRET,
            {
              expiresIn: '24h'
            },
            (err, token) => {
                if(err) console.log(err);
                res.cookie('token', token)
                res.json(userSaved)
            }
        )
        }
        

        

    } catch (error) {
        res.status(500).json({mesage: error.mesage})
    }
   
}

export const login = async (req, res) =>{
    const {email, password} = req.body;
    console.log(req.body);

    try {
        const loginError ="Email or password are not valid";
        
        if(!email) res.status(401).json({mesage: loginError});
        const userFound = await User.findOne({email});
        console.log(`userFound ${userFound}`);
     
        const isMach = await bcrypt.compare(password, userFound.password);

        console.log(`isMach ${isMach}`);
        if(!isMach) {
            res.status(401).json({mesage: loginError})
        }else{
            jwt.sign(
                {
                  id: userFound._id,
                },
                  TOKEN_SECRET,
                {
                  expiresIn: '24h'
                },
                (err, token) => {
                    
                    if(err) console.log(err);
                    res.json({ accessToken: token });
                    console.log(token);
                    
                    res.json(userFound)
                    res.cookie('token', token, {
                        sameSite: 'none',
                    })
                    res.json(userFound)
                }
            )
        }
        
    } catch (error) {
        console.log(error);
        res.status(500).json({mesage: "User not found"})
    }
   
};

export const profile = async (req, res ) => {
    // sacar los virtuales---post....
    //Info del user y mis post y a quien sigo
    //post.find({creator: req.currentUser.id}).populate(creator).populate(comments).populate(likes)
    const {id} = req.currentUser;
    const userFound = await User.findById(id)
    .populate('posts')
    .populate({path:'comments likes', options: {_recursed: true}});

    if(!userFound) return res.status(400).json({message: 'user not found'});

    return res.json(userFound)

}
export const editProfile = async (req, res ) => {
    const userID = req.currentUser.id;
    const user = await User.findByIdAndUpdate(userID, req.body, {new: true});
    if(!user){
        return res.status(404).json({message: "user not found"});
    }else{
        return res.json(user);
    }
}
export const logout = (req, res) =>{
    res.cookie("token", "",{
        expires: new Date(0)
    })
    return res.sendStatus(200);
}
export const myHome = async (req, res) => {
    const userID = req.currentUser.id;
    
    if(!userID)return res.status(404).json({message: "id not found"});

    // del user coger los followings y de ellos sus post para ponerlos en mi home
    //User.populate(followings).populate(post).populate comments
    const followingUsers = await Follow.find({follower: userID})
        .populate({
            path: 'following',
            populate: {
                path: 'posts',      // Esto popula la relación 'posts' dentro de 'following'
                populate: 'comments' // Esto popula la relación 'comments' dentro de 'posts'
            }
        })
    console.log(followingUsers);
    const userFound = await User.findById(id)
     // Esto popula la relación 'follows'
    .populate({
        path: 'follows',
        populate: [
            { path: 'follower' },  // Esto popula la relación 'follower' dentro de 'follows'
            { path: 'following' }, // Esto popula la relación 'following' dentro de 'follows'
        ]
    })
    .populate({
        path: 'follows',
        populate: {
            path: 'following',
            populate: {
                path: 'posts',      // Esto popula la relación 'posts' dentro de 'following'
                populate: 'comments' // Esto popula la relación 'comments' dentro de 'posts'
            }
        }
    });


    //const followings = userFound.follows.map(follow => follow.following);
    // Ahora puedes acceder a los posts y comentarios de los followings
    /*followings.forEach(following => {
        console.log(`Posts de ${following.name}:`);
        console.log(following.posts);

        console.log(`Comentarios de ${following.name}:`);
        console.log(following.comments);
    });
    */

    return res.json(userFound)
}

//Follows

export const followersList = (req, res, next) => {
    const userID = req.params.id;

    User.findOne({userID}, {id: 1})
    .then((user) => {  
        Follow.find({following: user.id})
        .populate('follower')
        .then((followers) => {
            res.json(followers)
        })
        .catch((err) => next(err))
    })
    .catch((err) => next(err))
};

export const followingList = (req, res, next) => {
    const userID = req.params.id;

    User.findOne({userID}, {id: 1})
    .then((user) => {  
        Follow.find({follower: user.id})
        .populate('following')
        .then((following) => {
            res.json( following )
        })
        .catch((err) => next(err))
    })
    .catch((err) => next(err))
};



export const follow = (req, res, next) => {
    const { id } = req.params;
    const userID = req.currentUser.id;

    User.findOne({id}, {id: 1})
    .then((user) => {  
        Follow.findOne({follower: userID, following: user.id})
        .then((response) => {
            if(response) {
                Follow.findOneAndDelete({follower: userID, following: user.id})
                .then((followDeleted) => {
                    res.status(204).send(followDeleted);
                })
                .catch((err) => next(err))
            } else {
                Follow.create({follower: userID, following: user.id})
                .then((followCreated) => {
                    res.status(204).send(followCreated);
                })
                .catch((err) => next(err))
            }
        })              
    })    
    .catch((err) => next(err))
};

//Search
export const search = (req, res, next) => {
    const { searchInfo } = req.body;
    User.find({
      $and: [
        { status: true },
        {name: { $regex: searchInfo, $options: "i" } }
      ]
    })
    .then((users) => {
        res.render('users/list', { users });
    })
    .catch((err) => next(err))
};