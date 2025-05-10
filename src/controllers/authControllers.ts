import { Response, Request } from "express";
import UserModel from "../models/userModel";
import { emailPattern } from "../helpers/patters";
import bcrypt from "bcrypt";
import { Op, where } from "sequelize";
import jwt from "jsonwebtoken";
import nodemailer, { Transporter } from "nodemailer";

const signUpController = async (req: Request, res: Response) => {
  const { firstName, lastName, email, userName, password } = req.body;

  if (!firstName || !lastName || !email || !userName || !password) {
    res.status(400).send({ message: "Please provide all required details!" });
    return;
  }

  if (!emailPattern.test(email)) {
    res.status(400).send({ message: "Invalid email format!" });
    return;
  }

  try {
    const existingUser: any = await UserModel.findOne({
      where: {
        [Op.or]: [{ userName }, { email }],
      },
    });

    if (existingUser) {
      const conflictField =
        existingUser.userName === userName ? "Username" : "Email";
      res.status(409).send({ error: `${conflictField} already in use!` });
      return;
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    await UserModel.create({
      firstName,
      lastName,
      email,
      userName,
      password: hashedPassword,
    });
    res.status(201).send({ message: "User created successfully!" });
  } catch (error) {
    res.status(500).send({ message: "Internal server error" });
  }
};

const signInController = async (req: Request, res: Response) => {
  const { userName, password } = req.body;

  if (!userName || !password) {
    res.status(400).send({ error: "Required fields not provided" });
    return;
  }
  try {
    const user: any = await UserModel.findOne({ where: { userName } });
    if (!user) {
      res.status(404).send({ error: `userName doesn't exist` });
      return;
    }
    const isMatched = await bcrypt.compare(password, user.password);
    if (!isMatched) {
      res.status(401).send({ error: "Unauth password incorrect" });
      return;
    }
    const userObj = {
      id: user.id,
      userName: user.userName,
      email: user.email,
      firstName: user.firstName,
      lastName: user.lastName,
    };
    const secretVal = process.env.SECRET_KEY || "my secret key";
    const tokenVal = jwt.sign(userObj, secretVal, { expiresIn: "1h" });
    res.status(200).send({ user: userObj, auth: tokenVal });
  } catch {
    res.status(500).send({ error: "Internal server error" });
  }
};

const forgotPasswordController = async (req: Request, res: Response) => {
  res.status(200).send({ message: "Forgot password route working" });
};

const verifyemailController = async (req: Request, res: Response) => {
  const { email } = req.body;
  if (!email) {
    res.status(400).send({ message: "Email is required" });
    return;
  }
  const user: any = await UserModel.findOne({ where: { email } });
  if (!user) {
    res.status(404).send({ messahe: "User doesn't exist" });
    return;
  }
  const transporter: Transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.SERVER_EMAIL,
      pass: process.env.SERVER_PASS,
    },
  });
  try {
    const eTokenVal = jwt.sign({email}, process.env.SECRET_KEY || "dummy",{expiresIn: '10m'});
    await transporter.sendMail({
      from: process.env.SERVER_EMAIL,
      to: email,
      subject: "Verify email",
      html: `<body>
    <h1 style="font-family: Arial, Helvetica, sans-serif; font-size: 48px; font-weight: bold; color: #00a9f1;">
      Talker
    </h1>
    <h2 style="font-family: Arial, Helvetica, sans-serif;">Hi ${user.firstName} ${user.lastName},</h2>
    <p style="font-family: Arial, Helvetica, sans-serif;">Thanks for signing up! Please verify your email address to complete your registration.</p>
    <div style="background-color: #b0e8ff; padding: 10px 0px 10px 0px; display: flex; justify-content: center; align-items: center; margin-top: 50px;">
        <a href="http://localhost:3000/email-verification?etoken=${eTokenVal}">
            <button style="background-color: #00a9f1;
            color: white;
            border: none;
            padding: 10px 20px;
            text-align: center;
            text-decoration: none;
            display: inline-block;
            font-size: 16px;
            margin: 4px 2px;
            cursor: pointer;
            border-radius: 5px;">
                Verify email
            </button>
        </a>
    </div>
  </body>`,
    });
    res.status(200).send({ message: "Email sent" });
    return;
  } catch (error) {
    console.log(error);
    res.status(500).send({ message: "Internal server error" });
    return;
  }
};

const verifyUserController = async (req: Request, res: Response) => {
  const {eTokenVal} = req.body;
  jwt.verify(eTokenVal, process.env.SECRET_KEY || "dummy", async (error: any, decoded: any) => {
    if(error){
      res.status(401).send({error: 'Token expired!'});
      return;
    }
    const user: any = await UserModel.findOne({where: {email: decoded.email}});
    if(!user){
      res.status(404).send({error: 'User not found!'})
      return;
    }
    if(user.isVerifed){
      res.status(409).send({message: 'User already verified!'});
      return;
    }
    await UserModel.update({isVerifed: true}, {where: {email: decoded.email}});
    res.status(201).send({message: 'User verified successfully'});
    return;
  });
}

export {
  signUpController,
  signInController,
  forgotPasswordController,
  verifyemailController,
  verifyUserController
};
