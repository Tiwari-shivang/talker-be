import {Response, Request} from 'express';

const signUpController = (req: Request, res: Response) => {
    console.log(req.body);
    res.status(200).send({mesage: "Sign up route working"});
}

const signInController = (req: Request, res: Response) => {
    console.log(req.body);
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