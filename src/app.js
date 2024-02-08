import express  from "express";
import morgan from "morgan";
import { connectDB } from "./db.js";
import cookieParser from "cookie-parser";
import authRoutes from "./routes/auth.routes.js";
import postRoutes from "./routes/post.routes.js";
import cors from 'cors'

const app = express();

app.use(cors({ 
  origin: 'http://localhost:5173',
  credentials: true
}));
app.use(morgan('dev'));
app.use(express.json()); //para transformar los req.body en objetos json
app.use(cookieParser());//para traer las cookies como objetos json ({token: jsjsjsjsj})
app.use('/api', authRoutes);
app.use('/api', postRoutes);

connectDB();
app.listen(3000);
console.log('server on localhost 3000');


