import express, { Application } from "express";
import dotenv from "dotenv";
import { connectDB1, connectDB2 } from "./src/db_connect/dbConnect";

const app: Application = express();
app.use(express.json());
dotenv.config();
connectDB1();
connectDB2();
app.listen(3030, () => {
    console.log('Server running on port 3030');
});