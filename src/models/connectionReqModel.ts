import { DataTypes } from "sequelize";
import { sequlize } from "../db_connect/dbConnect";

const ConnectionReqModel = sequlize.define("connectionReq", {
  id: {
    type: DataTypes.STRING,
    autoIncrement: true,
    primaryKey: true,
  },
  senderID: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  receiverID: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  status: {
    type: DataTypes.BOOLEAN,
    defaultValue: false,
  },
  createdAt: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW,
  },
});

export default ConnectionReqModel;
