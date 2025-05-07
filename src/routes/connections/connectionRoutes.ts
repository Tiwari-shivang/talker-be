import express from "express";
import { sendConnectionRequest } from "../../controllers/connectionControllers";
import { authMiddlware } from "../../middleware/middleware";

const connectionRouter = express.Router();

connectionRouter.post("/send-request", authMiddlware, sendConnectionRequest);

export default connectionRouter;