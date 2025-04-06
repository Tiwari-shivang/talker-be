import mongoose from "mongoose";
import { Sequelize } from "sequelize";

const sequlize = new Sequelize("talker", "root", '9643@Hexaview', {
    host: "localhost",
    dialect: "mysql",
  });

const connectDB1 = async () => {
  try {
    await sequlize.authenticate();
    console.log("MySQL Connected");
  } catch (err) {
    console.log(err);
  }
};

const connectDB2 = async () => {
  try {
    await mongoose.connect(
      `mongodb+srv://shivang1802tiwari:${process.env.DB2PASS}@cluster0.d8blyju.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`
    );
    console.log("MongoDB Connected");
  } catch (err) {
    console.log(err);
  }
};

export { connectDB1, connectDB2, sequlize};