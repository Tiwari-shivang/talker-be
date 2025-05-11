import { DataTypes } from "sequelize";
import { sequlize } from "../db_connect/dbConnect";

const ConnectionReqModel = sequlize.define("connectionReq", {
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV1,
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
    type: DataTypes.STRING,
    defaultValue: 'pending'
  },
  createdAt: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW,
  },
});

export default ConnectionReqModel;
