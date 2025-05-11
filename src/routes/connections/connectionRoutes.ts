import express from "express";
import { getAllConnections, sendConnectionRequest, viewProfile } from "../../controllers/connectionControllers";
import { authMiddlware } from "../../middleware/middleware";

const connectionRouter = express.Router();

connectionRouter.post("/send-request", authMiddlware, sendConnectionRequest);
connectionRouter.get("/profile/:id", authMiddlware, viewProfile);
connectionRouter.get("/get", authMiddlware, getAllConnections);

export default connectionRouter;