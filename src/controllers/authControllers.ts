import {Response, Request} from 'express';
import UserModel from '../models/userModel';
import { emailPattern } from '../helpers/patters';
import bcrypt from 'bcrypt';
import { Op } from 'sequelize';
import jwt from 'jsonwebtoken';

const signUpController = async (req: Request, res: Response) => {
    const {firstName, lastName, email, userName, password} = req.body;

    if (!firstName || !lastName || !email || !userName || !password) {
        res.status(400).send({message: 'Please provide all required details!'});
        return;
    }

    if (!emailPattern.test(email)) {
        res.status(400).send({message: 'Invalid email format!'});
        return;
    }

    try {
        const existingUser: any = await UserModel.findOne({
            where: {
                [Op.or]: [{userName}, {email}]
            }
        });

        if (existingUser) {
            const conflictField = existingUser.userName === userName ? 'Username' : 'Email';
            res.status(409).send({error: `${conflictField} already in use!`});
            return;
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        await UserModel.create({firstName, lastName, email, userName, password: hashedPassword});
        res.status(201).send({message: 'User created successfully!'});
    } catch (error) {
        res.status(500).send({message: 'Internal server error'});
    }
}

const signInController = async (req: Request, res: Response) => {
    const {userName, password} = req.body;

    if(!userName || !password){
        res.status(400).send({error: 'Required fields not provided'});
        return;
    }
    try{
        const user: any = await UserModel.findOne({where: {userName}});
        if(!user){
            res.status(404).send({error: `userName doesn't exist`});
            return;
        }
        const isMatched = await bcrypt.compare(password, user.password);
        if(!isMatched){
            res.status(401).send({error: 'Unauth password incorrect'});
            return;
        }
        const userObj = {
            userName: user.userName,
            email: user.email,
            firstName: user.firstName,
            lastName: user.lastName
        }
        const secretVal = process.env.SECRET_KEY || 'dummySecret';
        const tokenVal = jwt.sign(userObj, secretVal, {expiresIn: '1h'});
        res.status(200).send({user: userObj, auth: tokenVal});
    }
    catch{
        res.status(500).send({error: 'Internal server error'});
    }
}

const forgotPasswordController = (req: Request, res: Response) => {
    console.log(req.body);
    res.send(200).send({meesage: 'Forgot route working'});
}

const verifyemailController = (req: Request, res: Response) => {
    console.log(req.body);
    res.status(200).send({message: 'Verify email route working'});
}

export {signUpController, signInController, forgotPasswordController, verifyemailController}