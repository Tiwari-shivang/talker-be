import { Response, Request } from "express";
import ConnectionReqModel from "../models/connectionReqModel";
import { handlePushNotification } from "./notificationsController";
import UserModel from "../models/userModel";
import jwt from "jsonwebtoken";
import { Op } from "sequelize";

export const sendConnectionRequest = async (req: any, res: Response) => {
  const { receiverID, senderID } = req.body;
  if (!receiverID) {
    res.status(400).send({ error: "Receiver ID is required" });
    return;
  }
  try {
    await ConnectionReqModel.sync();
  } catch (error) {
    console.error("Error syncing ConnectionReqModel:", error);
    res.status(500).send({ error: "Internal server error" });
    return;
  }
  try {
    await ConnectionReqModel.create({
      senderID,
      receiverID,
    });
    const notifyString = `Connection request received from ${req.user.userName}`;
    handlePushNotification(req, res, notifyString);
  } catch (error) {
    console.error("Error creating connection request:", error);
    res.status(500).send({ error: "Internal server error" });
  }
};

export const viewProfile = async (req: Request, res: Response) => {
  const { id } = req.params;
  const connection = await UserModel.findOne({ where: { id } });
  if (connection) {
    const connDetails = connection?.toJSON();
    res.status(200).send({
      firstName: connDetails.firstName,
      lastName: connDetails.lastName,
      email: connDetails.email,
      userName: connDetails.userName,
      phone: connDetails.phone,
      gender: connDetails.gender,
      isVerifed: connDetails.isVerifed,
      joined: connDetails.createdAt,
    });
    return;
  }
  res.status(404).send({ error: "Connection not found" });
};

export const getAllConnections = async (req: any, res: Response) => {
  try {
    const { searchVal, limit } = req.query;
    console.log(req.query);
    const data = await UserModel.findAll({
      where: {
        userName: {
          [Op.ne]: req.user.userName,
        },
        [Op.or]: [
          { userName: { [Op.like]: `%${searchVal}%` } },
          { firstName: { [Op.like]: `%${searchVal}%` } },
          { lastName: { [Op.like]: `%${searchVal}%` } },
        ],
      },
      attributes: { exclude: ["password"] },
      limit: Number(limit),
      raw: true,
      order: [["firstName", "ASC"]],
    });
    res.status(200).send({ connections: data, records: data.length });
  } catch (err) {
    console.log(err);
    res.status(500).send({ error: "Internal server error" });
  }
};

export const getAllRequests = async (req: any, res: Response) => {
    const {status} = req.query;
    if(!status){
        res.status(400).send({error: "Please provide value for status"});
        return;
    }
    const data = await ConnectionReqModel.findAll({where: {
        [Op.and]: [
            {receiverID: req.user.id},
            {status: req.query.status}
        ]
    }, raw: true});
    res.status(200).send({requests: data, records: data.length});
}