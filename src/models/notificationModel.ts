import { DataTypes, UUIDV1 } from "sequelize";
import { sequlize } from "../db_connect/dbConnect";

const NotificationModel = sequlize.define("notificationModel", {
  id: {
    type: DataTypes.UUID,
    defaultValue: UUIDV1,
    primaryKey: true,
  },
  message: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  senderID: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  receiverID: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  isRead: {
    type: DataTypes.BOOLEAN,
    defaultValue: false,
  },
  createdAt: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW,
  },
});

export default NotificationModel;
