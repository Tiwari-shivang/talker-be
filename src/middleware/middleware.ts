import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";

export const authMiddlware = async (req: any, res: Response, next: NextFunction) => {
    const tokenVal = req.headers['authorization']?.split(' ')[1] || '';
    jwt.verify(tokenVal, process.env.SECRET_KEY || 'secreatKey', (err: any, decoded: any) => {
        if(err){
            console.log(err);
            res.status(401).send({error: 'Unauth'})
        }
        req.user = decoded;
        next();
    })
}