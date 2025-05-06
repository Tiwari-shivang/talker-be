import express from "express";
import { sendConnectionRequest } from "../../controllers/connectionControllers";

const connectionRouter = express.Router();

connectionRouter.post("/send-request", sendConnectionRequest);

export default connectionRouter;