import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

const connectDB=async()=>{
    try {
        mongoose.connection.on('connected',()=>{
            console.log("Database connected");
        })
        let mongodbURI=process.env.MONGODB_URI;
        const projectName='resume-builder'
        if(!mongodbURI){
            throw new Error("MONGODB_URI is not defined")
        }
        if(mongodbURI.endsWith('/')){
            mongodbURI=mongodbURI.slice(0,-1)
        }
        await mongoose.connect(`${mongodbURI}/${projectName}`);
    } catch (error) {
        console.error("Error connecting to database:",error);
    }
}

export default connectDB;