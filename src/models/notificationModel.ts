import { DataTypes } from "sequelize";
import { sequlize } from "../db_connect/dbConnect";

const NotificationModel = sequlize.define("notificationModel", {
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
  createdAt: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW,
  },
});

export default NotificationModel;
