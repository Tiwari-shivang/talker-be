import { NextFunction, Request, Response } from "express";
import { getSocketIO } from "../../socket";
import { Server } from "socket.io";
import { userSocketMap } from "../utils/helper";
import NotificationModel from "../models/notificationModel";

export const handlePushNotification = async (
  req: Request,
  res: Response,
  content: string
) => {
  const io: Server | null = getSocketIO();
  if (io) {
    const { receiverID } = req.body;
    const socketId: string = userSocketMap.get(receiverID) || "";
    io.to(socketId).emit("notify", { notification: content });
    try {
      await NotificationModel.sync();
    } catch (e) {
      console.log(e);
      res
        .status(500)
        .send({ error: "Error creating table Notifications model" });
    }
    try {
      const newNotify = {
        message: content,
        senderID: req.body.senderID,
        receiverID: req.body.receiverID,
      };
      await NotificationModel.create(newNotify);
      res.status(201).send({ message: "Request created successfully" });
    } catch (e) {
      res.status(500).send({ error: "Error insertion in Notification schema" });
    }
  } else {
    res.status(500).send({ error: "Error sending notification" });
  }
};
