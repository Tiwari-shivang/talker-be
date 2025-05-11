import express, { Application } from "express";
import dotenv from "dotenv";
import { connectDB1, connectDB2 } from "./src/db_connect/dbConnect";
import router from "./src/routes";
import { createServer } from "http";
import cors from 'cors';
import { initializeSocket } from "./socket";

const app: Application = express();
app.use(express.json());
app.use(cors());
dotenv.config();
connectDB1();
connectDB2();
app.use('/api', router);
const server = createServer(app);
initializeSocket(server);
server.listen(3030, () => {
    console.log('Server running on port 3030');
});