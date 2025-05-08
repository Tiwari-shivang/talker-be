import {Response, Request} from 'express';
import ConnectionReqModel from '../models/connectionReqModel';
import { handlePushNotification } from './notificationsController';

export const sendConnectionRequest = async (req: Request, res: Response) => {
    const {receiverID, senderID} = req.body;
    if(!receiverID){
        res.status(400).send({error: "Receiver ID is required"});
        return;
    }
    try{
        await ConnectionReqModel.sync();
    }
    catch(error){
        console.error("Error syncing ConnectionReqModel:", error);
        res.status(500).send({error: "Internal server error"});
        return;
    }
    try{
        await ConnectionReqModel.create({
            senderID,
            receiverID
        });
        const notifyString = `Connection request received`;
        handlePushNotification(req, res, notifyString);
    }
    catch(error){
        console.error("Error creating connection request:", error);
        res.status(500).send({error: "Internal server error"});
    }
}