import {Response, Request} from 'express';
import UserModel from '../models/userModel';
import { emailPattern } from '../helpers/patters';
import bcrypt from 'bcrypt';
import { Op } from 'sequelize';

const signUpController = async (req: Request, res: Response) => {
    const {firstName, lastName, email, userName, password} = req.body;

    if (!firstName || !lastName || !email || !userName || !password) {
        return res.status(400).send({message: 'Please provide all required details!'});
    }

    if (!emailPattern.test(email)) {
        return res.status(400).send({message: 'Invalid email format!'});
    }

    try {
        const existingUser: any = await UserModel.findOne({
            where: {
                [Op.or]: [{userName}, {email}]
            }
        });

        if (existingUser) {
            const conflictField = existingUser.userName === userName ? 'Username' : 'Email';
            return res.status(409).send({error: `${conflictField} already in use!`});
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        await UserModel.create({firstName, lastName, email, userName, password: hashedPassword});
        res.status(201).send({message: 'User created successfully!'});
    } catch (error) {
        res.status(500).send({message: 'Internal server error'});
    }
}

const signInController = (req: Request, res: Response) => {
    res.status(200).send({message: 'Sign in route working'});
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