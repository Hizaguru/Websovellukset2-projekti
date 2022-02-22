import cors from "cors";
import cookieParser from "cookie-parser";
import express from "express";
import router from "./routes/Index.js";
import * as dotenv from "dotenv";

dotenv.config();
const app = express();
app.use(cors({credentials:true, origin:'http://localhost:3000'}));
app.use(cookieParser());
app.use(express.json());
app.use(router);

app.listen(5000, () => console.log('Server at port 5000'))