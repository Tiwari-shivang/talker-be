import { Response, Request } from "express";
import ConnectionReqModel from "../models/connectionReqModel";
import { handlePushNotification } from "./notificationsController";
import UserModel from "../models/userModel";
import jwt from 'jsonwebtoken';
import { Op } from "sequelize";

export const sendConnectionRequest = async (req: Request, res: Response) => {
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
    let userName = '';
    const tokenVal = req.headers['authorization']?.split(' ')[1] || '';
    jwt.verify(tokenVal, process.env.SECRET_KEY || '', (err, decoded:any) => {
        if(err){
            res.status(401).send({error: 'Unauth'})
            return;
        }
        userName = decoded && decoded.userName ? decoded.userName : 'unknown';
    })
    const notifyString = `Connection request received from ${userName}`;
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
      joined: connDetails.createdAt
    });
    return;
  }
  res.status(404).send({ error: "Connection not found" });
};

export const getAllConnections = async (req: Request, res: Response) => {
    let userName = '';
    const tokenVal = req.headers['authorization']?.split(' ')[1] || '';
    jwt.verify(tokenVal, process.env.SECRET_KEY || '', (err, decoded:any) => {
        if(err){
            res.status(401).send({error: 'Unauth'})
            return;
        }
        userName = decoded && decoded.userName ? decoded.userName : 'unknown';
    })
    try{
        const data = await UserModel.findAll({where: {
            userName: {
                [Op.ne]: userName
            }
        }, attributes: {exclude: ['password']}, raw: true})
        res.status(200).send({connections: data})
    }
    catch(err){
        console.log(err)
        res.status(500).send({error: 'Internal server error'})
    }
}