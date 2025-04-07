import {Response, Request} from 'express';

const signUpController = (req: Request, res: Response) => {
    if(!req.body.email){
        res.status(400).send({error: 'Email not provided!'})
    }
    res.status(200).send({mesage: "Sign up route working"});
}

const signInController = (req: Request, res: Response) => {
    console.log(req.body);
    res.status(200).send({message: 'Sign in route working'});
}

const forgotPasswordController = (req: Request, res: Response) => {
    console.log(req.body);
    res.status(200).send({meesage: 'Forgot route working'});
}

const verifyemailController = (req: Request, res: Response) => {
    console.log(req.body);
    res.status(200).send({message: 'Verify email route working'});
}

const yuktaBaby = () => {
    console.log("Yukta baby");
}

export {signUpController, signInController, forgotPasswordController, verifyemailController}