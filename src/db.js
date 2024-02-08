import mongoose from "mongoose";

export const connectDB = async () => {
    try {
        await mongoose.connect('mongodb://localhost/node_react');
        console.log('Connected to mongo DB');
    }
    catch(error){
        console.log(`Error connecting DB ${error}`);
    }
};