import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import connectDB from "./config/db.js"
import UserRouter from "./routes/UserRoutes.js"
import resumeRouter from "./routes/resumeRoutes.js"
dotenv.config();
import aiRouter from "./routes/aiRoutes.js";

const app = express();
app.use(cors());
app.use(express.json());

const PORT=process.env.PORT||3000;

await connectDB()
app.get('/',(req,res)=>{
    res.send("Server is running");
})
app.use('/api/users',UserRouter);
app.use('/api/resumes',resumeRouter);
app.use('/api/ai',aiRouter)
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
