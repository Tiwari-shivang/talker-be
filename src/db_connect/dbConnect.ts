import mongoose from "mongoose";
import { Sequelize } from "sequelize";

const sequlize = new Sequelize('talker', 'root', '9643@Hexaview', {
    dialect: 'mysql',
    host: 'localhost'
});
const connectDB1 = async () => {
    try{
       await sequlize.authenticate()
       console.log('Connected DB1');
    }
    catch{
        console.log('Error while connecting to DB2');
    }
}

const connectDB2 = async () => {
    try{
        await mongoose.connect('mongodb+srv://shivang1802tiwari:LTfqG18j3Y0Hh22a@cluster0.d8blyju.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0')
        console.log('Connected DB2');
    }
    catch{
        console.log('Error while conneting to DB2');
    }
}

export {connectDB1, connectDB2, sequlize};