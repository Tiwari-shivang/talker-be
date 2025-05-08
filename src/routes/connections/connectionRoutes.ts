import express from "express";
import { sendConnectionRequest, viewProfile } from "../../controllers/connectionControllers";
import { authMiddlware } from "../../middleware/middleware";

const connectionRouter = express.Router();

connectionRouter.post("/send-request", authMiddlware, sendConnectionRequest);
connectionRouter.get("/profile/:id", authMiddlware, viewProfile);

export default connectionRouter;